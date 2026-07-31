// screen_top.jsx — TOP
function ScreenTop() {
  const [open, setOpen] = React.useState({ month: false, pref: false, cat: false, type: false, level: false });
  const toggle = (k) => setOpen(o => ({ ...o, [k]: !o[k] }));

  return (
    <div className="ts-screen ts-tap" style={{ minHeight: '100%', paddingBottom: 40 }}>
      <TsHeader title="大会検索" />

      {/* Hero */}
      <div style={{
        position: 'relative', overflow: 'hidden',
        background: `linear-gradient(160deg, ${T.ink} 0%, #24402a 55%, #2f5236 100%)`,
        color: '#fff', padding: '22px 16px 26px',
      }}>
        {/* コート風のライン装飾 */}
        <svg viewBox="0 0 375 200" style={{ position: 'absolute', right: -40, bottom: -20, width: 260, height: 160, opacity: 0.16 }}>
          <rect x="10" y="10" width="180" height="120" stroke={T.brand} strokeWidth="1.5" fill="none"/>
          <line x1="100" y1="10" x2="100" y2="130" stroke={T.brand} strokeWidth="1"/>
          <line x1="10" y1="70" x2="190" y2="70" stroke={T.brand} strokeWidth="1"/>
          <line x1="10" y1="40" x2="190" y2="40" stroke={T.brand} strokeWidth="1"/>
          <line x1="10" y1="100" x2="190" y2="100" stroke={T.brand} strokeWidth="1"/>
        </svg>
        <div style={{ position: 'relative' }}>
          <div className="ts-en" style={{ fontSize: 10, letterSpacing: '0.2em', color: T.brand, fontWeight: 700, marginBottom: 6 }}>
            TOURNAMENT SEARCH
          </div>
          <h1 style={{ fontSize: 22, fontWeight: 800, margin: '0 0 4px', lineHeight: 1.35, letterSpacing: '0.02em' }}>
            全国のテニス大会を、<br/>もっと簡単に。
          </h1>
          <p style={{ fontSize: 11.5, color: '#c4d0c1', margin: '0 0 16px', lineHeight: 1.6 }}>
            Tennis365主催・全国スクール主催の大会を横断検索
          </p>
          {/* キーワード検索 */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: '#fff', borderRadius: 4, padding: '10px 12px',
            boxShadow: '0 6px 20px rgba(0,0,0,0.18)',
          }}>
            <svg width="16" height="16" viewBox="0 0 16 16"><circle cx="7" cy="7" r="5" stroke={T.muted} strokeWidth="1.5" fill="none"/><path d="M11 11l3.5 3.5" stroke={T.muted} strokeWidth="1.5" strokeLinecap="round"/></svg>
            <input placeholder="大会名・会場名で探す" style={{
              flex: 1, border: 0, outline: 'none', fontSize: 13, color: T.ink, fontFamily: 'inherit', background: 'transparent',
            }}/>
          </div>
        </div>
      </div>

      {/* 条件から探す（アコーディオン） */}
      <div style={{ background: T.paper, borderTop: `3px solid ${T.brand}` }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '14px 16px 10px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <svg width="16" height="16" viewBox="0 0 16 16"><path d="M2 3h12M4 8h8M6 13h4" stroke={T.ink} strokeWidth="1.6" strokeLinecap="round"/></svg>
            <div style={{ fontSize: 14, fontWeight: 700, color: T.ink }}>条件から探す</div>
          </div>
          <button style={{
            fontSize: 11, color: T.muted, background: 'transparent', border: 'none', cursor: 'pointer', fontWeight: 600,
          }}>すべてクリア</button>
        </div>
        <TsAccordion label="開催月" open={open.month} onToggle={() => toggle('month')}>
          <div style={{ position: 'relative' }}>
            <select style={{
              width: '100%', padding: '11px 32px 11px 12px', fontSize: 13, fontFamily: 'inherit',
              border: `1px solid ${T.line}`, borderRadius: 3, background: '#fff', color: T.ink,
              appearance: 'none', cursor: 'pointer',
            }}>
              <option>2026年 7月</option>
              <option>2026年 8月</option>
              <option>2026年 9月</option>
            </select>
            <svg width="10" height="6" viewBox="0 0 10 6" style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
              <path d="M1 1l4 4 4-4" stroke={T.muted} strokeWidth="1.6" fill="none" strokeLinecap="round"/>
            </svg>
          </div>
        </TsAccordion>
        <TsAccordion label="都道府県" open={open.pref} count="複数選択" onToggle={() => toggle('pref')}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px 12px' }}>
            {['東京都','神奈川県','千葉県','埼玉県','大阪府','京都府','兵庫県','愛知県'].map((p, i) =>
              <TsCheck key={p} label={p} checked={i === 0 || i === 1} onChange={() => {}} small />
            )}
          </div>
          <button style={{ marginTop: 6, fontSize: 11, color: T.brandDeep, background: 'transparent', border: 'none', cursor: 'pointer', padding: 0, fontWeight: 600 }}>
            すべての都道府県を表示 ›
          </button>
        </TsAccordion>
        <TsAccordion label="カテゴリ" open={open.cat} onToggle={() => toggle('cat')}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px 12px' }}>
            <TsCheck label="一般" checked onChange={() => {}} small />
            <TsCheck label="ジュニア" checked={false} onChange={() => {}} small />
          </div>
        </TsAccordion>
        <TsAccordion label="種別" open={open.type} onToggle={() => toggle('type')}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px 12px' }}>
            {['男子シングルス','女子シングルス','男子ダブルス','女子ダブルス','混合ダブルス','団体戦'].map(x =>
              <TsCheck key={x} label={x} checked={false} onChange={() => {}} small />
            )}
          </div>
        </TsAccordion>
        <TsAccordion label="レベル" open={open.level} onToggle={() => toggle('level')}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px 12px' }}>
            {['初級','初中級','中級','中上級','上級','オープン'].map(x =>
              <TsCheck key={x} label={x} checked={false} onChange={() => {}} small />
            )}
          </div>
        </TsAccordion>
        <div style={{ padding: '16px' }}>
          <TsBtn full size="lg" variant="brand">
            <svg width="14" height="14" viewBox="0 0 16 16"><circle cx="7" cy="7" r="5" stroke="#fff" strokeWidth="1.6" fill="none"/><path d="M11 11l3.5 3.5" stroke="#fff" strokeWidth="1.6" strokeLinecap="round"/></svg>
            この条件で検索する
          </TsBtn>
        </div>
      </div>

      {/* 月ナビゲーション */}
      <div style={{
        display: 'flex', alignItems: 'stretch', margin: '12px 16px 6px',
        background: T.paper, border: `1px solid ${T.line}`, borderRadius: 4, overflow: 'hidden',
      }}>
        <button style={monthNavBtn}>
          <svg width="6" height="10" viewBox="0 0 6 10"><path d="M5 1L1 5l4 4" stroke={T.brandDeep} strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <span>6月の大会</span>
        </button>
        <div style={{ padding: '10px 8px', background: T.ink, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: 96 }}>
          <span className="ts-en" style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em' }}>2026 / 07</span>
        </div>
        <button style={{ ...monthNavBtn, justifyContent: 'flex-end' }}>
          <span>8月の大会</span>
          <svg width="6" height="10" viewBox="0 0 6 10"><path d="M1 1l4 4-4 4" stroke={T.brandDeep} strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>

      {/* Tennis365主催 */}
      <TsSectionHead eyebrow="OFFICIAL" title="Tennis365 主催大会" more="すべて見る" />
      <div style={{ margin: '0 16px' }}>
        <ResultCard {...MOCKS[0]} official />
        <ResultCard {...MOCKS[1]} official />
        <ResultCard {...MOCKS[2]} official />
      </div>

      {/* Pagination */}
      <Pagination />

      {/* スクール主催 */}
      <div style={{ marginTop: 8 }}>
        <TsSectionHead eyebrow="SCHOOLS" title="スクール主催大会" more="すべて見る" />
        <div style={{ margin: '0 16px' }}>
          <ResultCard {...MOCKS[3]} />
          <ResultCard {...MOCKS[4]} />
          <ResultCard {...MOCKS[5]} />
        </div>
      </div>

      <Pagination />

      {/* スクール向けCTA */}
      <div style={{
        margin: '24px 16px 16px', padding: '20px 18px',
        background: T.ink, color: '#fff', borderRadius: 4, position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', right: -14, top: -14, width: 100, height: 100,
          border: `18px solid ${T.brand}`, borderRadius: '50%', opacity: 0.25,
        }}/>
        <div className="ts-en" style={{ fontSize: 10, letterSpacing: '0.2em', color: T.brand, fontWeight: 700, marginBottom: 6 }}>
          FOR SCHOOLS
        </div>
        <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4, lineHeight: 1.5 }}>
          大会を主催したい<br/>スクール様はこちら
        </div>
        <p style={{ fontSize: 11, color: '#c4d0c1', margin: '0 0 14px', lineHeight: 1.6 }}>
          Tennis365で全国のプレイヤーに告知・集客・受付管理まで一括サポート。
        </p>
        <TsBtn variant="brand">
          お問い合わせフォームへ
          <svg width="10" height="10" viewBox="0 0 10 10"><path d="M1 5h8M5 1l4 4-4 4" stroke="#fff" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </TsBtn>
      </div>

      {/* Footer */}
      <TsFooter />
    </div>
  );
}

