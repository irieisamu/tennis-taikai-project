# Handoff: Tennis Tournament UI (Mobile)

## Overview

Tennis365風のテニス大会情報サービスの **スマホ向け（iPhone 375px幅）UIデザイン一式**。全国のスクール主催のテニス大会を横断検索・詳細確認・レポート閲覧できる、および提携スクールのコーチ求人を掲載する5画面構成のモバイルWeb。Tennis365主催大会は掲載しない方針。参考: https://tennis365.net/

## About the Design Files

このバンドルに含まれる HTML / JSX は **HTMLで作成されたデザインリファレンス**（意図した見た目と挙動を示すプロトタイプ）であり、そのまま本番投入する完成コードではありません。実装時は、対象プロダクトの既存環境（Next.js / Nuxt / SwiftUI / Flutter / RN など）とその確立されたパターン・コンポーネントライブラリを使ってこのHTMLデザインを **再実装** してください。既存環境がまだ無い場合は、プロジェクトに最も適したフレームワークを選定した上で実装してください。

## Fidelity

**High-fidelity (hifi)** — 最終確定に近いカラー・タイポグラフィ・余白・角丸・シャドウ、コンポーネント階層を持っています。ピクセルパーフェクトで再現することを推奨します。ただし以下の点は差し替え前提です:
- 画像は **プレースホルダー**（ストライプ + monospace説明ラベル）です。実装時にはCMSまたは大会主催者の入稿画像を差し込んでください。
- 地図は SVG 疑似表示です。実装時は Google Maps JavaScript API または Mapbox 埋め込みに置き換えてください。

---

## Site Map / Screens

1. **TOP** — 大会検索トップ
2. **一覧** — 検索結果ページ（スクール主催大会のみ）
3. **詳細** — 大会詳細
4. **大会レポート一覧** — スクール別レポート一覧
5. **コーチ求人** — スクールのコーチ採用情報

---

## Screens / Views

### 1. TOP (`screen_top.jsx` → `ScreenTop`)

**Purpose**: ユーザーが条件を絞って大会を探し始める入口。スクール主催大会を一覧で見せる。

**Layout**:
- 縦1カラム、全体幅 375px 固定（コンテンツ幅）
- スクロールセクション: ①グローバルヘッダー → ②ヒーロー（検索ボックス埋め込み） → ③条件アコーディオン群 → ④月ナビ → ⑤スクール主催セクション + ページネーション → ⑥スクール向けCTA → ⑦フッター

**Components**:

- **グローバルヘッダー** (`TsHeader` in `shared.jsx`)
  - 高さ: content padding `10px 16px`, `background: #1a2e1f`, 下端に `border-bottom: 2px solid #6C9E1D`
  - 左: ロゴ（24×24 角丸6px `#6C9E1D` にラケット風SVGアイコン, 白ボーダー1.2px）+ `TENNIS365` ワードマーク (Manrope 800, 13px, letter-spacing 0.14em, "365"部分は `#6C9E1D`)
  - 右: 検索アイコン（32×32, 角丸8px, 透明背景, ボーダー `rgba(255,255,255,0.18)`）+ ハンバーガー

- **ヒーロー**
  - 背景: `linear-gradient(160deg, #1a2e1f 0%, #24402a 55%, #2f5236 100%)` + 右下にコートライン風 SVG（opacity 0.16, brand green）
  - Eyebrow: "TOURNAMENT SEARCH" (Manrope 700, 10px, letter-spacing 0.2em, `#6C9E1D`)
  - タイトル: Noto Sans JP 800, 22px, line-height 1.35, `#ffff`
  - サブ: 11.5px `#c4d0c1`
  - 検索インプット: 白背景, 角丸4px, `padding 10px 12px`, `box-shadow 0 6px 20px rgba(0,0,0,0.18)`, 左に虫眼鏡アイコン、`placeholder: 大会名・会場名で探す`

