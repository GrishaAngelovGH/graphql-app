/*
  Your GraphQL server uses a schema to describe the shape of your available data.
  The schema also specifies exactly which queries and mutations are available for clients to execute.
  Then, when queries come in, they are validated and executed against that schema.

  The Query type is a special object type that defines
  all of the top-level entry points for queries that clients execute against your server.
 */

import graphql from 'graphql'

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLSchema
} = graphql

let books = [
  { isbn: '978-3-16-148410-1', title: 'The Adventures of Sherlock Holmes', authorId: '123' },
  { isbn: '978-3-16-148410-2', title: 'The Memoirs of Sherlock Holmes', authorId: '123' },
  { isbn: '978-3-16-148410-3', title: 'The Adventure of the Bruce-Partington Plans', authorId: '123' },
  { isbn: '978-3-16-148410-4', title: `Harry Potter and the Philosopher's Stone`, authorId: '234' },
  { isbn: '978-3-16-148410-5', title: 'Harry Potter and the Chamber of Secrets', authorId: '234' },
  { isbn: '978-3-16-148410-6', title: 'Harry Potter and the Goblet of Fire', authorId: '234' },
  { isbn: '978-3-16-148410-7', title: 'Casino Royale', authorId: '345' },
  { isbn: '978-3-16-148410-8', title: 'Moonraker', authorId: '345' },
  { isbn: '978-3-16-148410-9', title: 'Diamonds Are Forever', authorId: '345' },
]

let authors = [
  { id: '123', name: 'Arthur Conan Doyle', books: ['978-3-16-148410-1', '978-3-16-148410-2', '978-3-16-148410-3'] },
  { id: '234', name: 'J.K. Rowling', books: ['978-3-16-148410-4', '978-3-16-148410-5', '978-3-16-148410-6'] },
  { id: '345', name: 'Ian Fleming', books: ['978-3-16-148410-7', '978-3-16-148410-8', '978-3-16-148410-9'] }
]

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    isbn: { type: GraphQLString },
    title: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent) {
        return authors.find(v => v.id === parent.authorId)
      }
    }
  })
})

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent) {
        return books.filter(v => parent.books.includes(v.isbn))
      }
    }
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { isbn: { type: GraphQLString } },
      resolve(parent, args) {
        return books.find(v => v.isbn === args.isbn)
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        return authors.find(v => v.id === args.id)
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve() {
        return books
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve() {
        return authors
      }
    }
  }
})

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        const author = {
          id: `${Math.floor(Math.random() * 1000)}`,
          name: args.name,
          books: []
        }

        authors.push(author)

        return author
      }
    },
    addBook: {
      type: BookType,
      args: {
        isbn: { type: new GraphQLNonNull(GraphQLString) },
        title: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        const book = {
          isbn: args.isbn,
          title: args.title,
          authorId: args.authorId
        }

        const author = authors.find(v => v.id === args.authorId)
        author.books.push(args.isbn)

        books.push(book)

        return book
      }
    },
    deleteBook: {
      type: GraphQLBoolean,
      args: {
        isbn: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        books = books.filter(v => v.isbn !== args.isbn)

        const author = authors.find(v => v.id === args.authorId)
        author.books = author.books.filter(v => v !== args.isbn)

        return true
      }
    }
  }
})

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})

export default schema