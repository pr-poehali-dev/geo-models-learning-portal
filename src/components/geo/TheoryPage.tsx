import { useState } from "react";
import Icon from "@/components/ui/icon";
import { THEORY_TOPICS } from "./data";

export default function TheoryPage() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-10 animate-fade-in">
        <p className="text-primary text-xs font-body font-medium tracking-[0.2em] uppercase mb-2">
          Учебные материалы
        </p>
        <h2 className="font-display text-4xl font-semibold text-foreground">Теория</h2>
        <p className="text-muted-foreground font-body mt-2 text-sm">
          Темы расположены в рекомендуемом порядке изучения
        </p>
      </div>

      <div className="space-y-3">
        {THEORY_TOPICS.map((topic, i) => (
          <div
            key={i}
            className="border rounded-lg transition-all duration-300 cursor-pointer animate-slide-up overflow-hidden"
            style={{ animationDelay: `${i * 60}ms`, animationFillMode: "both" }}
            onClick={() => setActive(active === i ? null : i)}
          >
            <div
              className={`flex items-center gap-4 px-5 py-4 transition-colors ${
                active === i
                  ? "border-b border-border bg-card border-primary/30"
                  : "border-border hover:border-primary/20 hover:bg-card/50"
              }`}
            >
              <span className="font-display text-3xl font-semibold text-primary/30 w-10 shrink-0 leading-none">
                {topic.number}
              </span>
              <div className="flex-1 min-w-0">
                <p className="font-display text-lg font-semibold text-foreground leading-snug">
                  {topic.title}
                </p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-muted-foreground text-xs font-body flex items-center gap-1">
                    <Icon name="Clock" size={11} />
                    {topic.duration}
                  </span>
                  <div className="flex gap-1.5">
                    {topic.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-body px-1.5 py-0.5 rounded bg-secondary text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <Icon
                name={active === i ? "ChevronUp" : "ChevronDown"}
                size={16}
                className="text-muted-foreground shrink-0"
              />
            </div>
            {active === i && (
              <div
                className="bg-card animate-fade-in"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="px-5 pt-5 pb-2">
                  <p className="text-foreground/80 font-body text-sm leading-relaxed italic border-l-2 border-primary/30 pl-4">
                    {topic.desc}
                  </p>
                </div>

                <div className="px-5 py-4 space-y-6">
                  {topic.sections.map((section, si) => (
                    <div key={si}>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-primary/40 font-display text-xs font-semibold">
                          {String(si + 1).padStart(2, "0")}
                        </span>
                        <h4 className="font-display text-base font-semibold text-foreground">
                          {section.heading}
                        </h4>
                      </div>
                      <p className="text-foreground/75 font-body text-sm leading-[1.8] pl-7">
                        {section.text}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mx-5 mb-5 rounded-lg bg-primary/5 border border-primary/15 p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Icon name="Lightbulb" size={14} className="text-primary" />
                    <span className="font-display text-sm font-semibold text-foreground">
                      Ключевые тезисы
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {topic.keyPoints.map((point, pi) => (
                      <li key={pi} className="flex items-start gap-2.5">
                        <span className="w-1 h-1 rounded-full bg-primary mt-2 shrink-0" />
                        <span className="text-foreground/80 font-body text-sm leading-relaxed">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
