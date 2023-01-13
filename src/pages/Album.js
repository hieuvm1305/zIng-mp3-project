import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import { Skeleton, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setPlayList } from "../redux/playListSlice";
import { getIsPlay } from "../redux/playSlice";
import ListSong from "../Layout/ListSong";
import { getDetailPlaylist } from "../service";

function Album() {
  const { pid } = useParams();
  const dispatch = useDispatch();
  const isPlaying = useSelector(getIsPlay);
  const imageAlbum = useRef();
  const [playlistData, setPlaylistData] = useState();
  const [isloading, setisloading] = useState(true);
  useEffect(() => {
    const fetchDetailPlayList = async () => {
      const response = await getDetailPlaylist(pid);
      if (response?.data.err === 0) {
        setisloading(false);
        setPlaylistData(response.data?.data);
        dispatch(setPlayList(response.data?.data?.song.items))
      }
    };
    fetchDetailPlayList();
    return () => {};
  }, [dispatch, pid]);
  
  // useEffect(() => {
  //   if(isPlaying && !isloading){
  //     imageAlbum?.current.classList?.add("rounded-[50%]");
  //   } else{
  //     imageAlbum?.current.classList?.remove("rounded-[50%]");
  //   }
  //   return () => {
  //   }
  // }, [isPlaying, isloading])
  
  return (
    <div className="flex gap-5 w-full h-full px-[60px] mt-[90px]">
      <div className="flex-none w-1/4 border flex flex-col items-start gap-2 rounded-md mb-2">
        {isloading ? (
          <div className="w-full">
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
            <img
              src={playlistData?.thumbnailM}
              alt="thumbnail"
              className="img-playlist w-full object-contain rounded-md shadow-md cursor-pointer"
              ref={imageAlbum}
            />
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

export default Album;
