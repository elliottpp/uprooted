import React, { Fragment, useState, useEffect } from "react";
import EditTree from "./EditTree";

const ListTrees = ({ allShopTrees, setTreeChange }) => {
  const [trees, setTrees] = useState([]); //empty array
  const[currentTree, setTree] = useState({
    "tree_id": 2,
    "name": "oak1",
    "type": "oak",
    "cost": 20
  });

  var style = {
    backgroundColor: "#F8F8F8",
    borderTop: "1px solid #E7E7E7",
    textAlign: "left",
    padding: "20px",
    position: "fixed",
    left: "0",
    bottom: "0",
    height: "130px",
    width: "100%",
  }

  var phantom = {
    display: 'block',
    padding: '20px',
    height: '130px',
    width: '100%',
  }


  useEffect(() => {
    setTrees(allShopTrees);
  }, [allShopTrees]);


  return (
    <Fragment>
      {" "}
      <div className="container">
        <div className="row">
          {trees.length !== 0 &&
            trees[0].tree_id !== null &&
            trees.map(tree => (
              <div className="col-md-3 col-sm-6 item">
                <div className="card card-block item-card" onClick={() => setTree(tree)} style={{ cursor: "pointer" }} >
                  <h4 className="card-title">{tree.name}</h4>
                  <img className="card-img-top" src={`${process.env.PUBLIC_URL}/assets/images/${(tree.name).replaceAll(' ','_')}.png`} ></img>
                </div>
              </div>
            ))}
                                
          </div>
        </div>
        <div style={phantom} />
        <div style={style}>
          <div class="card-img-top d-flex align-items-center bg-light">
          <img className="position-absolute" width="100" height="100" src={`${process.env.PUBLIC_URL}/assets/images/backdrop.png`} ></img>
          <img width="95" height="25" style={{zIndex:1}} src={`${process.env.PUBLIC_URL}/assets/images/${(currentTree.name).replaceAll(' ','_')}.png`} ></img>
            <div>
              <img className="" width="50" height="50" src={`${process.env.PUBLIC_URL}/assets/images/coin.png`} ></img>
            </div>
            <h1 class="col p-2 m-0">{currentTree.cost}</h1>
            <EditTree tree={currentTree} setTreeChange={setTreeChange} />
          </div>
        </div>
    </Fragment>
  );
};

export default ListTrees;
