// setupPgBoss.js

import PgBoss from "pg-boss";
import { jobs } from "~/utils/pgboss/jobs";

type BossState =
  | {
      isReady: false;
      boss: null;
    }
  | {
      isReady: true;
      boss: PgBoss;
    };

let bossState: BossState = {
  isReady: false,
  boss: null,
};

async function getBoss(): Promise<PgBoss> {
  if (bossState.isReady) {
    return bossState.boss;
  }

  const boss = new PgBoss({
    connectionString: process.env.DATABASE_URL,
    schema: "boss_tasks",
  });

  try {
    await boss.start();
    console.log("Started pg-boss");
  } catch (err) {
    console.error("Error starting pg-boss:", err);
  }

  await Promise.all(jobs.map((job) => boss.work(job.queue, job.handler)));

  // Update module state
  bossState = {
    isReady: true,
    boss,
  };

  return boss;
}

export { getBoss };
