import { useState } from "react";
import Icon from "@/components/ui/icon";

type Page = "home" | "theory" | "models" | "glossary";

const NAV_ITEMS: { id: Page; label: string; icon: string }[] = [
  { id: "home", label: "Главная", icon: "LayoutDashboard" },
  { id: "theory", label: "Теория", icon: "BookOpen" },
  { id: "models", label: "Модели", icon: "Layers" },
  { id: "glossary", label: "Словарь", icon: "BookMarked" },
];

const THEORY_TOPICS = [
  {
    number: "01",
    title: "Основы геологического моделирования",
    desc: "Принципы построения цифровых моделей недр: от данных к трёхмерной геометрии пласта.",
    duration: "25 мин",
    tags: ["Введение", "Пласт"],
  },
  {
    number: "02",
    title: "Структурное моделирование",
    desc: "Интерпретация сейсмических горизонтов, разломов и построение структурного каркаса.",
    duration: "40 мин",
    tags: ["Сейсмика", "Разломы"],
  },
  {
    number: "03",
    title: "Фациальное моделирование",
    desc: "Методы распределения фаций: детерминистический подход и стохастическое моделирование.",
    duration: "35 мин",
    tags: ["Фации", "Стохастика"],
  },
  {
    number: "04",
    title: "Петрофизическое моделирование",
    desc: "Распределение пористости, проницаемости и насыщенности в объёме модели.",
    duration: "45 мин",
    tags: ["Пористость", "Нефтенасыщенность"],
  },
  {
    number: "05",
    title: "Подсчёт запасов",
    desc: "Объёмный метод подсчёта: GRV, NTG, пористость, насыщенность, поправочные коэффициенты.",
    duration: "30 мин",
    tags: ["Запасы", "GRV"],
  },
  {
    number: "06",
    title: "Неопределённость и риски",
    desc: "Оценка диапазона запасов методом Монте-Карло, P10/P50/P90 сценарии.",
    duration: "50 мин",
    tags: ["Риски", "Монте-Карло"],
  },
];

const MODELS = [
  {
    name: "Структурная модель",
    short: "Structural Model",
    icon: "Mountain",
    color: "from-amber-900/40 to-amber-800/10",
    accentColor: "text-amber-400",
    desc: "Описывает геометрию пластов, положение кровли и подошвы, а также тектонические нарушения.",
    params: ["Горизонты", "Разломы", "Стратиграфия"],
    image: "https://cdn.poehali.dev/projects/16fe118f-7b6f-49f4-84fc-1bb3b5daa793/files/cf4e3d8b-a368-4534-b083-6ddce1b1cc28.jpg",
  },
  {
    name: "Литологическая модель",
    short: "Lithological Model",
    icon: "Grid3x3",
    color: "from-stone-800/40 to-stone-700/10",
    accentColor: "text-stone-300",
    desc: "Распределение литотипов и фаций в трёхмерном пространстве на основе данных скважин и сейсмики.",
    params: ["Фации", "Литотипы", "Вариограмма"],
    image: "https://cdn.poehali.dev/projects/16fe118f-7b6f-49f4-84fc-1bb3b5daa793/files/7f1983b7-6020-4050-871d-a74bc33d3979.jpg",
  },
  {
    name: "Петрофизическая модель",
    short: "Petrophysical Model",
    icon: "Activity",
    color: "from-orange-900/30 to-orange-800/10",
    accentColor: "text-orange-400",
    desc: "Непрерывное распределение фильтрационно-ёмкостных свойств породы по всему объёму залежи.",
    params: ["Пористость", "Проницаемость", "Sw"],
    image: "https://cdn.poehali.dev/projects/16fe118f-7b6f-49f4-84fc-1bb3b5daa793/files/f648f64e-ff27-4bd5-92b9-d134feb394a4.jpg",
  },
  {
    name: "Гидродинамическая модель",
    short: "Dynamic Model",
    icon: "Droplets",
    color: "from-blue-900/30 to-blue-800/10",
    accentColor: "text-blue-400",
    desc: "Симуляция движения флюидов и изменения пластового давления в процессе разработки.",
    params: ["Флюиды", "Давление", "Дебит"],
    image: "https://cdn.poehali.dev/projects/16fe118f-7b6f-49f4-84fc-1bb3b5daa793/files/d66c2133-ce9f-4397-92ad-029c8239ff88.jpg",
  },
];

