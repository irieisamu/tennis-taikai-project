// screen_detail.jsx — 大会詳細
const DETAIL_TABS = [
  { id: 'section-info', label: '大会情報' },
  { id: 'section-detail', label: '大会詳細' },
  { id: 'section-venue', label: '施設情報' },
  { id: 'section-other', label: 'その他' },
];
const TAB_BAR_H = 41; // スクロール時にスティッキーなタブに隠れないためのオフセット

function ScreenDetail() {
  const [activeTab, setActiveTab] = React.useState(DETAIL_TABS[0].id);

  const scrollToSection = (id) => {
    setActiveTab(id);
    // Deferred: the just-clicked button auto-scrolls itself into view after
    // this handler returns, which would otherwise fight our own scroll.
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'instant', block: 'start' });
    }, 0);
  };

  const [galIdx, setGalIdx] = React.useState(0);

  return (
    <div className="ts-screen ts-tap" style={{ minHeight: '100%', paddingBottom: 40 }}>
      <TsHeader title="大会詳細" showBack />
      <TsCrumb items={['HOME', '大会一覧', 'HATS夏の団体戦']} />

      {/* ステータスバー */}
      <div style={{
        padding: '12px 16px', background: T.paper,
        display: 'flex', alignItems: 'center', gap: 8, borderBottom: `1px solid ${T.lineSoft}`,
      }}>
        <TsBadge variant="accent" size="sm">スクール主催</TsBadge>
        <TsBadge variant="outline" size="sm">キャンセル待ち 0組</TsBadge>
      </div>

      <h1 style={{
        fontSize: 18, fontWeight: 800, color: T.ink, lineHeight: 1.5,
        margin: 0, padding: '14px 16px 12px', background: T.paper, letterSpacing: '0.01em',
      }}>
        HATS夏の団体戦 〜チーム対抗ダブルス〜<br/>
        <span style={{ fontSize: 13, fontWeight: 600, color: T.muted }}>団体戦 (初中級程度)</span>
      </h1>

      {/* メイン画像 + サムネイル */}
      <div style={{ padding: '0 16px 16px', background: T.paper }}>
        <TsImgSlot h={200} label={`main image ${galIdx + 1} of 4`} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6, marginTop: 6 }}>
          {[0, 1, 2, 3].map(i => (
            <button key={i} onClick={() => setGalIdx(i)} style={{
              padding: 0, border: `2px solid ${galIdx === i ? T.brand : 'transparent'}`,
              borderRadius: 3, background: 'transparent', cursor: 'pointer',
            }}>
              <TsImgSlot h={56} label={`thumb ${i + 1}`} />
            </button>
          ))}
        </div>
      </div>

      {/* タブ（クリックで同一ページ内の該当セクションへスクロール） */}
      <div style={{ display: 'flex', background: T.paper, borderBottom: `1px solid ${T.line}`, position: 'sticky', top: 0, zIndex: 5 }}>
        {DETAIL_TABS.map((t) => (
          <button key={t.id} onClick={() => scrollToSection(t.id)} style={{
            flex: 1, padding: '12px 4px', border: 'none', background: 'transparent',
            fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
            color: activeTab === t.id ? T.ink : T.muted,
            borderBottom: activeTab === t.id ? `2px solid ${T.brand}` : '2px solid transparent',
          }}>{t.label}</button>
        ))}
      </div>

      <div id="section-info" style={{ scrollMarginTop: TAB_BAR_H }}><TabInfo /></div>
      <div id="section-detail" style={{ scrollMarginTop: TAB_BAR_H }}><TabDetail /></div>
      <div id="section-venue" style={{ scrollMarginTop: TAB_BAR_H }}><TabVenue /></div>
      <div id="section-other" style={{ scrollMarginTop: TAB_BAR_H }}><TabOther /></div>

      {/* 他のおすすめ大会 */}
      <TsSectionHead eyebrow="MORE TOURNAMENTS" title="他のおすすめ大会" more="一覧" />
      <div style={{ margin: '0 16px' }}>
        <MiniCard {...MOCKS[1]} />
        <MiniCard {...MOCKS[2]} />
      </div>

      {/* 動線集 */}
      <div style={{ padding: '20px 16px 4px' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: T.ink, marginBottom: 10 }}>関連情報</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <LinkTile icon="report" title="大会レポート" desc="過去の大会結果を見る" />
          <LinkTile icon="school" title="スクール体験" desc="無料体験レッスン" />
          <LinkTile icon="court" title="レンタルコート" desc="コート予約する" />
          <LinkTile icon="coach" title="コーチ求人" desc="採用情報を見る" />
        </div>
      </div>

      <TsFooter />
    </div>
  );
}

