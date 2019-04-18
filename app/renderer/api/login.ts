import MD5 from "crypto-js/md5";
import { post } from "../utils/request";

export default (phone, password) => {
    const path = "/weapi/login/cellphone";
    const data = {
        phone,
        password: MD5(password).toString(),
        rememberLogin: "true",
    };
    return post(path, data);
};
