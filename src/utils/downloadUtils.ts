/**
 * テキストファイルとしてダウンロードするユーティリティ
 */

/**
 * 現在時刻を YYYYMMDD-HHMMSS 形式でフォーマット
 */
function formatTimestamp(): string {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')
  return `${year}${month}${day}-${hours}${minutes}${seconds}`
}

/**
 * テキストをファイルとしてダウンロード
 */
export function downloadAsTextFile(content: string, filename: string): void {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

/**
 * 単一のパスワードをダウンロード
 */
export function downloadPassword(title: string, value: string): void {
  const content = `${title}\n${'='.repeat(title.length)}\n\n${value}\n`
  const timestamp = formatTimestamp()
  const filename = `${timestamp}.txt`
  downloadAsTextFile(content, filename)
}

/**
 * 複数のパスワードをまとめてダウンロード
 */
export function downloadAllPasswords(
  passwords: Array<{ title: string; description: string; value: string }>
): void {
  const date = new Date().toLocaleString('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })

  let content = `生成されたパスワード一覧\n`
  content += `生成日時: ${date}\n`
  content += `${'='.repeat(50)}\n\n`

  passwords.forEach((password, index) => {
    content += `${index + 1}. ${password.title}\n`
    content += `   説明: ${password.description}\n`
    content += `   値: ${password.value}\n\n`
  })

  const timestamp = formatTimestamp()
  const filename = `${timestamp}.txt`
  downloadAsTextFile(content, filename)
}
