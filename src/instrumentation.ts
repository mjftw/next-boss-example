export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    console.log("Registering pg-boss instrumentation hook...");

    const { getBoss } = await import("~/utils/pgboss/boss");
    await getBoss();
  }
}
