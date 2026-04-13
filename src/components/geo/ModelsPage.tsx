import { useState } from "react";
import Icon from "@/components/ui/icon";
import { MODELS } from "./data";

export default function ModelsPage() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-10 animate-fade-in">
        <p className="text-primary text-xs font-body font-medium tracking-[0.2em] uppercase mb-2">
          Классификация
        </p>
        <h2 className="font-display text-4xl font-semibold text-foreground">Типы моделей</h2>
        <p className="text-muted-foreground font-body mt-2 text-sm">
          Иерархия геологических и гидродинамических моделей месторождения
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {MODELS.map((model, i) => (
          <div
            key={i}
            className={`animate-slide-up rounded-xl border overflow-hidden cursor-pointer transition-all duration-300 ${
              selected === i
                ? "border-primary/50 shadow-lg shadow-primary/10"
                : "border-border hover:border-primary/25"
            }`}
            style={{ animationDelay: `${i * 80}ms`, animationFillMode: "both" }}
            onClick={() => setSelected(selected === i ? null : i)}
          >
            <div className="relative overflow-hidden">
              <img
                src={model.image}
                alt={model.name}
                className="w-full h-40 object-cover"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${model.color} from-[hsl(var(--card))] via-[hsl(var(--card))]/60 to-transparent`} />
              <div className="absolute inset-0 p-5 flex flex-col justify-end">
                <div className="flex items-start justify-between mb-2">
                  <div className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center">
                    <Icon name={model.icon} size={15} className={model.accentColor} />
                  </div>
                  <Icon
                    name={selected === i ? "ChevronUp" : "ChevronDown"}
                    size={15}
                    className="text-muted-foreground mt-1"
                  />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground leading-tight">
                  {model.name}
                </h3>
                <p className={`text-xs font-body mt-0.5 ${model.accentColor} opacity-70`}>
                  {model.short}
                </p>
              </div>
            </div>

            {selected === i && (
              <div className="bg-card p-5 border-t border-border animate-fade-in">
                <p className="text-foreground/80 font-body text-sm leading-relaxed mb-4">
                  {model.desc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {model.params.map((p) => (
                    <span
                      key={p}
                      className="text-xs font-body px-2.5 py-1 rounded-md border border-primary/20 text-primary bg-primary/5"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div
        className="mt-8 border border-border rounded-xl p-6 bg-card animate-slide-up"
        style={{ animationDelay: "400ms", animationFillMode: "both" }}
      >
        <p className="text-xs font-body font-medium tracking-[0.15em] uppercase text-muted-foreground mb-4">
          Иерархия построения
        </p>
        <div className="flex items-center gap-2 flex-wrap">
          {[
            "Сейсмика + Скважины",
            "Структурная модель",
            "Литологическая модель",
            "Петрофизическая модель",
            "Гидродинамическая модель",
          ].map((step, i, arr) => (
            <div key={step} className="flex items-center gap-2">
              <span className="font-body text-xs text-foreground/70 bg-secondary px-2.5 py-1.5 rounded-md border border-border">
                {step}
              </span>
              {i < arr.length - 1 && (
                <Icon name="ArrowRight" size={13} className="text-primary/50 shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
