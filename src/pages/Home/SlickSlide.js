import React from "react";
import { Pagination, Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCurSongId } from "../../redux/musicSlice";
import { setPlaying } from "../../redux/playSlice";
import { selectBanner } from "../../redux/homeSlice";

function SlickSlide() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const banner = useSelector(selectBanner);

  const handleClickBanner = (item) => {
    if (item?.type === 1) {
      dispatch(setCurSongId(item.encodeId));
      dispatch(setPlaying(true));
    } else if (item?.type === 4) {
      navigate(`/album/${item.aliasTitle}/${item.encodeId}`);
    }
  };

  return (
    <div>
      <Swiper
        pagination
        navigation
        modules={[Pagination, Navigation, Autoplay]}
        className="rounded-xl lg:max-w-[1200px] max-w-[600px]"
        slidesPerView={3}
        spaceBetween={30}
        autoplay={{
            delay: 2000,
            disableOnInteraction: false,
        }}
        loop
      >
        {banner?.map((item) => {
          return (
            <SwiperSlide className="w-full h-full" key={item.encodeId}>
              <img
                src={item.banner}
                onClick={() => handleClickBanner(item)}
                className="cursor-pointer"
                alt=""
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default SlickSlide;
