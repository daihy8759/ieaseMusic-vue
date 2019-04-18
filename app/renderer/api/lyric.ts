import { post } from "../utils/request";

export default (id) => {
    const path = `/weapi/song/lyric?os=osx&id=${id}&lv=-1&kv=-1&tv=-1`;
    const data = {
    };
    return post(path, data);
};
