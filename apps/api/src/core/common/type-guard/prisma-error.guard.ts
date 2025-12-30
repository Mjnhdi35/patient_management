import { PgUniqueConstraintMeta } from '../types/prisma-error.type';

export function isPgUniqueConstraintMeta(
  meta: unknown,
): meta is PgUniqueConstraintMeta {
  if (typeof meta !== 'object' || meta === null) {
    return false;
  }

  if (!('driverAdapterError' in meta)) {
    return false;
  }

  const dae = (meta as Record<string, unknown>).driverAdapterError;
  if (typeof dae !== 'object' || dae === null) {
    return false;
  }

  if (!('cause' in dae)) {
    return false;
  }

  const cause = (dae as Record<string, unknown>).cause;
  if (typeof cause !== 'object' || cause === null) {
    return false;
  }

  if (!('originalCode' in cause)) {
    return false;
  }

  return typeof (cause as Record<string, unknown>).originalCode === 'string';
}
