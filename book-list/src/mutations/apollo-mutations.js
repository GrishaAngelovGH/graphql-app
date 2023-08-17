import { gql } from "@apollo/client"

export const ADD_BOOK = gql`
  mutation AddBook($isbn: String!, $title: String!, $authorId: String!){
    addBook(isbn: $isbn, title: $title, authorId: $authorId) {
      isbn
    }
  }
  `