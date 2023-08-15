import { gql, useQuery } from "@apollo/client"
import Badge from "react-bootstrap/Badge"

const GET_BOOKS = gql`
  query GetBooks {
    books {
      isbn
      title
    }
  }
`

const BookList = () => {
  const { loading, data } = useQuery(GET_BOOKS)

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
      </div>
    </div>
  )
}

export default BookList