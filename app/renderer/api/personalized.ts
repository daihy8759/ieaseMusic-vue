import { post } from "../utils/request";

/**
 * 推荐歌单
 */
export default () => {
  const path = "/weapi/personalized/playlist";
  const data = {
    limit: 30,
    offset: 0,
    total: true,
    n: 1000,
    csrf_token: "",
  };
  return post(path, data);
};
