/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDetailSong, apiGetSong } from "../service";
import { getCurSongId } from "../redux/musicSlice";
import { setPlaying, getIsPlay } from "../redux/playSlice";
// import { toast } from "react-toastify";
import icons from "../assets/icons";

const {
  AiOutlineHeart,
  AiFillHeart,
  BsThreeDots,
  MdSkipNext,
  MdSkipPrevious,
  CiRepeat,
  BsPauseFill,
  BsFillPlayFill,
  CiShuffle,
} = icons;
let intervalId;
function Player() {
  const curSongId = useSelector(getCurSongId);
  const isPlaying = useSelector(getIsPlay);
  const [audio, setAudio] = useState(new Audio());
  const [songInfo, setSongInfo] = useState(null);
  const thumbRef = useRef();
  const trackRef = useRef();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPlaying(false));
    const fetchDetailSong = async () => {
      if (curSongId) {
        const [res1, res2] = await Promise.all([
          getDetailSong(curSongId),
          apiGetSong(curSongId),
        ]);
        if (res1.data.err === 0) {
          setSongInfo(res1.data.data);
        }
        if (res2.data.err === 0) {
          setAudio(new Audio(res2.data.data["128"]));
        } else {
          dispatch(setPlaying(false));
          setAudio(new Audio());
          // toast.info(res2.data.msg);
        }
      }
    };
    fetchDetailSong();
  }, [curSongId, dispatch]);

  const funcPlay = useCallback(async () => {
    await audio.play();
  }, [audio]);

  useEffect(() => {
    audio.load();
    if (isPlaying) {
      funcPlay();
    }
  }, [audio, funcPlay, isPlaying]);

  useEffect(() => {
    if (isPlaying) {
      // const thumbEl = document.getElementById("thumb-progress");
      intervalId = setInterval(() => {
        let percent =
          Math.round((audio.currentTime * 10000) / songInfo?.duration) / 100;
        thumbRef.current.style.cssText = `right: ${100 - percent}%`;
      }, 200);
    } else {
      intervalId && clearInterval(intervalId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying]);

  const handleTogglePlayMusic = () => {
    if (isPlaying) {
      audio.pause();
      dispatch(setPlaying(false));
    } else {
      funcPlay();
      dispatch(setPlaying(true));
    }
  };
  return (
    <div className="bg-main-400 px-5 h-full flex">
      <div className="w-[30%] flex-auto flex gap-3 items-center">
        <img src={songInfo?.thumbnail} alt="" />
        <div className="flex flex-col">
          <span className="text-xs text-gray-500">
            {songInfo?.artistsNames}
          </span>
          <span className="font-semibold text-gray-700 text-sm">
            {songInfo?.title}
          </span>
        </div>
        <div className="flex gap-4 pl-2">
          <span>
            <AiOutlineHeart size={16} />
          </span>
          <span>
            <BsThreeDots size={16} />
          </span>
        </div>
      </div>
      <div className="w-[40%] flex-auto border flex items-center justify-center gap-4 flex-col border-[#8E2C9C] rounded-3xl py-2">
        <div className="flex gap-8 justify-center items-center">
          <span className="cursor-pointer" title="Bật phát ngẫu nhiên">
            <CiShuffle size={24} />
          </span>
          <span className="cursor-pointer">
            <MdSkipPrevious size={24} />
          </span>
          <span
            className="p-1 border border-gray-700 cursor-pointer hover:text-main-500 rounded-full"
            onClick={handleTogglePlayMusic}
          >
            {isPlaying ? (
              <BsPauseFill size={30} />
            ) : (
              <BsFillPlayFill size={30} />
            )}
          </span>
          <span className="cursor-pointer">
            <MdSkipNext size={24} />
          </span>
          <span className="cursor-pointer" title="Bật phát lại tất cả">
            <CiRepeat size={24} />
          </span>
        </div>
        <div className="w-full">
          <div
            ref={trackRef}
            className="bg-[rgba(0,0,0,0.1)] relative m-auto h-[3px] w-4/5 rounded-l-full rounded-r-full"
          >
            <div
              ref={thumbRef}
              id="thumb-progress"
              className="bg-[#0e8080] absolute top-0 left-0 h-[3px] rounded-l-full rounded-r-full"
            ></div>
          </div>
        </div>
      </div>
      <div className="w-[30%] flex-auto border rounded-lg ">Volume</div>
    </div>
  );
}

export default Player;
