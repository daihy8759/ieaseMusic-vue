import crypto from "crypto";
import { post } from "../utils/request";

export default (phone, password) => {
    const path = "/weapi/login/cellphone";
    const md5sum = crypto.createHash("md5");
    md5sum.update(password);
    const data = {
        phone,
        password: md5sum.digest("hex"),
        rememberLogin: "true",
    };
    return post(path, data);
};
