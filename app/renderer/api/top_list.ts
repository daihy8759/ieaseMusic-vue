import { post } from "../utils/request";

const topListAll: any = {
  0: ["云音乐新歌榜", "3779629"],
  1: ["云音乐热歌榜", "3778678"],
  2: ["网易原创歌曲榜", "2884035"],
  3: ["云音乐飙升榜", "19723756"],
  4: ["云音乐电音榜", "10520166"],
  5: ["UK排行榜周榜", "180106"],
  6: ["美国Billboard周榜", "60198"],
  7: ["KTV嗨榜", "21845217"],
  8: ["iTunes榜", "11641012"],
  9: ["Hit FM Top榜", "120001"],
  10: ["日本Oricon周榜", "60131"],
  11: ["韩国Melon排行榜周榜", "3733003"],
  12: ["韩国Mnet排行榜周榜", "60255"],
  13: ["韩国Melon原声周榜", "46772709"],
  14: ["中国TOP排行榜(港台榜)", "112504"],
  15: ["中国TOP排行榜(内地榜)", "64016"],
  16: ["香港电台中文歌曲龙虎榜", "10169002"],
  17: ["华语金曲榜", "4395559"],
  18: ["中国嘻哈榜", "1899724"],
  19: ["法国 NRJ EuroHot 30周榜", "27135204"],
  20: ["台湾Hito排行榜", "112463"],
  21: ["Beatport全球电子舞曲榜", "3812895"],
  22: ["云音乐ACG音乐榜", "71385702"],
  23: ["云音乐嘻哈榜", "991319590"],
};

export default (idx: string) => {
  const id = topListAll[idx][1];
  const path = "/weapi/v3/playlist/detail";
  const data = {
    id,
    n: 10000,
    csrf_token: "",
  };
  return post(path, data);
};
