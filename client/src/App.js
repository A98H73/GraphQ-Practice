import BookList from "./components/BookList";
import { useQuery, gql } from "@apollo/client";

const books = gql`
  {
    books {
      id
      name
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(books);
  const DisplayData = () => {
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    console.log(data);
    return data.books.map((book) => <li key={book.id}>{book.name}</li>);
  };
  return (
    <div className="App">
      <h2>Hello Client</h2>
      <ul>
        <DisplayData />
      </ul>
      <BookList />
    </div>
  );
}

export default App;
