import { atom } from 'recoil';

export const userloggedin = atom({
    key: 'userloggedin1',
    default: 'anonymous-not-loggedin',
})