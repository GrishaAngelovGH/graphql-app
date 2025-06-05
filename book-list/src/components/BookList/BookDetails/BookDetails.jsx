import { useState } from "react"
import { useMutation, useQuery } from "@apollo/client/react"

import Button from "react-bootstrap/Button"
import ListGroup from "react-bootstrap/ListGroup"

import ConfirmationModal from "components/ConfirmationModal"

import { DELETE_BOOK } from "mutations/apollo-mutations"
import { GET_BOOKS, GET_BOOK_BY_ISBN } from "queries/apollo-queries"

const BookDetails = ({ isbn, onAfterDeleteBook }) => {
  const [showConfirm, setShowConfirm] = useState(false)

  const { loading, data } = useQuery(GET_BOOK_BY_ISBN, {
    variables: { isbn }
  })

  const [deleteBook] = useMutation(DELETE_BOOK)

  const handleShowConfirm = () => {
    setShowConfirm(!showConfirm)
  }

  const handleConfirmAction = () => {
    setShowConfirm(!showConfirm)

    deleteBook({
      variables: {
        isbn,
        authorId: data.book.author.id
      },
      refetchQueries: [
        { query: GET_BOOKS }
      ]
    })

    onAfterDeleteBook()
  }

  return (
    <div className="row g-0 justify-content-center">
      <div className="col-md-11">
        <h3 className="text-center text-secondary fw-bold">Book Details</h3>

        {loading && <p className="text-center">Loading...</p>}

        <ListGroup>
          <ListGroup.Item>
            <span className="fw-bold mx-2">Title:</span>
            <span>{data?.book.title}</span>
          </ListGroup.Item>
          <ListGroup.Item>
            <span className="fw-bold mx-2">Author:</span>
            <span>{data?.book.author.name}</span>
          </ListGroup.Item>
          <ListGroup.Item className="text-center">
            <Button
              variant="danger"
              className="w-50"
              onClick={handleShowConfirm}
            >
              Delete Book
            </Button>
          </ListGroup.Item>
        </ListGroup>

        <ListGroup className="mt-3">
          <ListGroup.Item className="text-center">
            <span className="fw-bold">Author&apos;s Books</span>
          </ListGroup.Item>
          <div className="overflow-auto" style={{ height: 'calc(100vh - 350px)' }}>
            {
              data?.book.author.books.map(v => (
                <ListGroup.Item key={v.isbn}>{v.title}</ListGroup.Item>
              ))
            }
          </div>
        </ListGroup>

        <ConfirmationModal
          show={showConfirm}
          title="Confirm Delete"
          body="Are you sure that you want to delete this book?"
          onClose={handleShowConfirm}
          onConfirm={handleConfirmAction}
        />
      </div>
    </div>
  )
}

export default BookDetails