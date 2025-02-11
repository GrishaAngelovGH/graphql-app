import { MockedProvider } from '@apollo/client/testing'
import { act, render } from '@testing-library/react'
import mocks from 'mocks/apollo-mocks'

import App from './App'

test('should render App component', async () => {
  const view = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <App />
    </MockedProvider>
  )

  await act(() => new Promise(resolve => setTimeout(resolve, 0)))

  expect(view).toMatchSnapshot()
})