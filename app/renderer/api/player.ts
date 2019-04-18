import { post } from "../utils/request";

const getDetail = async (type: number, id: string) => {
  const path = type === 0 ? "/weapi/v3/playlist/detail" : "/album";
  return post(path, {
    id,
    n: 100000,
    s: 8,
    csrf_token: "",
  });
};
export {
    getDetail,
};
