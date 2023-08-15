import { useState } from "react"
import { gql, useQuery } from "@apollo/client"

import Badge from "react-bootstrap/Badge"
import Button from "react-bootstrap/Button"

import BookModal from "./BookModal"

const GET_BOOKS = gql`
  query GetBooks {
    books {
      isbn
      title
    }
  }
`

const BookList = () => {
  const [showBookModal, setShowBookModal] = useState(false)

  const { loading, data } = useQuery(GET_BOOKS)

  const handleShowBookModal = () => {
    setShowBookModal(!showBookModal)
  }

  return (
    <div className="row g-0">
      <div className="col-md-7 overflow-auto" style={{ height: 450 }}>
        <h3 className="text-center text-secondary fw-bold">Books</h3>

        {loading && <p className="text-center">Loading...</p>}

        {
          data?.books.map(v => (
            <Badge bg="primary" className="mx-2 mt-2 fs-6" key={v.isbn}>
              {v.title}
            </Badge>
          ))
        }

        {showBookModal && <BookModal showModal={showBookModal} onClose={handleShowBookModal} />}

        <Button
          variant="outline-success"
          className="fixed-bottom w-25"
          style={{ left: 20, bottom: 20 }}
          onClick={handleShowBookModal}
        >
          Add New Book
        </Button>
      </div>
    </div>
  )
}

export default BookList