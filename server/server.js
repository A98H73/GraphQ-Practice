const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
//const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require("graphql");

app.use(cors());

mongoose.connect(
  "mongodb+srv://Abhijeet:Abhijeet12345@graphqlpractice.f6wjxjh.mongodb.net/?retryWrites=true&w=majority"
);

mongoose.connection.once("open", () => {
  console.log("Database Connected Successfully");
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);
app.listen(5002, () => console.log("Server is Runninng on port: 5002"));
