export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    console.log("Registering pg-boss instrumentation hook...");

    const { boss } = await import("~/utils/pgboss/boss");

    try {
      await boss.start();
      console.log("pg-boss started");
    } catch (err) {
      console.error("Error setting up pg-boss:", err);
    }

    const { jobs } = await import("~/utils/pgboss/jobs");

    const results = await Promise.all(
      jobs.map((job) => boss.work(job.queue, job.handler)),
    );
  }
}
