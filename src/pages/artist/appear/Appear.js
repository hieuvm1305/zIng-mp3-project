import React from "react";
import CardItem from "../../../components/CardItem";

// Xuất hiện trong
function Appear({ data }) {
  const appearList = data[5]?.items?.slice(0, 5);
  return (
    <div>
      <CardItem title="Xuất Hiện Trong" list={appearList} />
    </div>
  );
}

export default Appear;