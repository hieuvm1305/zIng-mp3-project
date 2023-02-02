import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import { Skeleton, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getCurSongId, setCurSongId } from "../redux/musicSlice";
import { setPlayList, getPlayList } from "../redux/playListSlice";
import { getIsPlay, setPlaying, setRepeatAll } from "../redux/playSlice";
import ListSong from "./ListSong";
import { getDetailPlaylist } from "../service";

function PlayList() {
  const { pid } = useParams();
  const pcodeId = pid?.slice(0, -5); // do link co chua .html nen cat bo luon .html de get pid
  const dispatch = useDispatch();
  const isPlaying = useSelector(getIsPlay);
  const currentSongId = useSelector(getCurSongId);
  const playList = useSelector(getPlayList);
  const imageAlbum = useRef();
  const [playlistData, setPlaylistData] = useState();
  const [isloading, setisloading] = useState(true);
  const [checkPlayList, setCheckPlayList] = useState(false);
  useEffect(() => {
    const fetchDetailPlayList = async () => {
      const response = await getDetailPlaylist(pcodeId);
      if (response?.data.err === 0) {
        setisloading(false);
        setPlaylistData(response.data?.data);
        dispatch(setPlayList(response.data?.data?.song.items));
      }
    };
    fetchDetailPlayList();
    return () => {};
  }, [dispatch, pcodeId, pid]);
  
  // handle play playlist 
  const handlePlayList = () => {
    dispatch(setCurSongId(playList[0]?.encodeId));
    dispatch(setPlaying(true));
    dispatch(setRepeatAll(true));
  }

  // kiem tra bai hat co thuoc play list hay khong
  useEffect(() => {
    setCheckPlayList(
      playList?.includes((item) => item.encodeId === currentSongId)
    );
    return () => {};
  }, [playList, currentSongId]);

  // style change
  useEffect(() => {
    if (isPlaying && !isloading && checkPlayList) {
      imageAlbum?.current.classList?.remove("rounded-md");
      imageAlbum?.current.classList?.add("rounded-[50%]", "animate-rotatespin");
    } else {
      imageAlbum?.current.classList?.remove(
        "rounded-[50%]",
        "animate-rotatespin"
      );
    }
    return () => {};
  }, [checkPlayList, currentSongId, isPlaying, isloading]);
  
  return (
    <div className="flex gap-5 w-full h-full px-[60px] mt-[90px]">
      <div className="flex-none w-1/4 border flex flex-col items-start gap-2 rounded-md mb-2">
        {isloading ? (
          <div className="w-full" ref={imageAlbum}>
            <Stack spacing={2}>
              <Skeleton animation="wave" variant="rounded" height={250} />
              <Skeleton
                animation="wave"
                variant="rounded"
                height={20}
                width="60%"
              />
              <Skeleton
                animation="wave"
                variant="rounded"
                height={20}
                width="60%"
              />
              <Skeleton animation="wave" variant="rounded" height={30} />
              <Skeleton
                animation="wave"
                variant="rounded"
                height={20}
                width="30%"
              />
            </Stack>
          </div>
        ) : (
          <div className="">
            <div className="" onClick={() => handlePlayList()}>
              <img
                src={playlistData?.thumbnailM}
                alt="thumbnail"
                className="img-playlist w-full object-contain rounded-md shadow-md cursor-pointer"
                ref={imageAlbum}
              />
            </div>
            <div className="flex flex-col items gap-1 px-2 mt-2">
              <h3 className="text-[20px] font-bold text-gray-800">
                {playlistData?.title}
              </h3>
              <span>
                Cập Nhật:{" "}
                {moment
                  .unix(playlistData?.contentLastUpdate)
                  .format("DD/MM/YY")}
              </span>

              <span className="flex gap-2 items-center text-gray-500 text-xs">
                {playlistData?.artistsNames}
              </span>
              <span className="flex gap-2 items-center text-gray-500 text-xs">{`${Math.round(
                playlistData?.like / 1000
              )}K người yêu thích`}</span>
            </div>
          </div>
        )}
      </div>
      <ListSong
        songs={playlistData?.song?.items}
        totalDuration={playlistData?.song?.totalDuration}
      />
    </div>
  );
}

export default PlayList;
