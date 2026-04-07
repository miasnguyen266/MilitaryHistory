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
      "artifactSlider.title": "Một số hình ảnh về mô hình khí tài, hiện vật",
      "caroselVideo.title": "Video tư liệu về các chiến dịch",
      "artifactSlider.slides": [
        {
          image: "/images/khitai1.jpg",
          title: "Máy bay tiêm kích MiG-17",
          desc: "Mô hình máy bay huyền thoại trong các chiến dịch bầu trời bảo vệ miền Bắc",
        },
        {
          image: "/images/khitai2.jpg",
          title: "Xe tải quân sự ZiL-157",
          desc: "Mô hình xe tải quân sự được Liên xô sản xuất, Viêt Nam sử dụng trong chiến dịch chống Mỹ 1965-1975",
        },
        {
          image: "/images/khitai3.jpg",
          title: "Pháo kéo 122mm D-30 howitzer",
          desc: "Mô hình pháo kéo trong các chiến dịch Nam Lào(1971), Trị - Thiên, Hồ Chí Minh(1975)",
        },
        {
          image: "/images/khitai4.jpg",
          title: "Xe tăng phòng không ZSU-57-2",
          desc: "Mô hình xe tăng huyền thoại tham gia các chiến dịch Xuân(1975), Hồ Chí Minh",
        },
        {
          image: "/images/khitai5.jpg",
          title: "Máy bay Su-30MK2",
          desc: "Mô hình máy bay chiến đấu bảo vệ bầu trời Tổ quốc",
        },
        {
          image: "/images/hienvat1.jpg",
          title: "Súng trường, súng kíp",
          desc: "Mô hình súng trường và súng kíp thu được của quân Nhật, Pháp(1975) ",
        },
        {
          image: "/images/hienvat2.jpg",
          title: "Súng trung liên Lewis",
          desc: "Đại đội Nam tiến 'Phan Đình Phùng' sử dụng trong các trận đánh ở chiến trường Bình Thuận, 10/1945",
        },
        {
          image: "/images/hienvat3.jpg",
          title: "Nỏ liên châu(nó thần Kim Quy)",
          desc: "Mô hình nỏ liên châu Gắn liền với truyền thuyết về An Dương Vương và thành Cổ Loa (thế kỷ III TCN). Đây được coi là loại vũ khí biểu tượng của nước Âu Lạc.",
        },
        {
          image: "/images/hienvat4.jpg",
          title: "Súng thần công",
          desc: "Mô hình súng thần công này thuộc thời nhà Nguyễn (thế kỷ XIX). Phông nền phía sau mô tả về Trận Kinh thành Huế năm 1885 và cuộc kháng chiến chống Pháp.",
        },
        {
          image: "/images/hienvat5.jpg",
          title: "Xe Jeep quân sự Jeep M151",
          desc: "Mô hình xe được sản xuất tại Mỹ, quân đội Việt Nam đã thu giữ và sử dụng làm chiến lợi phẩm trong chiến dịch giải phóng miền Nam năm 1975",
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
          title: "MiG-17 Fighter Aircraft",
          desc: "A model of the legendary aircraft that played a key role in the air defence campaigns over the North",
        },
        {
          image: "/images/khitai2.jpg",
          title: "ZiL-157 Military Truck",
          desc: "A Soviet-manufactured military truck model used by Vietnam during the war against the United States from 1965 to 1975",
        },
        {
          image: "/images/khitai3.jpg",
          title: "122mm D-30 Towed Howitzer",
          desc: "Model of the towed howitzer used in the campaigns in Southern Laos (1971), Tri - Thien, and Ho Chi Minh (1975)",
        },
        {
          image: "/images/khitai4.jpg",
          title: "ZSU-57-2 Anti-Aircraft Tank",
          desc: "A model of the legendary tank that took part in the Spring Campaign (1975) and the Ho Chi Minh Campaign.",
        },
        {
          image: "/images/khitai5.jpg",
          title: "Su-30MK2 Fighter Aircraft",
          desc: "A model of the fighter aircraft defending the nation’s skies.",
        },
        {
          image: "/images/hienvat1.jpg",
          title: "Rifles and Submachine Guns",
          desc: "Rifles and submachine guns captured from Japanese and French forces (1975).",
        },
        {
          image: "/images/hienvat2.jpg",
          title: "Lewis Machine Gun",
          desc: "Used by the ‘Phan Dinh Phung’ Southern Advance Company during battles on the Bình Thuận battlefield, October 1945.",
        },
        {
          image: "/images/hienvat3.jpg",
          title: "The multi-shot crossbow (the Golden Turtle Divine Crossbow)",
          desc: "A model of the multi-shot crossbow associated with the legend of An Duong Vuong and Co Loa Citadel (3rd century BC). This is regarded as the symbolic weapon of the Au Lac kingdom.",
        },
        {
          image: "/images/hienvat4.jpg",
          title: "Cannon",
          desc: "This cannon model dates from the Nguyen Dynasty (19th century). The background depicts the Battle of Hue Citadel in 1885 and the resistance against the French.",
        },
        {
          image: "/images/hienvat5.jpg",
          title: "Military Jeep M151",
          desc: "A vehicle model manufactured in the United States, which the Vietnamese army captured and used as war booty during the 1975 campaign to liberate the South.",
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
