import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function TimelineEvent({ event, index }) {
  const { i18n } = useTranslation();
  const isEven = index % 2 === 0;

  const title = i18n.language === "vi" ? event.title_vi : event.title_en;
  const desc =
    i18n.language === "vi" ? event.description_vi : event.description_en;

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -80 : 80 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      viewport={{ once: true, margin: "-100px" }}
      className={`flex items-center mb-16 md:mb-24 relative ${isEven ? "justify-start" : "justify-end"}`}
    >
      {/* Card */}
      <div
        className={`w-full md:w-5/12 p-6 md:p-8 rounded-2xl shadow-xl border-2 
        ${isEven ? "border-primary md:mr-auto" : "border-accent md:ml-auto"}
        bg-white/95 backdrop-blur-sm hover:shadow-2xl transition-all duration-300`}
      >
        <div className="text-3xl md:text-4xl font-bold text-navy mb-3">
          {event.year_display_vi || event.year_display_en}
        </div>
        <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">
          {title}
        </h3>
        <p className="text-gray-700 leading-relaxed">{desc}</p>
        {event.image_url && (
          <img
            src={event.image_url}
            alt={title}
            className="mt-5 rounded-lg w-full h-48 md:h-64 object-cover shadow-md"
          />
        )}
      </div>

      {/* Dot trên timeline */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-primary rounded-full border-4 border-white z-10 shadow-lg"></div>
    </motion.div>
  );
}
