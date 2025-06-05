import { MockedProvider } from '@apollo/client/testing/react'
import { act, render } from '@testing-library/react'
import mocks from 'mocks/apollo-mocks'

import BookModal from './BookModal'

test('should render BookModal component', async () => {
  const view = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <BookModal showModal={true} />
    </MockedProvider>
  )

  await act(() => new Promise(resolve => setTimeout(resolve, 0)))

  expect(view).toMatchSnapshot()
})