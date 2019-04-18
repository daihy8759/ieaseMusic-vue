import axios from "axios";
import Encrypt from "./crypto";

const host = "music.163.com";

const request = (method: string, path: string, data: object) => {
  const cryptoreq = Encrypt(data);
  const options = {
    method,
    url: `http://${host}${path}`,
    withCredentials: true,
    headers: {
      "Accept": "*/*",
      "Accept-Language": "zh-CN,zh;q=0.8,gl;q=0.6,zh-TW;q=0.4",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    params: {
      params: cryptoreq.params,
      encSecKey: cryptoreq.encSecKey,
    },
  };
  return axios(options);
};

const post = (path: string, data: object) => {
  return request("post", path, data);
};

const get = (path: string, data: object) => {
  return request("get", path, data);
};

export {
  request,
  post,
  get,
};
