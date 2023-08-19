import { MockedProvider } from '@apollo/client/testing'
import { act, render } from '@testing-library/react'
import mocks from 'mocks/apollo-mocks'

import BookDetails from './BookDetails'

test('should render BookDetails component', async () => {
  const view = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <BookDetails />
    </MockedProvider>
  )

  await act(() => new Promise(resolve => setTimeout(resolve, 0)))

  expect(view).toMatchSnapshot()
})