- **条件アコーディオン** (`TsAccordion` in `shared.jsx`)
  - 初期状態: **すべて開いた状態**（視認性優先）
  - コンテナ: 白背景 + 上端に `border-top: 3px solid #6C9E1D`
  - 見出しバー: `padding: 14px 16px`, 左に3px×14px の brand green バーティカルアクセント + Noto Sans JP 600 13.5px + 選択数バッジ + 右に▼シェブロン（open時180°回転, transition 0.2s）
  - 項目:
    1. **開催月** — `<select>`（appearance:none, 独自シェブロン）。`2026年 7月` 等
    2. **都道府県** — 2列グリッドチェックボックス。「複数選択」バッジ表示。「すべての都道府県を表示 ›」リンクあり
    3. **カテゴリ** — 一般 / ジュニア（複数選択）
    4. **種別** — 男子S, 女子S, 男子D, 女子D, 混合D, 団体戦
    5. **レベル** — 初級, 初中級, 中級, 中上級, 上級, オープン
  - チェックボックス (`TsCheck`): 18×18px, 角丸4px, 未選択 `border 1.5px solid #e7e2d3`, 選択 `background: #6C9E1D` + 白いレ点SVG
  - 検索ボタン: `TsBtn size="lg" variant="brand" full`

- **月ナビ**
  - 3セグメント横並び (前月ボタン / 現在月 / 次月ボタン)
  - 現在月セグメント: `background: #1a2e1f`, `color: #ffff`, `2026 / 07` (Manrope 700 11px letter-spacing 0.1em)
  - 前後月ボタン: 透明背景, `#4d7615` fontWeight 600 11.5px, ‹ / › SVG付き

- **セクション見出し** (`TsSectionHead`)
  - Eyebrow (Manrope 700 10px letter-spacing 0.16em `#6C9E1D`) + タイトル (Noto Sans JP 700 16px `#1a2e1f`) + 右に "すべて見る ›"

- **検索結果カード** (`ResultCard`, 画像なし・コンパクト)
  - `padding: 14px 14px 12px`, `background: #fff`, `border: 1px solid #e7e2d3`, `border-radius: 4px`
  - 左端に3pxの borderLeft ストライプ: スクール主催 = `#C89B3C`
  - 上段: 日付 (Manrope 800 15px `#1a2e1f`) + 曜日 (日=`#b5432e` / 土=`#2f6db5` / 平日=muted) / ステータスバッジ
  - タイトル: 13.5px 700, line-height 1.45
  - 会場: 10.5px muted + ピンSVGアイコン
  - 下段（点線区切り, `1px dashed #efeadc`）: 種別 / カテゴリ / レベル の outline バッジ

- **ページネーション**: 28×28px, 現在 `#1a2e1f`背景・白文字、他は白背景 `border 1px solid #e7e2d3`, `border-radius 3px`

- **スクール向けCTAブロック**
  - `background: #1a2e1f`, `color: #fff`, `padding: 20px 18px`, `border-radius 4px`
  - 右上に100×100の brand green リング装飾 (opacity 0.25)
  - Eyebrow "FOR SCHOOLS"、タイトル "大会を主催したいスクール様はこちら"、説明文、CTA "お問い合わせフォームへ" (brand button)

- **フッター** (`TsFooter`)
  - `#1a2e1f` 背景, ロゴ + 2列リンクグリッド, ©表記

---

### 2. 一覧 (`screen_list.jsx` → `ScreenList`)

**Purpose**: フィルタ済み検索結果をリストで見せる。

**Layout差分（TOPと共通のヘッダー/条件/月ナビを踏襲）**:
- ヘッダーに `showBack` を渡し、戻る矢印表示
- パンくず (`TsCrumb`): `HOME › 大会検索 › 一覧`
- 条件アコーディオンは同じ仕様（初期状態ですべて開いた状態、選択数バッジで状態表示）
- 検索結果ヘッダ: "142件の大会" (数字は Manrope 800 18px) + ソート切替 (`開催日順` / `受付順`)
- **統合検索結果カード** (`ResultRow`):
  - 左端 3px の borderLeft ストライプ（`#C89B3C` accent gold）でスクール主催であることを示す
  - 日付ブロックは 42px 幅の左カラムに年+日付+曜日を積む
  - 会場行は主催者名を優先表示

