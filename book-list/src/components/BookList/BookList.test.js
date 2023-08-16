import { gql } from '@apollo/client'
import { MockedProvider } from '@apollo/client/testing'
import { act, render } from '@testing-library/react'

import BookList from './BookList'

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
  }
]

test('should render BookList component', async () => {
  const view = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <BookList />
    </MockedProvider>
  )

  await act(() => new Promise(resolve => setTimeout(resolve, 0)))

  expect(view).toMatchSnapshot()
})