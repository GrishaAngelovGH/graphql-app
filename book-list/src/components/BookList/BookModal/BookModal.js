import { useState } from "react"
import { gql, useQuery, useMutation } from "@apollo/client"

import Modal from "react-bootstrap/Modal"
import FormControl from "react-bootstrap/FormControl"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

const GET_AUTHORS = gql`
  query GetAuthors {
    authors {
      id
      name
    }
  }
`

const ADD_BOOK = gql`
  mutation AddBook($isbn: String!, $title: String!, $authorId: String!){
    addBook(isbn: $isbn, title: $title, authorId: $authorId) {
      isbn
    }
  }
  `

const BookModal = ({ showModal, onClose }) => {
  const [isbn, setIsbn] = useState("")
  const [title, setTitle] = useState("")
  const [authorId, setAuthorId] = useState("")

  const { data } = useQuery(GET_AUTHORS)

  const [addBook] = useMutation(ADD_BOOK, {
    onCompleted: () => {
      onClose()
    },
    onError: () => {
      onClose()
    }
  })

  const handleIsbnChange = ({ target: { value } }) => {
    setIsbn(value)
  }

  const handleTitleChange = ({ target: { value } }) => {
    setTitle(value)
  }

  const handleAuthorChange = ({ target: { value } }) => {
    setAuthorId(value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    addBook({
      variables: {
        isbn,
        title,
        authorId
      }
    })
  }

  return (
    <Modal show={showModal} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Book</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <FormControl
            value={isbn}
            placeholder="ISBN"
            className="mt-2"
            onChange={handleIsbnChange}
            required
          />

          <FormControl
            value={title}
            placeholder="Title"
            className="mt-2"
            onChange={handleTitleChange}
            required
          />

          <Form.Select
            value={authorId}
            className="mt-2"
            onChange={handleAuthorChange}
            required
          >
            <option value="">Select Author</option>
            {
              data?.authors.map(v => (
                <option key={v.id} value={v.id}>{v.name}</option>
              ))
            }
          </Form.Select>

          <Button
            variant="success"
            className="mt-2 w-25"
            type="submit"
            onClick={handleSubmit}
          >
            Add
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default BookModal