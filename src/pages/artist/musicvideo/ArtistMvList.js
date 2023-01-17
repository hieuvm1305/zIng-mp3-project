import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getArtist } from "../../../service";
import ArtistName from "../../../components/ArtistName";

function ArtistMvList() {
  const { alias } = useParams();
  const navigate = useNavigate();
  const navRef = useRef();
  const [artistInfo, setArtistInfo] = useState();
  const [videoList, setVideoList] = useState();
  useEffect(() => {
    const getArtistInfo = async () => {
      try {
        const response = await getArtist(alias);
        if (response.data.err === 0) {
          setArtistInfo(response.data.data);
          setVideoList(response.data.data?.sections[3].items);
        } else {
          navigate("/");
        }
      } catch (error) {
        return;
      }
    };
    getArtistInfo();
    return () => {};
  }, [alias, navigate]);

  // change style navBar

  const listenScrollEvent = () => {
    if (window.scrollY > 35) {
      navRef.current.classList.add(
        "shadow-sm",
        "border-b",
        "border-b-zinc-400",
        "bg-main-300"
      );
    } else {
      navRef.current.classList.remove(
        "shadow-sm",
        "border-b",
        "border-b-zinc-400",
        "bg-main-300"
      );
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);
    return () => {
      window.removeEventListener("scroll", listenScrollEvent);
    };
  }, []);

  return (
    <div className="w-full">
      <div
        className="fixed left-[240px] top-[70px] right-0 z-20 h-[60]"
        ref={navRef}
      >
        <div className="w-full px-15 py-4">
          <span className="text-xl font-bold">
            {artistInfo?.name} - Tất cả Video
          </span>
        </div>
      </div>
      <div className="mt-[130px] px-15 mb-5">
        <div className="grid grid-cols-3 gap-5 place-content-between">
        {videoList?.map((item, index) => (
          <div className="flex flex-col gap-1" key={index}>
            <div
              className="cursor-pointer"
            >
              <img
                src={item.thumbnail}
                alt="thumbnail"
                className="w-full h-full rounded-md"
              />
            </div>
            <span className="hover:text-main-600 cursor-pointer font-bold text-sm">
              {item.title?.length > 20
                ? `${item.title?.slice(0, 20)}...`
                : item.title}
            </span>
            <ArtistName artists={item.artists}/>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
}

export default ArtistMvList;
