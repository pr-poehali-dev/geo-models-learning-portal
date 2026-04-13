import { useState, useRef } from "react";
import Icon from "@/components/ui/icon";
import { type Page, NAV_ITEMS, GLOSSARY_TERMS } from "@/components/geo/data";
import HomePage from "@/components/geo/HomePage";
import TheoryPage from "@/components/geo/TheoryPage";
import ModelsPage from "@/components/geo/ModelsPage";
import GlossaryPage from "@/components/geo/GlossaryPage";

export default function Index() {
  const [page, setPageRaw] = useState<Page>("home");
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const mainRef = useRef<HTMLElement>(null);

  const setPage = (p: Page) => {
    setPageRaw(p);
    mainRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filtered = GLOSSARY_TERMS.filter(
    (t) =>
      t.term.toLowerCase().includes(search.toLowerCase()) ||
      t.def.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background flex">
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-56 bg-[hsl(var(--sidebar-background))] border-r border-border flex flex-col transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static lg:flex`}
      >
        <button
          onClick={() => { setPage("home"); setSidebarOpen(false); }}
          className="px-6 py-7 border-b border-border w-full text-left hover:bg-secondary/50 transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded bg-primary flex items-center justify-center">
              <Icon name="Layers" size={14} className="text-primary-foreground" />
            </div>
            <div>
              <p className="font-display text-base font-semibold leading-none text-foreground tracking-wide">
                ГеоМодели
              </p>
              <p className="text-[10px] text-muted-foreground mt-0.5 font-body">учебный портал</p>
            </div>
          </div>
        </button>

        <nav className="flex-1 px-3 py-5 space-y-0.5">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => { setPage(item.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-body transition-all duration-200 ${
                page === item.id
                  ? "bg-primary/15 text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              <Icon name={item.icon} size={16} />
              {item.label}
              {page === item.id && (
                <span className="ml-auto w-1 h-1 rounded-full bg-primary" />
              )}
            </button>
          ))}
        </nav>

        <div className="px-6 py-4 border-t border-border">
          <p className="text-[11px] text-muted-foreground font-body">Геологическое моделирование</p>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <header className="sticky top-0 z-20 h-14 bg-background/80 backdrop-blur border-b border-border flex items-center px-6 gap-4">
          <button
            className="lg:hidden text-muted-foreground hover:text-foreground"
            onClick={() => setSidebarOpen(true)}
          >
            <Icon name="Menu" size={20} />
          </button>
          <div className="flex items-center gap-2 text-sm text-muted-foreground font-body">
            <span>Портал</span>
            <Icon name="ChevronRight" size={14} />
            <span className="text-foreground">{NAV_ITEMS.find((n) => n.id === page)?.label}</span>
          </div>
        </header>

        <main ref={mainRef} className="flex-1 overflow-y-auto">
          {page === "home" && <HomePage setPage={setPage} />}
          {page === "theory" && <TheoryPage />}
          {page === "models" && <ModelsPage />}
          {page === "glossary" && (
            <GlossaryPage search={search} setSearch={setSearch} filtered={filtered} />
          )}
        </main>
      </div>
    </div>
  );
}
