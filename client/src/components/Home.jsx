import React, { useState } from "react";
import { useQuery } from "react-query";
import { BASE_URL, network } from "../network/todoInstance";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import List from "./List";
function Home() {
  const { data, isLoading, refetch } = useQuery("todo", async () => {
    return network.getAll(BASE_URL).then((res) => {
      return res;
    });
  });
  const [inputText, setText] = useState({ text: "" });

  const handleInput = (e) => {
    const { value } = e.target;
    setText({ text: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let { text } = inputText;
    if (text.trim().length === 0) {
      toast.warn("Please fill input");
      return;
    }
    network.addItem(BASE_URL, inputText).then(() => {
      refetch(), setText({ text: "" }, toast.success("Todo added"));
    });
  };

  const handleDelete = (id) => {
    network.delete(BASE_URL, id).then(() => {
      refetch(), toast.error("ToDo deleted");
    });
  };

  return (
    <div className="container mt-5">
      <ToastContainer />
      <h1 className="text-center">ToDo List</h1>
      <div className="col-12 mt-3">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="row">
            <div className="col-9">
              <input
                type="text"
                className="form-control"
                value={inputText.text}
                onChange={(e) => handleInput(e)}
                required
              />
            </div>
            <div className="col-3">
              <button className="btn btn-success w-100">ADD</button>
            </div>
          </div>
        </form>
        <div className="col-12">
          <div className="row">
            {isLoading ? (
              <h1>Loading</h1>
            ) : (
              data &&
              data.map((index) => (
                <List
                  key={index._id}
                  text={index.text}
                  date={index.date}
                  id={index._id}
                  completed={index.isCompleted}
                  refetch={refetch}
                  url={BASE_URL}
                  handleDelete={handleDelete}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
