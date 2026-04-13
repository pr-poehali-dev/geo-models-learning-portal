import Icon from "@/components/ui/icon";
import { GLOSSARY_TERMS } from "./data";

interface GlossaryPageProps {
  search: string;
  setSearch: (v: string) => void;
  filtered: typeof GLOSSARY_TERMS;
}

export default function GlossaryPage({ search, setSearch, filtered }: GlossaryPageProps) {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-8 animate-fade-in">
        <p className="text-primary text-xs font-body font-medium tracking-[0.2em] uppercase mb-2">
          Справочник
        </p>
        <h2 className="font-display text-4xl font-semibold text-foreground">Словарь терминов</h2>
        <p className="text-muted-foreground font-body mt-2 text-sm">
          {GLOSSARY_TERMS.length} терминов по геологическому моделированию
        </p>
      </div>

      <div className="relative mb-8 animate-slide-up" style={{ animationFillMode: "both" }}>
        <Icon
          name="Search"
          size={16}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <input
          type="text"
          placeholder="Поиск по терминам и определениям..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-card border border-border rounded-lg pl-10 pr-4 py-3 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
        />
        {search && (
          <button
            onClick={() => setSearch("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <Icon name="X" size={14} />
          </button>
        )}
      </div>

      {search && (
        <p className="text-xs font-body text-muted-foreground mb-4 animate-fade-in">
          Найдено: <span className="text-primary font-medium">{filtered.length}</span> из{" "}
          {GLOSSARY_TERMS.length}
        </p>
      )}

      <div className="space-y-2.5">
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground font-body animate-fade-in">
            <Icon name="SearchX" size={32} className="mx-auto mb-3 opacity-30" />
            <p>Ничего не найдено по запросу «{search}»</p>
          </div>
        ) : (
          filtered.map((item, i) => (
            <div
              key={item.term}
              className="animate-slide-up group border border-border hover:border-primary/25 rounded-lg px-5 py-4 bg-card/50 hover:bg-card transition-all duration-200"
              style={{ animationDelay: `${Math.min(i * 40, 400)}ms`, animationFillMode: "both" }}
            >
              <div className="flex items-start gap-4">
                <span className="w-1 h-1 rounded-full bg-primary mt-2 shrink-0 opacity-60 group-hover:opacity-100 transition-opacity" />
                <div>
                  <p className="font-display text-lg font-semibold text-foreground leading-tight mb-1">
                    {item.term}
                  </p>
                  <p className="text-muted-foreground font-body text-sm leading-relaxed">
                    {item.def}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
