

import { sha256, sha224 } from 'js-sha256';


export function  getHash256 (password:string) : string {

    return sha256(password)
}