// src/components/Footer.jsx
import { useTranslation } from "react-i18next";
import { useState } from "react";

export default function Footer() {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const militaryMuseums = [
    {
      nameKey: "footer.museum_name",
      addressKey: "footer.museum.address",
      mapEmbed:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.5!2d105.75!3d21.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjEuMCwgMTA1Ljc1!5e0!3m2!1svi!2sVN!4v1234567890",
      link: "https://maps.app.goo.gl/111J5LwjVMnyEKyV6",
    },
  ];

  return (
    <footer className="bg-navy text-white pt-16 pb-10 mt-auto">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Cột 1: Giới thiệu */}
          <div className="lg:col-span-4">
            <h3 className="text-2xl font-bold mb-4">
              {t("footer.museum.title")}
            </h3>
            <p className="text-gray-300 leading-relaxed">
              {t("footer.museum.intro")}
            </p>
            <div className="mt-6 text-sm">
              <p className="font-medium">{t("footer.address_label")}:</p>
              <p className="text-gray-200">{t("footer.museum.address")}</p>
            </div>
          </div>

          {/* Cột 2: Accordion bảo tàng quân sự */}
          <div className="lg:col-span-5">
            <h3 className="text-2xl font-bold mb-6">
              {t("footer.military_museums.title")}
            </h3>

            <div className="space-y-4">
              {militaryMuseums.map((museum, index) => (
                <div
                  key={index}
                  className="border border-white/20 rounded-2xl overflow-hidden"
                >
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full px-6 py-4 flex justify-between items-center text-left hover:bg-white/5 transition-colors"
                  >
                    <span className="font-semibold">{t(museum.nameKey)}</span>
                    <span
                      className={`transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""}`}
                    >
                      ▼
                    </span>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${openIndex === index ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"}`}
                  >
                    <div className="px-6 pb-6">
                      <p className="text-gray-300 text-sm mb-4">
                        {t(museum.addressKey)}
                      </p>
                      <div className="rounded-xl overflow-hidden mb-4 shadow-inner">
                        <iframe
                          src={museum.mapEmbed}
                          width="100%"
                          height="180"
                          style={{ border: 0 }}
                          allowFullScreen=""
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          title={t(museum.nameKey)}
                        />
                      </div>
                      <a
                        href={museum.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 text-sm inline-flex items-center gap-1"
                      >
                        {t("footer.view_location")}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cột 3: Mạng xã hội & Liên hệ */}
          <div className="lg:col-span-3">
            <h3 className="text-2xl font-bold mb-6">{t("footer.connect")}</h3>

            <div className="flex flex-col gap-5 mb-10">
              <SocialLink
                href="https://facebook.com"
                icon={FacebookSVG}
                label="Lịch sử Quân sự Việt Nam"
              />
              <SocialLink
                href="https://instagram.com"
                icon={InstagramSVG}
                label="lichsu.quansu_vietnam"
              />
              <SocialLink
                href="https://x.com"
                icon={XSVG}
                label="Lich Su Quan Su Viet Nam"
              />
              <SocialLink
                href="https://zalo.me"
                icon={ZaloSVG}
                label="+84829127831"
              />
              <SocialLink
                href="https://discord.com"
                icon={DiscordSVG}
                label="lichsu_quansu0405"
              />
            </div>

            <div className="text-sm text-gray-300 space-y-2">
              <p>
                <span className="font-medium text-white">
                  {t("footer.hotline_label")}:
                </span>{" "}
                {t("footer.hotline")}
              </p>
              <p>
                <span className="font-medium text-white">
                  {t("footer.email_label")}:
                </span>{" "}
                {t("footer.email")}
              </p>
              <p>{t("footer.hours")}</p>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/20 text-center text-sm text-gray-400">
          <p>{t("footer.copyright", { year: new Date().getFullYear() })}</p>
          <p className="mt-1">
            {t("footer.source") ||
              "Nguồn tài liệu từ các bảo tàng lịch sử và kho lưu trữ quốc gia"}
          </p>
        </div>
      </div>
    </footer>
  );
}

// ==================== SOCIAL LINK COMPONENT ====================
function SocialLink({ href, icon: Icon, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors group"
    >
      <div className="w-9 h-9 flex items-center justify-center">
        <Icon />
      </div>
      <span className="group-hover:underline">{label}</span>
    </a>
  );
}

// ==================== SVG ICONS CÓ MÀU ====================

const FacebookSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    shape-rendering="geometricPrecision"
    text-rendering="geometricPrecision"
    image-rendering="optimizeQuality"
    fill-rule="evenodd"
    clip-rule="evenodd"
    viewBox="0 0 512 509.64"
  >
    <rect
      fill="#0866FF"
      width="512"
      height="509.64"
      rx="115.612"
      ry="115.612"
    />
    <path
      fill="#fff"
      d="M287.015 509.64h-92.858V332.805h-52.79v-78.229h52.79v-33.709c0-87.134 39.432-127.522 124.977-127.522 16.217 0 44.203 3.181 55.651 6.361v70.915c-6.043-.636-16.536-.953-29.576-.953-41.976 0-58.194 15.9-58.194 57.241v27.667h83.618l-14.365 78.229h-69.253V509.64z"
    />
  </svg>
);

const InstagramSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 132.004 132"
  >
    <defs>
      <linearGradient id="b">
        <stop offset="0" stop-color="#3771c8" />
        <stop stop-color="#3771c8" offset=".128" />
        <stop offset="1" stop-color="#60f" stop-opacity="0" />
      </linearGradient>
      <linearGradient id="a">
        <stop offset="0" stop-color="#fd5" />
        <stop offset=".1" stop-color="#fd5" />
        <stop offset=".5" stop-color="#ff543e" />
        <stop offset="1" stop-color="#c837ab" />
      </linearGradient>
      <radialGradient
        id="c"
        cx="158.429"
        cy="578.088"
        r="65"
        xlink:href="#a"
        gradientUnits="userSpaceOnUse"
        gradientTransform="matrix(0 -1.98198 1.8439 0 -1031.402 454.004)"
        fx="158.429"
        fy="578.088"
      />
      <radialGradient
        id="d"
        cx="147.694"
        cy="473.455"
        r="65"
        xlink:href="#b"
        gradientUnits="userSpaceOnUse"
        gradientTransform="matrix(.17394 .86872 -3.5818 .71718 1648.348 -458.493)"
        fx="147.694"
        fy="473.455"
      />
    </defs>
    <path
      fill="url(#c)"
      d="M65.03 0C37.888 0 29.95.028 28.407.156c-5.57.463-9.036 1.34-12.812 3.22-2.91 1.445-5.205 3.12-7.47 5.468C4 13.126 1.5 18.394.595 24.656c-.44 3.04-.568 3.66-.594 19.188-.01 5.176 0 11.988 0 21.125 0 27.12.03 35.05.16 36.59.45 5.42 1.3 8.83 3.1 12.56 3.44 7.14 10.01 12.5 17.75 14.5 2.68.69 5.64 1.07 9.44 1.25 1.61.07 18.02.12 34.44.12 16.42 0 32.84-.02 34.41-.1 4.4-.207 6.955-.55 9.78-1.28 7.79-2.01 14.24-7.29 17.75-14.53 1.765-3.64 2.66-7.18 3.065-12.317.088-1.12.125-18.977.125-36.81 0-17.836-.04-35.66-.128-36.78-.41-5.22-1.305-8.73-3.127-12.44-1.495-3.037-3.155-5.305-5.565-7.624C116.9 4 111.64 1.5 105.372.596 102.335.157 101.73.027 86.19 0H65.03z"
      transform="translate(1.004 1)"
    />
    <path
      fill="url(#d)"
      d="M65.03 0C37.888 0 29.95.028 28.407.156c-5.57.463-9.036 1.34-12.812 3.22-2.91 1.445-5.205 3.12-7.47 5.468C4 13.126 1.5 18.394.595 24.656c-.44 3.04-.568 3.66-.594 19.188-.01 5.176 0 11.988 0 21.125 0 27.12.03 35.05.16 36.59.45 5.42 1.3 8.83 3.1 12.56 3.44 7.14 10.01 12.5 17.75 14.5 2.68.69 5.64 1.07 9.44 1.25 1.61.07 18.02.12 34.44.12 16.42 0 32.84-.02 34.41-.1 4.4-.207 6.955-.55 9.78-1.28 7.79-2.01 14.24-7.29 17.75-14.53 1.765-3.64 2.66-7.18 3.065-12.317.088-1.12.125-18.977.125-36.81 0-17.836-.04-35.66-.128-36.78-.41-5.22-1.305-8.73-3.127-12.44-1.495-3.037-3.155-5.305-5.565-7.624C116.9 4 111.64 1.5 105.372.596 102.335.157 101.73.027 86.19 0H65.03z"
      transform="translate(1.004 1)"
    />
    <path
      fill="#fff"
      d="M66.004 18c-13.036 0-14.672.057-19.792.29-5.11.234-8.598 1.043-11.65 2.23-3.157 1.226-5.835 2.866-8.503 5.535-2.67 2.668-4.31 5.346-5.54 8.502-1.19 3.053-2 6.542-2.23 11.65C18.06 51.327 18 52.964 18 66s.058 14.667.29 19.787c.235 5.11 1.044 8.598 2.23 11.65 1.227 3.157 2.867 5.835 5.536 8.503 2.667 2.67 5.345 4.314 8.5 5.54 3.054 1.187 6.543 1.996 11.652 2.23 5.12.233 6.755.29 19.79.29 13.037 0 14.668-.057 19.788-.29 5.11-.234 8.602-1.043 11.656-2.23 3.156-1.226 5.83-2.87 8.497-5.54 2.67-2.668 4.31-5.346 5.54-8.502 1.18-3.053 1.99-6.542 2.23-11.65.23-5.12.29-6.752.29-19.788 0-13.036-.06-14.672-.29-19.792-.24-5.11-1.05-8.598-2.23-11.65-1.23-3.157-2.87-5.835-5.54-8.503-2.67-2.67-5.34-4.31-8.5-5.535-3.06-1.187-6.55-1.996-11.66-2.23-5.12-.233-6.75-.29-19.79-.29zm-4.306 8.65c1.278-.002 2.704 0 4.306 0 12.816 0 14.335.046 19.396.276 4.68.214 7.22.996 8.912 1.653 2.24.87 3.837 1.91 5.516 3.59 1.68 1.68 2.72 3.28 3.592 5.52.657 1.69 1.44 4.23 1.653 8.91.23 5.06.28 6.58.28 19.39s-.05 14.33-.28 19.39c-.214 4.68-.996 7.22-1.653 8.91-.87 2.24-1.912 3.835-3.592 5.514-1.68 1.68-3.275 2.72-5.516 3.59-1.69.66-4.232 1.44-8.912 1.654-5.06.23-6.58.28-19.396.28-12.817 0-14.336-.05-19.396-.28-4.68-.216-7.22-.998-8.913-1.655-2.24-.87-3.84-1.91-5.52-3.59-1.68-1.68-2.72-3.276-3.592-5.517-.657-1.69-1.44-4.23-1.653-8.91-.23-5.06-.276-6.58-.276-19.398s.046-14.33.276-19.39c.214-4.68.996-7.22 1.653-8.912.87-2.24 1.912-3.84 3.592-5.52 1.68-1.68 3.28-2.72 5.52-3.592 1.692-.66 4.233-1.44 8.913-1.655 4.428-.2 6.144-.26 15.09-.27zm29.928 7.97c-3.18 0-5.76 2.577-5.76 5.758 0 3.18 2.58 5.76 5.76 5.76 3.18 0 5.76-2.58 5.76-5.76 0-3.18-2.58-5.76-5.76-5.76zm-25.622 6.73c-13.613 0-24.65 11.037-24.65 24.65 0 13.613 11.037 24.645 24.65 24.645C79.617 90.645 90.65 79.613 90.65 66S79.616 41.35 66.003 41.35zm0 8.65c8.836 0 16 7.163 16 16 0 8.836-7.164 16-16 16-8.837 0-16-7.164-16-16 0-8.837 7.163-16 16-16z"
    />
  </svg>
);

const XSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    shape-rendering="geometricPrecision"
    text-rendering="geometricPrecision"
    image-rendering="optimizeQuality"
    fill-rule="evenodd"
    clip-rule="evenodd"
    viewBox="0 0 512 509.64"
  >
    <rect width="512" height="509.64" rx="115.61" ry="115.61" />
    <path
      fill="#fff"
      fill-rule="nonzero"
      d="M323.74 148.35h36.12l-78.91 90.2 92.83 122.73h-72.69l-56.93-74.43-65.15 74.43h-36.14l84.4-96.47-89.05-116.46h74.53l51.46 68.04 59.53-68.04zm-12.68 191.31h20.02l-129.2-170.82H180.4l130.66 170.82z"
    />
  </svg>
);

const ZaloSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    width="100"
    height="100"
    viewBox="0 0 48 48"
  >
    <path
      fill="#2962ff"
      d="M15,36V6.827l-1.211-0.811C8.64,8.083,5,13.112,5,19v10c0,7.732,6.268,14,14,14h10	c4.722,0,8.883-2.348,11.417-5.931V36H15z"
    ></path>
    <path
      fill="#eee"
      d="M29,5H19c-1.845,0-3.601,0.366-5.214,1.014C10.453,9.25,8,14.528,8,19	c0,6.771,0.936,10.735,3.712,14.607c0.216,0.301,0.357,0.653,0.376,1.022c0.043,0.835-0.129,2.365-1.634,3.742	c-0.162,0.148-0.059,0.419,0.16,0.428c0.942,0.041,2.843-0.014,4.797-0.877c0.557-0.246,1.191-0.203,1.729,0.083	C20.453,39.764,24.333,40,28,40c4.676,0,9.339-1.04,12.417-2.916C42.038,34.799,43,32.014,43,29V19C43,11.268,36.732,5,29,5z"
    ></path>
    <path
      fill="#2962ff"
      d="M36.75,27C34.683,27,33,25.317,33,23.25s1.683-3.75,3.75-3.75s3.75,1.683,3.75,3.75	S38.817,27,36.75,27z M36.75,21c-1.24,0-2.25,1.01-2.25,2.25s1.01,2.25,2.25,2.25S39,24.49,39,23.25S37.99,21,36.75,21z"
    ></path>
    <path
      fill="#2962ff"
      d="M31.5,27h-1c-0.276,0-0.5-0.224-0.5-0.5V18h1.5V27z"
    ></path>
    <path
      fill="#2962ff"
      d="M27,19.75v0.519c-0.629-0.476-1.403-0.769-2.25-0.769c-2.067,0-3.75,1.683-3.75,3.75	S22.683,27,24.75,27c0.847,0,1.621-0.293,2.25-0.769V26.5c0,0.276,0.224,0.5,0.5,0.5h1v-7.25H27z M24.75,25.5	c-1.24,0-2.25-1.01-2.25-2.25S23.51,21,24.75,21S27,22.01,27,23.25S25.99,25.5,24.75,25.5z"
    ></path>
    <path
      fill="#2962ff"
      d="M21.25,18h-8v1.5h5.321L13,26h0.026c-0.163,0.211-0.276,0.463-0.276,0.75V27h7.5	c0.276,0,0.5-0.224,0.5-0.5v-1h-5.321L21,19h-0.026c0.163-0.211,0.276-0.463,0.276-0.75V18z"
    ></path>
  </svg>
);

const DiscordSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    shape-rendering="geometricPrecision"
    text-rendering="geometricPrecision"
    image-rendering="optimizeQuality"
    fill-rule="evenodd"
    clip-rule="evenodd"
    viewBox="0 0 512 512"
  >
    <path
      fill="#5865F2"
      d="M105 0h302c57.928.155 104.845 47.072 105 104.996V407c-.155 57.926-47.072 104.844-104.996 104.998L105 512C47.074 511.844.156 464.926.002 407.003L0 105C.156 47.072 47.074.155 104.997 0H105z"
    />
    <g data-name="å¾å± 2">
      <g data-name="Discord Logos">
        <path
          fill="#fff"
          fill-rule="nonzero"
          d="M368.896 153.381a269.506 269.506 0 00-67.118-20.637 186.88 186.88 0 00-8.57 17.475 250.337 250.337 0 00-37.247-2.8c-12.447 0-24.955.946-37.25 2.776-2.511-5.927-5.427-11.804-8.592-17.454a271.73 271.73 0 00-67.133 20.681c-42.479 62.841-53.991 124.112-48.235 184.513a270.622 270.622 0 0082.308 41.312c6.637-8.959 12.582-18.497 17.63-28.423a173.808 173.808 0 01-27.772-13.253c2.328-1.688 4.605-3.427 6.805-5.117 25.726 12.083 53.836 18.385 82.277 18.385 28.442 0 56.551-6.302 82.279-18.387 2.226 1.817 4.503 3.557 6.805 5.117a175.002 175.002 0 01-27.823 13.289 197.847 197.847 0 0017.631 28.4 269.513 269.513 0 0082.363-41.305l-.007.007c6.754-70.045-11.538-130.753-48.351-184.579zM201.968 300.789c-16.04 0-29.292-14.557-29.292-32.465s12.791-32.592 29.241-32.592 29.599 14.684 29.318 32.592c-.282 17.908-12.919 32.465-29.267 32.465zm108.062 0c-16.066 0-29.267-14.557-29.267-32.465s12.791-32.592 29.267-32.592c16.475 0 29.522 14.684 29.241 32.592-.281 17.908-12.894 32.465-29.241 32.465z"
          data-name="Discord Logo - Large - White"
        />
      </g>
    </g>
  </svg>
);
