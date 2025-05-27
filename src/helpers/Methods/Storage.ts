import { UserCredential } from "firebase/auth";

export function saveUserInDataLocalStorge(user: UserCredential['user']) {
    localStorage.setItem('userData', JSON.stringify(user)); 
}