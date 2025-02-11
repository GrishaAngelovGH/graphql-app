import { render } from '@testing-library/react'

import Header from './Header'

test('should render Header component', () => {
  const view = render(<Header />)

  expect(view).toMatchSnapshot()
})