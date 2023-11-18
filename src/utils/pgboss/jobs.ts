import { WorkHandler } from "pg-boss";
import { getBoss } from "~/utils/pgboss/boss";

/** All of the different jobs available, and the type of the arguments those
 * jobs take.
 * If the job takes no arguments, an empty object {} is used.
 */
type JobArgs = {
  "say-hello": { name: string };
  "say-the-time": {};
};

/** Definitions of each job available */
const jobHandlers: {
  [K in keyof JobArgs]: WorkHandler<JobArgs[K]>;
} = {
  "say-hello": async ({ data: { name } }) => {
    console.log(`Hello, ${name}!`);
  },
  "say-the-time": async () => {
    console.log(`The time is ${new Date()}!`);
  },
};

async function enqueueJob<Queue extends keyof JobArgs>(
  queue: Queue,
  args?: JobArgs[Queue],
) {
  console.log(`Queueing job "${queue}" with args ${JSON.stringify(args)}`);

  const boss = await getBoss();

  await boss.send(queue, args ?? {});
}

export { jobHandlers, enqueueJob };
