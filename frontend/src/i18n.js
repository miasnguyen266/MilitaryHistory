// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  vi: {
    translation: {
      "nav.home": "Trang chủ",
      "nav.timeline": "Dòng thời gian",
      "nav.periods": "Sự kiện lịch sử",
      "nav.figures": "Nhân vật lịch sử",
      "nav.language": "English",
      "nav.search_placeholder": "Tìm kiếm sự kiện, nhân vật...",
      "home.hero.title": "Lịch sử Quân sự Việt Nam",
      "home.hero.description":
        "Hành trình vẻ vang của Quân đội Nhân dân Việt Nam – từ những ngày đầu thành lập đến nay.",
      "home.buttons.timeline": "Xem Dòng thời gian",
      "home.buttons.periods": "Các sự kiện lịch sử",
      "home.intro.title":
        "Quân đội ta từ nhân dân mà ra, vì nhân dân mà chiến đấu",
      "home.intro.description":
        "Trải qua 81 năm xây dựng, chiến đấu và trưởng thành (1944-2025), Quân đội nhân dân Việt Nam đã khẳng định vững chắc vai trò là lực lượng nòng cốt trong sự nghiệp xây dựng và bảo vệ Tổ quốc; là lực lượng chính trị, quân sự trung thành, tin cậy của Đảng, Nhà nước và Nhân dân. Từ một đội quân ra đời trong điều kiện hết sức gian khó, với lực lượng nhỏ bé, vũ khí thô sơ, Quân đội ta đã không ngừng lớn mạnh, lập nên những chiến công hiển hách, làm nên sức mạnh Việt Nam trong thời đại Hồ Chí Minh.",
      "home.timeline.title": "Một số mốc son lịch sử",
      "home.timeline.view_all": "Xem toàn bộ dòng thời gian →",
      "artifactSlider.title": "Một số hình ảnh về mô hình khí tài",
      "caroselVideo.title": "Video tư liệu về các chiến dịch",
      "artifactSlider.slides": [
        {
          image: "/images/khitai1.jpg",
          title: "Xe tăng T-54/55",
          desc: "Mô hình xe tăng huyền thoại trong Chiến dịch Hồ Chí Minh",
        },
        {
          image: "/images/khitai2.jpg",
          title: "Súng AK-47",
          desc: "Vũ khí nổi tiếng đồng hành cùng bộ đội qua các cuộc kháng chiến",
        },
        {
          image: "/images/khitai3.jpg",
          title: "Tàu ngầm lớp Kilo",
          desc: "Hiện vật hiện đại của Hải quân Nhân dân Việt Nam",
        },
        {
          image: "/images/khitai4.jpg",
          title: "Máy bay Su-30MK2",
          desc: "Mô hình máy bay chiến đấu bảo vệ bầu trời Tổ quốc",
        },
      ],

      loading: "Đang tải...",
      error: "Có lỗi xảy ra",
      "search.results_for": "Kết quả tìm kiếm cho",
      "search.no_results": "Không tìm thấy kết quả phù hợp",
      "search.found": "Tìm thấy",
      "search.items_found": "kết quả",
      "search.loading": "Đang tìm kiếm...",
      "search.error": "Có lỗi xảy ra khi tìm kiếm",
      "search_type.event": "Sự kiện lịch sử",
      "search_type.figure": "Nhân vật lịch sử",
      "search_type.period": "Sự kiện lịch sử",
      "common.no_image": "Không có ảnh",
      "common.unknown": "Không rõ",
      "footer.source": "Nguồn dữ liệu từ tài liệu chính thống",
      title: "Một số hình ảnh về mô hình khí tài",
      back: "Quay lại",
      present: "nay",
      previous: "Trước",
      next: "Sau",
    },
  },

  en: {
    translation: {
      "nav.home": "Home",
      "nav.timeline": "Timeline",
      "nav.periods": "Events",
      "nav.figures": "Figures",
      "nav.language": "Tiếng Việt",
      "nav.search_placeholder": "Search events, figures...",
      "home.hero.title": "Military History of Vietnam",
      "home.hero.description":
        "The glorious journey of the Vietnam People's Army – from its founding days to the present.",
      "home.buttons.timeline": "View Timeline",
      "home.buttons.periods": "Events",
      "home.intro.title":
        "Our army comes from the people and fights for the people.",
      "home.intro.description":
        "Over the course of 81 years of building, fighting and growing (1944–2025), the Vietnam People’s Army has firmly established its role as the backbone of the nation’s efforts to build and defend the Fatherland; it is the loyal and reliable political and military force of the Party, the State and the people. From a force born under extremely difficult conditions, with a small contingent and rudimentary weapons, our Army has continuously grown in strength, achieving glorious victories and forging Vietnam’s strength in the era of Ho Chi Minh.",
      "home.timeline.title": "Some historic milestones",
      "home.timeline.view_all": "View full timeline →",
      // ==================== PHẦN MỚI: ARTIFACT SLIDER (ENGLISH) ====================
      "artifactSlider.title": "Some images of military models",
      "caroselVideo.title": "Archival footage of the campaigns",
      "artifactSlider.slides": [
        {
          image: "/images/khitai1.jpg",
          title: "T-54/55 Tank",
          desc: "Iconic tank model in the Ho Chi Minh Campaign",
        },
        {
          image: "/images/khitai2.jpg",
          title: "AK-47 Rifle",
          desc: "Famous weapon accompanying soldiers through resistance wars",
        },
        {
          image: "/images/khitai3.jpg",
          title: "Kilo-class Submarine",
          desc: "Modern equipment of the Vietnam People's Navy",
        },
        {
          image: "/images/khitai4.jpg",
          title: "Su-30MK2 Fighter Jet",
          desc: "Model of fighter aircraft protecting the nation's airspace",
        },
      ],

      loading: "Loading...",
      error: "An error occurred",
      "search.results_for": "Search results for",
      "search.no_results": "No matching results found",
      "search.found": "Found",
      "search.items_found": "results",
      "search.loading": "Searching...",
      "search.error": "An error occurred while searching",
      "search_type.event": "Events",
      "search_type.figure": "Historical Figure",
      "search_type.period": "Events",
      "common.no_image": "No image",
      "common.unknown": "Unknown",
      "footer.source": "Source data from official documents",
      title: "Some images of military models",
      back: "Back",
      present: "present",
      previous: "previous",
      next: "next",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "vi",
  fallbackLng: "vi",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
