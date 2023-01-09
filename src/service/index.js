import client from "./client";

export const getHome = () => {
  return client.get("/home");
};

// get song
export const apiGetSong = (songId) => {
  return client.request({
    method: "get",
    url: "/song",
    params: { id: songId },
  });
};

// get infoSong
export const getDetailSong = (songId) => {
  return client.request({
    method: "get",
    url: "/infosong",
    params: { id: songId },
  });
};

//get detail playlist

export const getDetailPlaylist = (pId) => {
  return client.request({
    method: "get",
    url: "/detailplaylist",
    params: { id: pId },
  });
};
//get top 100
export const getTop100 = () => {
  return client.request({
    method: "get",
    url: "/top100",
  });
};

//get chart home
export const getChartHome = () => {
  return client.request({
    method: "/get",
    url: "/charthome",
  });
};
// getNewReleaseChart
export const getNewReleaseChart = () => {
  return client.request({
    method: "get",
    url: "/newreleasechart",
  });
};

//search Song
export const searchSong = (querySong) => {
  return client.request({
    method: "get",
    url: "/search",
    params:{query: querySong},
  })
}

// get artist
export const getArtist = (art) => {
  return client.request({
    method: "get",
    url: "/artist",
    params: {name: art},
  })
}

// get artist song
export const getArtistListSong = (id, page, count) => {
  return client.request({
    method: "get",
    url: "/artistsong",
    params: {id: id, page: page, count : count},
  })
}
// get lyrics 
export const getLyricSong = (sId) => {
  return client.request({
    method: "get",
    url: "/lyric",
    params: {id: sId}
  })
}
// get ListMV
export const getListMv = (lId, lPage, lCount) => {
  return client.request({
    method: 'get',
    url: "/listmv",
    params: {id: lId, page : lPage, count: lCount}
  })
}

// get categoryMv

export const getCategory = (sId) => {
  return client.request({
    method: "get",
    url: "/categorymv",
    params: {id: sId}
  })
}

// get Video
export const getVideo = (sId) => {
  return client.request({
    method: 'get',
    url: "/video",
    params: {id: sId}
  })
}
