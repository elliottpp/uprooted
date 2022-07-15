import React, { Fragment, useState } from "react";

const EditTree = ({ tree, setTreeChange }) => {

  const editLevel = async id => {
    try {

    const body = {};
    body.level = 1;
    const myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("jwt_token", localStorage.token);

    await fetch(`http://localhost:5000/shop/trees/`, {
        method: "POST",
        headers: myHeaders,
        contentType: "application/json; charset=utf-8",
        body: JSON.stringify(body) })

      setTreeChange(true);

      // window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };


  const [description, setDescription] = useState(tree.description);
  return (
    <Fragment>
      <button
        type="button"
        className="btn btn-warning"
        data-toggle="modal"
        data-target={`#id${tree.tree_id}`}
      >
        Edit
      </button>
      {/* id = "id21"*/}
      <div
        className="modal"
        id={`id${tree.tree_id}`}
        onClick={() => setDescription(tree.description)}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit Todo</h4>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                onClick={() => setDescription(tree.description)}
              >
                &times;
              </button>
            </div>

            <div className="modal-body">
              <input
                type="text"
                className="form-control"
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-warning"
                data-dismiss="modal"
                onClick={() => editLevel(tree.todo_id)}
              >
                Upgrade
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                onClick={() => setDescription(tree.description)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditTree;