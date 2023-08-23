import { render } from '@testing-library/react'

import ConfirmationModal from './ConfirmationModal'

test('should render ConfirmationModal component', () => {
  const view = render(<ConfirmationModal show={true} title="Title" body="Body" />)

  expect(view).toMatchSnapshot()
})