import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getArtist } from "../../service";
import { BsPlayFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import icons from "../../assets/icons";
import OutstandingSong from "../../components/OutstandingSong";
import Single from "./single/Single";
import SingerAlbum from "./album/SingerAlbum";
import MusicVideo from "./musicvideo/MusicVideo";
import Collection from "./collection/Collection";
import Appear from "./appear/Appear";
import ArtistHint from "./maybelike/ArtistHint";

const { MdOutlineNavigateNext } = icons;
function ArtistNew() {
  const { alias } = useParams();
  const navigate = useNavigate();
  const [artistInfo, setArtistInfo] = useState();
  const [isLoading, setisLoading] = useState(false);
  useEffect(() => {
    const getArtistInfo = async () => {
      try {
        const response = await getArtist(alias);
        if (response.data.err === 0) {
          setArtistInfo(response.data.data);
          setisLoading(true);
        } else {
          setisLoading(true);
          navigate("/");
        }
      } catch (error) {
        return;
      }
    };
    getArtistInfo();
    return () => {};
  }, [alias, navigate]);

  return (
    <div>
      {isLoading ? (
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
          <div className="px-15">
            <div className="w-full flex flex-row justify-between gap-7 my-8">
              <div className="w-full">
                <div className=" w-full flex justify-between  mb-3">
                  <p className="font-bold text-xl">Bài hát nổi bật</p>
                  <div
                    className="flex flex-row gap-1 items-center cursor-pointer hover:text-main-500"
                    onClick={() => {
                      navigate(`/${artistInfo?.alias}/bai-hat`);
                    }}
                  >
                    <span className="text-sm">Tất cả</span>
                    <MdOutlineNavigateNext size={30} />
                  </div>
                </div>
                <div>
                  <OutstandingSong data={artistInfo?.sections} />
                </div>
              </div>
            </div>
            <div className="w-full my-8">
              <Single data={artistInfo?.sections} />
            </div>
            <div className="w-full my-8">
              <SingerAlbum data={artistInfo?.sections} />
            </div>
            <div className="w-full my-8">
              <MusicVideo data={artistInfo?.sections} />
            </div>
            <div className="w-full my-8">
              <Collection data={artistInfo?.sections} />
            </div>
            <div className="w-full my-8">
              <Appear data={artistInfo?.sections} />
            </div>
            <div className="w-full my-8">
              <ArtistHint data={artistInfo?.sections} />
            </div>
            <div className="w-full my-12">
              <div className="mb-6">
                <span className="font-bold text-2xl">
                  Về {artistInfo?.name}
                </span>
              </div>
              <div className="flex flex-wrap lg:flex-row 2xl:mr-[235px]">
                <div className="flex w-full px-4 lg:px-0 lg:w-1/2 h-[350px]">
                  <img
                    src={artistInfo.thumbnail}
                    alt=""
                    className="w-full object-cover rounded-lg object-custom"
                  />
                </div>
                <div className="flex flex-col w-full lg:w-1/2 px-4">
                  <div>
                    <p>
                      {artistInfo?.biography.slice(
                        0,
                        artistInfo?.biography.length / 2
                      )}
                      ...Xem thêm
                    </p>
                  </div>
                  <div className="mt-5">
                    <div className="flex flex-col gap-3">
                      <span className="font-bold text-lg">{artistInfo.follow}</span>
                      <span>Người theo dõi</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default ArtistNew;
