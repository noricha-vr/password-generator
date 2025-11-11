/**
 * パスワード生成ユーティリティ
 */

/**
 * 指定された文字セットと長さでランダムな文字列を生成
 */
function generateFromCharset(charset: string, length: number): string {
  const array = new Uint32Array(length)
  crypto.getRandomValues(array)
  return Array.from(array, (num) => charset[num % charset.length]).join('')
}

/**
 * 英数字のみのパスワードを生成
 */
export function generateAlphanumeric(length: number = 16): string {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  return generateFromCharset(charset, length)
}

/**
 * 英数字+記号のパスワードを生成
 */
export function generateAlphanumericWithSymbols(length: number = 16): string {
  const charset =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{}|;:,.<>?'
  return generateFromCharset(charset, length)
}

/**
 * 数字のみのパスワードを生成
 */
export function generateNumeric(length: number = 8): string {
  const charset = '0123456789'
  return generateFromCharset(charset, length)
}

/**
 * UUIDを生成
 */
export function generateUUID(): string {
  return crypto.randomUUID()
}

/**
 * HEX文字列を生成
 */
export function generateHex(length: number = 32): string {
  const charset = '0123456789abcdef'
  return generateFromCharset(charset, length)
}

/**
 * BASE64エンコードされたランダム文字列を生成
 */
export function generateBase64(length: number = 16): string {
  const array = new Uint8Array(length)
  crypto.getRandomValues(array)
  return btoa(String.fromCharCode(...array))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '')
}

/**
 * 覚えやすい単語ベースのパスワードを生成
 */
export function generateMemorablePassword(): string {
  const words = [
    'apple', 'banana', 'cherry', 'dragon', 'elephant', 'forest', 'garden', 'honey',
    'island', 'jungle', 'king', 'lion', 'mountain', 'night', 'ocean', 'palace',
    'queen', 'river', 'sunset', 'tiger', 'universe', 'valley', 'winter', 'yellow'
  ]

  const array = new Uint32Array(4)
  crypto.getRandomValues(array)

  const selectedWords = Array.from(array.slice(0, 3), (num) => words[num % words.length])
  const number = array[3] % 1000

  return selectedWords.map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('-') + '-' + number
}

/**
 * PINコードを生成
 */
export function generatePIN(length: number = 6): string {
  return generateNumeric(length)
}