// ── タブ見出し（各タブの先頭に置き、セクションの区切りを明示する）
function TabHeading({ children }) {
  return (
    <h2 style={{
      margin: 0, padding: '14px 16px', background: T.cream,
      borderBottom: `1px solid ${T.line}`, borderTop: `1px solid ${T.line}`,
      fontSize: 14, fontWeight: 800, color: T.ink, letterSpacing: '0.02em',
    }}>{children}</h2>
  );
}

// ── タブ: 大会情報（この大会が自分に合うか判断するための概要）
function TabInfo() {
  const rows = [
    ['日程', '2026.07.06 (日)'],
    ['開催時間', <>
      9:00 – 17:00<br/>
      <span style={{ color: T.muted, fontSize: 11 }}>
        9時試合開始（8時50分頃より開会式を行いますので、それまでに受付を完了してください）。時間が余った場合、希望チームには練習試合を組みます。
      </span>
    </>],
    ['参加費', <>26,000円 税込（当日払い 現金またはPayPay可）<br/><span style={{ color: T.danger, fontSize: 11 }}>※2026年7月3日 18時以降からキャンセル料が100％かかります</span></>],
    ['種目', '団体戦（男子D・女子D・MIX）'],
    ['参加資格', 'チームのメンバー全員が初級〜中級程度であること'],
    ['チーム構成', <>男子2〜3名、女子2〜3名　計4〜6名<br/>（男子D、女子D、ミックスDの3本での対戦）</>],
    ['募集人数', '6チーム（1チーム4〜6人）'],
    ['会場', '京王テニスクラブ'],
  ];
  return (
    <div style={{ background: T.paper }}>
      <TabHeading>大会情報</TabHeading>

      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12.5 }}>
        <tbody>
          {rows.map(([k, v], i) => (
            <tr key={i} style={{ borderBottom: `1px solid ${T.lineSoft}` }}>
              <th style={{
                textAlign: 'left', verticalAlign: 'top', padding: '11px 12px 11px 16px',
                background: T.cream, width: 88, fontSize: 11.5, fontWeight: 600, color: T.muted,
              }}>{k}</th>
              <td style={{ padding: '11px 16px 11px 12px', color: T.ink, lineHeight: 1.7, letterSpacing: '0.01em' }}>{v}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* コンセプト */}
      <div style={{ padding: '16px', borderTop: `1px solid ${T.line}` }}>
        <div style={{
          padding: '14px 14px', background: T.brandTint,
          borderRadius: 4, borderLeft: `3px solid ${T.brand}`,
        }}>
          <div className="ts-en" style={{ fontSize: 9.5, color: T.brandDeep, fontWeight: 700, letterSpacing: '0.14em', marginBottom: 4 }}>CONCEPT</div>
          <div style={{ fontSize: 13, fontWeight: 700, color: T.ink, marginBottom: 6 }}>試合に出場すること自体に価値があります！</div>
          <p style={{ margin: 0, fontSize: 12, color: T.inkSoft, lineHeight: 1.7 }}>
            試合に参加された皆さんに、勝敗にこだわりすぎず、試合の楽しさを感じてもらえる大会を目指しています。
          </p>
        </div>
      </div>
    </div>
  );
}

