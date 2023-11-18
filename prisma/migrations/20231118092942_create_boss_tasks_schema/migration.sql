-- Create a DB schema for pg-boss to use.
CREATE SCHEMA boss_tasks;

-- Postgres extension required by pg-boss
CREATE EXTENSION IF NOT EXISTS pgcrypto;
