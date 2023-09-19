import { getTokenFromCookie } from "./setToken"

export const headers = {
    headers: {
        "Content-type": "application/json",
        "Authorization":  getTokenFromCookie()
    },
}

export const multipartheaders = {
    headers: {
        "Content-type": "multipart/form-data",
        "Authorization":  getTokenFromCookie()
    },
}