// ── タブ: 大会詳細（参加が決まった人向けの運用情報）
function TabDetail() {
  return (
    <div style={{ background: T.paper }}>
      <TabHeading>大会詳細</TabHeading>

      {/* ゲーム方式 */}
      <div style={{ padding: '16px' }}>
        <SubHead>ゲーム方式</SubHead>
        <p style={pStyle}>
          2ブロック（3チーム）での総当りのリーグ戦　その後順位別戦<br/>
          <span style={{ color: T.brandDeep, fontWeight: 600 }}>（最低3試合は保証）</span><br/>
          男子D・女子D・MIXの順番で3本の対戦<br/>
          （男女Dは6ゲーム先取ノーアド、MIXは4ゲーム先取ノーアド）
        </p>
      </div>

      {/* 補足リスト */}
      <div style={{ padding: '14px 16px', background: T.cream, fontSize: 11.5, color: T.inkSoft, lineHeight: 1.75 }}>
        <ul style={{ margin: 0, paddingLeft: 16 }}>
          <li>4・5名チームの場合は3試合目の代表の男女を試合前に選んでください</li>
          <li>6名チームは重複なしで対戦します</li>
          <li>最初の2試合で結果が出ても3試合目をおこないます</li>
          <li>当日の天候、その他運営上の都合により試合方式を変更することがあります</li>
        </ul>
        <div style={{ marginTop: 8, color: T.muted, fontSize: 11 }}>※試合進行の都合で待ち時間が長くなる場合がございます</div>
      </div>

      {/* 賞品 */}
      <div style={{ padding: '16px', borderTop: `1px solid ${T.line}` }}>
        <SubHead>賞品</SubHead>
        <p style={pStyle}>
          Tecnifibre(テク二ファイバー) ボール缶を全チームにプレゼント<br/>
          <span style={{ color: T.muted, fontSize: 11 }}>何缶もらえるかは結果次第！</span>
        </p>
      </div>

      {/* 雨天時 */}
      <div style={{ padding: '16px', background: T.paper, borderTop: `1px solid ${T.line}` }}>
        <SubHead>雨天時の対応</SubHead>
        <div style={{
          padding: '12px 14px', background: '#eef4fb', border: '1px solid #d8e5f2', borderRadius: 3, marginTop: 8,
        }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#2f6db5', marginBottom: 4 }}>◇雨天中止の場合</div>
          <p style={{ margin: 0, fontSize: 11.5, color: T.inkSoft, lineHeight: 1.7 }}>
            当日7時30分に発表。中止発表場所はこちらの募集ページトップ内にあります「雨天掲示板」にてお知らせします。
          </p>
          <a style={{ display: 'inline-block', marginTop: 6, fontSize: 11.5, color: '#2f6db5', fontWeight: 700 }}>「雨天掲示板」はこちら ›</a>
        </div>
        <div style={{ padding: '12px 14px', marginTop: 8, background: '#fdf6e6', border: `1px solid ${T.accentTint}`, borderRadius: 3 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#7a5a15', marginBottom: 4 }}>◇途中で中止になった場合</div>
          <p style={{ margin: 0, fontSize: 11.5, color: T.inkSoft, lineHeight: 1.7 }}>
            返金対象となりますが、消化試合数に応じての金額になります。
          </p>
        </div>
        <div style={{
          marginTop: 10, padding: '10px 12px', background: T.ink, color: '#fff', borderRadius: 3,
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <svg width="18" height="18" viewBox="0 0 20 20"><path d="M14 12.5v3a1.5 1.5 0 0 1-1.5 1.5A11 11 0 0 1 3 6.5 1.5 1.5 0 0 1 4.5 5h3a1 1 0 0 1 1 .8l.5 2.5-1.8 1.2a10 10 0 0 0 4.3 4.3l1.2-1.8L15 12.5a1 1 0 0 1 .8 1z" stroke={T.brand} strokeWidth="1.4" fill="none"/></svg>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 10, color: '#c4d0c1', letterSpacing: '0.08em', fontWeight: 600 }}>当日の緊急連絡先</div>
            <div className="ts-en" style={{ fontSize: 15, fontWeight: 800, color: '#fff', letterSpacing: '0.02em' }}>0426-76-2677</div>
            <div style={{ fontSize: 10, color: '#c4d0c1' }}>担当：HATS事務局</div>
          </div>
        </div>
      </div>

      {/* 申し込み方法 */}
      <div style={{ padding: '16px', borderTop: `1px solid ${T.line}` }}>
        <SubHead>申し込み方法</SubHead>
        <p style={pStyle}>
          参加をご希望の方は、大会名・チーム名・代表者名を添えて下記のメールアドレスまでお申し込みください。<br/>
          <span style={{ color: T.muted, fontSize: 11.5 }}>※電話でのお申込みは受け付けておりません。</span>
        </p>
        <div style={{
          marginTop: 10, padding: '10px 12px', background: T.cream, borderRadius: 3, fontSize: 11.5, color: T.inkSoft, lineHeight: 1.7,
        }}>
          <span className="ts-en" style={{ color: T.brandDeep, fontWeight: 700 }}>info@hats-tennis.com</span>　担当：HATS事務局<br/>
          折り返しのご連絡が2営業日以上ない場合は、上記アドレスまでお申し込み状況をお問合せください。
        </div>
      </div>

      {/* 過去の大会結果 */}
      <div style={{ padding: '0 16px 16px' }}>
        <a style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '12px 14px', background: T.paper,
          border: `1px solid ${T.line}`, borderRadius: 3, textDecoration: 'none', color: T.ink,
        }}>
          <span style={{ fontSize: 12.5, fontWeight: 600 }}>過去の大会結果・レポートはこちら</span>
          <svg width="8" height="12" viewBox="0 0 8 12"><path d="M1 1l6 5-6 5" stroke={T.brandDeep} strokeWidth="1.6" fill="none" strokeLinecap="round"/></svg>
        </a>
      </div>
    </div>
  );
}

// ── タブ: 施設情報
function TabVenue() {
  return (
    <div style={{ background: T.paper }}>
      <TabHeading>施設情報</TabHeading>
      <div style={{ padding: '16px' }}>
      <SubHead>会場のご案内</SubHead>
      <div style={{ fontSize: 15, fontWeight: 700, color: T.ink, marginTop: 8, marginBottom: 4 }}>京王テニスクラブ</div>
      <div style={{ fontSize: 12, color: T.muted, marginBottom: 12 }}>京王相模原線 京王多摩川駅より徒歩5分</div>

      {/* 地図（プレースホルダー） */}
      <MapPlaceholder />
      <a style={{
        display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 8,
        fontSize: 12, fontWeight: 700, color: T.brandDeep, textDecoration: 'none',
      }}>
        <svg width="12" height="12" viewBox="0 0 12 12"><path d="M6 1C3.8 1 2 2.8 2 5c0 3 4 6 4 6s4-3 4-6c0-2.2-1.8-4-4-4z" stroke={T.brandDeep} strokeWidth="1.4" fill="none"/></svg>
        Google Mapで開く ›
      </a>

      <hr className="ts-hair-soft" style={{ margin: '18px 0' }}/>

      <SubHead>施設詳細</SubHead>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12.5, marginTop: 8 }}>
        <tbody>
          <tr style={{ borderBottom: `1px solid ${T.lineSoft}` }}>
            <th style={facilityTh}>サーフェス</th>
            <td style={facilityTd}>砂入り人工芝</td>
          </tr>
          <tr style={{ borderBottom: `1px solid ${T.lineSoft}` }}>
            <th style={facilityTh}>住所</th>
            <td style={facilityTd}>〒192-0352<br/>東京都八王子市大塚266</td>
          </tr>
          <tr style={{ borderBottom: `1px solid ${T.lineSoft}` }}>
            <th style={facilityTh}>アクセス</th>
            <td style={facilityTd}>
              <span style={{ fontWeight: 700 }}>■多摩モノレール</span><br/>
              中央大学・明星大学から約徒歩7分<br/>
              <span style={{ fontWeight: 700 }}>■車</span><br/>
              多摩センター駅から車で5分
            </td>
          </tr>
          <tr style={{ borderBottom: `1px solid ${T.lineSoft}` }}>
            <th style={facilityTh}>TEL</th>
            <td style={facilityTd}><span className="ts-en" style={{ fontWeight: 700, color: T.brandDeep }}>0426-76-2677</span></td>
          </tr>
          <tr style={{ borderBottom: `1px solid ${T.lineSoft}` }}>
            <th style={facilityTh}>営業時間</th>
            <td style={facilityTd}>8:00〜22:00<br/><span style={{ color: T.muted, fontSize: 11 }}>定休日：元旦</span></td>
          </tr>
          <tr>
            <th style={facilityTh}>ホームページ</th>
            <td style={facilityTd}>
              <a className="ts-en" style={{ color: T.brandDeep, wordBreak: 'break-all', fontSize: 11.5 }}>http://hats-tennis.com/</a>
            </td>
          </tr>
        </tbody>
      </table>

      <SubHead style={{ marginTop: 18 }}>設備</SubHead>
      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginTop: 8 }}>
        {['オムニコート','屋外3面','ナイター','クラブハウス','シャワー','自動販売機','レンタル','駐車場20台','面貸しOK','スクール'].map(x => (
          <TsBadge key={x} variant="outline" size="sm">{x}</TsBadge>
        ))}
      </div>

      <div style={{ marginTop: 18, padding: '12px 14px', background: '#fdf6e6', border: `1px solid ${T.accentTint}`, borderRadius: 3 }}>
        <div style={{ fontSize: 11.5, fontWeight: 700, color: '#7a5a15', marginBottom: 4 }}>【駐車場・受付場所】</div>
        <p style={{ margin: 0, fontSize: 11.5, color: T.inkSoft, lineHeight: 1.6 }}>
          お車でお越しの方は必ず第三駐車場をご利用ください。
        </p>
      </div>
      </div>
    </div>
  );
}

