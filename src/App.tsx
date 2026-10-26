import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";
import {
  defaultPreferences,
  desktopAvailable,
  getBootstrap,
  savePreferences,
  type Bootstrap,
  type Language,
  type Preferences,
} from "./lib/desktop";
import { messages, resolveLanguage } from "./i18n";
import "./App.css";

function Wisp({ large = false }: { large?: boolean }) {
  return (
    <svg
      className={large ? "wisp large" : "wisp"}
      aria-hidden="true"
      viewBox="0 0 64 64"
    >
      <path
        d="M48 13c-3 7-15 5-23 12C13 35 17 51 31 53c14 2 24-7 22-20-1-7-6-9-5-20Z"
        fill="currentColor"
      />
      <circle cx="30" cy="36" r="2.4" fill="var(--canvas)" />
      <circle cx="40" cy="34" r="2.4" fill="var(--canvas)" />
    </svg>
  );
}

export default function App() {
  const [page, setPage] = useState<"overview" | "settings">("overview");
  const [bootstrap, setBootstrap] = useState<Bootstrap | null>(null);
  const [draft, setDraft] = useState<Preferences>(defaultPreferences);
  const [budget, setBudget] = useState("20");
  const [error, setError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<
    "saved" | "invalidBudget" | "saveError" | null
  >(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const t = messages(draft.language);

  const reload = useCallback(async () => {
    if (!desktopAvailable) return;
    setLoading(true);
    try {
      const data = await getBootstrap();
      setBootstrap(data);
      setDraft(data.preferences);
      setBudget(String(data.preferences.autoAiDailyLimit));
      setError(null);
      setFeedback(null);
    } catch (reason) {
      setError(String(reason));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void reload();
  }, [reload]);
  useEffect(() => {
    document.documentElement.lang = resolveLanguage(draft.language);
    document.title =
      (page === "overview" ? t.overview : t.settings) + " · CacheWisp";
  }, [draft.language, page, t]);
  useEffect(() => {
    heading.current?.focus();
  }, [page]);

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const limit = Number(budget);
    if (
      budget.trim() === "" ||
      !Number.isInteger(limit) ||
      limit < 0 ||
      limit > 4294967295
    ) {
      setFeedback("invalidBudget");
      return;
    }
    setSaving(true);
    setFeedback(null);
    try {
      const preferences = await savePreferences({
        ...draft,
        autoAiDailyLimit: limit,
      });
      setDraft(preferences);
      setBootstrap((current) =>
        current ? { ...current, preferences } : current,
      );
      setFeedback("saved");
    } catch {
      setFeedback("saveError");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="app-shell">
      <a className="skip-link" href="#content">
        {t.skip}
      </a>
      <aside className="sidebar">
        <div className="brand">
          <Wisp />
          <strong>CacheWisp</strong>
        </div>
        <span className="nav-label">{t.navigation}</span>
        <nav aria-label={t.navigation}>
          <button
            aria-current={page === "overview" ? "page" : undefined}
            onClick={() => setPage("overview")}
          >
            {t.overview}
          </button>
          <button
            aria-current={page === "settings" ? "page" : undefined}
            onClick={() => setPage("settings")}
          >
            {t.settings}
          </button>
        </nav>
        <div className="sidebar-footer">
          <span className="local-dot" />
          {t.local}
          <p>{t.scope}</p>
        </div>
      </aside>
      <div className="workspace">
        <header className="topbar">
          <span>{page === "overview" ? t.overview : t.settings}</span>
          <span className="preview-label">{t.preview}</span>
        </header>
        <main id="content" tabIndex={-1}>
          {!desktopAvailable && <p className="notice">{t.browserNote}</p>}
          {error && (
            <div className="notice error" role="alert">
              <strong>{t.errorTitle}</strong>
              <p>{error}</p>
            </div>
          )}
          {page === "overview" ? (
            <>
              <div className="page-heading">
                <div>
                  <p className="eyebrow">CACHEWISP / 01</p>
                  <h1 ref={heading} tabIndex={-1}>
                    {t.tagline}
                  </h1>
                  <p className="muted">{t.subtitle}</p>
                </div>
                <Wisp large />
              </div>
              <dl className="metrics">
                <div>
                  <dt>{t.projectCache}</dt>
                  <dd className="unscanned">{t.unscanned}</dd>
                </div>
                <div>
                  <dt>{t.globalCache}</dt>
                  <dd className="unscanned">{t.unscanned}</dd>
                </div>
                <div>
                  <dt>{t.dailyBudget}</dt>
                  <dd>
                    {bootstrap
                      ? bootstrap.preferences.autoAiDailyLimit || t.disabled
                      : "—"}
                  </dd>
                </div>
              </dl>
              <section className="empty-state">
                <span className="empty-mark" aria-hidden="true">
                  ◇
                </span>
                <h2>{t.emptyTitle}</h2>
                <p>{t.emptyBody}</p>
                <div className="ecosystems">
                  <span>{t.ecosystems}</span>
                  <p>
                    JavaScript / TypeScript · Python · Go
                    <br />
                    Java / Kotlin · Rust · Swift / Xcode
                  </p>
                </div>
              </section>
              <section className="status-panel">
                <div className="section-title">
                  <h2>{t.statusTitle}</h2>
                  <button
                    className="text-button"
                    onClick={() => void reload()}
                    disabled={!desktopAvailable || loading}
                  >
                    {t.refresh}
                  </button>
                </div>
                <dl className="status-grid">
                  <div>
                    <dt>{t.storage}</dt>
                    <dd>
                      <span
                        className={bootstrap ? "ready-dot" : "pending-dot"}
                      />
                      {bootstrap ? t.ready : t.waiting}
                    </dd>
                  </div>
                  <div>
                    <dt>{t.platform}</dt>
                    <dd>{bootstrap?.platform ?? "—"}</dd>
                  </div>
                  <div>
                    <dt>{t.schema}</dt>
                    <dd>
                      {bootstrap ? "v" + bootstrap.databaseSchemaVersion : "—"}
                    </dd>
                  </div>
                  <div>
                    <dt>{t.version}</dt>
                    <dd>{bootstrap?.version ?? "0.1.0"}</dd>
                  </div>
                </dl>
              </section>
            </>
          ) : (
            <>
              <div className="page-heading">
                <div>
                  <p className="eyebrow">CACHEWISP / 02</p>
                  <h1 ref={heading} tabIndex={-1}>
                    {t.settings}
                  </h1>
                  <p className="muted">{t.privacy}</p>
                </div>
              </div>
              <form
                onSubmit={(event) => void save(event)}
                className="preferences"
              >
                <fieldset disabled={saving || !bootstrap}>
                  <div className="form-row">
                    <div>
                      <label htmlFor="language">{t.language}</label>
                      <p id="language-hint">{t.languageHint}</p>
                    </div>
                    <select
                      id="language"
                      value={draft.language}
                      aria-describedby="language-hint"
                      onChange={(event) => {
                        setDraft({
                          ...draft,
                          language: event.target.value as Language,
                        });
                        setFeedback(null);
                      }}
                    >
                      <option value="system">{t.system}</option>
                      <option value="zh-CN">简体中文</option>
                      <option value="en">English</option>
                    </select>
                  </div>
                  <div className="form-row">
                    <div>
                      <label htmlFor="daily-budget">{t.budget}</label>
                      <p id="budget-hint">{t.budgetHint}</p>
                    </div>
                    <input
                      id="daily-budget"
                      type="number"
                      inputMode="numeric"
                      min="0"
                      max="4294967295"
                      step="1"
                      required
                      value={budget}
                      aria-describedby="budget-hint budget-note"
                      aria-invalid={feedback === "invalidBudget" || undefined}
                      onChange={(event) => {
                        setBudget(event.target.value);
                        setFeedback(null);
                      }}
                    />
                  </div>
                  <p className="muted form-note" id="budget-note">
                    {t.budgetNote}
                  </p>
                  <button type="submit" className="primary-button">
                    {saving ? t.saving : t.save}
                  </button>
                </fieldset>
                <p
                  className={
                    feedback && feedback !== "saved"
                      ? "feedback error-text"
                      : "feedback"
                  }
                  role="status"
                >
                  {feedback ? t[feedback] : ""}
                </p>
              </form>
              <section className="resource-panel">
                <h2>{t.resourceTitle}</h2>
                <dl>
                  <div>
                    <dt>{t.memory}</dt>
                    <dd>≤150 MB</dd>
                  </div>
                  <div>
                    <dt>{t.cpu}</dt>
                    <dd>&lt;1%</dd>
                  </div>
                </dl>
                <p className="muted">{t.resourceHint}</p>
              </section>
            </>
          )}
        </main>
        <footer className="bottom-bar">
          <span>CacheWisp · 0.1.0</span>
          <span>{t.local}</span>
        </footer>
      </div>
    </div>
  );
}
