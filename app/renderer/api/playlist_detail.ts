import { post } from "../utils/request";

/**
 * 获取歌单内列表
 */
export default (id: string) => {
  const path = "/weapi/v3/playlist/detail";
  const data = {
    id,
    n: 100000,
    s: 8,
    csrf_token: "",
  };
  return post(path, data);
};
