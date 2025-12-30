#!/bin/sh
set -e

TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
FILE="/backups/postgres_${POSTGRES_DB}_${TIMESTAMP}.sql"

pg_dump \
  -h postgres \
  -U "$POSTGRES_USER" \
  -d "$POSTGRES_DB" \
  --no-owner \
  --no-acl \
  > "$FILE"

echo "Backup created at $FILE"
