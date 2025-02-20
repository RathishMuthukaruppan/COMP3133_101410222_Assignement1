const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const connectDB = require("./db");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");

connectDB();

const app = express();
const server = new ApolloServer({ typeDefs, resolvers });

(async () => {
  await server.start();
  server.applyMiddleware({ app });

  app.listen(5000, () => {
    console.log("🚀 Server running at http://localhost:5000/graphql");
  });
})();