const monthNavBtn = {
  flex: 1, display: 'flex', alignItems: 'center', gap: 6, padding: '10px 12px',
  background: 'transparent', border: 'none', cursor: 'pointer',
  fontSize: 11.5, color: T.brandDeep, fontWeight: 600, fontFamily: 'inherit',
  justifyContent: 'flex-start',
};

// ─────────── 検索結果カード（コンパクト・画像なし）
function ResultCard({ date, weekday, pref, venue, title, cat, type, level, status, official, host }) {
  const statusMap = {
    open: { text: '受付中', variant: 'brand' },
    fill: { text: '残りわずか', variant: 'accent' },
    wait: { text: 'キャンセル待ち', variant: 'outline' },
    close: { text: '受付終了', variant: 'ink' },
  };
  const st = statusMap[status];
  return (
    <a style={{
      display: 'block', padding: '14px 14px 12px', marginBottom: 8,
      background: T.paper, border: `1px solid ${T.line}`, borderRadius: 4,
      borderLeft: `3px solid ${official ? T.brand : T.accent}`, textDecoration: 'none', color: 'inherit',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8, gap: 8 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
          <span className="ts-en" style={{ fontSize: 15, fontWeight: 800, color: T.ink, letterSpacing: '0.02em' }}>{date}</span>
          <span style={{ fontSize: 10.5, color: weekday === '日' ? T.danger : weekday === '土' ? '#2f6db5' : T.muted, fontWeight: 600 }}>({weekday})</span>
        </div>
        <TsBadge variant={st.variant} size="sm">{st.text}</TsBadge>
      </div>
      <div style={{ fontSize: 13.5, fontWeight: 700, color: T.ink, lineHeight: 1.45, marginBottom: 8, letterSpacing: '0.01em' }}>
        {title}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 10.5, color: T.muted, marginBottom: 8, flexWrap: 'wrap' }}>
        <svg width="10" height="12" viewBox="0 0 10 12"><path d="M5 0.5C2.5.5.5 2.5.5 5c0 3.5 4.5 6.5 4.5 6.5S9.5 8.5 9.5 5c0-2.5-2-4.5-4.5-4.5z" stroke={T.muted} strokeWidth="1" fill="none"/><circle cx="5" cy="5" r="1.5" stroke={T.muted} strokeWidth="1" fill="none"/></svg>
          <span style={{ fontWeight: 600, color: T.inkSoft }}>{pref}</span>
          <span>·</span>
          <span>{venue}</span>
      </div>
      {host && (
        <div style={{ fontSize: 10, color: T.hint, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 4 }}>
          <svg width="10" height="10" viewBox="0 0 10 10"><rect x="1" y="1" width="8" height="8" rx="1" stroke={T.hint} strokeWidth="1" fill="none"/></svg>
          {host}
        </div>
      )}
      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', paddingTop: 8, borderTop: `1px dashed ${T.lineSoft}` }}>
        <TsBadge variant="outline" size="sm">{type}</TsBadge>
        <TsBadge variant="outline" size="sm">{cat}</TsBadge>
        <TsBadge variant="outline" size="sm">{level}</TsBadge>
      </div>
    </a>
  );
}

