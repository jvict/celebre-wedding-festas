import assert from 'node:assert/strict';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { describe, it } from 'node:test';
import { fileURLToPath } from 'node:url';

/**
 * Testes de arquitetura: garantem a Regra de Dependência da Clean Architecture
 * e o isolamento entre módulos. Se alguém violar, o CI quebra.
 */
const SRC = dirname(fileURLToPath(import.meta.url));

const FRAMEWORK_PACKAGES = ['fastify', '@prisma/client', 'zod'];

interface SourceFile {
  /** Caminho relativo a src, com "/" como separador. */
  path: string;
  imports: string[];
}

function listSourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) return listSourceFiles(full);
    return full.endsWith('.ts') && !full.endsWith('.test.ts') ? [full] : [];
  });
}

function readImports(content: string): string[] {
  const matches = content.matchAll(/(?:import|export)\s[^;]*?from\s+['"]([^'"]+)['"]/g);
  return [...matches].map((match) => match[1] ?? '');
}

function loadSources(): SourceFile[] {
  return listSourceFiles(SRC).map((file) => ({
    path: relative(SRC, file).split(sep).join('/'),
    imports: readImports(readFileSync(file, 'utf8')),
  }));
}

/** Resolve um import relativo para um caminho relativo a src. */
function resolveImport(file: SourceFile, specifier: string): string {
  const absolute = resolve(SRC, dirname(file.path), specifier);
  return relative(SRC, absolute).split(sep).join('/');
}

function layerOf(path: string): 'domain' | 'application' | 'infra' | 'presentation' | null {
  const segments = path.split('/');
  for (const layer of ['domain', 'application', 'infra', 'presentation'] as const) {
    if (segments.includes(layer)) return layer;
  }
  return null;
}

function moduleOf(path: string): string | null {
  const match = /^modules\/([^/]+)\//.exec(path);
  return match?.[1] ?? null;
}

const sources = loadSources();

describe('arquitetura', () => {
  it('encontra arquivos para verificar', () => {
    assert.ok(sources.length > 0);
  });

  it('domain não depende de application, infra, presentation nem de frameworks', () => {
    const violations: string[] = [];
    for (const file of sources.filter((f) => layerOf(f.path) === 'domain')) {
      for (const specifier of file.imports) {
        if (!specifier.startsWith('.')) {
          if (FRAMEWORK_PACKAGES.some((p) => specifier === p || specifier.startsWith(`${p}/`))) {
            violations.push(`${file.path} importa ${specifier}`);
          }
          continue;
        }
        const target = layerOf(resolveImport(file, specifier));
        if (target && target !== 'domain') {
          violations.push(`${file.path} importa a camada ${target}`);
        }
      }
    }
    assert.deepEqual(violations, []);
  });

  it('application não depende de infra, presentation nem de frameworks', () => {
    const violations: string[] = [];
    for (const file of sources.filter((f) => layerOf(f.path) === 'application')) {
      for (const specifier of file.imports) {
        if (!specifier.startsWith('.')) {
          if (FRAMEWORK_PACKAGES.some((p) => specifier === p || specifier.startsWith(`${p}/`))) {
            violations.push(`${file.path} importa ${specifier}`);
          }
          continue;
        }
        const target = layerOf(resolveImport(file, specifier));
        if (target === 'infra' || target === 'presentation') {
          violations.push(`${file.path} importa a camada ${target}`);
        }
      }
    }
    assert.deepEqual(violations, []);
  });

  it('módulos só se conhecem pelo index.ts (API pública)', () => {
    const violations: string[] = [];
    for (const file of sources) {
      const own = moduleOf(file.path);
      if (!own) continue;
      for (const specifier of file.imports.filter((s) => s.startsWith('.'))) {
        const target = resolveImport(file, specifier);
        const other = moduleOf(`${target}/`);
        if (other && other !== own && !/^modules\/[^/]+(\/index(\.js)?)?$/.test(target)) {
          violations.push(`${file.path} importa internals de ${other}`);
        }
      }
    }
    assert.deepEqual(violations, []);
  });
});
