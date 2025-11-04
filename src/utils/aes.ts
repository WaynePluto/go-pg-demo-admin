import CryptoJS from 'crypto-js'
/**
 *
 * @ Modified by: liuwei
 * @ Modified time: 2024-08-06
 * @returns
 */

export function initAes(keyStr, n) {
  if (keyStr.length < n) {
    throw new Error('n过大')
  }
  return keyStr.substr(n).concat(keyStr.substr(0, n))
}
const key = initAes('4e8759c58fdb413dcc2c243eebab91f6', 9)

export function encrypt(word, aesKey = key) {
  const key = CryptoJS.enc.Utf8.parse(aesKey)
  const srcs = CryptoJS.enc.Utf8.parse(word)
  const encrypted = CryptoJS.AES.encrypt(srcs, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  })
  return encrypted.toString()
}

export function decrypt(word, aesKey = key) {
  const key = CryptoJS.enc.Utf8.parse(aesKey)
  const decrypt = CryptoJS.AES.decrypt(word, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  })
  return CryptoJS.enc.Utf8.stringify(decrypt).toString()
}