// ─────────── ページネーション
function Pagination() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 4, padding: '14px 16px 4px' }}>
      <PageBtn disabled>‹</PageBtn>
      <PageBtn active>1</PageBtn>
      <PageBtn>2</PageBtn>
      <PageBtn>3</PageBtn>
      <span style={{ padding: '0 4px', fontSize: 12, color: T.hint }}>…</span>
      <PageBtn>12</PageBtn>
      <PageBtn>›</PageBtn>
    </div>
  );
}
function PageBtn({ children, active, disabled }) {
  return (
    <button style={{
      minWidth: 28, height: 28, padding: '0 8px',
      background: active ? T.ink : '#fff',
      color: active ? '#fff' : disabled ? T.hint : T.ink,
      border: `1px solid ${active ? T.ink : T.line}`,
      borderRadius: 3, fontSize: 12, fontWeight: 700, cursor: disabled ? 'default' : 'pointer',
      opacity: disabled ? 0.5 : 1, fontFamily: 'inherit',
    }}>{children}</button>
  );
}

// ─────────── フッター
function TsFooter() {
  return (
    <div style={{ background: T.ink, color: '#fff', padding: '22px 16px 24px', marginTop: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
        <div style={{ width: 22, height: 22, borderRadius: 5, background: T.brand, display: 'grid', placeItems: 'center' }}>
          <svg width="12" height="12" viewBox="0 0 14 14"><circle cx="7" cy="7" r="6" stroke="#fff" strokeWidth="1.2" fill="none"/></svg>
        </div>
        <div className="ts-en" style={{ fontWeight: 800, fontSize: 12, letterSpacing: '0.14em' }}>TENNIS<span style={{ color: T.brand }}>365</span></div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 16px', fontSize: 11, color: '#c4d0c1' }}>
        <a style={{ color: 'inherit', textDecoration: 'none' }}>大会を探す</a>
        <a style={{ color: 'inherit', textDecoration: 'none' }}>大会レポート</a>
        <a style={{ color: 'inherit', textDecoration: 'none' }}>スクール一覧</a>
        <a style={{ color: 'inherit', textDecoration: 'none' }}>コーチ求人</a>
        <a style={{ color: 'inherit', textDecoration: 'none' }}>お問い合わせ</a>
        <a style={{ color: 'inherit', textDecoration: 'none' }}>運営会社</a>
      </div>
      <div style={{ marginTop: 18, fontSize: 10, color: '#7a8478' }}>
        © 2026 Tennis365 Inc.
      </div>
    </div>
  );
}

const MOCKS = [
  { date: '07/12', weekday: '日', pref: '東京都', venue: '京王テニスクラブ', title: '365cup Tecnifibreボール CUP 団体戦 (初級〜中級)', cat: '一般', type: '団体戦', level: '初〜中級', status: 'open' },
  { date: '07/19', weekday: '日', pref: '神奈川県', venue: '藤沢テニスパーク', title: '365cup 男子ダブルス オープンクラス', cat: '一般', type: '男子D', level: 'オープン', status: 'fill' },
  { date: '07/25', weekday: '土', pref: '千葉県', venue: '柏の葉公園コート', title: '365cup 女子シングルス 中級大会', cat: '一般', type: '女子S', level: '中級', status: 'wait' },
  { date: '07/06', weekday: '日', pref: '東京都', venue: 'HATS Tennis Academy', title: 'HATS夏の団体戦 〜チーム対抗ダブルス〜', cat: '一般', type: '団体戦', level: '初中級', status: 'open', host: 'HATS Tennis Academy' },
  { date: '07/13', weekday: '日', pref: '神奈川県', venue: '荏原湘南 藤沢本校', title: '荏原SSC 夏季ミックスダブルス大会', cat: '一般', type: '混合D', level: '中上級', status: 'open', host: '荏原湘南スポーツセンター' },
  { date: '07/21', weekday: '火', pref: '東京都', venue: 'ITCテニスビレッジ多摩', title: 'ITCジュニアサマーカップ U15', cat: 'ジュニア', type: '男子S', level: '初中級', status: 'close', host: 'ITCテニススクール' },
];

Object.assign(window, { ScreenTop, ResultCard, Pagination, TsFooter, MOCKS });
