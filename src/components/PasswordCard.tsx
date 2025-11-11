import { useState } from 'react'
import { downloadPassword } from '../utils/downloadUtils'

interface PasswordCardProps {
  title: string
  description: string
  value: string
}

/**
 * パスワード表示カードコンポーネント
 */
export function PasswordCard({ title, description, value }: PasswordCardProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  const handleDownload = () => {
    downloadPassword(title, value)
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="mb-3">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
      </div>

      <div className="bg-gray-50 dark:bg-gray-900 rounded-md p-4 mb-4 font-mono text-sm break-all">
        <code className="text-gray-800 dark:text-gray-200">{value}</code>
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleCopy}
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
        >
          {copied ? '✓ コピー完了' : 'コピー'}
        </button>
        <button
          onClick={handleDownload}
          className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
          title="テキストファイルとしてダウンロード"
        >
          保存
        </button>
      </div>
    </div>
  )
}
