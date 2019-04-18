/* tslint:disable */
import storage from 'electron-json-storage'

export default {
  get: (key:string) => {
    return new Promise((resolve, reject) => {
      storage.get(key, (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
  },
  set: (key:string, data:object) => {
    return new Promise((resolve, reject) => {
      storage.set(key, data, err => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
  },
  remove: (key:string) => {
    return new Promise((resolve, reject) => {
      storage.remove(key, err => {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      })
    })
  }
}
