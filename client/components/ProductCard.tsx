import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

interface ProductCardProps {
  name: string;
  description: string;
  image: string;
  price: string;
  badge?: string;
  isProduct?: boolean;
  productKey: string;
}

export default function ProductCard({
  name,
  description,
  image,
  price,
  badge,
  isProduct = false,
  productKey,
}: ProductCardProps) {
  const { t } = useTranslation();

  if (isProduct) {
    return (
      <Link to={`/products/${productKey}`} className="group bg-card rounded-xl overflow-hidden border border-border hover:shadow-2xl transition-shadow duration-300 cursor-pointer transform-gpu hover:-translate-y-1">
        {/* Image Container */}
        <div className="relative overflow-hidden bg-muted h-56 sm:h-64"></div>
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transform-gpu transition-transform duration-400 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        {/* Product Name */}
        <div className="p-4 sm:p-5">
          <h3 className="font-bold text-lg sm:text-xl text-foreground text-center">
            {name}
          </h3>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/products/${productKey}`} className="group bg-card rounded-xl overflow-hidden border border-border hover:shadow-2xl transition-shadow duration-300 transform-gpu hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative overflow-hidden bg-muted h-48 sm:h-56">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transform-gpu transition-transform duration-400 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        {badge && (
          <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
            {badge}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5">
        <h3 className="font-bold text-base sm:text-lg text-foreground mb-2">
          {name}
        </h3>
        <p className="text-sm text-foreground/70 mb-4 line-clamp-2">
          {description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-primary">{price}</span>
          <button className="px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
            {t("cta.inquire")}
          </button>
        </div>
      </div>
    </Link>
  );
}
