import React, { Fragment, useState, useEffect } from "react";

const ListInventory = ({ allTrees, setTreeChange }) => {
  console.log(allTrees);
  const [trees, setTrees] = useState([]); //empty array

  useEffect(() => {
    setTrees(allTrees);
  }, [allTrees]);


  return (
    <Fragment>
      {" "}
      <div class="container">
        <div class="row">
                {trees.length !== 0 &&
                  trees[0].user_tree_id !== null &&
                  trees.map(tree => (
                    <div className="col-md-3 col-sm-6 item">
                    <div className="card card-block item-card mt-3">
                      <h4 className="card-title">{tree.name}</h4>
                      <img className="card-img-top"  src={`${process.env.PUBLIC_URL}/assets/images/${(tree.name).replaceAll(' ','_')}.png`} ></img>
                      <h6 class="card-subtitle text-muted">lvl{tree.level}</h6>
                    </div>
                    </div>
                  ))}
          </div>
        </div>
    </Fragment>
  );
};

export default ListInventory;
