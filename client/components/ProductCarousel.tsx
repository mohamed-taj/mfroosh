import { useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { scrollBy as scrollEn } from "@/lib/carouselLogic/en";
import { scrollBy as scrollAr } from "@/lib/carouselLogic/ar";

interface ProductItemProps {
  name: string;
  image: string;
  key: string;
}

interface ProductCarouselProps {
  products: ProductItemProps[];
}

export default function ProductCarousel({ products }: ProductCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { i18n, t } = useTranslation();

  const isRTL = typeof document !== "undefined" && document.documentElement.dir === "rtl";

  // Persisted scroll key
  const storageKey = "product_carousel_scroll";
  // Debounce timer ref
  const saveTimer = useRef<number | null>(null);

  const saveScroll = (value: number) => {
    if (saveTimer.current) window.clearTimeout(saveTimer.current);
    saveTimer.current = window.setTimeout(() => {
      try {
        sessionStorage.setItem(storageKey, String(value));
      } catch (e) {
        // ignore
      }
    }, 150);
  };

  // Restore scroll position on mount
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const stored = sessionStorage.getItem(storageKey);
    if (stored) {
      const pos = Number(stored) || 0;
      container.scrollLeft = pos;
    }

    const onScroll = () => {
      saveScroll(container.scrollLeft);
    };

    container.addEventListener("scroll", onScroll, { passive: true });
    return () => container.removeEventListener("scroll", onScroll as EventListener);
  }, []);

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;
    if (i18n.language === "ar") {
      scrollAr(container, direction);
    } else {
      scrollEn(container, direction);
    }

    // Save position after scrolling animation (approx)
    setTimeout(() => saveScroll(container?.scrollLeft ?? 0), 300);
  };

  return (
    <div className="relative group">
      {/* Left Arrow - Hidden on mobile */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-all duration-300 -ml-6 group-hover:flex opacity-0 group-hover:opacity-100"
        aria-label={i18n.language === "ar" ? t("carousel.scrollRight") : t("carousel.scrollLeft")}
      >
        {isRTL ? <ChevronRight className="w-6 h-6" /> : <ChevronLeft className="w-6 h-6" />}
      </button>

      {/* Right Arrow - Hidden on mobile */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-all duration-300 -mr-6 group-hover:flex opacity-0 group-hover:opacity-100"
        aria-label={i18n.language === "ar" ? t("carousel.scrollLeft") : t("carousel.scrollRight")}
      >
        {isRTL ? <ChevronLeft className="w-6 h-6" /> : <ChevronRight className="w-6 h-6" />}
      </button>

      {/* Gradient overlays for scroll effect */}
      {isRTL ? (
        <>
          <div className="absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none hidden md:block" />
          <div className="absolute left-0 top-0 h-full w-8 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none hidden md:block" />
        </>
      ) : (
        <>
          <div className="absolute left-0 top-0 h-full w-8 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none hidden md:block" />
          <div className="absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none hidden md:block" />
        </>
      )}

      {/* Horizontal scroll container */}
      <div
        ref={scrollContainerRef}
        className="overflow-x-auto scrollbar-hide scroll-smooth"
      >
        <div className="flex gap-3 sm:gap-4 pb-2 px-2 sm:px-0">
          {products.map((product, index) => (
            <Link
              to={`/products/${product.key}`}
              key={index}
              onClick={() => {
                const c = scrollContainerRef.current;
                if (c) {
                  try {
                    sessionStorage.setItem(storageKey, String(c.scrollLeft));
                  } catch (e) {}
                }
              }}
              className="flex-shrink-0 w-72 sm:w-80 md:w-96"
              style={{
                animation: `slide-up 0.6s ease-out ${index * 0.08}s backwards`,
              }}
            >
              <div className="group/card bg-card rounded-2xl overflow-hidden border border-border hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer h-full flex flex-col">
                {/* Image Container */}
                <div className="relative overflow-hidden bg-muted h-56 sm:h-64 md:h-80">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-500"/>
                  
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Product Name */}
                <div className="p-3 sm:p-5 flex-1 flex items-end">
                  <h3 className="font-bold text-xl sm:text-2xl md:text-3xl text-foreground group-hover/card:text-primary transition-colors duration-300">
                    {product.name}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
