import bigInt from "big-integer";
import CryptoJS from "crypto-js";

const modulus = "00e0b509f6259df8642dbc35662901477df22677ec152b5ff68ace615bb7b725152b3ab17a876aea" +
    "8a5aa76d2e417629ec4ee341f56135fccf695280104e0312ecbda92557c93870114af6c9d05c4f7f" +
    "0c3685b7a46bee255932575cce10b424d813cfe4875d3e82047b97ddef52741d546b8e289dc6935b" +
    "3ece0462db0a22b8e7";
const nonce = "0CoJUm6Qyw8W8jud";
const pubKey = "010001";

function createSecretKey(size: number) {
  const keys = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let key = "";
  for (let i = 0; i < size; i++) {
    let pos = Math.random() * keys.length;
    pos = Math.floor(pos);
    key = key + keys.charAt(pos);
  }
  return key;
}

function aesEncrypt(text: string, secKey: string) {
  const newSecKey = CryptoJS.enc.Utf8.parse(secKey);
  const iv =  CryptoJS.enc.Utf8.parse("0102030405060708");
  return CryptoJS.AES.encrypt( text, newSecKey, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  }).toString();
}

function zfill(str: string, size: number) {
  while (str.length < size) {
    str = "0" + str;
  }
  return str;
}

function rsaEncrypt(text: string, pubKey: string, modulus: string) {
  const newText = text
    .split("")
    .reverse()
    .join("");
  const biText = bigInt(new Buffer(newText).toString("hex"), 16);
  const biEx = bigInt(pubKey, 16);
  const biMod = bigInt(modulus, 16);
  const biRet = biText.modPow(biEx, biMod);
  return zfill(biRet.toString(16), 256);
}

function Encrypt(obj: object) {
  const text = JSON.stringify(obj);
  const secKey = createSecretKey(16);
  const encText = aesEncrypt(aesEncrypt(text, nonce), secKey);
  const encSecKey = rsaEncrypt(secKey, pubKey, modulus);
  return { params: encText, encSecKey };
}

export default Encrypt;
