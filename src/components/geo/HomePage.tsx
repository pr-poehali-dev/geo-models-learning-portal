import Icon from "@/components/ui/icon";
import { type Page } from "./data";

export default function HomePage({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-16 animate-slide-up">
        <p className="text-primary text-xs font-body font-medium tracking-[0.2em] uppercase mb-3">
          Учебный портал
        </p>
        <h1 className="font-display text-5xl md:text-6xl font-semibold text-foreground leading-tight mb-5">
          Геологическое
          <br />
          <span className="text-primary italic">моделирование</span>
        </h1>
        <p className="text-muted-foreground font-body text-base leading-relaxed max-w-xl">
          Системный курс по построению цифровых моделей месторождений: от основ
          геологии пласта до подсчёта запасов и оценки неопределённости.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-14">
        {[
          {
            page: "theory" as Page,
            icon: "BookOpen",
            title: "Теория",
            desc: "6 тем с пошаговым изучением методов моделирования",
            count: "6 тем",
          },
          {
            page: "models" as Page,
            icon: "Layers",
            title: "Модели",
            desc: "Типы геологических моделей и их характеристики",
            count: "4 типа",
          },
          {
            page: "glossary" as Page,
            icon: "BookMarked",
            title: "Словарь",
            desc: "Термины и определения по геомоделированию",
            count: "20 терминов",
          },
        ].map((card, i) => (
          <button
            key={card.page}
            onClick={() => setPage(card.page)}
            className="card-hover text-left p-5 rounded-lg border border-border bg-card animate-slide-up"
            style={{ animationDelay: `${(i + 1) * 100}ms`, animationFillMode: "both" }}
          >
            <div className="w-9 h-9 rounded-md bg-primary/10 flex items-center justify-center mb-4">
              <Icon name={card.icon} size={18} className="text-primary" />
            </div>
            <p className="font-display text-xl font-semibold text-foreground mb-1">{card.title}</p>
            <p className="text-muted-foreground text-sm font-body mb-3 leading-relaxed">{card.desc}</p>
            <span className="text-primary text-xs font-body font-medium">{card.count} →</span>
          </button>
        ))}
      </div>

      <div
        className="border-l-2 border-primary pl-5 py-1 animate-slide-up"
        style={{ animationDelay: "400ms", animationFillMode: "both" }}
      >
        <p className="font-display text-lg italic text-foreground/80 leading-relaxed">
          «Все модели неверны, но некоторые полезны.»
        </p>
        <p className="text-muted-foreground text-xs font-body mt-2">— Джордж Бокс, статистик</p>
      </div>
    </div>
  );
}
