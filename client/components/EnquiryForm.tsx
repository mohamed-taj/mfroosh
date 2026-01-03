import { useState } from "react";
import { Send, CheckCircle, AlertCircle, Loader } from "lucide-react";
import { useTranslation } from "react-i18next";
import { products } from "@shared/products";
import type { EnquiryResponse } from "@shared/api";

interface EnquiryFormProps {
  defaultProduct?: string;
  onSuccess?: () => void;
}

export default function EnquiryForm({ defaultProduct, onSuccess }: EnquiryFormProps) {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    product: defaultProduct ?? "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/send-enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data: EnquiryResponse = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to send enquiry");
      }

      setStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        product: defaultProduct ?? "",
        message: "",
      });

      // Call onSuccess callback if provided (e.g., to close modal)
      if (onSuccess) onSuccess();

      // Reset success message after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : t("enquiry.errorDefault")
      );
    }
  };

  return (
    <div className="w-full">
      <div className="bg-card border border-border rounded-2xl p-5 sm:p-6 shadow-lg">
        <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-1">{t("enquiry.title")}</h3>
        <p className="text-xs sm:text-sm text-foreground/60 mb-4">
          {t("enquiry.lead")}
        </p>

        {status === "success" && (
          <div className="mb-4 p-3 rounded-lg bg-green-50 border border-green-200 flex items-start gap-2 animate-slide-down">
            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs sm:text-sm font-semibold text-green-900">{t("enquiry.successTitle")}</p>
              <p className="text-xs text-green-800">
                {t("enquiry.successMessage")}
              </p>
            </div>
          </div>
        )} 

        {status === "error" && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 flex items-start gap-2 animate-slide-down">
            <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs sm:text-sm font-semibold text-red-900">{t("enquiry.errorTitle")}</p>
              <p className="text-xs text-red-800">{errorMessage}</p>
            </div>
          </div>
        )} 

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-xs sm:text-sm font-semibold text-foreground mb-1.5">
                {t("enquiry.labels.name")}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                placeholder={t("enquiry.placeholders.name")}
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-xs sm:text-sm font-semibold text-foreground mb-1.5">
                {t("enquiry.labels.email")}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                placeholder={t("enquiry.placeholders.email")}
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-xs sm:text-sm font-semibold text-foreground mb-1.5">
                {t("enquiry.labels.phone")}
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                placeholder={t("enquiry.placeholders.phone")}
              />
            </div>

            {/* Company */}
            <div>
              <label htmlFor="company" className="block text-xs sm:text-sm font-semibold text-foreground mb-1.5">
                {t("enquiry.labels.company")}
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                placeholder={t("enquiry.placeholders.company")}
              />
            </div>

            {/* Product */}
            <div className="sm:col-span-2">
              <label htmlFor="product" className="block text-xs sm:text-sm font-semibold text-foreground mb-1.5">
                {t("enquiry.labels.product")}
              </label>
              <select
                id="product"
                name="product"
                value={formData.product}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
              >
                <option value="">{t("enquiry.placeholders.selectProduct")}</option>
                {products.map((p) => (
                  <option key={p.key} value={p.key}>
                    {t(`products.${p.key}.name`)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-xs sm:text-sm font-semibold text-foreground mb-1.5">
              {t("enquiry.labels.message")}
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={3}
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors resize-none"
              placeholder={t("enquiry.placeholders.message")}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full sm:w-auto px-6 py-2 bg-primary text-primary-foreground text-sm sm:text-base font-semibold rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 inline-flex items-center justify-center gap-2 hover:scale-105"
          >
            {status === "loading" ? (
              <>
                <Loader className="w-4 h-4 animate-spin" />
                {t("enquiry.submit.sending")}
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                {t("enquiry.submit.send")}
              </>
            )}
          </button>
        </form>

        <p className="text-xs text-foreground/50 mt-4">
          {t("enquiry.requiredNote")}
        </p>
      </div>
    </div>
  );
}
