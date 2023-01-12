import React, { useState, useEffect } from "react";
import { setCurSongId } from "../redux/musicSlice";
import { setPlaying } from "../redux/playSlice";
import { setPlayList } from "../redux/playListSlice";
import { getNewReleaseChart } from "../service";
import { FiPlay } from "react-icons/fi";
import moment from "moment";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
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
  },);

  const handlePlay = (id) => {
    dispatch(setCurSongId(id));
    dispatch(setPlaying(true));
  };

  return (
    <div className="mt-5 mx-4">
      <div className="h-16 flex flex-row items-center">
        <h2 className="font-bold text-4xl text-[#0f7070]">Nhạc mới</h2>
        <div className="mx-2">
          <div className="rounded-[50%] bg-[#0f7070] w-10 h-10 flex justify-center items-center">
            <div><FiPlay size={24} /></div>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        {newReleaseList?.map((item) => (
          <div
            key={item.encodeId}
            className="flex flex-row justify-between gap-5 items-center border-b border-b-slate-400"
          >
            <div onClick={() => handlePlay(item.encodeId)} className="cursor-pointer p-2">
              <img src={item.thumbnail} alt="thumbnail" className="rounded-md"/>
            </div>
            <div className="flex flex-col text-center">
              <p className="text-lg text-zinc-900">{item.title}</p>
              <p className="text-xs text-zinc-400">{item.artistsNames}</p>
            </div>
            <div onClick={()=>{navigate(`/album/${item.album?.title}/${item.album?.encodeId}`)}} className="cursor-pointer"><p className="text-xs text-zinc-400">{item.album?.title}</p></div>
            <p>{moment.utc(item.duration * 1000).format("mm:ss")}</p>
          </div>
        ))}
      </div>
      <div></div>
    </div>
  );
}

export default NewReleaseMusic;
