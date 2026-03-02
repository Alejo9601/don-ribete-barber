import bcrypt from 'bcrypt'

const BCRYPT_ROUNDS = 12

export async function hashPassword(password: string) {
  return bcrypt.hash(password, BCRYPT_ROUNDS)
}

export async function verifyPassword(password: string, persistedValue: string) {
  if (!persistedValue.startsWith('$2')) {
    return {
      isValid: password === persistedValue,
      needsUpgrade: true
    }
  }

  return {
    isValid: await bcrypt.compare(password, persistedValue),
    needsUpgrade: false
  }
}
