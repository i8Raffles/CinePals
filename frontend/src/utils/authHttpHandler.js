import {AuthContext} from "../App";
import axios from "axios";

export function addAuthHandlerToAxios() {
    axios.interceptors.response.use(function (response) {
        return response
    }, function (error) {
        console.log('error', error);
        if (error?.response?.status === 401) {
            window.location.href = "/login";
        }
        return Promise.reject(error)
    })
}
