import { isPgUniqueConstraintMeta } from '../type-guard/prisma-error.guard';

export interface ExtractedConstraintError {
  code: string;
  kind: string;
  fields: string[];
}

export function extractConstraintError(
  meta: unknown,
): ExtractedConstraintError | undefined {
  if (!isPgUniqueConstraintMeta(meta)) return undefined;

  const cause = meta.driverAdapterError?.cause;
  if (!cause) return undefined;

  return {
    code: cause.originalCode,
    kind: cause.kind,
    fields: cause.constraint?.fields ?? [],
  };
}
