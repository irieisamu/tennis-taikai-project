// shared.jsx — 共通トークン・プリミティブ（テニス大会UI）
// tennis365風モダン、ダークグリーン×クリーム、SP375幅

const T = {
  // Colors
  ink: '#1a2e1f',
  inkSoft: '#2e4232',
  muted: '#6b7565',
  hint: '#8b9385',
  line: '#e7e2d3',
  lineSoft: '#efeadc',
  cream: '#f7f4ec',
  paper: '#ffffff',
  brand: '#6C9E1D',       // tennis365 green
  brandDeep: '#4d7615',
  brandInk: '#2b4210',
  brandTint: '#f1f5e3',
  accent: '#C89B3C',      // 受付中 / gold
  accentTint: '#fbf3df',
  danger: '#b5432e',
  // Font
  font: '"Noto Sans JP", "Hiragino Sans", "Yu Gothic", system-ui, sans-serif',
  fontEn: '"Manrope", "Noto Sans JP", system-ui, sans-serif',
};

// Inject Google fonts once + base reset for phone screens
if (typeof document !== 'undefined' && !document.getElementById('ts-shared-styles')) {
  const l = document.createElement('link');
  l.rel = 'stylesheet';
  l.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;600;700;800&family=Manrope:wght@500;600;700;800&display=swap';
  document.head.appendChild(l);

  const s = document.createElement('style');
  s.id = 'ts-shared-styles';
  s.textContent = `
    .ts-screen { font-family: ${T.font}; color: ${T.ink}; background: ${T.cream}; -webkit-font-smoothing: antialiased; letter-spacing: 0.01em; }
    .ts-screen * { box-sizing: border-box; }
    .ts-screen button { font-family: inherit; }
    .ts-en { font-family: ${T.fontEn}; letter-spacing: 0.02em; }
    .ts-hair { border: 0; border-top: 1px solid ${T.line}; margin: 0; }
    .ts-hair-soft { border: 0; border-top: 1px solid ${T.lineSoft}; margin: 0; }
    .ts-tap { -webkit-tap-highlight-color: transparent; }
  `;
  document.head.appendChild(s);
}

// ───────── ヘッダー（グローバルナビ）
function TsHeader({ title = 'TOURNAMENTS', showBack = false, showMenu = true }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '10px 16px', background: T.ink, color: '#fff',
      borderBottom: `2px solid ${T.brand}`,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {showBack ? (
          <div style={{ width: 24, height: 24, display: 'grid', placeItems: 'center' }}>
            <svg width="10" height="16" viewBox="0 0 10 16"><path d="M8 1L1 8l7 7" stroke="#fff" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 24, height: 24, borderRadius: 6, background: T.brand,
              display: 'grid', placeItems: 'center',
            }}>
              <svg width="14" height="14" viewBox="0 0 14 14">
                <circle cx="7" cy="7" r="6" stroke="#fff" strokeWidth="1.2" fill="none"/>
                <path d="M2.5 3.5C4 5 5 6.5 5 8.5s-1 4-2.5 5" stroke="#fff" strokeWidth="1.2" fill="none"/>
                <path d="M11.5 3.5C10 5 9 6.5 9 8.5s1 4 2.5 5" stroke="#fff" strokeWidth="1.2" fill="none"/>
              </svg>
            </div>
            <div className="ts-en" style={{ fontWeight: 800, fontSize: 13, letterSpacing: '0.14em' }}>TENNIS<span style={{ color: T.brand }}>365</span></div>
          </div>
        )}
        <div style={{ fontSize: 12, fontWeight: 600, opacity: 0.75, marginLeft: showBack ? 0 : 4 }}>{title}</div>
      </div>
      <div style={{ display: 'flex', gap: 6 }}>
        <button style={iconBtn}>
          <svg width="15" height="15" viewBox="0 0 16 16"><circle cx="7" cy="7" r="5" stroke="#fff" strokeWidth="1.4" fill="none"/><path d="M11 11l3.5 3.5" stroke="#fff" strokeWidth="1.4" strokeLinecap="round"/></svg>
        </button>
        {showMenu && (
          <button style={iconBtn}>
            <svg width="16" height="12" viewBox="0 0 16 12"><path d="M0 1h16M0 6h16M0 11h16" stroke="#fff" strokeWidth="1.4"/></svg>
          </button>
        )}
      </div>
    </div>
  );
}

const iconBtn = {
  width: 32, height: 32, borderRadius: 8, border: '1px solid rgba(255,255,255,0.18)',
  background: 'transparent', padding: 0, display: 'grid', placeItems: 'center', cursor: 'pointer',
};

// ───────── パンくず
function TsCrumb({ items }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 6, padding: '10px 16px',
      fontSize: 11, color: T.muted, background: T.paper, borderBottom: `1px solid ${T.lineSoft}`,
    }}>
      {items.map((it, i) => (
        <React.Fragment key={i}>
          {i > 0 && <span style={{ color: T.hint }}>›</span>}
          <span style={{ color: i === items.length - 1 ? T.ink : T.muted, fontWeight: i === items.length - 1 ? 600 : 400 }}>{it}</span>
        </React.Fragment>
      ))}
    </div>
  );
}

