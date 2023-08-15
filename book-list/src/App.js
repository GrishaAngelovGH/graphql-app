import Header from "components/Header"
import BookList from "components/BookList"

function App() {
  return (
    <div className="row g-0 vh-100 bg-body-secondary">
      <div className="col-md-12">
        <Header />
        <BookList />
      </div>
    </div>
  );
}

export default App;
