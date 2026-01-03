import { products } from "@shared/products";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import ProductCarousel from "@/components/ProductCarousel";
import EnquiryForm from "@/components/EnquiryForm";
import { ArrowRight, Globe, Package, Truck, Users, Leaf, TrendingUp } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Index() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-12 sm:pt-16 sm:pb-20">
        {/* Animated background decorations */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/8 rounded-full blur-2xl opacity-70 animate-pulse-slow" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/8 rounded-full blur-2xl opacity-60 animate-bounce-slow" />

        {/* Subtle overlay to improve hero text contrast */}
        <div className="absolute inset-0 pointer-events-none rounded-2xl bg-gradient-to-b from-black/5 to-transparent" />

        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="order-2 lg:order-1 animate-slide-right">
              <div className="inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6 animate-slide-down">
                <span className="text-sm font-medium text-primary">
                  🌾 {t("hero.kicker")}
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight animate-slide-up">
                {t("hero.title")}
              </h1>

              <p className="text-lg text-foreground/70 mb-8 leading-relaxed animate-fade-in" style={{ animationDelay: "0.2s" }}>
                {t("hero.lead")}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-scale-in" style={{ animationDelay: "0.3s" }}>
                <a
                  href="#products"
                  className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-semibold shadow-lg hover:shadow-xl transition-shadow transform-gpu hover:scale-105 transition-transform duration-200 flex items-center justify-center gap-2"
                >
                  {t("products.title")}
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#about"
                  className="px-8 py-3 rounded-full border border-primary text-primary font-semibold hover:bg-primary/5 transition-colors transform-gpu hover:scale-102 transition-transform duration-200"
                >
                  {t("hero.learnMore")}
                </a>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4">
                <div className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
                  <p className="text-2xl font-bold text-primary">{t("trust.global")}</p>
                  <p className="text-sm text-foreground/60">{t("trust.markets")}</p>
                </div>
                <div className="animate-fade-in" style={{ animationDelay: "0.5s" }}>
                  <p className="text-2xl font-bold text-primary">{t("trust.percent")}</p>
                  <p className="text-sm text-foreground/60">{t("trust.quality")}</p>
                </div>
                <div className="animate-fade-in" style={{ animationDelay: "0.6s" }}>
                  <p className="text-2xl font-bold text-primary">{t("trust.trusted")}</p>
                  <p className="text-sm text-foreground/60">{t("trust.partner")}</p>
                </div>
              </div>
            </div>

            {/* Right Hero Image */}
            <div className="order-1 lg:order-2 animate-slide-left">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl blur-3xl -z-10 animate-pulse-slow" />
                <img
                  src="/a.jpg"
                  alt="Agricultural harvesting operations"
                  className="w-full rounded-2xl object-cover shadow-2xl hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Carousel Section */}
      <section id="products" className="py-10 sm:py-14 bg-gradient-to-b from-background via-primary/5 to-background relative overflow-hidden">
        {/* Decorative shapes */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-secondary/8 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2 opacity-60 animate-float" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/8 rounded-full blur-2xl translate-x-1/2 translate-y-1/2 opacity-60 animate-bounce-slow" />

        <div className="container relative z-10">
          <div className="text-center mb-8 sm:mb-12 animate-slide-down">
            <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Leaf className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">{t("products.title")}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              {t("products.heading")}
            </h2>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
              {t("products.description")}
            </p>
          </div>

          <ProductCarousel
            products={products.map((p) => ({
              key: p.key,
              name: t(`products.${p.key}.name`) || t(`products.${p.key}`) || p.key,
              image: p.image,
            }))}
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-8 sm:py-14 bg-gradient-to-b from-background to-foreground/5 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-float" />

        <div className="container relative z-10">
          <div className="text-center mb-10 sm:mb-14 animate-slide-down">
            <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <TrendingUp className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">{t("about.servicesTitle")}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {/* Service Card 1 */}
            <div className="group bg-card p-6 sm:p-8 rounded-2xl border border-border hover:shadow-2xl transition-all duration-300 transform-gpu hover:-translate-y-2 hover:border-primary/30 animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <div className="flex flex-col items-center text-center min-h-[150px] justify-center">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4 shadow-md">
                  <Globe className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-foreground tracking-wide">
                  {t("about.points.service1.title")}
                </h3>
              </div>
            </div>

            {/* Service Card 2 */}
            <div className="group bg-card p-6 sm:p-8 rounded-2xl border border-border hover:shadow-2xl transition-all duration-300 transform-gpu hover:-translate-y-2 hover:border-secondary/30 animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <div className="flex flex-col items-center text-center min-h-[150px] justify-center">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-secondary to-primary flex items-center justify-center mb-4 shadow-md">
                  <Package className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-foreground tracking-wide">
                  {t("about.points.service2.title")}
                </h3>
              </div>
            </div>

            {/* Service Card 3 */}
            <div className="group bg-card p-6 sm:p-8 rounded-2xl border border-border hover:shadow-2xl transition-all duration-300 transform-gpu hover:-translate-y-2 hover:border-accent/30 animate-slide-up" style={{ animationDelay: "0.3s" }}>
              <div className="flex flex-col items-center text-center min-h-[150px] justify-center">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center mb-4 shadow-md">
                  <Truck className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-foreground tracking-wide">
                  {t("about.points.service3.title")}
                </h3>
              </div>
            </div>

            {/* Service Card 4 */}
            <div className="group bg-card p-6 sm:p-8 rounded-2xl border border-border hover:shadow-2xl transition-all duration-300 transform-gpu hover:-translate-y-2 hover:border-secondary/30 animate-slide-up" style={{ animationDelay: "0.4s" }}>
              <div className="flex flex-col items-center text-center min-h-[150px] justify-center">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-secondary to-accent flex items-center justify-center mb-4 shadow-md">
                  <Users className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-foreground tracking-wide">
                  {t("about.points.service4.title")}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* About Section */}
      <section id="about" className="py-12 sm:py-20 bg-gradient-to-b from-foreground/5 to-background relative overflow-hidden">
        {/* Decorative shapes */}
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute -top-20 right-0 w-96 h-96 bg-primary/8 rounded-full blur-2xl opacity-70 animate-pulse-slow" />

        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* About Image */}
            <div className="animate-slide-right">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl blur-3xl -z-10 animate-pulse-slow" />
                <img
                  src="/b.jpg"
                  alt="Agricultural equipment and operations"
                  className="w-full h-80 md:h-96 lg:h-[520px] rounded-2xl object-cover shadow-xl hover:shadow-2xl transition-shadow duration-300"
                />
              </div>
            </div>

            {/* About Content */}
            <div className="animate-slide-left">
              <div className="inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6 animate-slide-down">
                <span className="text-sm font-medium text-primary">{t("about.kicker")}</span>
              </div>

              <p className="text-lg text-foreground/70 mb-6 leading-relaxed animate-fade-in" style={{ animationDelay: "0.2s" }}>
                <strong>{t("about.visionTitle")}</strong> {t("about.visionText")}
              </p>

              <p className="text-lg text-foreground/70 mb-8 leading-relaxed animate-fade-in" style={{ animationDelay: "0.3s" }}>
                <strong>{t("about.missionTitle")}</strong> {t("about.missionText")}
              </p>

              <div className="space-y-4">
                <div className="mb-4 text-xl font-bold text-foreground">{t("features.heading")}</div>

                <div className="flex gap-3 animate-slide-up" style={{ animationDelay: "0.4s" }}>
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 transition-transform">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{t("features.items.quality.title")}</h4>
                  </div>
                </div>

                <div className="flex gap-3 animate-slide-up" style={{ animationDelay: "0.5s" }}>
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{t("features.items.integrity.title")}</h4>
                  </div>
                </div>

                <div className="flex gap-3 animate-slide-up" style={{ animationDelay: "0.6s" }}>
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{t("features.items.commitment.title")}</h4>
                  </div>
                </div>

                <div className="flex gap-3 animate-slide-up" style={{ animationDelay: "0.7s" }}>
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{t("features.items.partnership.title")}</h4>
                  </div>
                </div>

                <div className="flex gap-3 animate-slide-up" style={{ animationDelay: "0.8s" }}>
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm">✓</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{t("features.items.continuousDevelopment.title")}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enquiry Form Section */}
      <section id="contact" className="py-12 sm:py-16 bg-gradient-to-br from-background via-primary/5 to-background relative overflow-hidden">
        {/* Decorative shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-float" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/8 rounded-full blur-2xl translate-x-1/2 translate-y-1/2 opacity-60 animate-bounce-slow" />

        <div className="container relative z-10">
          <div className="max-w-2xl mx-auto animate-slide-up">
            <EnquiryForm />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
