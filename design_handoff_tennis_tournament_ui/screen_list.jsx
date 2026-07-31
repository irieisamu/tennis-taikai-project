// screen_list.jsx — 一覧（Tennis365 / スクール 混在＋主催列）
function ScreenList() {
  const [open, setOpen] = React.useState({ month: false, pref: false, cat: false, type: false, level: false });
  const toggle = (k) => setOpen(o => ({ ...o, [k]: !o[k] }));
  const items = [
    { ...MOCKS[0], hostType: 'tennis365' },
    { ...MOCKS[3], hostType: 'school' },
    { ...MOCKS[1], hostType: 'tennis365' },
    { ...MOCKS[4], hostType: 'school' },
    { ...MOCKS[2], hostType: 'tennis365' },
    { ...MOCKS[5], hostType: 'school' },
  ];

  return (
    <div className="ts-screen ts-tap" style={{ minHeight: '100%', paddingBottom: 40 }}>
      <TsHeader title="大会一覧" showBack />
      <TsCrumb items={['HOME', '大会検索', '一覧']} />

      {/* 条件から探す（TOPと同じ、全て閉じ） */}
      <div style={{ background: T.paper }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '14px 16px 10px', borderBottom: `1px solid ${T.lineSoft}`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <svg width="16" height="16" viewBox="0 0 16 16"><path d="M2 3h12M4 8h8M6 13h4" stroke={T.ink} strokeWidth="1.6" strokeLinecap="round"/></svg>
            <div style={{ fontSize: 14, fontWeight: 700, color: T.ink }}>条件から探す</div>
            <TsBadge variant="brand" size="sm">3件選択中</TsBadge>
          </div>
          <button style={{ fontSize: 11, color: T.muted, background: 'transparent', border: 'none', cursor: 'pointer', fontWeight: 600 }}>クリア</button>
        </div>
        <TsAccordion label="開催月" open={open.month} onToggle={() => toggle('month')}>
          <div style={{ fontSize: 12, color: T.muted }}>2026年 7月</div>
        </TsAccordion>
        <TsAccordion label="都道府県" open={open.pref} count="2" onToggle={() => toggle('pref')} />
        <TsAccordion label="カテゴリ" open={open.cat} count="1" onToggle={() => toggle('cat')} />
        <TsAccordion label="種別" open={open.type} onToggle={() => toggle('type')} />
        <TsAccordion label="レベル" open={open.level} onToggle={() => toggle('level')} />
        <div style={{ padding: '14px 16px' }}>
          <TsBtn full size="lg" variant="brand">
            <svg width="14" height="14" viewBox="0 0 16 16"><circle cx="7" cy="7" r="5" stroke="#fff" strokeWidth="1.6" fill="none"/><path d="M11 11l3.5 3.5" stroke="#fff" strokeWidth="1.6" strokeLinecap="round"/></svg>
            この条件で検索する
          </TsBtn>
        </div>
      </div>

      {/* 月ナビ */}
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

      {/* 統合検索結果 */}
      <div style={{ padding: '16px 16px 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <div style={{ fontSize: 12, color: T.muted }}>
          <span style={{ fontSize: 18, fontWeight: 800, color: T.ink, marginRight: 4 }} className="ts-en">142</span>
          件の大会
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          <SortBtn active>開催日順</SortBtn>
          <SortBtn>受付順</SortBtn>
        </div>
      </div>

      <div style={{ margin: '0 16px' }}>
        {items.map((x, i) => <ResultRow key={i} {...x} />)}
      </div>

      <Pagination />
      <TsFooter />
    </div>
  );
}

function SortBtn({ children, active }) {
  return (
    <button style={{
      padding: '5px 10px', fontSize: 10.5, fontWeight: 700,
      background: active ? T.ink : '#fff', color: active ? '#fff' : T.muted,
      border: `1px solid ${active ? T.ink : T.line}`, borderRadius: 2, cursor: 'pointer', fontFamily: 'inherit',
    }}>{children}</button>
  );
}

// 一覧行: 主催列を追加した圧縮版
function ResultRow({ date, weekday, pref, venue, title, cat, type, level, status, hostType, host }) {
  const statusMap = {
    open: { text: '受付中', variant: 'brand' },
    fill: { text: '残りわずか', variant: 'accent' },
    wait: { text: 'キャンセル待ち', variant: 'outline' },
    close: { text: '受付終了', variant: 'ink' },
  };
  const st = statusMap[status];
  const hostLabel = hostType === 'tennis365' ? 'Tennis365 主催' : 'スクール主催';
  const hostColor = hostType === 'tennis365' ? T.brand : T.accent;

  return (
    <a style={{
      display: 'block', padding: '12px 12px 10px', marginBottom: 8,
      background: T.paper, border: `1px solid ${T.line}`, borderRadius: 4, textDecoration: 'none', color: 'inherit',
      position: 'relative', paddingLeft: 14,
    }}>
      <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, width: 3, background: hostColor }} />
      {/* 主催ラベル */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
        <span style={{
          fontSize: 9.5, fontWeight: 700, letterSpacing: '0.08em',
          color: hostType === 'tennis365' ? T.brandDeep : '#7a5a15',
          background: hostType === 'tennis365' ? T.brandTint : T.accentTint,
          padding: '2px 6px', borderRadius: 2, border: `1px solid ${hostType === 'tennis365' ? '#d4e0b0' : '#e8d4a2'}`,
        }}>{hostLabel}</span>
        <TsBadge variant={st.variant} size="sm">{st.text}</TsBadge>
      </div>
      {/* 日付＋タイトル */}
      <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 6 }}>
        <div style={{ textAlign: 'center', minWidth: 42, borderRight: `1px solid ${T.lineSoft}`, paddingRight: 8 }}>
          <div className="ts-en" style={{ fontSize: 10, color: T.muted, fontWeight: 600 }}>2026</div>
          <div className="ts-en" style={{ fontSize: 18, fontWeight: 800, color: T.ink, lineHeight: 1 }}>{date}</div>
          <div style={{ fontSize: 10, color: weekday === '日' ? T.danger : weekday === '土' ? '#2f6db5' : T.muted, fontWeight: 600, marginTop: 2 }}>({weekday})</div>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: T.ink, lineHeight: 1.4, marginBottom: 4 }}>{title}</div>
          <div style={{ fontSize: 10.5, color: T.muted, display: 'flex', gap: 4, alignItems: 'center' }}>
            <svg width="9" height="11" viewBox="0 0 10 12"><path d="M5 0.5C2.5.5.5 2.5.5 5c0 3.5 4.5 6.5 4.5 6.5S9.5 8.5 9.5 5c0-2.5-2-4.5-4.5-4.5z" stroke={T.muted} strokeWidth="1" fill="none"/></svg>
            <span style={{ fontWeight: 600, color: T.inkSoft }}>{pref}</span>
            <span>·</span>
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{host || venue}</span>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', paddingTop: 8, borderTop: `1px dashed ${T.lineSoft}` }}>
        <TsBadge variant="outline" size="sm">{type}</TsBadge>
        <TsBadge variant="outline" size="sm">{cat}</TsBadge>
        <TsBadge variant="outline" size="sm">{level}</TsBadge>
      </div>
    </a>
  );
}

Object.assign(window, { ScreenList, ResultRow, SortBtn });