// ───────── アコーディオン行
function TsAccordion({ label, open = false, count, children, onToggle }) {
  return (
    <div style={{ borderBottom: `1px solid ${T.lineSoft}`, background: T.paper }}>
      <button
        onClick={onToggle}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '14px 16px', border: 0, background: 'transparent', cursor: 'pointer',
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 3, height: 14, background: T.brand, borderRadius: 2 }} />
          <span style={{ fontSize: 13.5, fontWeight: 600, color: T.ink }}>{label}</span>
          {count != null && (
            <span style={{
              fontSize: 10, color: T.brandDeep, background: T.brandTint,
              padding: '2px 6px', borderRadius: 4, fontWeight: 700,
            }}>{count}</span>
          )}
        </span>
        <span style={{
          width: 18, height: 18, display: 'grid', placeItems: 'center',
          transition: 'transform .2s', transform: open ? 'rotate(180deg)' : 'none',
        }}>
          <svg width="10" height="6" viewBox="0 0 10 6"><path d="M1 1l4 4 4-4" stroke={T.muted} strokeWidth="1.6" fill="none" strokeLinecap="round"/></svg>
        </span>
      </button>
      {open && <div style={{ padding: '4px 16px 16px' }}>{children}</div>}
    </div>
  );
}

// ───────── チェックボックス（複数選択用）
function TsCheck({ label, checked, onChange, small = false }) {
  return (
    <label style={{
      display: 'flex', alignItems: 'center', gap: 8,
      padding: small ? '6px 0' : '8px 0', cursor: 'pointer', fontSize: 13,
    }}>
      <span style={{
        width: 18, height: 18, borderRadius: 4,
        border: `1.5px solid ${checked ? T.brand : T.line}`,
        background: checked ? T.brand : '#fff',
        display: 'grid', placeItems: 'center', flexShrink: 0,
      }}>
        {checked && <svg width="10" height="8" viewBox="0 0 10 8"><path d="M1 4l3 3 5-6" stroke="#fff" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>}
      </span>
      <span style={{ color: T.ink }}>{label}</span>
    </label>
  );
}

// ───────── 状態バッジ
function TsBadge({ children, variant = 'brand', size = 'md' }) {
  const styles = {
    brand: { bg: T.brandTint, fg: T.brandDeep, bd: '#d4e0b0' },
    accent: { bg: T.accentTint, fg: '#7a5a15', bd: '#e8d4a2' },
    ink: { bg: T.ink, fg: '#fff', bd: T.ink },
    outline: { bg: '#fff', fg: T.ink, bd: T.line },
    danger: { bg: '#f7e0d9', fg: T.danger, bd: '#e8bcae' },
  }[variant];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      padding: size === 'sm' ? '2px 6px' : '3px 8px',
      fontSize: size === 'sm' ? 10 : 11, fontWeight: 700,
      background: styles.bg, color: styles.fg,
      border: `1px solid ${styles.bd}`, borderRadius: 3,
      letterSpacing: '0.02em',
    }}>{children}</span>
  );
}

// ───────── プレースホルダー画像（ストライプ＋説明）
function TsImgSlot({ w = '100%', h = 160, label = 'image', style = {} }) {
  return (
    <div style={{
      width: w, height: h, position: 'relative', overflow: 'hidden',
      background: `repeating-linear-gradient(135deg, #eae5d5 0 8px, #f2ede0 8px 16px)`,
      border: `1px solid ${T.line}`, borderRadius: 4,
      display: 'grid', placeItems: 'center', ...style,
    }}>
      <span style={{
        fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
        fontSize: 10, color: '#8a7f5f', background: 'rgba(255,255,255,0.85)',
        padding: '3px 7px', borderRadius: 3, border: `1px solid ${T.line}`,
      }}>{label}</span>
    </div>
  );
}

// ───────── セクション見出し
function TsSectionHead({ eyebrow, title, more }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
      padding: '20px 16px 10px',
    }}>
      <div>
        {eyebrow && (
          <div className="ts-en" style={{ fontSize: 10, fontWeight: 700, color: T.brand, letterSpacing: '0.16em', marginBottom: 4 }}>
            {eyebrow}
          </div>
        )}
        <div style={{ fontSize: 16, fontWeight: 700, color: T.ink, letterSpacing: '0.02em' }}>{title}</div>
      </div>
      {more && (
        <a style={{ fontSize: 11, color: T.brandDeep, fontWeight: 600, textDecoration: 'none' }}>{more} ›</a>
      )}
    </div>
  );
}

// ───────── プライマリボタン
function TsBtn({ children, variant = 'brand', full = false, size = 'md', style = {}, ...rest }) {
  const v = {
    brand: { bg: T.brand, fg: '#fff', bd: T.brand },
    ink: { bg: T.ink, fg: '#fff', bd: T.ink },
    outline: { bg: '#fff', fg: T.ink, bd: T.line },
    ghost: { bg: 'transparent', fg: T.brandDeep, bd: 'transparent' },
  }[variant];
  const s = size === 'sm'
    ? { p: '7px 12px', f: 12 }
    : size === 'lg' ? { p: '14px 18px', f: 15 } : { p: '10px 14px', f: 13 };
  return (
    <button {...rest} style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
      background: v.bg, color: v.fg, border: `1px solid ${v.bd}`,
      padding: s.p, fontSize: s.f, fontWeight: 700, borderRadius: 3,
      width: full ? '100%' : 'auto', cursor: 'pointer', letterSpacing: '0.03em',
      ...style,
    }}>{children}</button>
  );
}

// ───────── ホームインジケーター用フッター余白（フレーム端に被らないように）
function TsBottomSafe({ h = 32 }) {
  return <div style={{ height: h }} />;
}

Object.assign(window, {
  T, TsHeader, TsCrumb, TsAccordion, TsCheck, TsBadge, TsImgSlot,
  TsSectionHead, TsBtn, TsBottomSafe,
});
