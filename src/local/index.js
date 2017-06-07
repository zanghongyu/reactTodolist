export function getStorage(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}

export function setStorage(key,value) {
    localStorage.setItem(key,JSON.stringify(value));
}
