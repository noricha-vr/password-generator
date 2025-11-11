/**
 * テキストファイルとしてダウンロードするユーティリティ
 */

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
  const filename = `password-${title.replace(/[^a-zA-Z0-9]/g, '-')}-${Date.now()}.txt`
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

  const timestamp = Date.now()
  const filename = `passwords-${timestamp}.txt`
  downloadAsTextFile(content, filename)
}
