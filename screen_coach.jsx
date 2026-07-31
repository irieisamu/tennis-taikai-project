// screen_coach.jsx — コーチ求人
function ScreenCoach() {
  const rows = [
    ['企業名', '株式会社荏原湘南スポーツセンター'],
    ['施設名称', <>
      ・荏原湘南スポーツセンター 藤沢本校<br/>
      ・荏原SSC in CHIGASAKI（テニススクール茅ヶ崎校）
    </>],
    ['募集職種', <>
      <div style={{ marginBottom: 4 }}>・契約社員（レッスン業務及び事務、企画など）</div>
      <div>・契約テニスコーチ（専属、アルバイト、業務委託）</div>
    </>],
    ['勤務地', <>
      <div style={{ fontWeight: 700, fontSize: 12, marginBottom: 2 }}>【荏原湘南スポーツセンター 藤沢本校】</div>
      <div style={{ color: T.muted, marginBottom: 8, fontSize: 11.5 }}>神奈川県藤沢市稲荷1-9-1</div>
      <div style={{ fontWeight: 700, fontSize: 12, marginBottom: 2 }}>【荏原SSC in CHIGASAKI（茅ヶ崎校）】</div>
      <div style={{ color: T.muted, fontSize: 11.5 }}>神奈川県茅ヶ崎市出口町11-7</div>
    </>],
    ['応募資格', <>18歳以上 <span style={{ color: T.muted, fontSize: 11 }}>※契約テニスコーチ（アルバイト）のみ学生可</span></>],
  ];
  const coaches = [
    { name: '千葉 総一郎', age: 41, quote: '荏原SSCは、日本最大級のテニス施設で、3歳からプロを目指すジュニア、シニア層までテニスを楽しまれています。レッスンだけでなく、運営や企画といった仕事に取り組みたい方をお待ちしております。', hasInterview: true },
    { name: '大塚 真之助', age: 37, quote: 'これまでの分のキャリア・経験を生かしてレッスンが出来る環境が、荏原SSCの良い所です。労働環境も、従業員目線で親身に対応してもらえるので、とても働きやすい環境です。' },
    { name: '吉田 司', age: 23, quote: '入社して最初緊張していましたが、しっかりと研修を積み、自信をもってレッスンに臨むことが出来ました。お客様が上達され喜ばれている姿を見て、自分も元気をもらってます！' },
  ];

  return (
    <div className="ts-screen ts-tap" style={{ minHeight: '100%', paddingBottom: 90 }}>
      <TsHeader title="コーチ求人" showBack />
      <TsCrumb items={['HOME', 'コーチ求人', '荏原湘南']} />

      {/* ヒーロー */}
      <div style={{
        position: 'relative', overflow: 'hidden',
        background: `linear-gradient(160deg, ${T.ink} 0%, #24402a 100%)`,
        color: '#fff', padding: '24px 16px 26px',
      }}>
        <svg viewBox="0 0 375 200" style={{ position: 'absolute', right: -30, bottom: -30, width: 220, height: 180, opacity: 0.14 }}>
          <circle cx="100" cy="100" r="80" stroke={T.brand} strokeWidth="1.5" fill="none"/>
          <path d="M20 100C60 60 140 60 180 100M20 100C60 140 140 140 180 100" stroke={T.brand} strokeWidth="1" fill="none"/>
        </svg>
        <div style={{ position: 'relative' }}>
          <div className="ts-en" style={{ fontSize: 10, letterSpacing: '0.2em', color: T.brand, fontWeight: 700, marginBottom: 6 }}>
            COACH RECRUITMENT
          </div>
          <h1 style={{ fontSize: 22, fontWeight: 800, margin: '0 0 10px', lineHeight: 1.35, letterSpacing: '0.02em' }}>
            私たちと一緒に<br/>働きませんか？
          </h1>
          <div style={{ fontSize: 14, color: '#e2ecd8', fontWeight: 600, marginBottom: 4 }}>
            荏原湘南スポーツセンター
          </div>
          <div style={{ fontSize: 11.5, color: '#a8b8a3' }}>
            神奈川県藤沢市・茅ヶ崎市｜正社員登用あり
          </div>
        </div>
      </div>

      {/* メイン画像 + サムネイル */}
      <div style={{ padding: '16px', background: T.paper, borderBottom: `1px solid ${T.line}` }}>
        <TsImgSlot h={200} label="facility" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6, marginTop: 6 }}>
          <TsImgSlot h={56} label="lesson" />
          <TsImgSlot h={56} label="staff" />
          <TsImgSlot h={56} label="court" />
          <TsImgSlot h={56} label="clubhouse" />
        </div>
      </div>

      {/* 活動内容セクション */}
      <div style={{ background: T.paper, marginTop: 8, padding: '18px 16px 8px' }}>
        <SectionEyebrow eyebrow="ABOUT" title="活動内容" />
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12.5, marginTop: 12 }}>
          <tbody>
            {rows.map(([k, v], i) => (
              <tr key={i} style={{ borderBottom: `1px solid ${T.lineSoft}` }}>
                <th style={{
                  textAlign: 'left', verticalAlign: 'top', padding: '12px 8px 12px 0',
                  width: 80, fontSize: 11, fontWeight: 700, color: T.brandDeep, letterSpacing: '0.02em',
                }}>{k}</th>
                <td style={{ padding: '12px 0', color: T.ink, lineHeight: 1.75 }}>{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 給与 */}
      <div style={{ background: T.paper, marginTop: 8, padding: '18px 16px' }}>
        <SectionEyebrow eyebrow="SALARY" title="給与" />
        <div style={{ marginTop: 12 }}>
          <SalaryBlock
            title="契約社員（レッスン業務及び事務、企画など）"
            note="正社員登用あり"
            items={[
              { label: '新卒', main: '月給 基本給 210,000円〜', sub: '諸手当（家賃補助、食事補助など）' },
              { label: '中途', main: '経験・年齢・資格・実績を考慮の上決定', sub: '' },
            ]}
          />
          <SalaryBlock
            title="契約テニスコーチ"
            style={{ marginTop: 12 }}
            items={[
              { label: '専属', main: '時給 1,620円〜3,030円', sub: 'その他各種手当あり（1レッスン90分：2,430円〜4,545円）' },
              { label: 'アルバイト', main: '時給 1,440円〜', sub: 'その他各種手当あり（1レッスン90分：2,160円〜）' },
              { label: '業務委託', main: '経験・年齢・資格・実績を考慮の上決定', sub: '' },
            ]}
          />
        </div>
      </div>

      {/* 待遇 */}
      <div style={{ background: T.paper, marginTop: 8, padding: '18px 16px' }}>
        <SectionEyebrow eyebrow="BENEFITS" title="待遇" />
        <div style={{ marginTop: 12 }}>
          <BenefitBlock
            title="契約社員"
            items={['社会・労保険完備', '時間外・深夜・休日手当', '各種手当', '交通費支給', 'マイカー通勤OK', '用品割引', '昇給あり（年1回）', '週休2日制', '施設利用可']}
          />
          <BenefitBlock
            style={{ marginTop: 12 }}
            title="契約テニスコーチ（専属・アルバイト）"
            items={['社会・労災保険完備 (条件あり)', '時間外・深夜・休日手当', '交通費支給 (規定による)', 'マイカー通勤OK', '用品割引', '昇給あり（年1回）', '週休2日制 (専属)', '施設利用可']}
          />
          <BenefitBlock
            style={{ marginTop: 12 }}
            title="契約テニスコーチ（業務委託）"
            items={['交通費支給 (規定による)', 'マイカー通勤OK']}
          />
        </div>
      </div>

      {/* 応募・問い合わせ */}
      <div style={{ margin: '8px 16px 0', background: T.ink, color: '#fff', borderRadius: 4, padding: '18px 16px' }}>
        <div className="ts-en" style={{ fontSize: 10, letterSpacing: '0.2em', color: T.brand, fontWeight: 700, marginBottom: 6 }}>CONTACT</div>
        <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>応募 / お問い合わせ先</div>
        <div style={{ fontSize: 11.5, color: '#c4d0c1', marginBottom: 14 }}>
          担当：千葉、柵瀬
        </div>
        <div style={{
          background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(108,158,29,0.3)',
          borderRadius: 3, padding: '12px', marginBottom: 8,
        }}>
          <div style={{ fontSize: 9.5, color: '#a8b8a3', letterSpacing: '0.08em', fontWeight: 600, marginBottom: 4 }}>お電話</div>
          <div className="ts-en" style={{ fontSize: 18, fontWeight: 800, color: '#fff', letterSpacing: '0.02em' }}>0466-81-3411</div>
        </div>
        <div style={{
          background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(108,158,29,0.3)',
          borderRadius: 3, padding: '12px',
        }}>
          <div style={{ fontSize: 9.5, color: '#a8b8a3', letterSpacing: '0.08em', fontWeight: 600, marginBottom: 4 }}>メール</div>
          <div className="ts-en" style={{ fontSize: 13, fontWeight: 700, color: '#fff', wordBreak: 'break-all' }}>contactus@ebarassc.co.jp</div>
        </div>
      </div>

      {/* コーチコメント */}
      <div style={{ padding: '20px 16px 8px' }}>
        <SectionEyebrow eyebrow="VOICE" title="コーチからのコメント" />
        <div style={{ marginTop: 12 }}>
          {coaches.map((c, i) => <CoachCard key={i} {...c} />)}
        </div>
      </div>

      <TsFooter />

      {/* 固定 CTA */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '10px 16px 14px', background: 'rgba(255,255,255,0.96)',
        borderTop: `1px solid ${T.line}`, backdropFilter: 'blur(10px)',
        boxShadow: '0 -6px 20px rgba(0,0,0,0.08)',
        display: 'flex', gap: 8, alignItems: 'center',
      }}>
        <TsBtn variant="outline">
          <svg width="14" height="14" viewBox="0 0 20 20"><path d="M14 12.5v3a1.5 1.5 0 0 1-1.5 1.5A11 11 0 0 1 3 6.5 1.5 1.5 0 0 1 4.5 5h3a1 1 0 0 1 1 .8l.5 2.5-1.8 1.2a10 10 0 0 0 4.3 4.3l1.2-1.8L15 12.5a1 1 0 0 1 .8 1z" stroke={T.ink} strokeWidth="1.5" fill="none"/></svg>
          電話
        </TsBtn>
        <TsBtn full size="lg" variant="brand">
          応募フォームへ
          <svg width="10" height="10" viewBox="0 0 10 10"><path d="M1 5h8M5 1l4 4-4 4" stroke="#fff" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </TsBtn>
      </div>
    </div>
  );
}