---

### 3. 詳細 (`screen_detail.jsx` → `ScreenDetail`)

**Purpose**: 大会1件の全情報を提示し、申込CTAへ導く。

**Layout**:
- パンくず → ステータスバー (`スクール主催` + `キャンセル待ち 0組` バッジ) → タイトル + サブタイトル → メイン画像+サムネイル4枚 → Quick Facts (`FactRow`, ダーク背景に2×2アイコングリッド) → **4タブ** (`概要 / 大会情報 / 会場 / その他`, sticky) → タブ内容 → 他のおすすめ大会 → 関連リンクタイル (2×2) → フッター → **下部固定申込CTA**

**Tab 1: 概要**
- 「イベント内容」「参加資格」「チーム構成」「時間」を小見出し (`SubHead` = 3px×12px brand bar + 13px 700)+ 本文
- 「コンセプト」カード: `background: #f1f5e3`, `border-left: 3px solid #6C9E1D`, Manrope 700 "CONCEPT" eyebrow
- 「過去の大会結果はこちら」リンクブロック（矢印右寄せ）
- 「駐車場・受付場所」アラート: cream 系背景 (`#fdf6e6`, border `#fbf3df`)

**Tab 2: 大会情報**
- 定義リスト風テーブル（左列: cream背景 88px, 700 muted / 右列: 本文, `border-bottom: 1px solid #efeadc`）
- 補足リスト（cream背景の ul）
- 雨天時: 情報系 (青系 `#eef4fb` border `#d8e5f2`) / 中止時: 注意系 (accent cream)
- 緊急連絡先カード: `#1a2e1f` 背景 + brand green電話アイコン + 電話番号 Manrope 800 15px
- 申し込み方法セクション + 主催スクールの連絡先メール表示

**Tab 3: 会場**
- 会場名 + アクセス
- **地図** (`MapPlaceholder`): 180px, 疑似SVGマップ + 中央にドロップシャドウ付き brand green ピン + 左上の会場名ラベル + 右下 `+ / −` ズームUI
- 「Google Mapで開く ›」リンク
- 施設情報テーブル（住所 / アクセス / TEL / 営業時間 / HP）
- 設備タグ群 (`TsBadge variant="outline"` を wrap 表示)

**Tab 4: その他**
- アピールポイントテキスト + 施設写真プレースホルダー

**下部固定CTA**:
- position: absolute, bottom: 0, `background: rgba(255,255,255,0.96)` + `backdrop-filter: blur(10px)`, `box-shadow: 0 -6px 20px rgba(0,0,0,0.08)`
- 44×44 のブックマーク（ハート）ボタン + `TsBtn full size="lg" variant="brand"` "この大会に申し込む"

**関連リンクタイル**:
- 2×2 グリッド, 各タイルにブランド緑のミニアイコンSVG + 12.5px 700 タイトル + 10.5px muted 説明
- 種類: `大会レポート` / `スクール体験` / `レンタルコート` / `コーチ求人`

---

### 4. 大会レポート一覧 (`screen_report.jsx` → `ScreenReport`)

**Purpose**: 特定スクールが過去に開催した大会のレポートを新着順に見せる。

**Components**:

- **スクールヘッダー**
  - 56×56 の `#1a2e1f` 背景アイコンボックス（brand green のテニスラケット風SVG）
  - Eyebrow "SCHOOL"、名前（例: "HATS Tennis Academy"）15px 800、メタ情報
  - 実績スタッツ 3カラム (`Stat`): 開催数 284 / 参加者 12,480 / 満足度 4.7 ★
    - 数字: Manrope 800 18px, ラベル: 10px muted letter-spacing 0.05em
