import { gql } from "@apollo/client"

export const GET_BOOKS = gql`
  query GetBooks {
    books {
      isbn
      title
    }
  }
`

export const GET_BOOK_BY_ISBN = gql`
  query Book($isbn: String) {
    book(isbn: $isbn) {
      title
      author {
        id
        name
        books{
          isbn
          title
        }
      }
    }
  }
`

export const GET_AUTHORS = gql`
  query GetAuthors {
    authors {
      id
      name
    }
  }
`