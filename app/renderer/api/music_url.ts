import { post } from "../utils/request";

/**
 * 获取音乐 url
 */
export default (id) => {
    const path = "/weapi/song/enhance/player/url";
    const data = {
        ids: [id],
        br: 999000,
        csrf_token: "",
    };
    return post(path, data);
};
