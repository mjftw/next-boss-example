// setupPgBoss.js

import PgBoss from "pg-boss";

const boss = new PgBoss({
  connectionString: process.env.DATABASE_URL, // Your database connection string
  schema: "boss_tasks",
});

boss.start();

export { boss };
