import React from "react";

import CardItem from "../../../components/CardItem";
function Collection({ data }) {
  const collection = data[4]?.items;
  return (
   <CardItem title="Tuyển Tập" list={collection} />
  );
}

export default Collection;
