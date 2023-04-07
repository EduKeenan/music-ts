import {hashSync, genSaltSync, compareSync} from 'bcrypt';

export async function gerarHash(senha : string) : Promise<string> {
    return hashSync(senha, genSaltSync(10));
}

export async function compararHash(senha : string, hash : string) : Promise<boolean>{
    return compareSync(senha, hash);
}
