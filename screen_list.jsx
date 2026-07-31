// screen_list.jsx — 一覧（Tennis365 / スクール 混在＋主催列）
function ScreenList() {
  const [filtersOpen, setFiltersOpen] = React.useState(false);
  // 開催日順（昇順）に整列。Tennis365・スクールを混在させた統合結果20件。
  const items = [
    { ...MOCKS[3], hostType: 'school' },               // 07/06
    { ...MOCKS[0], hostType: 'tennis365' },             // 07/12
    { ...MOCKS[4], hostType: 'school' },                // 07/13
    { ...MOCKS[1], hostType: 'tennis365' },             // 07/19
    { ...MOCKS[5], hostType: 'school' },                // 07/21
    { ...MOCKS[2], hostType: 'tennis365' },             // 07/25
    { ...MOCKS[6], hostType: 'tennis365' },             // 08/02
    { ...MOCKS[7], hostType: 'tennis365' },             // 08/09
    { ...SCHOOL_TOURNAMENTS[3], hostType: 'school' },   // 08/12
    { ...SCHOOL_TOURNAMENTS[4], hostType: 'school' },   // 08/12
    { ...SCHOOL_TOURNAMENTS[1], hostType: 'school' },   // 08/13
    { ...SCHOOL_TOURNAMENTS[2], hostType: 'school' },   // 08/13
    { ...SCHOOL_TOURNAMENTS[0], hostType: 'school' },   // 08/14
    { ...MOCKS[8], hostType: 'tennis365' },             // 08/16
    { ...MOCKS[9], hostType: 'tennis365' },             // 08/23
    { ...SCHOOL_TOURNAMENTS[8], hostType: 'school' },   // 09/12
    { ...SCHOOL_TOURNAMENTS[9], hostType: 'school' },   // 09/12
    { ...SCHOOL_TOURNAMENTS[6], hostType: 'school' },   // 09/19
    { ...SCHOOL_TOURNAMENTS[7], hostType: 'school' },   // 09/19
    { ...SCHOOL_TOURNAMENTS[5], hostType: 'school' },   // 09/26
  ];

  return (
    <div className="ts-screen ts-tap" style={{ minHeight: '100%', paddingBottom: 40 }}>
      <TsHeader title="大会一覧" showBack />
      <TsCrumb items={['HOME', '大会検索', '一覧']} />

      {/* 条件から探す（開閉はこの行だけ／中の項目は個別に閉じない） */}
      <div style={{ background: T.paper }}>
        <TsFilterToggle open={filtersOpen} onToggle={() => setFiltersOpen(o => !o)} count="3件選択中" onClear={() => {}} />
        {filtersOpen && (
          <>
            <TsFilterField label="開催月">
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
            </TsFilterField>
            <TsFilterField label="都道府県" count="2">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px 12px' }}>
                {['東京都','神奈川県','千葉県','埼玉県','大阪府','京都府','兵庫県','愛知県'].map((p, i) =>
                  <TsCheck key={p} label={p} checked={i === 0 || i === 1} onChange={() => {}} small />
                )}
              </div>
            </TsFilterField>
            <TsFilterField label="カテゴリ" count="1">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px 12px' }}>
                <TsCheck label="一般" checked onChange={() => {}} small />
                <TsCheck label="ジュニア" checked={false} onChange={() => {}} small />
              </div>
            </TsFilterField>
            <TsFilterField label="種別">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px 12px' }}>
                {['男子シングルス','女子シングルス','男子ダブルス','女子ダブルス','混合ダブルス','団体戦'].map(x =>
                  <TsCheck key={x} label={x} checked={false} onChange={() => {}} small />
                )}
              </div>
            </TsFilterField>
            <TsFilterField label="レベル">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2px 12px' }}>
                {['初級','初中級','中級','中上級','上級','オープン'].map(x =>
                  <TsCheck key={x} label={x} checked={false} onChange={() => {}} small />
                )}
              </div>
            </TsFilterField>
            <div style={{ padding: '14px 16px' }}>
              <TsBtn full size="lg" variant="brand">
                <svg width="14" height="14" viewBox="0 0 16 16"><circle cx="7" cy="7" r="5" stroke="#fff" strokeWidth="1.6" fill="none"/><path d="M11 11l3.5 3.5" stroke="#fff" strokeWidth="1.6" strokeLinecap="round"/></svg>
                この条件で検索する
              </TsBtn>
            </div>
          </>
        )}
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
          <span style={{ fontSize: 18, fontWeight: 800, color: T.ink, marginRight: 4 }} className="ts-en">{items.length}</span>
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
// 表示優先順位: 日付 > 都道府県 > 大会名 > 種別 > レベル > 受付中
function ResultRow({ date, weekday, pref, title, type, level, status, hostType }) {
  const statusMap = {
    open: { text: '受付中', variant: 'brand' },
    fill: { text: '残りわずか', variant: 'accent' },
    wait: { text: 'キャンセル待ち', variant: 'outline' },
    close: { text: '受付終了', variant: 'ink' },
  };
  const st = statusMap[status];
  const hostLabel = hostType === 'tennis365' ? 'Tennis365 主催' : 'スクール主催';

  return (
    <a style={{
      display: 'block', padding: '12px 14px 10px', marginBottom: 8,
      background: T.paper, border: `1px solid ${T.line}`, borderRadius: 4, textDecoration: 'none', color: 'inherit',
    }}>
      {/* 主催ラベル */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
        <span style={{
          fontSize: 9.5, fontWeight: 700, letterSpacing: '0.08em',
          color: hostType === 'tennis365' ? T.brandDeep : '#7a5a15',
          background: hostType === 'tennis365' ? T.brandTint : T.accentTint,
          padding: '2px 6px', borderRadius: 2, border: `1px solid ${hostType === 'tennis365' ? '#d4e0b0' : '#e8d4a2'}`,
        }}>{hostLabel}</span>
        <TsBadge variant={st.variant} size="sm">{st.text}</TsBadge>
      </div>
      {/* 日付＋都道府県 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
        <span className="ts-en" style={{ fontSize: 15, fontWeight: 800, color: T.ink, letterSpacing: '0.02em' }}>{date}</span>
        <span style={{ fontSize: 10.5, color: weekday === '日' ? T.danger : weekday === '土' ? '#2f6db5' : T.muted, fontWeight: 600 }}>({weekday})</span>
        <div style={{ width: 1, height: 11, background: T.lineSoft, margin: '0 2px', flexShrink: 0 }} />
        <span style={{ fontSize: 11.5, color: T.inkSoft, fontWeight: 600 }}>{pref}</span>
      </div>
      {/* 大会名 */}
      <div style={{ fontSize: 13.5, fontWeight: 700, color: T.ink, lineHeight: 1.45, marginBottom: 8, letterSpacing: '0.01em' }}>
        {title}
      </div>
      {/* 種別・レベル */}
      <div style={{ display: 'flex', alignItems: 'center', paddingTop: 8, borderTop: `1px dashed ${T.lineSoft}` }}>
        <div style={{ flex: 1, fontSize: 11.5, color: T.inkSoft, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          <span style={{ fontSize: 10, color: T.muted }}>種別</span> {type}
        </div>
        <div style={{ width: 1, height: 12, background: T.lineSoft, margin: '0 10px', flexShrink: 0 }} />
        <div style={{ flex: 1, fontSize: 11.5, color: T.inkSoft, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          <span style={{ fontSize: 10, color: T.muted }}>レベル</span> {level}
        </div>
      </div>
    </a>
  );
}

Object.assign(window, { ScreenList, ResultRow, SortBtn });
