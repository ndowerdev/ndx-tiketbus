import CryptoJS from 'crypto-js'


export const func = {
    CryptoJSAesDecrypt: (passphrase, encrypted_json_string) => {
        let x = atob(encrypted_json_string);


        let obj_json = JSON.parse(x);


        let encrypted = obj_json.ciphertext;

        let salt = CryptoJS.enc.Hex.parse(obj_json.salt);
        let iv = CryptoJS.enc.Hex.parse(obj_json.iv);

        let key = CryptoJS.PBKDF2(passphrase, salt, {
            hasher: CryptoJS.algo.SHA512,
            keySize: 64 / 8,
            iterations: 999,
        });

        let decrypted = CryptoJS.AES.decrypt(encrypted, key, { iv: iv });

        let res = atob(decrypted.toString(CryptoJS.enc.Utf8));
        // console.log(res);
        return res;
    },
    isBase64: function(str) {
        try {
            return btoa(atob(str)) == str;
        } catch (err) {
            return false;
        }
    }
}