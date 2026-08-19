import {
  environmentFacts,
  firstSteps,
  suitableUsers,
  unsuitableUsers,
} from "../../data/home";
import { siteUrls } from "../../data/site";
import { ButtonLink } from "../ui/ButtonLink";
import { Link } from "react-router-dom";
import { ListPanel } from "../ui/ListPanel";
import { SectionHeading } from "../ui/SectionHeading";
const sectionClass =
  "mx-auto w-[min(1160px,calc(100%_-_2rem))] py-13 sm:w-[min(1160px,calc(100%_-_2.5rem))]";
const bulletClass =
  "relative pl-6 text-copy-secondary before:absolute before:left-0 before:top-3 before:size-2 before:bg-cyan before:content-['']";
export function AboutSection() {
  return (
    <section
      className={`${sectionClass} grid gap-10 border-t border-line md:grid-cols-[.9fr_1.1fr] md:gap-13`}
      id="about"
    >
      <div>
        <p className="mb-3.5 text-xs font-extrabold tracking-wide text-cyan">
          概要
        </p>
        <h2 className="text-3xl leading-tight font-bold tracking-tight sm:text-5xl">
          Minecraftを中心に、遊びと運用と制作が近い場所。
        </h2>
      </div>
      <div className="grid gap-4.5 text-muted">
        <p>
          話題ごとに部屋を分けすぎると便利そうに見えますが、Modpackの相性からサーバー負荷、Linuxの設定、ちょっとしたツール作りへそのまま脱線する会話は途切れやすくなります。VoxelLinkでは、その脱線を無理に切りません。
        </p>
        <ul className="grid gap-x-7 gap-y-3 sm:grid-cols-2">
          {environmentFacts.map((fact) => (
            <li className={bulletClass} key={fact}>
              {fact}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
export function AudienceSection() {
  return (
    <section className={sectionClass} aria-labelledby="for-whom-title">
      <SectionHeading
        eyebrow="向いている人"
        title="合う人・合わない人"
        id="for-whom-title"
      >
        大人数の勢いだけで流れる場所にも、閉じた身内ノリにも寄せすぎません。だから、合う人と合わない人は最初に少しはっきりさせています。
      </SectionHeading>
      <div className="grid gap-4.5 md:grid-cols-2">
        <ListPanel title="向いている人" items={suitableUsers} tone="positive" />
        <ListPanel
          title="向いていない人"
          items={unsuitableUsers}
          tone="caution"
        />
      </div>
    </section>
  );
}
export function ServerSection() {
  return (
    <section
      className={`${sectionClass} grid items-center gap-8 rounded-lg border border-line bg-panel-elevated p-7 md:grid-cols-[1.15fr_.8fr] md:p-11`}
      id="servers"
      aria-labelledby="servers-title"
    >
      <div className="grid gap-4">
        <p className="text-xs font-extrabold tracking-wide text-cyan">
          サーバー
        </p>
        <h2
          id="servers-title"
          className="text-3xl leading-tight font-bold tracking-tight sm:text-5xl"
        >
          今すぐ遊べるサーバー。
        </h2>
        <p className="text-muted">
          生活・建築・冒険を自分のペースで楽しめる、Alec SMP 2! を公開中です。
        </p>
      </div>
      <div className="grid min-h-48 content-center justify-items-start gap-3 rounded-lg border border-line bg-[linear-gradient(180deg,rgb(102_225_236_/_3.5%),transparent_64%),#101d2c] p-6">
        <span className="text-xs font-extrabold tracking-wide text-cyan">
          SURVIVAL MULTIPLAYER
        </span>
        <strong className="text-3xl leading-none text-copy">Alec SMP 2!</strong>
        <span className="text-sm text-muted">Minecraft 26.2 / Fabric</span>
        <Link
          className="mt-2 rounded-md border border-line-strong bg-cyan/10 px-4 py-2 text-sm font-extrabold text-cyan transition hover:bg-cyan/20"
          to="/servers/alec-smp-2/rules"
        >
          ルール・参加情報を見る
        </Link>
      </div>
    </section>
  );
}
export function PolicySection() {
  return (
    <section
      className={`${sectionClass} grid gap-10 border-t border-line md:grid-cols-[.9fr_1.1fr] md:gap-13`}
    >
      <div>
        <p className="mb-3.5 text-xs font-extrabold tracking-wide text-cyan">
          方針
        </p>
        <h2 className="text-3xl leading-tight font-bold tracking-tight sm:text-5xl">
          ルールは、安心して続けるための土台です。
        </h2>
      </div>
      <div className="grid gap-4 text-muted md:border-l md:border-line md:pl-6">
        <p>
          人数を増やすことより、細かい話も流れずに残る距離感を大切にします。
        </p>
        <p>
          ルールは縛るためではなく、同じ場所で長く遊ぶための土台です。質問や相談が雑に扱われず、サーバー公開や外部接続も安全性を考えて扱います。
        </p>
      </div>
    </section>
  );
}
export function JoinSection() {
  return (
    <section
      className={`${sectionClass} grid justify-items-start gap-4 rounded-lg border border-line bg-panel-elevated p-7 md:p-13`}
      aria-labelledby="join-title"
    >
      <p className="text-xs font-extrabold tracking-wide text-cyan">参加</p>
      <h2
        id="join-title"
        className="text-3xl leading-tight font-bold tracking-tight sm:text-5xl"
      >
        この空気が合いそうなら、覗いてみてください。
      </h2>
      <p className="text-muted">最初は会話を眺めるところからでも大丈夫です。</p>
      <ul className="grid max-w-205 gap-x-6 gap-y-2 sm:grid-cols-2">
        {firstSteps.map((step) => (
          <li className={bulletClass} key={step}>
            {step}
          </li>
        ))}
      </ul>
      <ButtonLink
        href={siteUrls.discordInvite}
        target="_blank"
        rel="noopener noreferrer"
      >
        Discordに参加する
      </ButtonLink>
    </section>
  );
}
