import Modal from 'react-bootstrap/Modal'

const BookModal = ({ showModal, onClose }) => {
  return (
    <Modal show={showModal} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Title</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        Body
      </Modal.Body>

      <Modal.Footer>
        Footer
      </Modal.Footer>
    </Modal>
  )
}

export default BookModal