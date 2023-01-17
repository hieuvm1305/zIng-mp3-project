import React, { useState, useEffect } from "react";
import { setCurSongId } from "../../redux/musicSlice";
import { setPlaying } from "../../redux/playSlice";
import { setPlayList } from "../../redux/playListSlice";
import { getNewReleaseChart } from "../../service";
import { FiPlay } from "react-icons/fi";
import moment from "moment";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ArtistName from "../../components/ArtistName";
function NewReleaseMusic() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [newReleaseList, setNewReleaseList] = useState([]);
  useEffect(() => {
    const getListNewRealease = async () => {
      try {
        const res = await getNewReleaseChart();
        if (res) {
          setNewReleaseList(res.data.data.items);
          dispatch(setPlayList(res.data.data.items));
        }
      } catch (error) {}
    };
    getListNewRealease();
    return () => {};
  });

  const handlePlay = (id) => {
    dispatch(setCurSongId(id));
    dispatch(setPlaying(true));
  };

  const playPlayList = () => {
    dispatch(setCurSongId(newReleaseList[0].encodeId));
    dispatch(setPlaying(true));
  };
  return (
    <div className="mt-[70px] px-15">
      <div className="h-16 flex flex-row items-center">
        <h2 className="font-bold text-4xl text-[#0f7070]">Nhạc mới</h2>
        <div className="mx-2">
          <div className="rounded-[50%] bg-[#0f7070] w-10 h-10 flex justify-center items-center">
            <div className="cursor-pointer" onClick={() => playPlayList()}>
              <FiPlay size={24} color="white" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        {newReleaseList?.map((item) => (
          <div
            key={item.encodeId}
            className="item-song flex flex-row justify-between gap-4 items-center border-b border-b-slate-400 hover:bg-[#e0ebeb] mb-2"
          >
            <div className="p-2">
              <figure
                onClick={() => handlePlay(item.encodeId)}
                className="bg-img cursor-pointer w-[10%] relative"
              >
                <img
                  src={item.thumbnail}
                  alt="thumbnail"
                  className="rounded-md max-w-[150px] max-h-[150px]"
                />
                <div className="bg-play absolute hidden top-[30%] left-[200%]">
                  <FiPlay size={45} color="white" />
                </div>
              </figure>
            </div>
            <div className="flex flex-col w-[30%]">
              <p className="text-lg text-[#0f7070]">{item.title}</p>
              <ArtistName artists={item?.artists}/>
            </div>
            <div
              onClick={() => {
                navigate(`${item.album?.link}`);
              }}
              className="flex flex-auto cursor-pointer w-[30%]"
            >
              <p className="text-xs text-[#0f7070] hover:border-b-[#0f7070] hover:border-b-[0.5px]">
                {item.album?.title}
              </p>
            </div>
            <div className="w-[10%]">
              <p>{moment.utc(item.duration * 1000).format("mm:ss")}</p>
            </div>
          </div>
        ))}
      </div>
      <div></div>
    </div>
  );
}

export default NewReleaseMusic;
