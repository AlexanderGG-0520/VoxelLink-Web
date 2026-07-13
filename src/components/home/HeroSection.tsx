import iconUrl from "../../assets/voxellink-icon.png";
import { siteUrls } from "../../data/site";
import { ButtonLink } from "../ui/ButtonLink";
export function HeroSection() {
  return (
    <section
      className="mx-auto flex w-[min(1160px,calc(100%_-_2rem))] flex-col items-center px-0 pt-5 pb-6 text-center sm:w-[min(1160px,calc(100%_-_2.5rem))]"
      id="top"
    >
      <img
        className="mb-5 size-26 rounded-3xl bg-panel object-cover shadow-[0_0_0_1px_rgb(245_249_255_/_10%),0_20px_44px_rgb(0_0_0_/_24%)] sm:size-35"
        src={iconUrl}
        alt="VoxelLink"
      />
      <div className="grid max-w-232 justify-items-center">
        <h1 className="text-[clamp(4.2rem,11vw,7.4rem)] leading-[.9] font-bold tracking-tight">
          VoxelLink
        </h1>
        <p className="mt-4 text-[clamp(1.48rem,3.6vw,2.45rem)] leading-tight font-extrabold">
          Modded Minecraftを、
          <br />
          遊ぶだけで終わらせない。
        </p>
        <p className="mt-4 max-w-195 text-muted">
          サーバーを立てる人、Modpackや環境を組む人、遊び方を作る人が、同じ場所で話せるDiscordコミュニティです。
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3 max-sm:w-full max-sm:[&>a]:w-full">
          <ButtonLink
            href={siteUrls.discordInvite}
            target="_blank"
            rel="noopener noreferrer"
          >
            Discordに参加する
          </ButtonLink>
          <ButtonLink to="/#about" variant="secondary">
            詳しく見る
          </ButtonLink>
        </div>
      </div>
      <div
        className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm font-bold text-[#c8d8df]"
        aria-label="VoxelLinkが大切にしていること"
      >
        <span>■ 遊ぶ / 組む / 作る</span>
        <span>■ 少人数寄り</span>
        <span>■ 24時間サーバー</span>
      </div>
    </section>
  );
}
