import { useState, useEffect } from 'react'
import { PasswordCard } from './components/PasswordCard'
import {
  generateAlphanumeric,
  generateAlphanumericWithSymbols,
  generateNumeric,
  generateUUID,
  generateHex,
  generateBase64,
  generateMemorablePassword,
  generatePIN,
} from './utils/passwordGenerator'
import { downloadAllPasswords } from './utils/downloadUtils'

interface PasswordItem {
  id: string
  title: string
  description: string
  generator: () => string
  value: string
}

function App() {
  const [passwords, setPasswords] = useState<PasswordItem[]>([])

  const initializePasswords = (): PasswordItem[] => [
    {
      id: 'alphanumeric-16',
      title: '英数字 (16文字)',
      description: '大小英字と数字を含む標準的なパスワード',
      generator: () => generateAlphanumeric(16),
      value: '',
    },
    {
      id: 'alphanumeric-24',
      title: '英数字 (24文字)',
      description: 'より長い英数字パスワード',
      generator: () => generateAlphanumeric(24),
      value: '',
    },
    {
      id: 'with-symbols-16',
      title: '英数字+記号 (16文字)',
      description: '記号を含む強力なパスワード',
      generator: () => generateAlphanumericWithSymbols(16),
      value: '',
    },
    {
      id: 'with-symbols-24',
      title: '英数字+記号 (24文字)',
      description: 'より長い強力なパスワード',
      generator: () => generateAlphanumericWithSymbols(24),
      value: '',
    },
    {
      id: 'numeric-8',
      title: '数字のみ (8桁)',
      description: '数字のみのコード',
      generator: () => generateNumeric(8),
      value: '',
    },
    {
      id: 'pin-6',
      title: 'PINコード (6桁)',
      description: 'ATMやスマホ用のPINコード',
      generator: () => generatePIN(6),
      value: '',
    },
    {
      id: 'uuid',
      title: 'UUID',
      description: 'ユニバーサルユニーク識別子',
      generator: generateUUID,
      value: '',
    },
    {
      id: 'hex-32',
      title: 'HEX (32文字)',
      description: '16進数文字列',
      generator: () => generateHex(32),
      value: '',
    },
    {
      id: 'hex-64',
      title: 'HEX (64文字)',
      description: 'より長い16進数文字列',
      generator: () => generateHex(64),
      value: '',
    },
    {
      id: 'base64',
      title: 'Base64',
      description: 'Base64エンコードされた文字列',
      generator: () => generateBase64(24),
      value: '',
    },
    {
      id: 'memorable',
      title: '覚えやすいパスワード',
      description: '単語と数字の組み合わせ',
      generator: generateMemorablePassword,
      value: '',
    },
  ]

  const generateAllPasswords = () => {
    const items = initializePasswords()
    setPasswords(items.map((item) => ({ ...item, value: item.generator() })))
  }

  useEffect(() => {
    generateAllPasswords()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-highlight/20 to-neutral/30 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            ランダムパスワード生成
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            いろんなタイプのパスワードを自動生成。ワンクリックでコピーできます。
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => downloadAllPasswords(passwords)}
              className="bg-secondary hover:bg-secondary-hover text-white font-semibold py-3 px-8 rounded-lg shadow-md transition-colors"
            >
              すべてダウンロード
            </button>
            <button
              onClick={generateAllPasswords}
              className="bg-primary hover:bg-primary-hover text-white font-semibold py-3 px-8 rounded-lg shadow-md transition-colors"
            >
              すべて再生成
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {passwords.map((password) => (
            <PasswordCard
              key={password.id}
              title={password.title}
              description={password.description}
              value={password.value}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
