import ListGroup from "react-bootstrap/ListGroup"

const BookDetails = () => {
  return (
    <div className="row g-0 justify-content-center">
      <div className="col-md-11">
        <h3 className="text-center text-secondary fw-bold">Book Details</h3>

        <ListGroup>
          <ListGroup.Item>
            <span className="fw-bold mx-2">Title:</span>
            <span></span>
          </ListGroup.Item>
          <ListGroup.Item>
            <span className="fw-bold mx-2">Author:</span>
            <span></span>
          </ListGroup.Item>
        </ListGroup>

        <ListGroup className="mt-3">
          <ListGroup.Item className="text-center">
            <span className="fw-bold">Author's Books</span>
          </ListGroup.Item>
          <div className="overflow-auto" style={{ height: 'calc(100vh - 300px)' }}>
            <ListGroup.Item></ListGroup.Item>
          </div>
        </ListGroup>
      </div>
    </div>
  )
}

export default BookDetails