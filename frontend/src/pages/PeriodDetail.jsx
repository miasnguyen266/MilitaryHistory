import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

export default function PeriodDetail() {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [period, setPeriod] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPeriod = async () => {
      try {
        const res = await axios.get(`/api/periods/${id}`);
        setPeriod(res.data);
      } catch (err) {
        setError(t('error'));
        console.error('Lỗi tải thời kỳ:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPeriod();
  }, [id, t]);

  if (loading) return <div className="text-center py-20 text-xl">{t('loading')}</div>;
  if (error || !period) return <div className="text-center py-20 text-red-600 text-xl">{error || t('period_not_found')}</div>;

  const lang = i18n.language;
  const name = lang === 'en' ? period.period_name_en : period.period_name_vi;
  const content = lang === 'en' ? period.content_en : period.content_vi;
  const timeRange = `${period.start_year} - ${period.end_year || t('present')}`;

  return (
    <div className="min-h-screen py-16 px-4 bg-gray-100">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl p-6 md:p-10">
        <button 
          onClick={() => navigate(-1)} 
          className="mb-6 text-primary hover:text-primary-dark flex items-center gap-2 font-medium transition"
        >
          ← {t('back')}
        </button>

        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          {period.image_url && (
            <div className="md:w-3/5 flex justify-center">
              <img 
                src={period.image_url} 
                alt={name} 
                className="max-w-full h-auto rounded-xl shadow-xl border border-gray-200 object-contain bg-white p-2"
              />
            </div>
          )}

          <div className="md:w-2/5">
            <h1 className="text-3xl md:text-4xl font-bold text-navy mb-4">{name}</h1>
            <p className="text-xl text-gray-600 mb-8">{timeRange}</p>

            <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed">
              <p className="whitespace-pre-wrap">{content || (lang === 'en' ? 'No content available' : 'Không có nội dung chi tiết')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}