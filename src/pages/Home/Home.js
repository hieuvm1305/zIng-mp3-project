import React from "react";
import SlickSlide from "./SlickSlide";

const Home = () => {
  return (
    <div className="mt-[70px]">
      <div className="w-fit mx-auto">
        <SlickSlide />
      </div>
      <div className="grid grid-rows-4 grid-flow-col gap-3">
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
      </div>
    </div>
  );
};

export default Home;
