import { useState } from "react"
import { useQuery } from "@apollo/client"

import Button from "react-bootstrap/Button"

import Toast from 'react-bootstrap/Toast'
import ToastContainer from 'react-bootstrap/ToastContainer'

import BookDetails from "./BookDetails"
import BookModal from "./BookModal"

import { GET_BOOKS } from "queries/apollo-queries"

const BookList = () => {
  const [showBookModal, setShowBookModal] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [selectedBookISBN, setSelectedBookISBN] = useState('')

  const { loading, data } = useQuery(GET_BOOKS)

  const handleShowBookModal = () => {
    setShowBookModal(!showBookModal)
  }

  const handleShowToast = message => {
    setToastMessage(message)
    setShowToast(!showToast)
  }

  const handleAfterDeleteBook = () => {
    setSelectedBookISBN("")
    setShowToast(!showToast)
    setToastMessage("The book was successfully deleted")
  }

  return (
    <div className="row g-0">
      <div className="col-md-7 overflow-auto" style={{ height: 'calc(100vh - 200px)' }}>
        <h3 className="text-center text-secondary fw-bold">Books</h3>

        {loading && <p className="text-center">Loading...</p>}

        {
          data?.books.map(v => (
            <Button
              key={v.isbn}
              variant="primary"
              className="mx-2 mt-2 fs-6"
              onClick={() => { setSelectedBookISBN(v.isbn) }}
            >
              {v.title}
            </Button>
          ))
        }

        <BookModal
          showModal={showBookModal}
          onClose={handleShowBookModal}
          onShowToast={handleShowToast}
        />

        <ToastContainer position="top-end" className="p-3">
          <Toast bg="light" onClose={() => setShowToast(false)} show={showToast} delay={5000} autohide>
            <Toast.Header>
              <strong className="me-auto">Book List</strong>
              <small>few seconds ago</small>
            </Toast.Header>
            <Toast.Body>{toastMessage}</Toast.Body>
          </Toast>
        </ToastContainer>

        <Button
          variant="outline-success"
          className="fixed-bottom w-25"
          style={{ left: 20, bottom: 20 }}
          onClick={handleShowBookModal}
        >
          Add New Book
        </Button>
      </div>
      <div className="col-md-5">
        {
          selectedBookISBN.length > 0 && (
            <BookDetails isbn={selectedBookISBN} onAfterDeleteBook={handleAfterDeleteBook} />
          )
        }
      </div>
    </div>
  )
}

export default BookList