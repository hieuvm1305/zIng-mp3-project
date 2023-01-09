import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import { Skeleton, Stack } from "@mui/material";
import ListSong from "../components/ListSong";
import { Scrollbars } from "react-custom-scrollbars-2";
import { getDetailPlaylist } from "../service";

function Album() {
  const { pid } = useParams();
  const [playlistData, setPlaylistData] = useState();
  const [isloading, setisloading] = useState(true);
  useEffect(() => {
    const fetchDetailPlayList = async () => {
      const response = await getDetailPlaylist(pid);
      if (response?.data.err === 0) {
        setisloading(false);
        setPlaylistData(response.data?.data);
      }
    };
    fetchDetailPlayList();
    return () => {};
  }, [pid]);

  return (
    <div className="flex gap-5 w-full h-full px-[60px]">
      <div className="flex-none w-1/4 border flex flex-col items-center gap-2 rounded-md">
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
          <div>
            <img
              src={playlistData?.thumbnailM}
              alt="thumbnail"
              className="w-full object-contain rounded-md shadow-md"
            />
            <div className="flex flex-col items gap-1">
              <h3 className="text-[20px]  font-bold text-gray-800">
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