// ── タブ: その他
function TabOther() {
  return (
    <div style={{ background: T.paper, padding: '16px' }}>
      <SubHead>アピールポイント</SubHead>
      <p style={pStyle}>
        冷暖房が効いた休憩所・シャワー付き更衣室完備！<br/>
        都心から30分のアクセスの良さ！自然に囲まれた綺麗なテニスコートで楽しくプレーをしませんか？
      </p>
      <TsImgSlot h={140} label="facility photo" style={{ marginTop: 12 }}/>
    </div>
  );
}

// ── 地図プレースホルダー
function MapPlaceholder() {
  return (
    <div style={{
      position: 'relative', height: 180, borderRadius: 4, overflow: 'hidden',
      border: `1px solid ${T.line}`, background: '#e8ecdd',
    }}>
      {/* 道路レイヤー */}
      <svg viewBox="0 0 300 180" width="100%" height="100%" preserveAspectRatio="none">
        <rect width="300" height="180" fill="#e8ecdd"/>
        {/* エリア */}
        <path d="M0 40 L300 30 L300 90 L0 100z" fill="#dde5ce"/>
        <path d="M0 130 L300 120 L300 180 L0 180z" fill="#d1dcc0"/>
        {/* 道路 */}
        <path d="M-10 100 Q80 90 150 110 T310 100" stroke="#fff" strokeWidth="12" fill="none"/>
        <path d="M-10 100 Q80 90 150 110 T310 100" stroke="#f4efe0" strokeWidth="10" fill="none"/>
        <path d="M40 -10 L60 200" stroke="#fff" strokeWidth="8"/>
        <path d="M40 -10 L60 200" stroke="#f4efe0" strokeWidth="6"/>
        <path d="M200 -10 L220 200" stroke="#fff" strokeWidth="8"/>
        <path d="M200 -10 L220 200" stroke="#f4efe0" strokeWidth="6"/>
        {/* ラベル */}
        <text x="18" y="24" fill="#8a9080" fontSize="9" fontFamily="system-ui">京王多摩川駅</text>
        <text x="240" y="170" fill="#8a9080" fontSize="9" fontFamily="system-ui">多摩川緑地</text>
      </svg>
      {/* ピン */}
      <div style={{
        position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -100%)',
        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
      }}>
        <svg width="28" height="36" viewBox="0 0 28 36">
          <path d="M14 1C7.4 1 2 6.4 2 13c0 9 12 22 12 22s12-13 12-22c0-6.6-5.4-12-12-12z" fill={T.brand} stroke="#fff" strokeWidth="2"/>
          <circle cx="14" cy="13" r="4" fill="#fff"/>
        </svg>
      </div>
      {/* Google風UI */}
      <div style={{ position: 'absolute', top: 8, left: 8, background: '#fff', padding: '5px 8px', borderRadius: 3, fontSize: 10, fontWeight: 600, color: T.ink, boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }}>
        京王テニスクラブ
      </div>
      <div style={{ position: 'absolute', bottom: 8, right: 8, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <div style={{ width: 24, height: 24, background: '#fff', display: 'grid', placeItems: 'center', fontSize: 14, fontWeight: 700, color: T.ink, borderRadius: 2, boxShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>+</div>
        <div style={{ width: 24, height: 24, background: '#fff', display: 'grid', placeItems: 'center', fontSize: 14, fontWeight: 700, color: T.ink, borderRadius: 2, boxShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>−</div>
      </div>
    </div>
  );
}

// ── ミニカード
function MiniCard({ date, weekday, pref, title, status }) {
  const statusMap = { open: '受付中', fill: '残りわずか', wait: 'キャンセル待ち', close: '受付終了' };
  return (
    <a style={{
      display: 'flex', gap: 12, padding: '12px', marginBottom: 8, background: T.paper,
      border: `1px solid ${T.line}`, borderRadius: 3, textDecoration: 'none', color: 'inherit',
      alignItems: 'center',
    }}>
      <div style={{ textAlign: 'center', minWidth: 40 }}>
        <div className="ts-en" style={{ fontSize: 16, fontWeight: 800, color: T.ink, lineHeight: 1 }}>{date}</div>
        <div style={{ fontSize: 10, color: T.muted }}>{weekday}</div>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: T.ink, marginBottom: 4, lineHeight: 1.4, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical' }}>{title}</div>
        <div style={{ fontSize: 10, color: T.muted }}>{pref}</div>
      </div>
      <TsBadge variant={status === 'open' ? 'brand' : 'outline'} size="sm">{statusMap[status]}</TsBadge>
    </a>
  );
}

// ── リンクタイル
function LinkTile({ icon, title, desc }) {
  const paths = {
    report: <path d="M4 3h10v14H4z M6 6h6M6 9h6M6 12h4" stroke={T.brand} strokeWidth="1.4" fill="none" strokeLinecap="round"/>,
    school: <><path d="M2 8l7-4 7 4-7 4-7-4z" stroke={T.brand} strokeWidth="1.4" fill="none"/><path d="M5 9v4c0 1 2 2 4 2s4-1 4-2V9" stroke={T.brand} strokeWidth="1.4" fill="none"/></>,
    court: <><rect x="2" y="4" width="14" height="10" stroke={T.brand} strokeWidth="1.4" fill="none"/><path d="M9 4v10M2 9h14" stroke={T.brand} strokeWidth="1"/></>,
    coach: <><circle cx="9" cy="6" r="3" stroke={T.brand} strokeWidth="1.4" fill="none"/><path d="M3 16c0-3 3-5 6-5s6 2 6 5" stroke={T.brand} strokeWidth="1.4" fill="none"/></>,
  }[icon];
  return (
    <a style={{
      display: 'block', padding: '14px 12px', background: T.paper,
      border: `1px solid ${T.line}`, borderRadius: 4, textDecoration: 'none', color: T.ink,
      position: 'relative',
    }}>
      <svg width="22" height="22" viewBox="0 0 18 18">{paths}</svg>
      <div style={{ fontSize: 12.5, fontWeight: 700, marginTop: 8, letterSpacing: '0.01em' }}>{title}</div>
      <div style={{ fontSize: 10.5, color: T.muted, marginTop: 2 }}>{desc}</div>
      <svg width="8" height="10" viewBox="0 0 8 10" style={{ position: 'absolute', right: 10, top: 12 }}>
        <path d="M1 1l6 4-6 4" stroke={T.brandDeep} strokeWidth="1.4" fill="none" strokeLinecap="round"/>
      </svg>
    </a>
  );
}

// ── 小見出し
function SubHead({ children, style = {} }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8, ...style,
    }}>
      <span style={{ width: 3, height: 12, background: T.brand, borderRadius: 2 }}/>
      <span style={{ fontSize: 13, fontWeight: 700, color: T.ink, letterSpacing: '0.02em' }}>{children}</span>
    </div>
  );
}
const pStyle = { margin: 0, fontSize: 13, color: T.ink, lineHeight: 1.75, letterSpacing: '0.02em' };
const facilityTh = { textAlign: 'left', verticalAlign: 'top', padding: '10px 12px 10px 4px', width: 78, fontSize: 11, fontWeight: 600, color: T.muted };
const facilityTd = { padding: '10px 4px 10px 8px', color: T.ink, lineHeight: 1.7, fontSize: 12 };

Object.assign(window, { ScreenDetail });
