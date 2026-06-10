import voxellinkIcon from "./assets/voxellink-icon.png";

const inviteUrl = "https://discord.gg/6Vy4V5hMdk";
const iconUrl = voxellinkIcon;

const topics = [
  {
    title: "遊ぶ",
    text: "公開中のMinecraft Java Editionサーバーで遊べます。遊び方や環境の違いも前提にして話します。",
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
  "PCゲームや創作の話もしたい",
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

function App() {
  return (
    <main className="site-shell">
      <header className="topbar" aria-label="サイトヘッダー">
        <a className="brand" href="#top" aria-label="VoxelLink トップへ">
          <img className="brand-icon" src={iconUrl} alt="" />
          <span>VoxelLink</span>
        </a>
        <nav className="topbar-nav" aria-label="ページ内ナビゲーション">
          <a href="#about">概要</a>
          <a href="#activities">できること</a>
          <a href="#servers">サーバー</a>
        </nav>
        <a className="topbar-join" href={inviteUrl} target="_blank" rel="noopener noreferrer">
          参加する
        </a>
      </header>

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
          <p>
            VoxelLinkは、Minecraftで遊ぶ場所であり、環境を整えたり、作ったり、
            技術の話を続けたりできる場所でもあります。
          </p>
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
            VoxelLinkは、Minecraftで遊ぶこと、環境を整えること、作ることが近いDiscordコミュニティです。
          </p>
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
            公開範囲を見ながら、管理できる形を選びます。
          </p>
          <p>自由に公開するだけの場所ではなく、安全性と続けやすさを優先します。</p>
        </div>
        <div className="server-panel" aria-hidden="true">
          <span>サーバー運用</span>
          <strong>管理</strong>
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
            人が増えること自体は悪いことではありません。ただ、速い雑談だけで流れてしまうと、
            Modpackの構成やサーバー運用のような少し細かい話は残りにくくなります。
            VoxelLinkでは、人数を追うことより、会話が残る距離感を大切にします。
          </p>
          <p>
            サーバー公開や外部接続は便利ですが、IP露出やポート開放などのリスクもあります。
            MinecraftサーバーもWebサービスに近い性質を持つので、勢いだけで公開せず、
            管理できる形を選びます。
          </p>
          <p>
            ルールは縛るためではなく、同じ場所で長く遊び続けるためにあります。
            技術や経験に差があっても、質問や相談が雑に扱われない空気を大切にします。
          </p>
        </div>
      </section>

      <section className="section join-section" aria-labelledby="join-title">
        <p className="section-kicker">参加</p>
        <h2 id="join-title">この空気が合いそうなら、覗いてみてください。</h2>
        <p>
          Minecraftで遊ぶだけでなく、環境を整えたり、サーバーを考えたり、
          小さく作ったものを見せたりするのが好きなら、VoxelLinkは合うかもしれません。
          参加したら、短く自己紹介しても、公開中のサーバーを見に行っても、
          気になる技術の話を眺めるところからでも大丈夫です。
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

      <footer className="footer">
        <strong>VoxelLink</strong>
        <span>Modded Minecraftを中心に、遊ぶこと・組むこと・作ることが近いDiscordコミュニティ。</span>
      </footer>
    </main>
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
