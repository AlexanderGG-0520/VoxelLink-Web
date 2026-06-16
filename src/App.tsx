import type { ReactNode } from "react";
import voxellinkIcon from "./assets/voxellink-icon.png";

const inviteUrl = "https://discord.gg/6Vy4V5hMdk";
const iconUrl = voxellinkIcon;
const lastUpdated = "2026年6月17日";

const topics = [
  {
    title: "遊ぶ",
    text: "公開中のMinecraft Java Editionサーバーで遊べます。遊び方の違いも前提にして話します。",
  },
  {
    title: "作る",
    text: "Mod、データパック、リソースパック、サーバー制作について話したり、一緒に取り組んだりできます。作りかけの相談も歓迎します。",
  },
  {
    title: "話す",
    text: "Minecraftだけでなく、Linux、プログラミング、PCゲーム、FPSなども落ち着いて話せます。話題が少し広がっても自然に続けられます。",
  },
];

const fitItems = [
  "Modded Minecraftが好き",
  "Modpackやサーバー構成を考えるのが好き",
  "少人数の場所で話したい",
  "分からないことも、落ち着いて相談したい",
];

const notFitItems = [
  "宣伝だけを目的にしている",
  "煽りや距離感を無視した交流をする",
  "他人の環境や遊び方を一方的に否定する",
  "ルールや安全性の考え方を無視する",
];

const environmentFacts = [
  "Minecraft Java Edition / Modded Minecraft中心",
  "複数のMinecraftサーバーを24時間運用",
  "Mod、データパック、リソースパック、サーバー運用の話題",
  "Linux、プログラミング、自宅サーバー運用の相談も歓迎",
];

const firstSteps = [
  "短く自己紹介する",
  "公開中のMinecraftサーバーに参加する",
  "Mod、サーバー運用、Linux、プログラミングについて聞く",
  "作っているものや試している環境を共有する",
];

const legalContactText =
  "現在利用できる公開の連絡方法は、VoxelLinkのDiscordコミュニティです。規約、利用、削除依頼、プライバシーに関する相談は、Discordから管理者へ連絡してください。";

const legalContactLinkText = "Discordに参加して連絡する";

const termsLead =
  "VoxelLinkを安心して使い続けるための基本的な約束です。コミュニティ、Minecraftサーバー、関連する自ホストサービスを利用する前に確認してください。";

const privacyLead =
  "VoxelLinkで扱う可能性のある情報と、その利用目的を実用的な範囲で説明します。";

type LegalSectionData = {
  title: string;
  paragraphs: string[];
  items?: string[];
  contactLink?: boolean;
};

const termsSections: LegalSectionData[] = [
  {
    title: "1. VoxelLinkについて",
    paragraphs: [
      "VoxelLinkは、Minecraftプレイヤー、クリエイター、技術系ユーザー、および関連コミュニティのためのコミュニティプラットフォームです。Minecraftサーバー、コミュニティサービス、自ホストのチャット基盤などと接続して利用される場合があります。",
    ],
  },
  {
    title: "2. 利用上のルール",
    paragraphs: [
      "利用者は、VoxelLink内で定められたコミュニティルールと、適用される法律を守る必要があります。次の行為は禁止します。",
    ],
    items: [
      "スパム、荒らし、迷惑な宣伝行為",
      "嫌がらせ、脅迫、差別的または攻撃的な行為",
      "なりすまし、誤解を招くプロフィールや表示",
      "悪意のあるリンク、マルウェア、不正なファイルの共有",
      "サービス、サーバー、API、インフラへの過度な負荷や妨害",
      "処分回避、BAN回避、許可されていない自動化やボット利用",
    ],
  },
  {
    title: "3. ユーザー生成コンテンツ",
    paragraphs: [
      "メッセージ、プロフィール、ファイル、画像、リンク、コミュニティ投稿など、利用者が投稿またはアップロードした内容は、必要に応じて管理者による確認やモデレーションの対象になります。",
    ],
  },
  {
    title: "4. 管理上の対応",
    paragraphs: [
      "コミュニティの安全性、安定性、運用上の必要がある場合、管理者はコンテンツの削除、アカウント機能の制限、アクセス停止、BANなどの対応を行うことがあります。",
    ],
  },
  {
    title: "5. サービスの提供",
    paragraphs: [
      "VoxelLinkは現状有姿で提供されます。個人または小規模な自ホスト基盤を含むサービスであるため、常時利用できること、データや機能が常に維持されること、特定の目的に適合することは保証しません。",
    ],
  },
  {
    title: "6. 規約の更新",
    paragraphs: [
      "ルールや本規約は、運用状況、機能追加、法令や外部サービスの変更に応じて更新されることがあります。重要な変更がある場合は、可能な範囲でコミュニティ内またはサイト上で案内します。",
    ],
  },
  {
    title: "7. 連絡先",
    paragraphs: [legalContactText],
    contactLink: true,
  },
];

