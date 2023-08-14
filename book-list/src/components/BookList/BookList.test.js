import { render } from '@testing-library/react'

import BookList from './BookList'

test('should render BookList component', () => {
  const view = render(<BookList />)

  expect(view).toMatchSnapshot()
})