// ── パーツ
function SectionEyebrow({ eyebrow, title }) {
  return (
    <div>
      <div className="ts-en" style={{ fontSize: 10, fontWeight: 700, color: T.brand, letterSpacing: '0.16em', marginBottom: 4 }}>{eyebrow}</div>
      <div style={{ fontSize: 16, fontWeight: 700, color: T.ink, letterSpacing: '0.02em' }}>{title}</div>
    </div>
  );
}

function SalaryBlock({ title, note, items, style = {} }) {
  return (
    <div style={{ border: `1px solid ${T.line}`, borderRadius: 3, overflow: 'hidden', ...style }}>
      <div style={{
        padding: '10px 12px', background: T.cream, borderBottom: `1px solid ${T.line}`,
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: T.ink, flex: 1 }}>{title}</div>
        {note && <TsBadge variant="accent" size="sm">{note}</TsBadge>}
      </div>
      <div>
        {items.map((x, i) => (
          <div key={i} style={{
            padding: '10px 12px', borderBottom: i < items.length - 1 ? `1px solid ${T.lineSoft}` : 'none',
          }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span style={{
                display: 'inline-block', minWidth: 52, textAlign: 'center', fontSize: 10.5,
                background: T.brandTint, color: T.brandDeep, fontWeight: 700,
                padding: '2px 6px', borderRadius: 2,
              }}>{x.label}</span>
              <span style={{ fontSize: 12.5, fontWeight: 700, color: T.ink, letterSpacing: '0.01em', flex: 1 }}>{x.main}</span>
            </div>
            {x.sub && <div style={{ fontSize: 10.5, color: T.muted, marginTop: 4, marginLeft: 60, lineHeight: 1.55 }}>{x.sub}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

function BenefitBlock({ title, items, style = {} }) {
  return (
    <div style={{ ...style }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: T.ink, marginBottom: 8 }}>{title}</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
        {items.map((x, i) => (
          <span key={i} style={{
            fontSize: 11, color: T.inkSoft, background: T.paper,
            border: `1px solid ${T.line}`, borderRadius: 2, padding: '4px 8px',
          }}>
            <span style={{ color: T.brand, marginRight: 4 }}>✓</span>{x}
          </span>
        ))}
      </div>
    </div>
  );
}

function CoachCard({ name, age, quote, hasInterview }) {
  return (
    <div style={{
      background: T.paper, border: `1px solid ${T.line}`, borderRadius: 4,
      padding: '14px', marginBottom: 10, display: 'flex', gap: 12,
    }}>
      <div style={{ flexShrink: 0 }}>
        <div style={{
          width: 88, height: 88, borderRadius: '50%', overflow: 'hidden',
          border: `1.5px solid ${T.line}`,
        }}>
          <TsImgSlot h="100%" label="face" />
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 6 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: T.ink }}>{name}</span>
          <span style={{ fontSize: 10, color: T.muted }}>コーチ / {age}歳</span>
        </div>
        <p style={{ margin: 0, fontSize: 11.5, color: T.inkSoft, lineHeight: 1.7 }}>「{quote}」</p>
        {hasInterview && (
          <a style={{
            display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 8,
            fontSize: 11, fontWeight: 700, color: T.brandDeep,
          }}>
            インタビュー詳細はこちら
            <svg width="8" height="10" viewBox="0 0 8 10"><path d="M1 1l6 4-6 4" stroke={T.brandDeep} strokeWidth="1.4" fill="none" strokeLinecap="round"/></svg>
          </a>
        )}
      </div>
    </div>
  );
}

Object.assign(window, { ScreenCoach });
