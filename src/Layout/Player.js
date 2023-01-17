/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDetailSong, apiGetSong } from "../service";
import { getCurSongId, setCurSongId } from "../redux/musicSlice";
import {
  setPlaying,
  getIsPlay,
  getCurrentTime,
  setCurrentTime,
  getRepeatAllStatus,
  getRepeatOneStatus,
  getRandomStatus,
  setRepeatAll,
  setRandom,
  setRepeatOne
} from "../redux/playSlice";
import { getPlayList } from "../redux/playListSlice";
import { Slider } from "@mui/material";
import { getTimeSong } from "../hook/fn";
import icons from "../assets/icons";

const {
  AiOutlineHeart,
  BsThreeDots,
  MdSkipNext,
  MdSkipPrevious,
  CiRepeat,
  BsPauseFill,
  BsFillPlayFill,
  CiShuffle,
  RiVolumeMuteFill,
  RiVolumeUpFill,
  MdOndemandVideo,
  TbMicrophone2,
} = icons;

function Player() {
  const dispatch = useDispatch();
  const curSongId = useSelector(getCurSongId);
  const isPlaying = useSelector(getIsPlay);
  const playList = useSelector(getPlayList);
  const curTime = useSelector(getCurrentTime);
  const isRepeatOne = useSelector(getRepeatOneStatus);
  const isRepeatAll = useSelector(getRepeatAllStatus);
  const isRandom = useSelector(getRandomStatus);
  const [audioSrc, setAudioSrc] = useState();
  const [songInfo, setSongInfo] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [volumeValue, setVolumeValue] = useState(100);
  // get song
  const audioRef = useRef(new Audio());
  useEffect(() => {
    const fetchDetailSong = async () => {
      if (curSongId !== "") {
        const [res1, res2] = await Promise.all([
          getDetailSong(curSongId),
          apiGetSong(curSongId),
        ]);
        if (res1.data.err === 0) {
          setSongInfo(res1.data.data);
        }
        if (res2.data.err === 0) {
          setAudioSrc(res2.data.data["128"]);
          audioRef?.current.load(); // fix bug audio can't change
        } else {
          dispatch(setPlaying(false));
          setAudioSrc("");
          // toast.info(res2.data.msg);
        }
      }
    };
    fetchDetailSong();
  }, [curSongId]);

  // play function,
  const funcPlay = async () => {
    await audioRef.current.play();
  };
  useEffect(() => {
    if (isPlaying && audioSrc) {
      funcPlay();
    } else {
      audioRef.current.pause();
    }
  }, [audioSrc, isPlaying]);

  // handle play or pause button
  const handleTogglePlayMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
      dispatch(setPlaying(false));
    } else {
      funcPlay();
      dispatch(setPlaying(true));
    }
  };

  // change duration time of song
  const handleChangeDuration = (e) => {
    audioRef.current.currentTime = e.target.value;
    dispatch(setCurrentTime(e.target.value));
  };

  // process bar update time
  useEffect(() => {
    const handeValueInputAudio = () => {
      dispatch(setCurrentTime(audioRef.current.currentTime));
    };
    if (!!audioSrc && audioRef.current) {
      audioRef.current.addEventListener("timeupdate", handeValueInputAudio);
    }
  }, [dispatch, audioSrc]);

  // change mute or unmute
  const handleVolumeChange = () => {
    if (isMuted) {
      setIsMuted(false);
      audioRef.current.muted = false;
      setVolumeValue(100);
    } else {
      setIsMuted(true);
      audioRef.current.muted = true;
      setVolumeValue(0);
    }
  };
  // change volume amount
  const handleVolumeAmount = (e) => {
    setVolumeValue(e.target.value);
    audioRef.current.volume = (parseInt(e.target.value) / 100).toFixed(1);
  };

  // handle playlist and next, prev button
  const handleNextSong = () => {
    let indexOfSong = playList?.findIndex(
      (item) => item.encodeId === curSongId
    );
    if (playList.length > 0) {
      if (indexOfSong >= playList.length - 1) {
        dispatch(setCurSongId(playList[0].encodeId));
        dispatch(setPlaying(true));
      } else {
        dispatch(setCurSongId(playList[indexOfSong + 1].encodeId));
        dispatch(setPlaying(true));
      }
    } else {
      alert("Please select playlist!");
    }
  };

  const handlePrevSong = () => {
    let indexOfSong = playList?.findIndex(
      (item) => item.encodeId === curSongId
    ); // find index of Song
    // check position and handle prev Song
    if (playList.length > 0) {
      if (indexOfSong === 0) {
        dispatch(setCurSongId(playList[playList.length - 1].encodeId));
        dispatch(setPlaying(true));
      } else {
        dispatch(setCurSongId(playList[indexOfSong - 1].encodeId));
        dispatch(setPlaying(true));
      }
    } else {
      alert("Please select playlist!");
    }
  };

  // Handle playlist song when click playlist image
  const handlePlayListSong = () => {
    console.log(1)
    if (playList.length > 0) {
      dispatch(setCurSongId(playList[0].encodeId));
      dispatch(setPlaying(true));
    }
  };

  //handle auto play
  useEffect(() => {

    const handleNextSong = () => {
      let indexOfSong = playList?.findIndex(
        (item) => item.encodeId === curSongId
      );
      if (playList.length > 0) {
        if (indexOfSong >= playList.length - 1) {
          dispatch(setCurSongId(playList[0].encodeId));
          dispatch(setPlaying(true));
        } else {
          dispatch(setCurSongId(playList[indexOfSong + 1].encodeId));
          dispatch(setPlaying(true));
        }
      } else {
        alert("Please select playlist!");
      }
    };
  
    if (audioRef.current && playList.length > 0 && isRepeatAll) {
      audioRef.current.addEventListener("ended", handleNextSong);
  }
    return () => {
     
    }
  }, [dispatch, ])
  

  return (
    <div className="bg-main-400 px-5 h-full flex py-2">
      <div className="w-[30%] flex-auto flex gap-3 items-center">
        <div className="cursor-pointer h-full p-2" onClick={() => handlePlayListSong()}>
          <img src={songInfo?.thumbnail} alt="" className="w-[60px] h-[60px] rounded-md" />
        </div>
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
      <div className="w-[40%] flex-auto flex items-center justify-center gap-1 flex-col">
        <div className="flex gap-8 justify-center items-center">
          <span className="cursor-pointer" title="Bật phát ngẫu nhiên">
            <CiShuffle size={24} />
          </span>
          <span className="cursor-pointer" onClick={() => handlePrevSong()}>
            <MdSkipPrevious size={24} />
          </span>
          <span
            className="p-1 border border-gray-700 cursor-pointer hover:text-main-500 rounded-full"
            onClick={() => handleTogglePlayMusic()}
          >
            {isPlaying ? (
              <BsPauseFill size={24} />
            ) : (
              <BsFillPlayFill size={24} />
            )}
          </span>
          <span className="cursor-pointer" onClick={() => handleNextSong()}>
            <MdSkipNext size={24} />
          </span>
          <span className="cursor-pointer" title="Bật phát lại tất cả">
            <CiRepeat size={24} />
          </span>
        </div>
        <div className="hidden">
          <audio ref={audioRef} src={audioSrc}></audio>
        </div>
        <div className="w-[90%] flex flex-row gap-4">
          <span className="text-sm">
            {getTimeSong(audioRef.current.currentTime)}
          </span>
          <div className="w-4/5">
            <Slider
              size="small"
              min={0}
              max={songInfo ? songInfo.duration : 100}
              value={curTime}
              aria-label="Small"
              valueLabelDisplay="off"
              onChange={(e) => handleChangeDuration(e)}
            />
          </div>
          <span className="text-sm">{getTimeSong(songInfo?.duration)}</span>
        </div>
      </div>

      <div className="w-[30%] flex flex-row items-center justify-center gap-5 px-2 ">
        <div>
          <MdOndemandVideo size={24} />
        </div>
        <div>
          <TbMicrophone2 size={24} />
        </div>
        <div className="flex flex-row gap-3">
          <div className="cursor-pointer" onClick={handleVolumeChange}>
            {isMuted ? (
              <RiVolumeMuteFill size={24} />
            ) : (
              <RiVolumeUpFill size={24} />
            )}
          </div>
          <div className="w-[120px]">
            <Slider
              aria-label="Volume"
              size="small"
              min={0}
              max={100}
              value={volumeValue}
              onChange={(e) => handleVolumeAmount(e)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Player;
