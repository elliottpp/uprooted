import React, { Fragment, useState } from "react";

const InputTodo = ({ set
 }) => {
  const [description, setDescription] = useState("");

  return (
    <Fragment>
      <h1 className="text-center my-5">Watch AD</h1>
      <form className="d-flex" >
        <input
          type="text"
          placeholder="add todo"
          className="form-control"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <button className="btn btn-success ">Add</button>
      </form>
    </Fragment>
  );
};

export default InputTodo;
