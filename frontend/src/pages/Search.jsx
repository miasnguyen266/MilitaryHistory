// src/pages/Search.jsx
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

export default function Search() {
  const { t, i18n } = useTranslation();
  const { search } = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(search).get("q") || "";
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  const lang = i18n.language;

  useEffect(() => {
    setPage(1);
    if (!query.trim()) {
      setLoading(false);
      setResults([]);
      setTotalPages(1);
      return;
    }

    const fetchResults = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(
          `/api/search?q=${encodeURIComponent(query.trim())}&page=${page}&limit=${limit}`,
        );
        setResults(res.data.results || res.data || []);
        setTotalPages(res.data.totalPages || 1);
      } catch (err) {
        console.error("Lỗi tìm kiếm:", err);
        setError(t("search.error"));
        setResults([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [query, page, t]);

  const handleClick = (item) => {
    const routes = { event: "/event/", period: "/period/", figure: "/figure/" };
    navigate(routes[item.type] + item.id);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const getPageNumbers = () => {
    const max = 5;
    const pages = [];
    let start = Math.max(1, page - Math.floor(max / 2));
    let end = Math.min(totalPages, start + max - 1);
    if (end - start + 1 < max) start = Math.max(1, end - max + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  const typeMap = {
    event: t("search_type.event"),
    figure: t("search_type.figure"),
    period: t("search_type.period"),
  };

  return (
    <div className="min-h-screen py-16 px-4 bg-gray-100">
      <div className="max-w-screen-2xl   mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-navy mb-8">
          {t("search.results_for")}{" "}
          <span className="text-primary">"{query || "..."}"</span>
        </h1>

        {loading ? (
          <div className="text-center py-20 text-xl text-gray-600">
            {t("search.loading")}
          </div>
        ) : error ? (
          <div className="text-center py-20 text-xl text-red-600">{error}</div>
        ) : results.length === 0 ? (
          <div className="text-center py-20 text-xl text-gray-600">
            {t("search.no_results")}
          </div>
        ) : (
          <>
            <p className="text-center text-lg text-gray-700 mb-8">
              {t("search.found")} <strong>{results.length}</strong>{" "}
              {t("search.items_found")} (trang {page}/{totalPages})
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8">
              {results.map((item, idx) => {
                const isEvent = item.type === "event";
                const isFigure = item.type === "figure";

                const title =
                  lang === "en"
                    ? (isEvent
                        ? item.title_en
                        : isFigure
                          ? item.full_name_en
                          : item.period_name_en) ||
                      (isEvent
                        ? item.title_vi
                        : isFigure
                          ? item.full_name_vi
                          : item.period_name_vi) ||
                      "Không rõ"
                    : (isEvent
                        ? item.title_vi
                        : isFigure
                          ? item.full_name_vi
                          : item.period_name_vi) ||
                      (isEvent
                        ? item.title_en
                        : isFigure
                          ? item.full_name_en
                          : item.period_name_en) ||
                      "Không rõ";

                const extra = isEvent
                  ? (lang === "en" ? item.extra_en : item.extra_vi) || ""
                  : isFigure
                    ? `${item.birth_year || "?"} - ${item.death_year || "?"}`
                    : (lang === "en" ? item.extra_en : item.extra_vi) || "";

                const desc = isEvent
                  ? (lang === "en"
                      ? item.description_en
                      : item.description_vi) || ""
                  : "";

                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all cursor-pointer border border-gray-200 group flex flex-col"
                    onClick={() => handleClick(item)}
                  >
                    <div className="h-48 overflow-hidden flex items-center justify-center bg-gray-100">
                      {item.image_url ? (
                        <img
                          src={item.image_url}
                          alt={title}
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            e.target.src = "/placeholder.jpg";
                            e.target.className = "w-full h-full object-cover";
                          }}
                        />
                      ) : (
                        <span className="text-gray-500">
                          {t("common.no_image")}
                        </span>
                      )}
                    </div>

                    <div className="p-6 flex flex-col flex-grow">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-xl font-bold text-navy group-hover:text-primary line-clamp-2 flex-1">
                          {title}
                        </h3>
                        {extra && (
                          <span className="text-sm text-gray-500 ml-2">
                            ({extra})
                          </span>
                        )}
                      </div>

                      {desc && (
                        <p className="text-gray-700 line-clamp-3 mb-4 flex-grow">
                          {desc}
                        </p>
                      )}

                      <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full mt-auto self-start">
                        {typeMap[item.type]}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {totalPages > 1 && (
              <div className="mt-12 flex justify-center items-center gap-4 flex-wrap">
                <button
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                  className={`px-6 py-3 rounded-xl font-bold transition ${
                    page === 1
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-[#c8102e] text-white hover:bg-[#a00d25]"
                  }`}
                >
                  {t("previous") || "Trước"}
                </button>

                {getPageNumbers().map((p) => (
                  <button
                    key={p}
                    onClick={() => handlePageChange(p)}
                    className={`px-5 py-3 rounded-xl font-medium transition ${
                      p === page
                        ? "bg-[#c8102e] text-white"
                        : "bg-white text-gray-700 hover:bg-gray-200 border border-gray-300"
                    }`}
                  >
                    {p}
                  </button>
                ))}

                <button
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === totalPages}
                  className={`px-6 py-3 rounded-xl font-bold transition ${
                    page === totalPages
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-[#c8102e] text-white hover:bg-[#a00d25]"
                  }`}
                >
                  {t("next") || "Sau"}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
