import React from "react";
import path from "./path";
import Home from "../pages/Home/Home";
import Top100 from "../pages/top100/Top100";
import Album from "../Layout/Album";
import NewReleaseMusic from "../pages/newrealeasemusic/NewReleaseMusic";
import SearchPage from "../pages/search/SearchPage";
import Artist from "../pages/artist/Artist";
import ArtistNew from "../pages/artist/ArtistNew";
import Personal from "../pages/Personal";
import ArtistSingleList from "../pages/artist/single/ArtistSingleList";
import ArtistSongList from "../pages/artist/song/ArtistSongList";
import PlayList from "../Layout/PlayList";
import Follow from "../pages/Follow";
import AllAlbum from "../pages/artist/album/AllAlbum";
import Login from "../pages/Login";
import Mvideo from "../pages/mv/Mvideo";
import ArtistMvList from "../pages/artist/musicvideo/ArtistMvList";

const route = [
  { path: path.HOME, element: <Home /> },
  { path: path.TOP100, element: <Top100 /> },
  { path: path.ALBUM__TITLE__PID, element: <Album /> },
  { path: path.PLAYLIST__TITLE__PID, element: <PlayList /> },
  { path: path.LOGIN, element: <Login /> },
  { path: path.FOLLOW, element: <Follow /> },
  { path: path.MY_MUSIC, element: <Personal /> },
  { path: path.MV, element: <Mvideo /> },
  { path: path.PERSONAL, element: <Personal /> },
  { path: path.NEWRELEASE, element: <NewReleaseMusic /> },
  { path: path.Search, element: <SearchPage /> },
  { path: path.ARTIST, element: <Artist /> },
  { path: path.ARTIST_2, Element: <ArtistNew /> },
  { path: path.ARTISTSONG, element: <ArtistSongList /> },
  { path: path.ARTISTSONG_2, element: <ArtistSongList /> },
  { path: path.SINGLE_EP, element: <ArtistSingleList /> },
  { path: path.SINGLE_EP_2, element: <ArtistSingleList /> },
  { path: path.ARTIST_ALBUM, element: <AllAlbum /> },
  { path: path.ARTIST_ALBUM_2, element: <AllAlbum /> },
  { path: path.ARTIST_VIDEO, element: <ArtistMvList /> },
  { path: path.ARTIST_VIDEO_2, element: <ArtistMvList /> },
];
export default route;