- **フィルタチップ**（横スクロール pill）: `すべて` / `2026` / `2025` / `2024` / `一般` / `ジュニア`
  - 選択中: `#1a2e1f` 背景・白、非選択: 白背景 border `#e7e2d3`, radius 100
- **件数バー**: "68件" + 新着順
- **ハイライトレポート** (`FeatureReport`):
  - `border-left: 3px solid #6C9E1D`, 上部に170pxの画像 + 左上に `ink` バッジ "最新レポート"
  - 中: 日付 (Manrope 700 `#4d7615`) + カテゴリバッジ + タイトル + "レポートを読む ›"
- **通常レポート行** (`ReportRow`):
  - 左に 84×64 の画像サムネ + 右に日付/バッジ/タイトル/詳細リンク
- ページネーション + フッター

---

### 5. コーチ求人 (`screen_coach.jsx` → `ScreenCoach`)

**Purpose**: 荏原湘南スポーツセンターのコーチ・契約社員募集要項一式を伝え、応募・電話問い合わせへ導く。

**Components**:

- **ヒーロー**（TOPと同系の暗緑グラデ + テニスコート/ボール軌道のSVG装飾）
  - Eyebrow "COACH RECRUITMENT"
  - タイトル "私たちと一緒に働きませんか？" 22px 800
  - 施設名 "荏原湘南スポーツセンター" 14px 700 `#e2ecd8`
  - 補足 "神奈川県藤沢市・茅ヶ崎市｜正社員登用あり"

- **施設ギャラリー**: 3カラム × 2行のグリッド（左は縦2マスの大画像、他は正方形の小画像）

- **活動内容テーブル** (`SectionEyebrow "ABOUT / 活動内容"`)
  - 定義リスト形式（左: 80px, 11px 700 `#4d7615` letter-spacing 0.02em / 右: 12.5px `#1a2e1f`, line-height 1.75）
  - 行: 企業名 / 施設名称 / 募集職種 / 勤務地 / 応募資格

- **給与セクション** (`SalaryBlock`)
  - カード: `border 1px solid #e7e2d3`, `border-radius 3px`, 上端に cream ヘッダ帯
  - ヘッダに条件ごとにサブタイトル + 特別な場合は accent バッジ "正社員登用あり"
  - 各行: `新卒 / 中途 / 専属 / アルバイト / 業務委託` のラベル（brand tint 背景の pill）+ 給与主文（12.5px 700）+ 補足（10.5px muted）
  - 契約社員 と 契約テニスコーチ の2ブロック

- **待遇セクション** (`BenefitBlock`)
  - タイトル + タグ群（各タグは白背景 + border, 左に brand green ✓）
  - 3ブロック: 契約社員 / 契約テニスコーチ(専属・アルバイト) / 契約テニスコーチ(業務委託)

- **応募・お問い合わせカード** (dark bg)
  - `#1a2e1f` 背景, brand borderのサブカードにお電話 `0466-81-3411` (Manrope 800 18px) + メール `contactus@ebarassc.co.jp`

- **コーチコメント** (`CoachCard`)
  - 56×56 円形アイコン(placeholder) + 名前 / 年齢 / "「〜」" コメント
  - 千葉総一郎コーチのみ「インタビュー詳細はこちら ›」リンクあり

- **下部固定CTA**: 電話ボタン (outline) + "応募フォームへ" (brand)

---

## Interactions & Behavior

- **アコーディオン**: クリックでopen/close, シェブロンは `transform: rotate(180deg)` + `transition 0.2s`
- **タブ (詳細)**: `position: sticky; top: 0; z-index: 5` でスクロール時にタブ帯が固定
- **サムネイル選択 (詳細)**: 選択中サムネにのみ `border: 2px solid #6C9E1D` を付与
- **ナビゲーション**:
  - TOP → 検索結果カードクリックで詳細へ / セクション "すべて見る" で一覧へ / 主催者スクール名で大会レポート一覧へ / フッターまたは詳細内 "コーチ求人" タイルで求人へ
