import { resolve } from "core-js/fn/promise"
import axios from axios

http = {}

const instance = axios.create({
    baseURL: "",
    timeout: 10000,
})

http.get = function (url, options) {
    return new Promise((resolve, rej) => {
        instance
            .get(url, options)
            .then((res) => {
                console.log(res);
                resolve(res)
            }).catch((err) => {
                console.log(err);
            })
    })
}

http.post = function (url, data, options) {
    instance
        .post(url, data, options)
        .then((res) => {
            console.log(res);
            resolve(res)
        }).catch((err) => {
            console.log(err)
        })
}

export default http

