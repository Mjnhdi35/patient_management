export interface PgUniqueConstraintMeta {
  driverAdapterError?: {
    cause?: {
      originalCode: string;
      originalMessage: string;
      kind: string;
      constraint?: {
        fields?: string[];
      };
    };
  };
}