- **月ナビ**: 前月/次月クリックで検索条件の "開催月" を上書きし再検索
- **固定CTA**: 詳細・コーチ求人画面ではスクロール量に関わらず画面下端に固定表示
- **ホバー/フォーカス**: このデザインはタッチ前提でホバー状態は最小限。フォーカスリングはブラウザデフォルトを尊重（アクセシビリティ）
- **フィルタチップ**: 横方向スクロール可能。選択時は `#1a2e1f` にトグル

---

## State Management

各画面で保持する状態:

- **TOP / 一覧**:
  - `filters`: `{ month: '2026-07', prefectures: string[], categories: string[], types: string[], levels: string[], keyword: string }`
  - `accordionOpen`: `{ month, pref, cat, type, level }` の bool マップ
  - `page`: 現在ページ番号
  - `sort`: `'date' | 'accept'`（一覧のみ）
- **詳細**:
  - `tabIdx`: 0..3
  - `galIdx`: サムネイル選択インデックス
  - `bookmarked`: bool（ブックマーク機能を実装する場合）
- **大会レポート**:
  - `filter`: `'all' | year | category`
  - `page`
- **コーチ求人**: 状態なし（静的コンテンツ + ページ内リンク）

### データ取得

- 検索結果はサーバサイドフィルタ推奨（`GET /api/tournaments?month=&prefs=&cats=&types=&levels=&page=&sort=`）
- Tennis365主催大会は掲載しない方針のため、レスポンスはスクール主催大会のみを返す
- レスポンス形状（1件）:
  ```json
  {
    "id": "string",
    "date": "2026-08-09",
    "weekday": "日",
    "prefecture": "東京都",
    "venue": "京王テニスクラブ",
    "title": "HATSカップ ... 団体戦",
    "category": "一般",
    "type": "団体戦",
    "level": "初〜中級",
    "status": "open|fill|wait|close",
    "hostType": "school",
    "host": "..."
  }
  ```
- 詳細ページ: `GET /api/tournaments/:id` + `GET /api/tournaments/:id/related`
- レポート: `GET /api/schools/:id/reports?year=&category=&page=`

---

## Design Tokens

`shared.jsx` の `T` オブジェクトに集約。実装時は CSS 変数 / theme に写してください。

### Colors

| Token | Hex | 用途 |
|---|---|---|
| `--ink` | `#1a2e1f` | 主要テキスト・ダーク面 |
| `--ink-soft` | `#2e4232` | やや薄い本文 |
| `--muted` | `#6b7565` | 補助テキスト |
| `--hint` | `#8b9385` | 最弱テキスト・区切り |
| `--line` | `#e7e2d3` | 標準罫線 |
| `--line-soft` | `#efeadc` | 薄い罫線 |
| `--cream` | `#f7f4ec` | 画面背景 |
| `--paper` | `#ffffff` | カード背景 |
| `--brand` | `#6C9E1D` | tennis365 ブランドグリーン（プライマリCTA・アクセント） |
| `--brand-deep` | `#4d7615` | brand hover/text |
| `--brand-ink` | `#2b4210` | 極濃brand |
| `--brand-tint` | `#f1f5e3` | brand background tint |
| `--accent` | `#C89B3C` | スクール主催・ゴールド強調 |
| `--accent-tint` | `#fbf3df` | accent tint |
| `--danger` | `#b5432e` | 日曜・エラー |
| `--info` | `#2f6db5` | 土曜・情報 (ハードコード) |

### Typography

- **和文**: `"Noto Sans JP", "Hiragino Sans", "Yu Gothic", system-ui, sans-serif`
- **欧文/数字**: `"Manrope", "Noto Sans JP", system-ui, sans-serif` (class `.ts-en`)
- letter-spacing: 本文 0.01em, 見出し 0.02em, eyebrow 0.14〜0.2em, small caps系 0.08em
- サイズ: 9.5 / 10 / 10.5 / 11 / 11.5 / 12 / 12.5 / 13 / 13.5 / 14 / 15 / 16 / 18 / 22
- Weight: 400 (body), 500-600 (secondary), 700 (heading), 800 (emphasis / numeric)

