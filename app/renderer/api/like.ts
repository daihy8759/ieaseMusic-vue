import { post } from "../utils/request";

// 红心与取消红心歌曲
export default (id: string, like: boolean) => {
    const path = "/weapi/radio/like";
    const data = {
        trackId: id,
        like,
    };
    return post(path, data);
};
