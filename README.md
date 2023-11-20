# Next Boss Example

This project demonstrates the integration of pg-boss with a NextJS application, showcasing a robust method for queueing and handling asynchronous jobs.

This is based of a standard T3 stack application, create with [Create T3 App](https://create.t3.gg/)

## Overview

pg-boss is employed to manage job queues within the NextJS application. It allows for the scheduling and processing of jobs asynchronously, ensuring efficient handling of background tasks.
Jobs are queued as a result of NextJS client calls, and serviced outside the usual NextJS server model using pg-boss async handlers.

If you've used [Oban](https://github.com/sorentwo/oban) before, it's a bit like that!

## Features

- Job queuing with pg-boss in a NextJS application
- Asynchronous job processing

## API Endpoints

The project includes three API endpoints to demonstrate the queuing of jobs:

1. `curl -X GET http://localhost:3000/api/hello`
2. `curl -X GET http://localhost:3000/api/time`
3. `curl -X GET http://localhost:3000/api/post`

Running these curl commands with the server running (via `yarn dev`), you should see some server console output about jobs being queued and handled.

## How pg-boss Works

pg-boss operates by creating and managing job queues in PostgreSQL. It leverages PostgreSQL's native features to ensure reliable and scalable job processing. Jobs are added to a queue and processed as per the configured schedule or triggers.

More info about pg-boss on their [official documentation](https://github.com/timgit/pg-boss/)
