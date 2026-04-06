import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

const videos = [
  {
    id: 1,
    src: "https://www.youtube.com/embed/dQw4w9WgXcQ?enablejsapi=1",
    title: "Video 1",
  },
  {
    id: 2,
    src: "https://www.youtube.com/embed/3JZ_D3ELwOQ?enablejsapi=1",
    title: "Video 2",
  },
  {
    id: 3,
    src: "https://www.youtube.com/embed/tgbNymZ7vqY?enablejsapi=1",
    title: "Video 3",
  },
];

export default function VideoCarousel() {
  const { t } = useTranslation();
  const [current, setCurrent] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.6 }, // 60% visible mới chạy
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % videos.length);
    }, 30000); // 30s mỗi slide

    return () => clearInterval(interval);
  }, [isVisible]);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % videos.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + videos.length) % videos.length);
  };

  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="max-w-full mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-navy mb-12">
          {t("caroselVideo.title")}
        </h2>
        <div ref={containerRef} className="w-full max-w-4xl mx-auto">
          {/* Video Container */}

          <div className="relative rounded-2xl overflow-hidden shadow-lg h-[400px]">
            {videos.map((video, index) => (
              <iframe
                key={video.id}
                className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${
                  index === current ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
                src={
                  index === current && isVisible
                    ? `${video.src}&autoplay=1`
                    : video.src
                }
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ))}

            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/60 text-white p-3 rounded-full hover:bg-black transition"
            >
              <ChevronLeft />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/60 text-white p-3 rounded-full hover:bg-black transition"
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
