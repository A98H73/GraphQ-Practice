const graphql = require("graphql");
const Book = require("../models/book");
const Author = require("../models/author");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLList,
} = graphql;

// var Authors = [
//   { id: "1", name: "Willium Sterly" },
//   { id: "2", name: "Aksath Gupta" },
//   { id: "3", name: "A J Rowling" },
//   { id: "4", name: "Rakesh Mishra" },
// ];

// var Books = [
//   { name: "Hello bro", genre: "action", id: "1", authorID: "1" },
//   { name: "Mr X", genre: "fantasy", id: "2", authorID: "2" },
//   {
//     name: "Harry Potter and Secret of askab",
//     genre: "action",
//     id: "3",
//     authorID: "1",
//   },
//   {
//     name: "Harry Potter and Goblet of Fire",
//     genre: "advanture",
//     id: "4",
//     authorID: "3",
//   },
//   {
//     name: "Harry Potter and the deadly hollos",
//     genre: "action",
//     id: "5",
//     authorID: "1",
//   },
//   {
//     name: "Harry Potter and Prisoner of askaban",
//     genre: "Sci-Fi",
//     id: "6",
//     authorID: "2",
//   },
//   {
//     name: "Harry Potter and Hogwards",
//     genre: "advanture",
//     id: "7",
//     authorID: "3",
//   },
//   {
//     name: "Harry Potter and Sabarmati ka kinara",
//     genre: "action",
//     id: "8",
//     authorID: "4",
//   },
//   {
//     name: "Harry Potter and Visit ot india",
//     genre: "Sci-Fi",
//     id: "9",
//     authorID: "4",
//   },
//   {
//     name: "Harry Potter and Elon musk",
//     genre: "advanture",
//     id: "10",
//     authorID: "2",
//   },
//   {
//     name: "Harry Potter and naa milna doobara",
//     genre: "action",
//     id: "11",
//     authorID: "1",
//   },
//   {
//     name: "Harry Potter and meeting to modi",
//     genre: "advanture",
//     id: "12",
//     authorID: "4",
//   },
// ];

const BookType = new GraphQLObjectType({
  name: "Book",
  description: "This represents the Book details",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    authorID: { type: GraphQLString },
    authors: {
      type: AuthorType,
      resolve: (parent, args) => {
        console.log(parent);
        //return Authors.find((author) => author.id === book.authorID);

        return Author.find({ a_id: parent.authorID });
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  description: "This represents the author details",
  fields: () => ({
    a_id: { type: GraphQLString },
    name: { type: GraphQLString },
    books: {
      type: new GraphQLList(BookType),
      resolve: (parent, args) => {
        //return Books.filter((bk) => bk.authorID === at.id);

        return Book.find({ authorID: parent.a_id });
      },
    },
  }),
});

const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Hello show books",
  fields: () => ({
    book: {
      type: BookType,
      description: "Single Book Item",
      args: { id: { type: GraphQLString } },
      resolve: (parent, args) => {
        //  return Books.find((bk) => bk.id === args.id);
        return Book.findById(args.id);
      },
    },

    author: {
      type: AuthorType,
      description: "Single Author Item",
      args: { id: { type: GraphQLString } },
      resolve: (parent, args) => {
        //  return Authors.find((at) => at.id === args.id);
        return Author.findById(args.id);
      },
    },

    authors: {
      type: new GraphQLList(AuthorType),
      description: "all authors list",
      resolve: () => {
        return Author.find({});
      }, //Authors,
    },

    books: {
      type: new GraphQLList(BookType),
      description: "List of all Books",
      resolve: () => {
        return Book.find({});
      }, // Books,
    },
  }),
});

const RootMutationType = new GraphQLObjectType({
  name: "Mutation",
  description: "Root Mutation",
  fields: () => ({
    addBook: {
      type: BookType,
      description: "Add a book",
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        authorID: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (parent, args) => {
        const NewBook = new Book({
          name: args.name,
          genre: args.genre,
          authorID: args.authorID,
        });
        NewBook.save();
        return NewBook;
      },
    },

    addAuthor: {
      type: AuthorType,
      description: "Add a Author",
      args: {
        a_id: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (parent, args) => {
        const NewAuthor = new Author({
          a_id: args.a_id,
          name: args.name,
        });
        NewAuthor.save();
        return NewAuthor;
      },
    },
  }),
});

module.exports = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});
