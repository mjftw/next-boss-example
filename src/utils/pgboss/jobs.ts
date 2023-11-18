import { WorkHandler } from "pg-boss";
import { getBoss } from "~/utils/pgboss/boss";

interface Job<Args, Queue extends string> {
  queue: Queue;
  handler: WorkHandler<Args>;
}

type JobArgs = {
  "say-hello": { name: string };
};

function jobHandler<Queue extends keyof JobArgs>(
  queue: Queue,
  handler: WorkHandler<JobArgs[Queue]>,
): Job<JobArgs[Queue], Queue> {
  return { queue, handler };
}

const helloJob = jobHandler("say-hello", async ({ data: { name } }) => {
  console.log(`Hello, ${name}!`);
});

async function enqueueJob<Queue extends keyof JobArgs>(
  queue: Queue,
  args: JobArgs[Queue],
) {
  console.log(`Queueing job "${queue}"`);

  const boss = await getBoss();

  await boss.send(queue, args);
}

const jobs = [helloJob];

export { type Job, jobs, enqueueJob };
