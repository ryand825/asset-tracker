import { GraphQLServer } from "graphql-yoga";
import { Prisma } from "prisma-binding";

import * as AuthPayload from "./resolvers/AuthPayload";
import Query from "./resolvers/Query";
import Mutation from "./resolvers/Mutation";

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: ".env.dev" });
}

const PORT = process.env.PORT || 4000;

// const Authentication = require("./resolvers/Authentication");

const resolvers = {
  AuthPayload,
  Query,
  Mutation
};

// 3
const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: "src/generated/prisma.graphql",
      endpoint: process.env.PRISMA_ENDPOINT,
      secret: process.env.PRISMA_SECRET,
      debug: true
    })
  })
});
server.start({ port: PORT }, () =>
  console.log(`Server is running on port ${PORT}`)
);
