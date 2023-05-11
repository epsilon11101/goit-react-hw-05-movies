import { useState } from "react";
import { Form } from "react-router-dom";

const SearchForm = ({ onSubmit }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const submitHandler = () => {
    onSubmit(query);
  };

  return (
    <Form
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "1rem",
      }}
      onSubmit={submitHandler}
    >
      <input
        id="search"
        type="text"
        name="search"
        placeholder="Search movie"
        required
        value={query}
        onChange={handleChange}
      ></input>
      <button>Search</button>
    </Form>
  );
};

export default SearchForm;
