import { MockedProvider } from '@apollo/client/testing'
import { act, render } from '@testing-library/react'
import mocks from 'mocks/apollo-mocks'

import BookList from './BookList'

test('should render BookList component', async () => {
  const view = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <BookList />
    </MockedProvider>
  )

  await act(() => new Promise(resolve => setTimeout(resolve, 0)))

  expect(view).toMatchSnapshot()
})