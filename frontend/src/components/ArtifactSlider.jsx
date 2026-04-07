// src/components/ArtifactSlider.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function ArtifactSlider() {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = t("artifactSlider.slides", { returnObjects: true }) || [];

  const itemsPerView = 2;
  const totalPages = Math.ceil(slides.length / itemsPerView);

  useEffect(() => {
    if (totalPages <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalPages);
    }, 3000);

    return () => clearInterval(interval);
  }, [totalPages]);

  const goToNext = () => setCurrentIndex((prev) => (prev + 1) % totalPages);
  const goToPrev = () =>
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);

  const currentSlides = slides.slice(
    currentIndex * itemsPerView,
    currentIndex * itemsPerView + itemsPerView,
  );

  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="max-w-full mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-navy mb-12">
          {t("artifactSlider.title")}
        </h2>

        <div className="relative max-w-full mx-auto">
          <div className="relative h-[450px] md:h-[600px] overflow-hidden rounded-3xl shadow-xl bg-black">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="absolute inset-0 flex gap-4 px-4 md:px-6"
              >
                {currentSlides.length > 0 ? (
                  currentSlides.map((slide, idx) => (
                    <div
                      key={idx}
                      className="flex-1 relative rounded-3xl overflow-hidden group"
                    >
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <h3 className="text-xl md:text-2xl font-bold mb-2 drop-shadow-sm">
                          {slide.title}
                        </h3>
                        <p className="text-sm md:text-base line-clamp-2 opacity-90">
                          {slide.desc}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-white text-center w-full">
                    Đang tải dữ liệu...
                  </p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Nút điều hướng */}
          <button
            onClick={goToPrev}
            className="absolute -left-4 md:left-6 top-1/2 -translate-y-1/2 z-30 bg-white/90 hover:bg-white text-navy p-4 rounded-full shadow-lg transition-all hover:scale-110 active:scale-95"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-7 h-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={goToNext}
            className="absolute -right-4 md:right-6 top-1/2 -translate-y-1/2 z-30 bg-white/90 hover:bg-white text-navy p-4 rounded-full shadow-lg transition-all hover:scale-110 active:scale-95"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-7 h-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-3 mt-8">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${
                  currentIndex === idx
                    ? "bg-primary scale-125"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
