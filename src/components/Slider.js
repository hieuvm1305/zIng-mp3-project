import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getArrSlider } from "../hook/fn";
import { useNavigate } from "react-router-dom";
import { setCurSongId } from "../redux/musicSlice";
import { setPlaying } from "../redux/playSlice";
import { selectBanner } from "../redux/homeSlice";

function Slider() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const banner = useSelector(selectBanner);
  const handleClickBanner = (item) => {
    if (item?.type === 1) {
      dispatch(setCurSongId(item.encodeId));
      dispatch(setPlaying(true));
    } else if (item?.type === 4) {
      const albumPath = item?.link?.split(".")[0];
      navigate(albumPath);
    }
  };
  useEffect(() => {
    const sliderEls = document.getElementsByClassName("slider-item");
    let min = 0;
    let max = 2;
    const intervalId = setInterval(() => {
      const list = getArrSlider(min, max, sliderEls.length - 1);
      for (let i = 0; i < sliderEls.length; i++) {
        sliderEls[i]?.classList?.remove(
          "animate-slide-right",
          "order-last",
          "z-20"
        );
        sliderEls[i]?.classList?.remove(
          "animate-slide-left",
          "order-first",
          "z-10"
        );
        sliderEls[i]?.classList?.remove(
          "animate-slide-left2",
          "order-2",
          "z-10"
        );
        if (list.some((item) => item === i)) {
          sliderEls[i].style.cssText = "display: block";
        } else {
          sliderEls[i].style.cssText = "display: none";
        }
      }
    }, 3000);
    return () => {
      intervalId && clearInterval(intervalId);
    };
  });
  return (
    <div className="w-full overflow-hidden px-[59px]">
      <div className="flex w-full gap-8 pt-8">
        {banner?.map((item, index) => (
          <img
            key={item.encodeId}
            src={item.banner}
            onClick={() => handleClickBanner(item)}
            className={`slider-item flex-1 object-contain w-[30%] rounded-lg ${
              index <= 2 ? "block" : "hidden"
            } cursor-pointer`} 
            alt=""
          />
        ))}
      </div>
    </div>
  );
}

export default Slider;
