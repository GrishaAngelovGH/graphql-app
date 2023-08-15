import { render } from '@testing-library/react'

import BookModal from './BookModal'

test('should render BookModal component', () => {
  const view = render(<BookModal />)

  expect(view).toMatchSnapshot()
})