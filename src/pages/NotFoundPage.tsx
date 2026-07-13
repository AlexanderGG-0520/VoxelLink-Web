import { ButtonLink } from "../components/ui/ButtonLink";
export function NotFoundPage() {
  return (
    <section className="mx-auto grid min-h-105 w-[min(920px,calc(100%_-_2rem))] content-center justify-items-start gap-5 py-16 sm:w-[min(920px,calc(100%_-_2.5rem))]">
      <p className="text-xs font-extrabold tracking-wide text-cyan">404</p>
      <h1 className="text-4xl leading-tight font-bold tracking-tight sm:text-6xl">
        ページが見つかりません。
      </h1>
      <p className="text-muted">
        指定されたページは存在しないか、移動した可能性があります。
      </p>
      <ButtonLink to="/">トップへ戻る</ButtonLink>
    </section>
  );
}