### Spacing

- パディング: `padding: 10px 16px` (header), `14px 16px` (accordion), `12px 14px` (card), `16px` (section)
- カード間ギャップ: 8px
- セクション上余白: 20px / 24px

### Border Radius

- 3px = カード/バッジ標準（tennis365的な直角寄り）
- 4px = 一部の画像・大きめカード
- 100 (pill) = フィルタチップ
- 9999 (fully round) = アイコンボタン内

### Shadows

- カード: なし（罫線のみ）
- 検索インプット: `0 6px 20px rgba(0,0,0,0.18)`
- 固定CTA: `0 -6px 20px rgba(0,0,0,0.08)`
- 地図ピン: `drop-shadow(0 2px 4px rgba(0,0,0,0.3))`

---

## Assets

すべての画像は **プレースホルダー**（135°ストライプ + monospace ラベル）です。実装時に以下を差し込みます:

- 大会詳細メイン画像 + 4枚のサムネイル（ギャラリー）
- 大会レポート ハイライト画像
- 大会レポート 各行サムネイル
- コーチ求人 施設ギャラリー 5枚
- コーチ顔写真 3枚
- 地図: Google Maps 埋め込みで置き換え

アイコンはインライン SVG で描画済み（ロゴのテニスラケット風マーク、検索、ハンバーガー、ピン、時計、カレンダー、電話、シェブロン等）。既存アイコンセット（Lucide / Heroicons など）で置換可。

---

## Files

デザインの実体は以下のファイルに含まれます:

- `index.html` — 5画面を iPhone 375 フレームで並べたキャンバス（プレビュー用エントリ）
- `shared.jsx` — 共通トークン `T` + 共通コンポーネント (`TsHeader`, `TsCrumb`, `TsAccordion`, `TsCheck`, `TsBadge`, `TsImgSlot`, `TsSectionHead`, `TsBtn`, `TsFooter` は screen_top.jsx に定義)
- `screen_top.jsx` — TOP画面 + `ResultCard` + `Pagination` + `TsFooter` + `MOCKS`
- `screen_list.jsx` — 一覧画面 + `ResultRow` + `SortBtn`
- `screen_detail.jsx` — 詳細画面 + タブ4種 + `MapPlaceholder` + `FactRow` + `MiniCard` + `LinkTile` + `SubHead`
- `screen_report.jsx` — レポート一覧 + `Stat` + `FeatureReport` + `ReportRow`
- `screen_coach.jsx` — コーチ求人 + `SalaryBlock` + `BenefitBlock` + `CoachCard` + `SectionEyebrow`

補助:
- `ios_frame.jsx` — レビュー用 iPhone フレーム（本番実装には不要）
- `design_canvas.jsx` — レビュー用キャンバス（本番実装には不要）

---

## Implementation Notes

- **モバイル特化**: 375px 幅で最適化。タブレット・PCへの展開が必要な場合は、二段組みや余白を広げるレスポンシブ層を追加してください。
- **Sticky タブ (詳細)**: `position: sticky; top: 0;` を使用。埋め込みヘッダーやSafariの慣性スクロールとの相性に注意。
- **`backdrop-filter`**: 下部固定CTAで使用。iOS/Safariでは動くが、Chrome Androidの古いバージョンで劣化する可能性あり。フォールバックは半透明白のみで十分。
- **アクセシビリティ**:
  - チェックボックスとタブに適切な `role` / `aria-selected` / `aria-controls` を付与
  - 曜日の色分けは色のみに依存しないよう、必要ならばテキストにも「日曜」等の情報を追加
  - フォーカスリングをブラウザデフォルトから明示的なアウトラインへ改善
- **フォント読み込み**: `shared.jsx` が Google Fonts を動的追加していますが、実装時は `<link rel="preconnect">` + `<link rel="stylesheet">` として静的に配置してください。
