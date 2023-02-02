import React, { useState } from "react";
import { toast } from "react-toastify";
import { network } from "../network/todoInstance";

function List({ id, text, date, handleDelete, completed, refetch, url }) {
  const [check, setCheck] = useState(true);
  const [edit, setEdit] = useState(false);
  const [newText, setNewText] = useState({ text: text });

  const handleComplete = (id) => {
    network.update(url, id, { isCompleted: check }).then(() => {
      refetch(),
        setCheck(!check),
        toast.success(check ? "Todo completed" : "Todo returned");
    });
  };

  const handleSave = (id) => {
    let { text } = newText;
    if (text.trim().length === 0) {
      toast.warn("Updated Todo cannot be empty string");
      return;
    }
    network.update(url, id, newText).then(() => {
      refetch(), setEdit(!edit), toast.success("Todo updated");
    });
  };

  const handleInput = (e) => {
    const { value } = e.target;
    setNewText({ ...newText, text: value });
  };

  return (
    <div className="col-12 mt-2">
      <div className="alert alert-primary p-3">
        <div className="row">
          <div className="col-8 mt-2">
            {edit ? (
              <input
                type="text"
                className="form-control"
                defaultValue={text}
                onChange={(e) => handleInput(e)}
              ></input>
            ) : (
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p
                  style={{
                    textDecoration: completed ? "line-through" : "none",
                  }}
                >
                  {text}
                </p>
                <p>{date.substring(0, 10)}</p>
              </div>
            )}
          </div>
          <div className="col-4">
            <div className="btn-group gap-2 w-100">
              <button
                className="btn btn-warning"
                onClick={() => handleComplete(id)}
              >
                Complete
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleDelete(id)}
              >
                X
              </button>
              {edit ? (
                <button
                  className="btn btn-primary"
                  onClick={() => handleSave(id)}
                >
                  Save
                </button>
              ) : (
                <button
                  className="btn btn-success"
                  onClick={() => setEdit(!edit)}
                >
                  Edit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default List;
