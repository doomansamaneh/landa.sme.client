/**
 * Convert numbers to words and words to numbers
 *
 * Author: Khashayar Shomali => https://github.com/shomalikhashayar
 * Repository: https://github.com/shomalikhashayar/Numbers-to-Words---Words-to-Numbers-Converter
 *
 * Usage:
 *
 *    numberToWords(1234)   // auto detects lang → "یک هزار و دویست و سی و چهار" (fa)
 *
 * Supported languages:
 * - 'fa': Persian
 * - 'en': English
 * - 'ar': Arabic
 */

import { Quasar } from "quasar";

// ------------------- Language Detection -------------------
function detectLanguageFromQuasarOrStorage() {
  try {
    const isoName =
      (typeof Quasar !== "undefined" &&
        Quasar.lang?.props?.isoName) ||
      (typeof localStorage !== "undefined"
        ? localStorage.getItem("selectedLanguage")
        : null) ||
      "fa-IR";

    const iso = String(isoName).toLowerCase();
    if (iso.startsWith("fa")) return "fa"; // Persian
    if (iso.startsWith("en")) return "en"; // English
    if (iso.startsWith("ar")) return "ar"; // Arabic
    return "fa"; // fallback
  } catch {
    return "fa";
  }
}

// ------------------- Dictionaries -------------------
const dictionaries = {
  fa: {
    units: [
      "",
      "یک",
      "دو",
      "سه",
      "چهار",
      "پنج",
      "شش",
      "هفت",
      "هشت",
      "نه",
    ],
    teens: [
      "ده",
      "یازده",
      "دوازده",
      "سیزده",
      "چهارده",
      "پانزده",
      "شانزده",
      "هفده",
      "هجده",
      "نوزده",
    ],
    tens: [
      "",
      "",
      "بیست",
      "سی",
      "چهل",
      "پنجاه",
      "شصت",
      "هفتاد",
      "هشتاد",
      "نود",
    ],
    hundreds: [
      "",
      "یکصد",
      "دویست",
      "سیصد",
      "چهارصد",
      "پانصد",
      "ششصد",
      "هفتصد",
      "هشتصد",
      "نهصد",
    ],
    scales: ["", "هزار", "میلیون", "میلیارد", "هزار میلیارد"],
  },
  en: {
    units: [
      "",
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
      "nine",
    ],
    teens: [
      "ten",
      "eleven",
      "twelve",
      "thirteen",
      "fourteen",
      "fifteen",
      "sixteen",
      "seventeen",
      "eighteen",
      "nineteen",
    ],
    tens: [
      "",
      "",
      "twenty",
      "thirty",
      "forty",
      "fifty",
      "sixty",
      "seventy",
      "eighty",
      "ninety",
    ],
    hundreds: [
      "",
      "one hundred",
      "two hundred",
      "three hundred",
      "four hundred",
      "five hundred",
      "six hundred",
      "seven hundred",
      "eight hundred",
      "nine hundred",
    ],
    scales: ["", "thousand", "million", "billion", "trillion"],
  },
  ar: {
    units: [
      "",
      "واحد",
      "اثنان",
      "ثلاثة",
      "أربعة",
      "خمسة",
      "ستة",
      "سبعة",
      "ثمانية",
      "تسعة",
    ],
    teens: [
      "عشرة",
      "أحد عشر",
      "اثنا عشر",
      "ثلاثة عشر",
      "أربعة عشر",
      "خمسة عشر",
      "ستة عشر",
      "سبعة عشر",
      "ثمانية عشر",
      "تسعة عشر",
    ],
    tens: [
      "",
      "",
      "عشرون",
      "ثلاثون",
      "أربعون",
      "خمسون",
      "ستون",
      "سبعون",
      "ثمانون",
      "تسعون",
    ],
    hundreds: [
      "",
      "مائة",
      "مائتان",
      "ثلاثمائة",
      "أربعمائة",
      "خمسمائة",
      "ستمائة",
      "سبعمائة",
      "ثمانمائة",
      "تسعمائة",
    ],
    scales: ["", "ألف", "مليون", "مليار", "ترليون"],
  },
};

// ------------------- Helpers -------------------
function convertChunk(number, dict, lang) {
  let parts = [];
  let hundreds = Math.floor(number / 100);
  let tensUnits = number % 100;
  let tens = Math.floor(tensUnits / 10);
  let units = tensUnits % 10;

  if (hundreds > 0) parts.push(dict.hundreds[hundreds]);

  if (tensUnits > 0) {
    if (tensUnits < 10) {
      parts.push(dict.units[units]);
    } else if (tensUnits < 20) {
      parts.push(dict.teens[tensUnits - 10]);
    } else {
      if (units > 0) {
        if (lang === "fa" || lang === "ar") {
          parts.push(`${dict.tens[tens]} و ${dict.units[units]}`);
        } else {
          parts.push(`${dict.tens[tens]} ${dict.units[units]}`);
        }
      } else {
        parts.push(dict.tens[tens]);
      }
    }
  }

  if (parts.length > 1 && (lang === "fa" || lang === "ar")) {
    return parts.join(" و ");
  }
  return parts.join(" ");
}

// ------------------- Number → Words -------------------
export function numberToWords(number, lang) {
  // 🔹 detect dynamically each call if lang not given
  lang = lang || detectLanguageFromQuasarOrStorage();

  if (number === 0) {
    if (lang === "fa") return "صفر";
    if (lang === "en") return "zero";
    if (lang === "ar") return "صفر";
  }

  const dict = dictionaries[lang];
  let chunks = [];
  let chunkIndex = 0;
  let num = Math.abs(number);

  while (num > 0) {
    let chunk = num % 1000;
    if (chunk > 0) {
      let chunkWords = convertChunk(chunk, dict, lang);
      let scale = dict.scales[chunkIndex];

      if (lang === "ar" && chunk === 1 && chunkIndex > 0) {
        chunkWords = scale;
      } else if (scale) {
        chunkWords += scale ? ` ${scale}` : "";
      }
      chunks.unshift(chunkWords.trim());
    }
    num = Math.floor(num / 1000);
    chunkIndex++;
  }

  let result =
    lang === "fa" || lang === "ar"
      ? chunks.join(" و ")
      : chunks.join(" ");

  if (number < 0) {
    if (lang === "fa") result = "منفی " + result;
    if (lang === "en") result = "minus " + result;
    if (lang === "ar") result = "سالب " + result;
  }

  return result;
}
