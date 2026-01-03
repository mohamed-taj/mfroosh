import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Header() {
  const { t, i18n } = useTranslation();

  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b border-border">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 md:gap-2">
          <img
            src="/logo2.png"
            alt={t("logoAlt")}
            title={t("brand")}
            className="h-8 sm:h-12 w-auto transform-gpu motion-safe:animate-logo-pulse motion-reduce:animate-none will-change-transform transition-transform duration-700 ease-in-out hover:opacity-98"
          />
          <div className="flex flex-col">
            <span className="text-lg font-bold text-foreground leading-tight">
              {t("brand")}
            </span>
            <span className="text-xs text-foreground/60">
              {t("brandSubtitle")}
            </span>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#products"
            className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
          >
            {t("nav.services")}
          </a>
          <a
            href="#about"
            className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
          >
            {t("nav.about")}
          </a>
          <a
            href="#contact"
            className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
          >
            {t("nav.contact")}
          </a>
        </nav>

        {/* CTA only (language moved to footer) */}
        <div>
          <a
            href="#contact"
            className="px-5 sm:px-6 py-2.5 rounded-full bg-primary text-primary-foreground font-medium text-sm shadow-md hover:shadow-lg transition-shadow transform-gpu hover:scale-105 inline-block"
          >
            {t("cta.getStarted")}
          </a>
        </div>
      </div>
    </header>
  );
}