const GLOSSARY_TERMS = [
  { term: "Антиклиналь", def: "Выпуклая складка горных пород, в ядре которой залегают более древние отложения. Является типичной ловушкой для нефти и газа." },
  { term: "Вариограмма", def: "Геостатистическая функция, описывающая пространственную изменчивость свойства как функцию расстояния между точками наблюдений." },
  { term: "ГВК (ГНК/ВНК)", def: "Газо-водяной (газо-нефтяной, водо-нефтяной) контакт — поверхность раздела флюидов в пористой среде." },
  { term: "Горизонт сейсмический", def: "Отражающая граница в данных сейсморазведки, соответствующая смене акустического импеданса — используется для построения структурных карт." },
  { term: "GRV", def: "Gross Rock Volume — общий объём горных пород в пределах залежи выше флюидального контакта. Базовый параметр подсчёта запасов." },
  { term: "Интерполяция (Kriging)", def: "Геостатистический метод оценки значений свойств в незаданных точках пространства с минимизацией дисперсии ошибки." },
  { term: "Коллектор", def: "Горная порода с достаточной пористостью и проницаемостью для аккумуляции и движения флюидов (нефти, газа, воды)." },
  { term: "Литология", def: "Наука о составе, структуре и происхождении осадочных горных пород. В моделировании — раздел, описывающий типы пород в ячейках сетки." },
  { term: "Монте-Карло", def: "Метод численного статистического моделирования, основанный на многократных случайных реализациях входных параметров для оценки диапазона результатов." },
  { term: "NTG (Net-to-Gross)", def: "Отношение «чистой» (продуктивной) толщины пласта к общей. Безразмерная величина от 0 до 1, характеризующая качество коллектора." },
  { term: "Пилларная сетка", def: "Тип трёхмерной структурной сетки (Corner Point Grid), широко применяемый в геологическом и гидродинамическом моделировании." },
  { term: "Пористость", def: "Доля объёма пустот (пор) в общем объёме горной породы. Определяет ёмкостные свойства коллектора. Измеряется в долях единицы или процентах." },
  { term: "Проницаемость", def: "Способность горной породы пропускать флюиды под действием перепада давления. Измеряется в миллидарси (мД)." },
  { term: "Разлом (фолт)", def: "Тектоническое нарушение — поверхность разрыва в горных породах со смещением блоков относительно друг друга. Существенно влияет на структуру и фильтрацию." },
  { term: "Резервуар", def: "Совокупность коллекторских пластов, содержащих нефть и/или газ, объединённых гидродинамической связью и одним флюидальным контактом." },
  { term: "Стохастическое моделирование", def: "Метод, при котором создаётся множество равновероятных реализаций распределения свойств для оценки неопределённости модели." },
  { term: "Sw (водонасыщенность)", def: "Доля объёма пор, заполненного водой. Остаточная нефтенасыщенность So = 1 − Sw. Ключевой параметр при подсчёте запасов." },
  { term: "Сейсмофация", def: "Единица сейсмического анализа — область с однородными атрибутами сейсмических отражений, интерпретируемая как определённый тип отложений." },
  { term: "Трансформ (апскейлинг)", def: "Процедура укрупнения данных: перенос детальных значений свойств из скважин в более крупные ячейки геологической сетки." },
  { term: "Флюидальный контакт", def: "Поверхность раздела между различными флюидами в пластовых условиях (ГНК, ВНК, ГВК). Определяет границы залежи по вертикали." },
];

export default function Index() {
  const [page, setPage] = useState<Page>("home");
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filtered = GLOSSARY_TERMS.filter(
    (t) =>
      t.term.toLowerCase().includes(search.toLowerCase()) ||
      t.def.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-56 bg-[hsl(var(--sidebar-background))] border-r border-border flex flex-col transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static lg:flex`}
      >
        <div className="px-6 py-7 border-b border-border">
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
        </div>

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

        <main className="flex-1 overflow-y-auto">
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

function HomePage({ setPage }: { setPage: (p: Page) => void }) {
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

function TheoryPage() {
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
              <div className="px-5 py-4 bg-card animate-fade-in">
                <p className="text-foreground/80 font-body text-sm leading-relaxed">{topic.desc}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ModelsPage() {
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

function GlossaryPage({
  search,
  setSearch,
  filtered,
}: {
  search: string;
  setSearch: (v: string) => void;
  filtered: typeof GLOSSARY_TERMS;
}) {
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