import React, { Fragment, useState, useEffect } from "react";
import EditTree from "./EditTree";

const ListTrees = ({ allShopTrees, setTreeChange }) => {
  console.log(allShopTrees);
  const [trees, setTrees] = useState([]); //empty array

  //delete todo function

  async function buyTree(id) {
    try {
      await fetch(`http://localhost:5000/shop/trees/${id}`, {
        method: "DELETE",
        headers: { jwt_token: localStorage.token }
      });

      setTrees(trees.filter(tree => tree.tree_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  }

  

  // async function getTodos() {
  //   const res = await fetch("http://localhost:5000/todos");

  //   const todoArray = await res.json();

  //   setTodos(todoArray);
  // }

  useEffect(() => {
    setTrees(allShopTrees);
  }, [allShopTrees]);


  return (
    <Fragment>
      {" "}
      <div class="container d-flex justify-content-center mt-50 mb-50">
        <div class="row">
           <div class="col-md-4 mt-2">
              <div class="card">
                {trees.length !== 0 &&
                  trees[0].tree_id !== null &&
                  trees.map(tree => (
                    <tr key={tree.tree_id}>
                      <td>{tree.description}</td>
                      <td>
                        <EditTree tree={tree} setTreeChange={setTreeChange} />
                      </td>
                      <td>
                        <button>
                        </button>
                      </td>
                    </tr>
                  ))}
              </div>                     
            </div> 
          </div>
        </div>
    </Fragment>
  );
};

export default ListTrees;