const privacySections: LegalSectionData[] = [
  {
    title: "1. 運営形態",
    paragraphs: [
      "VoxelLinkは、VoxelLinkコミュニティのために運用される自ホスト基盤です。Minecraft、チャット、コミュニティ機能、関連する外部連携を提供するために必要な情報を扱うことがあります。",
    ],
  },
  {
    title: "2. 収集する可能性のある情報",
    paragraphs: ["サービスの機能や設定に応じて、次の情報を扱うことがあります。"],
    items: [
      "ユーザー名、メールアドレス、表示名、アバター、プロフィール設定などのアカウント情報",
      "メッセージ、添付ファイル、アップロードされた画像やファイル、リンク、コミュニティ投稿",
      "IPアドレス、ユーザーエージェント、リクエストログ、モデレーションログ、セキュリティイベントなどの技術ログ",
      "メール配信、ボット対策、GIF検索、リンクプレビュー、将来の音声機能などに必要な任意の連携データ",
    ],
  },
  {
    title: "3. 利用目的",
    paragraphs: ["収集した情報は、主に次の目的で利用します。"],
    items: [
      "アカウントの作成、ログイン、設定管理などの基本機能",
      "メッセージ、投稿、ファイル共有などのコミュニティ機能",
      "モデレーション、荒らしや不正利用の防止、BAN回避への対応",
      "セキュリティ確保、障害調査、サービス保守",
      "メール配信が有効な場合の通知、本人確認、パスワード回復",
    ],
  },
  {
    title: "4. 外部サービスとの連携",
    paragraphs: [
      "VoxelLinkは、運用や機能提供のために外部サービスを利用する場合があります。たとえば、CloudflareをDNS、セキュリティ、リバースプロキシ用途で利用する場合があります。また、設定が有効な場合に限り、メール配信事業者、ボット対策事業者、GIF検索やリンクプレビューの提供元などへ必要な情報が送信されることがあります。",
    ],
  },
  {
    title: "5. 保管と管理",
    paragraphs: [
      "情報は、サービス運営、セキュリティ、モデレーション、障害対応に必要な範囲で保管されます。小規模な自ホストサービスであるため、不要になった情報の削除やログの保持期間は、運用上可能な範囲で調整されます。",
    ],
  },
  {
    title: "6. 削除や相談",
    paragraphs: [
      `${legalContactText} 内容や技術的な制約によって、対応に時間がかかる場合や、すべてのログを即時削除できない場合があります。`,
    ],
    contactLink: true,
  },
  {
    title: "7. ポリシーの更新",
    paragraphs: [
      "機能追加、連携サービスの変更、運用方法の変更に合わせて、このポリシーは更新されることがあります。重要な変更がある場合は、可能な範囲でコミュニティ内またはサイト上で案内します。",
    ],
  },
];

