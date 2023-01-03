import client from "./client";

export const getHome = () => {
  return client.get("/home");
};

export const apiGetSong = (songId) => {
  return client.request({
    method: "get",
    url: "/song",
    data: { id: songId },
  });
};

export const getDetailSong = (songId) => {
  return client.request({
    method: "get",
    url: "/infosong",
    data: { id: songId },
  });
};

export const getDetailPlaylist = (pId) => {
  return client.request({
    method: "get",
    url: "/detailplaylist",
    data: { id: pId },
  });
};

export const getTop100 = () => {
  return client.request({
    method: "get",
    url: "/top100",
  });
};

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
    data:{query: querySong},
  })
}

// get artist
export const getArtist = (art) => {
  return client.request({
    method: "get",
    url: "/artist",
    data: {name: art},
  })
}

// get artist song
export const getArtistListSong = (id, page, count) => {
  return client.request({
    method: "get",
    url: "/artistsong",
    data: {id: id, page: page, count : count},
  })
}

