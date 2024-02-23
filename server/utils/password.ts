import { randomBytes, scrypt, timingSafeEqual } from 'node:crypto'
import { Buffer } from 'node:buffer'

export function usePassword() {
  const { passwordPepper } = useRuntimeConfig()
  const keyLength = 32

  async function hash(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const salt = randomBytes(16).toString('hex')
      scrypt(password + passwordPepper, salt, keyLength, (err, derivedKey) => {
        if (err)
          reject(err)
        resolve(`${salt}.${derivedKey.toString('hex')}`)
      })
    })
  }

  async function compare(password: string, hash: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const [salt, hashKey] = hash.split('.')
      const hashKeyBuff = Buffer.from(hashKey, 'hex')
      scrypt(password + passwordPepper, salt, keyLength, (err, derivedKey) => {
        if (err)
          reject(err)
        resolve(timingSafeEqual(hashKeyBuff, derivedKey))
      })
    })
  }

  return { hash, compare }
}
