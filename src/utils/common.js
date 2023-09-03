export function getCookie(key) {
    let cookie = localStorage.getItem(key);
    if(cookie){
    cookie.split(":")
    return cookie.split(":")[0];
}
}

export function setCookie(key, value) {
    localStorage.setItem(key, value)

    return null;
}

export function deleteCookie(key) {
    localStorage.removeItem(key)
    return null;
}

export function checkCookie(key) {
    let cookie = localStorage.getItem(key)

    return cookie !== null;
}

export function getRole(key) {
    let cookie = localStorage.getItem(key)
    if(cookie){
    let arr = cookie.split(":");
    arr = arr.reverse();
     let resti =  arr[0].replace('0z54x3','');
     let role =  resti.replace('y9kv638','');
    return role
    }
}

export function getToken(key) {
    let cookie = localStorage.getItem(key)
    if(cookie){
    let arr = cookie.split(":");
    return arr[0]
    }
}

export function setPermitList(key, value) {
    localStorage.setItem(key, JSON.stringify(value));

    return null;
}


export function getPermitList(key) {

    return JSON.parse(localStorage.getItem(key) || "[]");
}


export function getpermit(n) {

    let perm = getPermitList("permissions");

    let result;
    perm.filter((rule)=>{

        if(rule.resource===`${n}`){
    
            result = Math.max(rule.permission);
        }
})

return result;
}

export function getrolebx(rolist) {
   
    let result;
    rolist.filter((key)=>{

        if(key.id==="employee"){
    
            result = true;
        }
})
return result;
}

export function getrolebox(rolist) {
   
    let result;
    rolist.filter((key)=>{

        if(key==="employee"){
    
            result = key;
        }
})
return result;
}

export function getrolebsx(rolist) {
   
    let result;
    rolist.filter((key)=>{

        if(key.value==="employee"){
    
            result = key.value;
        }
})
return result;
}


export function getrolemp(rolist) {
   
    let result;
    rolist.filter((key)=>{

        if(key.role_id==="employee"){
    
            result = key.role_id;
        }
})
return result;
}

export function getrolemps(rolist) {
   
    let result;
    rolist.filter((key)=>{

        if(key.value==="employee"){
    
            result = key.value;
        }
})
return result;
}
