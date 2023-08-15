import Modal from "react-bootstrap/Modal"
import FormControl from "react-bootstrap/FormControl"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

const BookModal = ({ showModal, onClose }) => {
  return (
    <Modal show={showModal} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Book</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <FormControl placeholder="ISBN" className="mt-2" required />

          <FormControl placeholder="Title" className="mt-2" required />

          <Form.Select className="mt-2" required>
            <option value="">Select Author</option>
          </Form.Select>

          <Button variant="success" className="mt-2 w-25" type="submit">Add</Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default BookModal