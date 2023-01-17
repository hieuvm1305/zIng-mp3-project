import React from "react";
import ListCard from "../../../components/ListCard";

function Single({ data}) {
  const singleList = data[1]?.items.slice(0, 5);
  const singleLink = data[1]?.link;
  return (
    <div>
     <ListCard title={"Single & EP"} listCard={singleList} link={singleLink}/>
    </div>
  );
}

export default Single;
