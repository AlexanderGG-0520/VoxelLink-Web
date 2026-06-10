import voxellinkIcon from "./assets/voxellink-icon.png";

const inviteUrl = "https://discord.gg/6Vy4V5hMdk";
const iconUrl = voxellinkIcon;

const topics = [
  {
    title: "遊ぶ",
    text: "24時間公開のMinecraft Java Editionサーバーで遊べます。Modded Minecraftを中心に、遊び方や環境の違いも前提にして話します。",
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
  "少人数で落ち着いて話したい",
  "分からないことも、雑に投げずに話せる",
  "PCゲームや創作の話もしたい",
];

const notFitItems = [
  "宣伝だけが目的",
  "荒らし、煽り、距離感を無視した交流が目的",
  "他人の環境や遊び方を雑に否定する",
  "即大人数の盛り上がりだけを求める",
  "ルールや安全性の考え方を無視する",
];

const environmentFacts = [
  "Minecraft Java Editionを中心にしたDiscordコミュニティ",
  "Modded Minecraft、Mod開発、データパック、リソースパックの話題が中心",
  "複数のMinecraftサーバーを継続運用し、24時間遊べる環境を用意",
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
            サーバーを立てる人、Modpackを組む人、遊び方を作る人が、
            同じ場所で話せるDiscordコミュニティです。「組む」には、
            Modpackの構成、サーバー設定、道具や環境をつなげる作業も含めています。
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
            VoxelLinkは、Modded Minecraftを軸にしたDiscordコミュニティです。
            複数のMinecraftサーバーを継続して運用し、Java Editionで24時間遊べる環境を用意しています。
          </p>
          <p>
            話題ごとに部屋を分けすぎると便利そうに見えますが、
            Modpackの相性からサーバー負荷、Linuxの設定、ちょっとしたツール作りへ
            そのまま脱線する会話は途切れやすくなります。VoxelLinkでは、その脱線を無理に切りません。
          </p>
        </div>
      </section>

      <section className="section operations-section" aria-labelledby="operations-title">
        <div className="section-heading">
          <p className="section-kicker">環境</p>
          <h2 id="operations-title">いま扱っている環境。</h2>
          <p>
            大きさや勢いを強く見せるより、実際に続けられる範囲をはっきりさせています。
            小さめの場所で、落ち着いて関わりたい人に向いたコミュニティです。
          </p>
        </div>
        <ul className="fact-list">
          {environmentFacts.map((fact) => (
            <li key={fact}>{fact}</li>
          ))}
        </ul>
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
          <h2 id="servers-title">遊び続けられるサーバーを、無理なく運用する。</h2>
          <p>
            VoxelLinkではJava版Minecraftを中心に、複数の24時間稼働サーバーを運用しています。
            Modded Minecraftを中心に、遊ぶための環境と、環境を整えるための会話の両方を扱います。
          </p>
          <p>
            サーバーは立てれば終わりではなく、バックアップ、権限、負荷、公開範囲を考える必要があります。
            誰でも何でも自由に公開できる場所ではなく、安全性と継続性を見ながら運用します。
          </p>
        </div>
        <div className="server-panel" aria-hidden="true">
          <span>Java Edition</span>
          <strong>24時間</strong>
          <small>複数のMinecraftサーバー</small>
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
            VoxelLinkでは、人数を追うことより、継続して話せる距離感を大切にします。
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
          Modded Minecraftを遊ぶだけでなく、環境を整えたり、サーバーを考えたり、
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
