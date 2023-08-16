import { gql } from '@apollo/client'
import { MockedProvider } from '@apollo/client/testing'
import { act, render } from '@testing-library/react'

import BookModal from './BookModal'

const mocks = [
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

test('should render BookModal component', async () => {
  const view = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <BookModal showModal={true} />
    </MockedProvider>
  )

  await act(() => new Promise(resolve => setTimeout(resolve, 0)))

  expect(view).toMatchSnapshot()
})