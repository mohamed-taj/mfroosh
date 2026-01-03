import { products } from "@shared/products";
import { Mail, Phone, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function Footer() {
  const { t, i18n } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-foreground/5 border-t border-border">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-8">
          {/* Brand Section */}
          <div className="col-span-1 sm:col-span-2 md:col-span-1">
            <h3 className="font-bold text-lg mb-4">{t("brand")}</h3>
            <p className="text-sm text-foreground/60">
              {t("footer.description")}
            </p>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold mb-4">{t("footer.productsHeading")}</h4>
            <ul className="space-y-2 text-sm text-foreground/60">
              {products.map((p) => (
                <li key={p.key}>
                  <Link
                    to={`/products/${p.key}`}
                    className="hover:text-foreground transition-colors"
                  >
                    {t(`products.${p.key}.name`) || t(`products.${p.key}`) || p.key}
                  </Link>
                </li>
              ))}
            </ul>
          </div>


          {/* Company Links */}
          <div>
            <h4 className="font-semibold mb-4">{t("footer.companyHeading")}</h4>
            <ul className="space-y-2 text-sm text-foreground/60">
              <li>
                <a href="#about" className="hover:text-foreground transition-colors">
                  {t("footer.company.about")}
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-foreground transition-colors">
                  {t("footer.company.products")}
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-foreground transition-colors">
                  {t("footer.company.contact")}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">{t("footer.contactHeading")}</h4>
            <ul className="space-y-3 text-sm text-foreground/60">
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                <a
                  href="mailto:info@mfrooshtrade.com"
                  className="hover:text-foreground transition-colors"
                >
                  info@mfrooshtrade.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                <div className="flex flex-col gap-1">
                  <a
                    href="tel:+249123068679"
                    className="hover:text-foreground transition-colors"
                  >
                    +249 123 068 679
                  </a>
                  <a
                    href="tel:+971547033231"
                    className="hover:text-foreground transition-colors"
                  >
                    +971 54 703 3231
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Office Locations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 pb-8 border-b border-border">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-foreground mb-1">{t("footer.offices.uae.title")}</p>
              <p className="text-sm text-foreground/60">{t("footer.offices.uae.location")}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-foreground mb-1">{t("footer.offices.sudan.title")}</p>
              <p className="text-sm text-foreground/60">{t("footer.offices.sudan.location")}</p>
            </div>
          </div>
        </div>

        {/* Copyright + Language Switcher */}
        <div>
          <p className="text-center text-sm text-foreground/60">
            {t("footer.copyright", { year: currentYear })}
          </p>

          <div className="mt-4 flex items-center justify-center">
            <div className="flex items-center gap-1 rounded-md border border-border overflow-hidden">
              <button
                aria-label={t("lang.en")}
                title={t("lang.en")}
                onClick={() => i18n.changeLanguage("en")}
                className={`px-3 py-1 text-sm ${i18n.language === "en" ? "bg-primary text-primary-foreground" : "text-foreground/70 hover:text-foreground"}`}>
                EN
              </button>
              <button
                aria-label={t("lang.ar")}
                title={t("lang.ar")}
                onClick={() => i18n.changeLanguage("ar")}
                className={`px-3 py-1 text-sm ${i18n.language === "ar" ? "bg-primary text-primary-foreground" : "text-foreground/70 hover:text-foreground"}`}>
                AR
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
