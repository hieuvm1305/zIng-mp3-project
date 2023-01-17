import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getArtist } from "../../../service";
import { useDispatch, useSelector } from "react-redux";
import {setPlayList, getPlayList} from "../../../redux/playListSlice"
import icons from "../../../assets/icons";
import List from "../../../components/List";
import { setPlaying } from "../../../redux/playSlice";
import { setCurSongId } from "../../../redux/musicSlice";

const { BsFillPlayFill } = icons;

function ArtistSongList() {
  const { alias } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const playList = useSelector(getPlayList);
  const [artistInfo, setArtistInfo] = useState();
  const navRef = useRef();
  useEffect(() => {
    const getArtistInfo = async () => {
      try {
        const response = await getArtist(alias);
        if (response.data.err === 0) {
          setArtistInfo(response.data.data);
          dispatch(setPlayList(response.data.data?.sections[0].items));
        } else {
          navigate("/");
        }
      } catch (error) {
        return;
      }
    };
    getArtistInfo();
    return () => {};
  }, [alias, dispatch, navigate]);
  
  // play 
  const handlePlay = () => {
    dispatch(setCurSongId(playList[0]?.encodeId));
    dispatch(setPlaying(true));
  }

  // change style navBar
  
  const listenScrollEvent = () => {
    if (window.scrollY > 35) {
      navRef.current.classList.add("shadow-sm", "border-b", "border-b-zinc-400", "bg-main-300");
    } else{
      navRef.current.classList.remove("shadow-sm", "border-b", "border-b-zinc-400", "bg-main-300");
    }
  }
  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);
    return () => {
      window.removeEventListener("scroll", listenScrollEvent);
    };
  }, []);

  return (
    <div className="w-full">
      <div className="fixed shadow left-[240px] top-[70px] right-0 z-20" ref={navRef}>
        <div className=" w-full px-15 py-4 flex justify-between items-center h-[66px]">
          <div className="flex flex-row gap-3 items-center">
            <span className="text-xl font-bold">
              {artistInfo?.name} - Tất cả bài hát
            </span>
            <div className="flex items-center cursor-pointer justify-center rounded-[50%] border border-black h-10 w-10 hover:text-main-500 hover:border-main-500"
            onClick={() => handlePlay()}>
                <BsFillPlayFill size={24} />
            </div>
          </div>
          <div>Hello</div>
        </div>
      </div>
      <div className="mt-[136px] px-15 mb-5">
        {playList?.map((item, index) => (
          <div key={index}>
              <List songData={item}/>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ArtistSongList;
