import React, { Fragment, useState } from "react";
import { toast } from "react-toastify";
const EditTree = ({ tree, setTreeChange }) => {
  
  const buyTree = async (id, cost) => {
    try {

    const body = {id, cost};
    console.log(body);
    const myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("jwt_token", localStorage.token);

    const response = await fetch(`http://localhost:5001/shop/trees/`, {
        method: "POST",
        headers: myHeaders,
        contentType: "application/json; charset=utf-8",
        body: JSON.stringify(body) 
    });
    let parseData = await response.json();
    console.log("yo");
    console.log(parseData);
    if (parseData == "no money") {
      toast.error("you don't have enough coins", {position: toast.POSITION.BOTTOM_LEFT});
    } else {
      toast.success("tree successfully bought", {position: toast.POSITION.BOTTOM_LEFT});
    }
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
        className="btn btn-success btn-lg"
        data-toggle="modal"
        data-target={`#id${tree.tree_id}`}
        onClick={() => buyTree(tree.tree_id, tree.cost)}
      >
        Buy
      </button>
    </Fragment>
  );
};

export default EditTree;
