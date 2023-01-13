import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getArtist } from "../../service";
import { BsPlayFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import {
  setPlayListArtist,
  getPlayListArtist,
} from "../../redux/playListSlice";
import { useDispatch, useSelector } from "react-redux";
import {MdOutlineNavigateNext} from "react-icons/md"
import ArtistName from "../../components/ArtistName";
import OutstandingSong from "../../components/OutstandingSong";

function Artist() {
  const { alias } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [artistInfo, setArtistInfo] = useState();
  useEffect(() => {
    const getArtistInfo = async () => {
      try {
        const response = await getArtist(alias);
        if (response) {
          setArtistInfo(response.data.data);
          dispatch(setPlayListArtist(response.data.data?.sections[0]));
        }
      } catch (error) {
        return;
      }
    };
    getArtistInfo();
    return () => {};
  }, [alias, dispatch]);
  console.log(artistInfo)
  return (
    <div className="flex flex-col">
      <div className="w-full relative mb-5">
        <img
          src={artistInfo?.cover}
          alt="cover"
          className="w-full h-full"
        ></img>
        <div className="absolute bottom-3 left-5">
          <div className="flex flex-col gap-5">
            <div className="flex flex-row items-center justify-start gap-4">
              <h2 className="text-5xl font-semibold text-white font-sans">
                {artistInfo?.name}
              </h2>
              <div className="w-12 h-12 flex items-center rounded-[50%] justify-center bg-white cursor-pointer">
                <BsPlayFill size={40} color="#0f7070" />
              </div>
            </div>
            <div className="flex flex-row items-center gap-5">
              <p className="text-lg font-semibold text-white">
                {artistInfo?.follow} người quan tâm
              </p>
              <button className="rounded-2xl px-5  border-[0.2px] border-white font-semibold text-white cursor-pointer bg-[rgba(206,217,217,0.8)]">
                Quan tâm
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-row justify-between px-5 gap-3">
        <div className="w-1/3">
          <p className="font-bold text-2xl mb-3">Mới Phát Hành</p>
          <div className="flex flex-row justify-between items-center gap-4 rounded-lg px-2 bg-[rgba(206,217,217,0.8)] h-[183px]">
            <div>
              <img
                src={artistInfo?.topAlbum.thumbnail}
                alt="thumbnail"
                className="w-full h-full rounded-lg"
              />
            </div>
            <div className="flex flex-col gap-2 justify-center">
              <p>{artistInfo?.topAlbum.textType}</p>
              <p className="text-lg font-bold">{artistInfo?.topAlbum.title}</p>
              <ArtistName artists={artistInfo?.topAlbum.artists} />
              <p>{artistInfo?.topAlbum.releaseDate}</p>
            </div>
          </div>
        </div>
        <div className="w-2/3">
          <div className=" w-full flex justify-between">
            <p className="font-bold text-xl mb-3">Bài hát nổi bật</p>
            <div
              className="flex flex-row gap-1 items-center cursor-pointer hover:text-main-500"
              onClick={() => {
                navigate(`/artist/${artistInfo?.alias}/bai-hat`);
              }}
            >
              <span className="text-sm">Tất cả</span>
              <MdOutlineNavigateNext size={30}/>
            </div>
          </div>
          <div>
            <OutstandingSong playlist={artistInfo?.sections}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Artist;
