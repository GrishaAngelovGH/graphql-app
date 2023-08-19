import { useQuery } from "@apollo/client"

import ListGroup from "react-bootstrap/ListGroup"

import { GET_BOOK_BY_ISBN } from "queries/apollo-queries"

const BookDetails = ({ isbn }) => {
  const { loading, data } = useQuery(GET_BOOK_BY_ISBN, {
    variables: { isbn }
  })

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
        </ListGroup>

        <ListGroup className="mt-3">
          <ListGroup.Item className="text-center">
            <span className="fw-bold">Author's Books</span>
          </ListGroup.Item>
          <div className="overflow-auto" style={{ height: 'calc(100vh - 300px)' }}>
            {
              data?.book.author.books.map(v => (
                <ListGroup.Item key={v.isbn}>{v.title}</ListGroup.Item>
              ))
            }
          </div>
        </ListGroup>
      </div>
    </div>
  )
}

export default BookDetails