import React, {useEffect, useState, useRef} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getArtist } from '../../../service'
import ListCard from '../../../components/ListCard'

function AllAlbum() {
  const {alias} = useParams();
  const navigate = useNavigate();
  const navRef = useRef();
  const [artistInfo, setArtistInfo] = useState();
  const [albumList, setAlbumList] = useState([]);

  useEffect(() => {
    const getArtistInfo = async () => {
      try {
        const response = await getArtist(alias);
        if (response.data.err === 0) {
          setArtistInfo(response.data.data);
          setAlbumList(response.data.data?.sections[2].items);
        } else {
          navigate("/");
        }
      } catch (error) {
        return;
      }
    };
    getArtistInfo();
    return () => {};
  }, [alias, navigate]);

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
    <div className='w-full'>
      <div className='fixed left-[240px] top-[70px] right-0 z-20 h-[60]' ref={navRef}>
        <div className='w-full px-15 py-4'>
        <span className='text-xl font-bold'>{artistInfo?.name} - Tất cả Album </span>
        </div>
      </div>
      <div className='mt-[130px] px-15 mb-5'>
        <ListCard listCard={albumList} isList={true}/>
      </div>
    </div>
  )
}

export default AllAlbum