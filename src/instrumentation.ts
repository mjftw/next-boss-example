export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    console.log("Registering pg-boss instrumentation hook...");

    const { getBoss: initialiseBoss } = await import("~/utils/pgboss/boss");

    // Since this is running before the server is started, this will ensure that
    // the pg-boss instance is initialised before any jobs are enqueued.
    await initialiseBoss();
  }
}
