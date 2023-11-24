import md5 from 'md5';

export const generateHashedPassword = (name, email)=>{
    return md5(`${email}${name}`)
}