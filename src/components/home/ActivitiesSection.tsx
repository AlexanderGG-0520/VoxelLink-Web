import { topicCards } from "../../data/home";
import { SectionHeading } from "../ui/SectionHeading";
export function ActivitiesSection() {
  return (
    <section
      className="mx-auto w-[min(1160px,calc(100%_-_2rem))] py-13 sm:w-[min(1160px,calc(100%_-_2.5rem))]"
      id="activities"
      aria-labelledby="activities-title"
    >
      <SectionHeading
        eyebrow="できること"
        title="参加したあとにできること。"
        id="activities-title"
      />
      <div className="grid border-y border-line md:grid-cols-3">
        {topicCards.map((topic) => (
          <article
            className="grid min-h-47 content-start gap-3.5 py-6 md:px-6 md:py-7 md:not-last:border-r md:not-last:border-line"
            key={topic.title}
          >
            <h3 className="text-xl font-bold before:mr-3 before:inline-block before:size-2 before:bg-cyan before:shadow-[4px_4px_0_rgb(0_0_0_/_18%)] before:content-['']">
              {topic.title}
            </h3>
            <p className="text-sm leading-7 text-muted">{topic.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
