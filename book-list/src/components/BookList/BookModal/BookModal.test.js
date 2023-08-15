import { render } from '@testing-library/react'

import BookModal from './BookModal'

test('should render BookModal component', () => {
  const view = render(<BookModal showModal={true} />)

  expect(view).toMatchSnapshot()
})