import { gql } from '@apollo/client'

const mocks = [
  {
    request: {
      query: gql`
      query GetBooks {
        books {
          isbn
          title
        }
      }
    `
    },
    result: {
      data: {
        books: [
          { isbn: '1', title: 'Title 1' },
          { isbn: '2', title: 'Title 2' },
          { isbn: '3', title: 'Title 3' }
        ]
      }
    }
  },
  {
    request: {
      query: gql`
      query GetAuthors {
        authors {
          id
          name
        }
      }
    `
    },
    result: {
      data: {
        authors: [
          { id: '1', name: 'Author 1' },
          { id: '2', name: 'Author 2' }
        ]
      }
    }
  },
  {
    request: {
      query: gql`
      query Book($isbn: String) {
        book(isbn: $isbn) {
          title
          author {
            name
            books{
              isbn
              title
            }
          }
        }
      }
    `
    },
    result: {
      data: {
        book: {
          title: 'Title 1',
          author: {
            name: 'Author 1',
            books: [
              { isbn: 1, title: 'Title 1' },
              { isbn: 2, title: 'Title 2' }
            ]
          }
        }
      }
    }
  }
]

export default mocks