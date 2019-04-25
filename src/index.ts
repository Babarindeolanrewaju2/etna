require("custom-env").env(true);
import * as yargsParser from "yargs-parser";
import createServer from "./server";
import { initializeDB } from "./database";
// Process command line arguments and environment variables
const argv = yargsParser(process.argv.slice(2));

const log =
  typeof argv.log === "boolean"
    ? argv.log
    : JSON.stringify(process.env.NODE_ENV) === "development";

const port: number = parseInt(JSON.stringify(process.env.PORT), 10) || 3000;
const start = async () => {
  const fastify = createServer({
    logger: log
  });

  try {
    await initializeDB();
    fastify.log.info(`Database connection established!`);
    await fastify.listen(port);
    fastify.log.info(`Matterhorn server started on port ${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();