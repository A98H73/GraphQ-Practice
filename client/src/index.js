import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import "./index.css";
import App from "./App";

// // apollo client setup
const client = new ApolloClient({
  uri: "http://localhost:5002/graphql",
  cache: new InMemoryCache(),
});

// client
//   .query({
//     query: gql`
//       query books {
//         id
//         name
//       }
//     `,
//   })
//   .then((result) => console.log(result));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
