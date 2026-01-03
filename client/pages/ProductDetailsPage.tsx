import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { products } from "../../shared/products";
import EnquiryForm from "@/components/EnquiryForm";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const ProductDetailsPage: React.FC = () => {
  const { productKey } = useParams<{ productKey: string }>();
  const { t } = useTranslation();

  const product = products.find((p) => p.key === productKey);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-semibold">{t("notFound.title")}</h2>
        <p className="mt-4 text-muted-foreground">{t("notFound.message")}</p>
        <Link to="/" className="inline-block mt-6 text-sm text-primary">
          {t("notFound.home")}
        </Link>
      </div>
    );
  }

  const name = t(`products.${product.key}.name`) || t(`products.${product.key}`) || product.key;
  const description = t(product.description);

  // Ensure gallery always contains exactly 3 images by padding with the main product image
  const padToThree = (imgs: string[]) => {
    const out = imgs.filter(Boolean).slice(0, 3);
    while (out.length < 3) out.push(product.image);
    return out;
  };

  const [gallery, setGallery] = useState<string[]>(
    padToThree((product as any).images && (product as any).images.length ? (product as any).images : [product.image])
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = gallery[activeIndex] || product.image;

  useEffect(() => {
    let cancelled = false;
    const slug = product.key.replace(/\s+/g, "-").toLowerCase();

    // Candidates: use product.images if provided, otherwise default to public folder 1..3
    const provided: string[] = (product as any).images && (product as any).images.length ? (product as any).images : [];
    const autoCandidates = Array.from({ length: 3 }, (_, i) => `/products/${slug}/${i + 1}.jpg`);
    const candidates = provided.length ? provided : autoCandidates;

    const loaded: string[] = [];
    let pending = candidates.length;

    if (pending === 0) {
      // No candidates; fallback to main image
      setGallery(padToThree([product.image]));
      setActiveIndex(0);
      return () => {
        cancelled = true;
      };
    }

    candidates.forEach((src) => {
      const img = new Image();
      img.onload = () => {
        if (!cancelled) loaded.push(src);
        pending -= 1;
        if (pending === 0 && !cancelled) {
          if (loaded.length) setGallery(padToThree(loaded));
          else if (!provided.length) {
            // If none found from autoCandidates, fallback to main image
            setGallery(padToThree([product.image]));
          } else {
            // Provided images failed; try autoCandidates as a fallback
            const altLoaded: string[] = [];
            let altPending = autoCandidates.length;
            autoCandidates.forEach((altSrc) => {
              const altImg = new Image();
              altImg.onload = () => {
                if (!cancelled) altLoaded.push(altSrc);
                altPending -= 1;
                if (altPending === 0 && !cancelled) {
                  setGallery(padToThree(altLoaded.length ? altLoaded : [product.image]));
                  setActiveIndex(0);
                }
              };
              altImg.onerror = () => {
                altPending -= 1;
                if (altPending === 0 && !cancelled) {
                  setGallery(padToThree(altLoaded.length ? altLoaded : [product.image]));
                  setActiveIndex(0);
                }
              };
              altImg.src = altSrc;
            });
          }
          setActiveIndex(0);
        }
      };
      img.onerror = () => {
        pending -= 1;
        if (pending === 0 && !cancelled) {
          if (loaded.length) setGallery(padToThree(loaded));
          else if (!provided.length) setGallery(padToThree([product.image]));
          else {
            // Provided images failed; try autoCandidates
            const altLoaded: string[] = [];
            let altPending = autoCandidates.length;
            autoCandidates.forEach((altSrc) => {
              const altImg = new Image();
              altImg.onload = () => {
                if (!cancelled) altLoaded.push(altSrc);
                altPending -= 1;
                if (altPending === 0 && !cancelled) {
                  setGallery(padToThree(altLoaded.length ? altLoaded : [product.image]));
                  setActiveIndex(0);
                }
              };
              altImg.onerror = () => {
                altPending -= 1;
                if (altPending === 0 && !cancelled) {
                  setGallery(padToThree(altLoaded.length ? altLoaded : [product.image]));
                  setActiveIndex(0);
                }
              };
              altImg.src = altSrc;
            });
          }
          setActiveIndex(0);
        }
      };
      img.src = src;
    });

    return () => {
      cancelled = true;
    };
  }, [product]);

  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="rounded-2xl bg-gradient-to-br from-white via-slate-50 to-white p-6 shadow-lg">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="lg:w-1/2">
            <div className="bg-muted rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
              <img src={activeImage} alt={name} className="w-full h-96 object-cover transform hover:scale-105 transition-transform duration-300" />
            </div>

            {/* Thumbnails */}
            <div className="mt-3 flex gap-3">
              {gallery.map((src, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`w-24 h-20 rounded-md overflow-hidden border-2 ${idx === activeIndex ? "border-primary shadow-md" : "border-border"} hover:scale-105 transition-transform`}
                >
                  <img src={src} alt={`${name} ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="lg:w-1/2">
            <h1 className="text-3xl font-bold mb-4">{name}</h1>
            <p className="text-foreground/80 mb-6">{description}</p>

            <div className="mt-6">
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <button className="px-5 py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold hover:brightness-95 transition-all">
                    {t("cta.inquire")}
                  </button>
                </DialogTrigger>

                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{t("enquiry.title")}</DialogTitle>
                    <DialogDescription>{t("enquiry.lead")}</DialogDescription>
                  </DialogHeader>

                  <EnquiryForm defaultProduct={product.key} onSuccess={() => setDialogOpen(false)} />
                </DialogContent>
              </Dialog>
            </div>

            <div className="mt-6 flex gap-3">
              <button onClick={() => setDialogOpen(true)} className="px-4 py-2 border rounded-md text-primary hover:bg-primary/5">{t("nav.contact")}</button>
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">High quality</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
