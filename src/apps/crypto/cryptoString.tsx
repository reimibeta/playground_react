import * as CryptoJS from 'crypto-js';

var key = CryptoJS.enc.Utf8.parse('7061737323313233');
var iv = CryptoJS.enc.Utf8.parse('7061737323313233');

// console.log('Encrypted :' + encrypted);
// console.log('Key :' + encrypted.key);
// console.log('Salt :' + encrypted.salt);
// console.log('iv :' + encrypted.iv);
// console.log('Decrypted : ' + decrypted);
// console.log('utf8 = ' + decrypted.toString(CryptoJS.enc.Utf8));

export const encryptString = (raw: string) => {
    var encrypted: any = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(raw), key,
    {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return encrypted;
}

export const decryptString = (encrypted: string) => {
    var decrypted = CryptoJS.AES.decrypt(encrypted, key, {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
}