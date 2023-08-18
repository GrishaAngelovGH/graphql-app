import { render } from '@testing-library/react'

import BookDetails from './BookDetails'

test('should render BookDetails component', () => {
  const view = render(<BookDetails />)

  expect(view).toMatchSnapshot()
})