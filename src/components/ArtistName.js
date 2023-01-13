import React from "react";
import { useNavigate } from "react-router-dom";
function ArtistName({ artists }) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-row gap-1 items-center justify-start">
      {artists?.map((item, index) => {
        if (index < artists?.length - 1) {
          return (
            <span
              onClick={() => {
                navigate(`/artist/${item.alias}`);
              }}
              className="cursor-pointer hover:border-b-[0.5px] hover:border-b-[#0f7070] hover:text-[#0f7070] text-xs"
              key={index}
            >
              {item.name},
            </span>
          );
        } else {
          return (
            <span
              onClick={() => {
                navigate(`/artist/${item.alias}`);
              }}
              className="cursor-pointer hover:border-b-[0.5px] hover:border-b-main-color hover:text-main-color text-xs"
              key={index}
            >
              {item.name}
            </span>
          );
        }
      })}
    </div>
  );
}

export default ArtistName;
