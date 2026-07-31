// screen_report.jsx — 大会レポート一覧（スクールごと）
function ScreenReport() {
  const reports = [
    { date: '2026.06.15', title: '365cup ダブルス初中級大会', tag: '一般', highlight: true },
    { date: '2026.05.22', title: '365cup 女子シングルス 中級大会', tag: '一般', highlight: false },
    { date: '2026.05.05', title: 'GW特別 団体戦カップ', tag: '一般', highlight: false },
    { date: '2026.04.14', title: '春の365cup ジュニアU15', tag: 'ジュニア', highlight: false },
    { date: '2026.03.20', title: 'スプリング男子ダブルス オープン', tag: '一般', highlight: false },
    { date: '2026.02.11', title: '冬の365cup ミックスダブルス', tag: '一般', highlight: false },
  ];

  return (
    <div className="ts-screen ts-tap" style={{ minHeight: '100%', paddingBottom: 40 }}>
      <TsHeader title="大会レポート" showBack />
      <TsCrumb items={['HOME', 'スクール', 'レポート一覧']} />

      {/* スクールヘッダー */}
      <div style={{ background: T.paper, padding: '16px 16px 18px', borderBottom: `1px solid ${T.line}` }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <div style={{
            width: 56, height: 56, borderRadius: 4, background: T.ink,
            display: 'grid', placeItems: 'center', color: T.brand, flexShrink: 0,
            border: `1px solid ${T.brand}`,
          }}>
            <svg width="28" height="28" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" stroke={T.brand} strokeWidth="1.4" fill="none"/>
              <path d="M4.5 6C7 8 9 10 9 14s-2 6-4.5 8M19.5 6C17 8 15 10 15 14s2 6 4.5 8" stroke={T.brand} strokeWidth="1.4" fill="none"/>
            </svg>
          </div>
          <div style={{ minWidth: 0 }}>
            <div className="ts-en" style={{ fontSize: 9.5, color: T.brand, letterSpacing: '0.14em', fontWeight: 700, marginBottom: 2 }}>SCHOOL</div>
            <div style={{ fontSize: 15, fontWeight: 800, color: T.ink, letterSpacing: '0.01em' }}>Tennis365 大会運営部</div>
            <div style={{ fontSize: 11, color: T.muted, marginTop: 2 }}>東京都 · 大会主催歴 12年</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 12, marginTop: 14, paddingTop: 14, borderTop: `1px dashed ${T.lineSoft}` }}>
          <Stat num="284" label="開催数" />
          <Stat num="12,480" label="参加者" />
          <Stat num="4.7" label="満足度" suffix="★" />
        </div>
      </div>

      {/* フィルタタブ */}
      <div style={{ display: 'flex', gap: 4, padding: '12px 16px 6px', overflowX: 'auto', background: T.cream }}>
        {['すべて', '2026', '2025', '2024', '一般', 'ジュニア'].map((x, i) => (
          <button key={x} style={{
            padding: '6px 12px', fontSize: 11.5, fontWeight: 700, fontFamily: 'inherit', whiteSpace: 'nowrap',
            background: i === 0 ? T.ink : '#fff', color: i === 0 ? '#fff' : T.muted,
            border: `1px solid ${i === 0 ? T.ink : T.line}`, borderRadius: 100, cursor: 'pointer',
          }}>{x}</button>
        ))}
      </div>

      {/* 件数 */}
      <div style={{ padding: '8px 16px 4px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <div style={{ fontSize: 12, color: T.muted }}>
          <span className="ts-en" style={{ fontSize: 18, fontWeight: 800, color: T.ink, marginRight: 4 }}>68</span>件
        </div>
        <div style={{ fontSize: 11, color: T.muted }}>新着順</div>
      </div>

      {/* ハイライト（最新1件、大きめカード） */}
      <div style={{ padding: '0 16px 4px' }}>
        <FeatureReport {...reports[0]} />
      </div>

      {/* リストカード */}
      <div style={{ padding: '4px 16px 0' }}>
        {reports.slice(1).map((r, i) => <ReportRow key={i} {...r} />)}
      </div>

      <Pagination />
      <TsFooter />
    </div>
  );
}

function Stat({ num, label, suffix }) {
  return (
    <div style={{ flex: 1, textAlign: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 2 }}>
        <div className="ts-en" style={{ fontSize: 18, fontWeight: 800, color: T.ink }}>{num}</div>
        {suffix && <div style={{ fontSize: 11, color: T.accent, fontWeight: 700 }}>{suffix}</div>}
      </div>
      <div style={{ fontSize: 10, color: T.muted, marginTop: 2, letterSpacing: '0.05em' }}>{label}</div>
    </div>
  );
}

function FeatureReport({ date, title, tag }) {
  return (
    <a style={{
      display: 'block', background: T.paper, border: `1px solid ${T.line}`, borderRadius: 4,
      overflow: 'hidden', textDecoration: 'none', color: 'inherit', marginTop: 12,
      borderLeft: `3px solid ${T.brand}`,
    }}>
      <div style={{ position: 'relative' }}>
        <TsImgSlot h={170} label="tournament highlight photo" />
        <div style={{ position: 'absolute', top: 10, left: 10 }}>
          <TsBadge variant="ink" size="sm">最新レポート</TsBadge>
        </div>
      </div>
      <div style={{ padding: '12px 14px 14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
          <span className="ts-en" style={{ fontSize: 11, fontWeight: 700, color: T.brandDeep, letterSpacing: '0.04em' }}>{date}</span>
          <TsBadge variant="outline" size="sm">{tag}</TsBadge>
        </div>
        <div style={{ fontSize: 14, fontWeight: 700, color: T.ink, lineHeight: 1.45 }}>{title}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 10, fontSize: 11, color: T.brandDeep, fontWeight: 600 }}>
          <span>レポートを読む</span>
          <svg width="8" height="10" viewBox="0 0 8 10"><path d="M1 1l6 4-6 4" stroke={T.brandDeep} strokeWidth="1.4" fill="none" strokeLinecap="round"/></svg>
        </div>
      </div>
    </a>
  );
}

function ReportRow({ date, title, tag }) {
  return (
    <a style={{
      display: 'flex', gap: 10, padding: '10px', marginBottom: 8, background: T.paper,
      border: `1px solid ${T.line}`, borderRadius: 3, textDecoration: 'none', color: 'inherit',
      alignItems: 'stretch',
    }}>
      <div style={{ width: 84, flexShrink: 0 }}>
        <TsImgSlot h={64} label="photo" />
      </div>
      <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
            <span className="ts-en" style={{ fontSize: 10.5, fontWeight: 700, color: T.brandDeep }}>{date}</span>
            <TsBadge variant="outline" size="sm">{tag}</TsBadge>
          </div>
          <div style={{ fontSize: 12.5, fontWeight: 700, color: T.ink, lineHeight: 1.4 }}>{title}</div>
        </div>
        <div style={{ fontSize: 10, color: T.muted, display: 'flex', alignItems: 'center', gap: 4 }}>
          <span>詳細を見る</span>
          <svg width="6" height="8" viewBox="0 0 6 8"><path d="M1 1l4 3-4 3" stroke={T.muted} strokeWidth="1.2" fill="none" strokeLinecap="round"/></svg>
        </div>
      </div>
    </a>
  );
}

Object.assign(window, { ScreenReport });