function App() {
  const path = window.location.pathname;

  if (path === "/terms") {
    return (
      <SiteFrame>
        <LegalPage title="利用規約" lead={termsLead}>
          <LegalSections sections={termsSections} />
        </LegalPage>
      </SiteFrame>
    );
  }

  if (path === "/privacy") {
    return (
      <SiteFrame>
        <LegalPage title="プライバシーポリシー" lead={privacyLead}>
          <LegalSections sections={privacySections} />
        </LegalPage>
      </SiteFrame>
    );
  }

  return (
    <SiteFrame>
      <section className="hero section" id="top">
        <img className="hero-emblem" src={iconUrl} alt="VoxelLink" />
        <div className="hero-content">
          <h1>VoxelLink</h1>
          <p className="hero-copy">
            Modded Minecraftを、
            <br />
            遊ぶだけで終わらせない。
          </p>
          <p className="hero-description">
            サーバーを立てる人、Modpackや環境を組む人、遊び方を作る人が、
            同じ場所で話せるDiscordコミュニティです。
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href={inviteUrl} target="_blank" rel="noopener noreferrer">
              Discordに参加する
            </a>
            <a className="button button-secondary" href="#about">
              詳しく見る
            </a>
          </div>
        </div>
        <div className="hero-values" aria-label="VoxelLinkが大切にしていること">
          <span>遊ぶ / 組む / 作る</span>
          <span>少人数寄り</span>
          <span>24時間サーバー</span>
        </div>
      </section>

      <section className="section activity-section" id="activities" aria-labelledby="activities-title">
        <div className="section-heading">
          <p className="section-kicker">できること</p>
          <h2 id="activities-title">参加したあとにできること。</h2>
        </div>
        <div className="activity-list">
          {topics.map((topic) => (
            <article className="activity-item" key={topic.title}>
              <h3>{topic.title}</h3>
              <p>{topic.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section split-section" id="about">
        <div>
          <p className="section-kicker">概要</p>
          <h2>Minecraftを中心に、遊びと運用と制作が近い場所。</h2>
        </div>
        <div className="section-body">
          <p>
            話題ごとに部屋を分けすぎると便利そうに見えますが、
            Modpackの相性からサーバー負荷、Linuxの設定、ちょっとしたツール作りへ
            そのまま脱線する会話は途切れやすくなります。VoxelLinkでは、その脱線を無理に切りません。
          </p>
          <ul className="fact-list">
            {environmentFacts.map((fact) => (
              <li key={fact}>{fact}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="for-whom-title">
        <div className="section-heading">
          <p className="section-kicker">向いている人</p>
          <h2 id="for-whom-title">合う人・合わない人</h2>
          <p>
            大人数の勢いだけで流れる場所にも、閉じた身内ノリにも寄せすぎません。
            だから、合う人と合わない人は最初に少しはっきりさせています。
          </p>
        </div>
        <div className="fit-grid">
          <ListPanel title="向いている人" items={fitItems} tone="positive" />
          <ListPanel title="向いていない人" items={notFitItems} tone="caution" />
        </div>
      </section>

      <section className="section feature-band" id="servers" aria-labelledby="servers-title">
        <div className="feature-copy">
          <p className="section-kicker">サーバー</p>
          <h2 id="servers-title">立てて終わりにしない。</h2>
          <p>
            サーバーは立てれば終わりではありません。バックアップ、権限、負荷、
            公開範囲を見ながら運用します。
          </p>
        </div>
        <div className="server-panel" aria-hidden="true">
          <span>サーバー運用</span>
          <strong>継続運用</strong>
          <small>バックアップ / 権限 / 負荷 / 公開範囲</small>
        </div>
      </section>

      <section className="section split-section">
        <div>
          <p className="section-kicker">方針</p>
          <h2>ルールは、安心して続けるための土台です。</h2>
        </div>
        <div className="section-body policy-body">
          <p>
            人数を増やすことより、細かい話も流れずに残る距離感を大切にします。
          </p>
          <p>
            ルールは縛るためではなく、同じ場所で長く遊ぶための土台です。
            質問や相談が雑に扱われず、サーバー公開や外部接続も安全性を考えて扱います。
          </p>
        </div>
      </section>

      <section className="section join-section" aria-labelledby="join-title">
        <p className="section-kicker">参加</p>
        <h2 id="join-title">この空気が合いそうなら、覗いてみてください。</h2>
        <p>
          最初は会話を眺めるところからでも大丈夫です。
        </p>
        <ul className="first-step-list" aria-label="参加後にできること">
          {firstSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ul>
        <a className="button button-primary" href={inviteUrl} target="_blank" rel="noopener noreferrer">
          Discordに参加する
        </a>
      </section>
    </SiteFrame>
  );
}

type SiteFrameProps = {
  children: ReactNode;
};

function SiteFrame({ children }: SiteFrameProps) {
  const isHome = window.location.pathname === "/";

  return (
    <main className="site-shell">
      <header className="topbar" aria-label="サイトヘッダー">
        <a className="brand" href="/" aria-label="VoxelLink トップへ">
          <img className="brand-icon" src={iconUrl} alt="" />
          <span>VoxelLink</span>
        </a>
        <nav className="topbar-nav" aria-label="ナビゲーション">
          {isHome ? (
            <>
              <a href="#about">概要</a>
              <a href="#activities">できること</a>
              <a href="#servers">サーバー</a>
            </>
          ) : (
            <>
              <a href="/">トップ</a>
              <a href="/terms">利用規約</a>
              <a href="/privacy">プライバシー</a>
            </>
          )}
        </nav>
        <a className="topbar-join" href={inviteUrl} target="_blank" rel="noopener noreferrer">
          参加する
        </a>
      </header>

      {children}

      <footer className="footer">
        <div className="footer-copy">
          <strong>VoxelLink</strong>
          <span>Modded Minecraftを中心に、遊ぶこと・組むこと・作ることが近いDiscordコミュニティ。</span>
        </div>
        <nav className="footer-links" aria-label="フッターナビゲーション">
          <a href="/terms">利用規約</a>
          <a href="/privacy">プライバシーポリシー</a>
        </nav>
      </footer>
    </main>
  );
}

type LegalPageProps = {
  title: string;
  lead: string;
  children: ReactNode;
};

function LegalPage({ title, lead, children }: LegalPageProps) {
  return (
    <article className="section legal-page">
      <div className="legal-header">
        <p className="section-kicker">Legal</p>
        <h1>{title}</h1>
        <p>{lead}</p>
        <span>最終更新日: {lastUpdated}</span>
      </div>
      <div className="legal-content">{children}</div>
    </article>
  );
}

type LegalSectionProps = {
  title: string;
  children: ReactNode;
};

function LegalSection({ title, children }: LegalSectionProps) {
  return (
    <section className="legal-section">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

type LegalSectionsProps = {
  sections: LegalSectionData[];
};

function LegalSections({ sections }: LegalSectionsProps) {
  return (
    <>
      {sections.map((section) => (
        <LegalSection title={section.title} key={section.title}>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {section.items ? (
            <ul>
              {section.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : null}
          {section.contactLink ? (
            <p>
              <a href={inviteUrl} target="_blank" rel="noopener noreferrer">
                {legalContactLinkText}
              </a>
            </p>
          ) : null}
        </LegalSection>
      ))}
    </>
  );
}

type ListPanelProps = {
  title: string;
  items: string[];
  tone: "positive" | "caution";
};

function ListPanel({ title, items, tone }: ListPanelProps) {
  return (
    <article className={`list-panel ${tone}`}>
      <h3>{title}</h3>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  );
}

export default App;
