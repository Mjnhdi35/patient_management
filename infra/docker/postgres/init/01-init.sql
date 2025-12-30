CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE SCHEMA IF NOT EXISTS app;

ALTER DATABASE patient_db SET search_path TO app, public;
