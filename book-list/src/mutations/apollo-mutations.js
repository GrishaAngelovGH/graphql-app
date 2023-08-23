import { gql } from "@apollo/client"

export const ADD_BOOK = gql`
  mutation AddBook($isbn: String!, $title: String!, $authorId: String!){
    addBook(isbn: $isbn, title: $title, authorId: $authorId) {
      isbn
    }
  }
  `

export const DELETE_BOOK = gql`
  mutation DeleteBook($isbn: String!, $authorId: String!){
    deleteBook(isbn: $isbn, authorId: $authorId)
  }
  `