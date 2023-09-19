import jwt_decode from "jwt-decode";

export function setTokenInCookie(token) {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 1);
    document.cookie = `token=${token}; expires=${expiryDate.toUTCString()}; path=/`;
}

export function getTokenFromCookie() {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'token') {
            return value;
        }
    }
    return null;
}

export function deleteAllCookies() {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        const [name, _] = cookie.trim().split('=');
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }
}

export function decodeToken() {
    var decoded = jwt_decode(getTokenFromCookie());
    return decoded
}