import type { NextApiRequest, NextApiResponse } from "next";
import { enqueueJob } from "~/utils/pgboss/jobs";

type ResponseData = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  // Queue a job to happen in the future
  await enqueueJob("create-post", { title: "My cool post" });

  return res.status(200).json({ message: "Job queued" });
}
