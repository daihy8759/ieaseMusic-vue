/* tslint:disable */
import { AsYouType } from "libphonenumber-js";
import "rgbaster/rgbaster";
import uuid from "uuid";

const helper = {
  pad(number) {
    return ("0" + number).slice(-2);
  },
  getTime(duration: number) {
    const minutes = Math.floor(duration / 1000 / 60);
    const second = Math.floor(duration / 1000 - minutes * 60);

    return `${this.pad(minutes)}:${this.pad(second)}`;
  },

  getPallet(image: string) {
    return new Promise((resolve) => {
      image = image.replace(/\?.*$/, "") + "?param=20y20";
      window['RGBaster'].colors(image, {
        success(payload) {
          const c = payload.dominant.match(/\d+/g);
          resolve(c);
        },
      });
    });
  },

  getLyricsKey(times, lyrics) {
    const keys = Object.keys(lyrics);

    return keys.find((e, index) => {
      return times > +e && index < keys.length - 1 && times < +keys[index + 1];
    });
  },

  formatPhone(phone) {
    if (!phone.startsWith("+86")
            && /1[34578][012356789]\d{8}|134[012345678]\d{7}/.test(phone)) {
      return {
        code: "86",
        phone,
      };
    }

    const formatter = new AsYouType();
    formatter.input(phone);
    return {
      code: formatter.country,
      phone: formatter.getNationalNumber(),
    };
  },

  pureColor(colors = []) {
    const rgb = colors[1] || [255, 255, 255];
    return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${Math.random()})`;
  },

  genColor(colors = []) {
    const r = colors[0] || [255, 255, 255];
    const b = colors[1] || [255, 255, 255];
    const g = colors[2] || [255, 255, 255];

    return `
            linear-gradient(${Math.random() * 100}deg,
                rgba(${r[0]}, ${r[1]}, ${r[2]}, ${Math.random()}) ${Math.random() * 33}%,
                rgba(${g[0]}, ${g[1]}, ${g[2]}, ${Math.random()}) ${Math.random() * 66}%,
                rgba(${b[0]}, ${b[1]}, ${b[2]}, ${Math.random()}) 100%
            )
        `;
  },

  randomName(prefix = "animation") {
    return `${prefix}-${uuid.v4()}`;
  },

  formatNumber(num = 0) {
    return num.toString().split("").reverse().reduce((prev, next, index) => {
      return ((index % 3) ? next : (next + ",")) + prev;
    });
  },

  humanNumber(num) {
    if (num > 1000 * 1000) {
      return (num / 1000 / 1000).toFixed(2) + "M";
    }

    if (num > 1000) {
      return (num / 1000).toFixed(2) + "K";
    }

    return num;
  },

  clearWith(name, args) {
    const clear = (token) => {
      const index = name.indexOf(token);

      if (index !== -1) {
        name = name.substring(0, index);
      }

      return name;
    };

    args.map((e) => {
      name = clear(e);
    });

    return name;
  },
};

export default helper;
