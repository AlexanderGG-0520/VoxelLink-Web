import voxellinkIcon from "./assets/voxellink-icon.png";

const inviteUrl = "https://discord.gg/6Vy4V5hMdk";
const iconUrl = voxellinkIcon;

const topics = [
  {
    title: "遊ぶ",
    text: "バニラ寄り、工業寄り、冒険寄り、軽量化重視。遊び方が違うほど、設定や環境の話も変わります。その違いを前提に話します。",
  },
  {
    title: "組む",
    text: "Modpackの相性、設定、軽量化、バックアップ、公開範囲。裏側の作業も、面倒な管理だけでなく遊びを続けるための話題です。",
  },
  {
    title: "作る",
    text: "完成品だけでなく、作っている途中のメモ、失敗、小さなツール、Bot、動画も出せる場所にします。",
  },
];

const fitItems = [
  "Modded Minecraftが好き",
  "Minecraftサーバーや技術の話に興味がある",
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
          <a href="#topics">話題</a>
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
            同じ場所で話せるDiscordコミュニティです。
            Minecraftの話から、サーバー運用、Linux、PC環境、ちょっとした制作まで、
            話が枝分かれしても、そのまま続けられる場所にします。
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
          <span>安全に公開</span>
        </div>
      </section>

      <section className="section split-section" id="about">
        <div>
          <p className="section-kicker">What is VoxelLink</p>
          <h2>Minecraftを中心に、遊びと運用と制作が近い場所。</h2>
        </div>
        <div className="section-body">
          <p>
            VoxelLinkは、Modded Minecraftを軸にしたDiscordコミュニティです。
            ただ、話題を「Minecraftだけ」に閉じ込めると、実際の会話とは少しずれます。
          </p>
          <p>
            話題ごとに部屋を分けすぎると便利そうに見えますが、
            Modpackの相性からサーバー負荷、Linuxの設定、ちょっとしたツール作りへ
            そのまま脱線する会話は途切れやすくなります。VoxelLinkでは、その脱線を無理に切りません。
          </p>
        </div>
      </section>

      <section className="section" id="topics" aria-labelledby="topics-title">
        <div className="section-heading">
          <p className="section-kicker">Topics</p>
          <h2 id="topics-title">遊ぶ、組む、作る。</h2>
          <p>
            VoxelLinkでは、この3つをあまり切り離しません。
            遊ぶ人の近くに、設定を直す人や作る人がいます。
          </p>
        </div>
        <div className="topic-grid">
          {topics.map((topic) => (
            <article className="topic-card" key={topic.title}>
              <h3>{topic.title}</h3>
              <p>{topic.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section" aria-labelledby="for-whom-title">
        <div className="section-heading">
          <p className="section-kicker">For whom</p>
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
          <p className="section-kicker">Minecraft Servers</p>
          <h2 id="servers-title">遊び続けられるサーバーを、無理なく運用する。</h2>
          <p>
            VoxelLinkではJava版Minecraftを中心に、24時間稼働のサーバーを用意する方針です。
            Hub、Modded、企画サーバーなどを扱う可能性はありますが、
            数を増やすこと自体を目的にはしません。
          </p>
          <p>
            サーバーは立てれば終わりではなく、バックアップ、権限、負荷、公開範囲を考える必要があります。
            誰でも何でも自由に公開できる場所ではなく、安全性と継続性を見ながら運用します。
          </p>
        </div>
        <div className="server-panel" aria-hidden="true">
          <span>Java Edition</span>
          <strong>24/7</strong>
          <small>Hub / Modded / Event</small>
        </div>
      </section>

      <section className="section split-section">
        <div>
          <p className="section-kicker">Policy</p>
          <h2>ルールは、安心して続けるための土台です。</h2>
        </div>
        <div className="section-body policy-body">
          <p>
            人が増えること自体は悪いことではありません。ただ、速い雑談だけで流れてしまうと、
            Modpackの構成やサーバー運用のような少し細かい話は残りにくくなります。
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
        <p className="section-kicker">Join</p>
        <h2 id="join-title">この空気が合いそうなら、覗いてみてください。</h2>
        <p>
          Modded Minecraftを遊ぶだけでなく、環境を整えたり、サーバーを考えたり、
          小さく作ったものを見せたりするのが好きなら、VoxelLinkは合うかもしれません。
          大人数の勢いより、ちゃんと続く会話が好きなら、たぶん合います。
        </p>
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
