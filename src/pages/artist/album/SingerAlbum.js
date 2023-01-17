import React from 'react'
import ListCard from '../../../components/ListCard';

function SingerAlbum({data}) {
    const singleList = data[2]?.items.slice(0, 5);
    const singleLink = data[2]?.link;
  return (
    <div>
        <ListCard title={"Album"} listCard={singleList} link={singleLink}/>
    </div>
  )
}

export default SingerAlbum