# Changelog

## 2026-11-02

### Fixed

- Vite 8.3.5 と React プラグイン 6.1.2 を同時に更新し、プラグインだけの更新でビルドが失敗する問題を回避。従来のブラウザ対応範囲を維持した。

## 2026-10-22

### Fixed

- TypeScript 7.0.2 の型検査と、TypeScript 6.0.3 APIを使うESLintを分離し、更新後もlintを実行できるようにした。

- npm run build でもBunを必要とせず、同じTypeScript 7型検査とViteビルドを実行できるよう修正。
