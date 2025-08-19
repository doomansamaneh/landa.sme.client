/**
 * Number to Words Utility (English / Persian / Arabic)
 * Author: Khashayar Shomali (extended with large number support)

 * Usage:
 * import { numberToWords } from "@/helpers/numberToWords.js";
 * numberToWords(12345, "persian")
 * numberToWords(12345)
 */

import { Quasar } from "quasar";

const words = {
  english: {
    and: " ",
    negative: "Negative ",
    zero: "Zero",
    ones: [
      "",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
    ],
    teens: [
      "Ten",
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen",
    ],
    tens: [
      "Twenty",
      "Thirty",
      "Forty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety",
    ],
    hundreds: [
      "",
      "One Hundred",
      "Two Hundred",
      "Three Hundred",
      "Four Hundred",
      "Five Hundred",
      "Six Hundred",
      "Seven Hundred",
      "Eight Hundred",
      "Nine Hundred",
    ],
    thousands: [
      "",
      " Thousand",
      " Million",
      " Billion",
      " Trillion",
      " Quadrillion",
      " Quintillion",
      " Sextillion",
      " Septillion",
      " Octillion",
      " Nonillion",
      " Decillion",
    ],
  },
  persian: {
    and: " و ",
    negative: "منهای ",
    zero: "صفر",
    ones: [
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
    thousands: [
      "",
      " هزار",
      " میلیون",
      " میلیارد",
      " همت",
      " ده همت",
      " صد همت",
      " هزار همت",
    ],
  },
  arabic: {
    and: " و ",
    negative: "سالب ",
    zero: "صفر",
    ones: [
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
    thousands: [
      "",
      " ألف",
      " مليون",
      " مليار",
      " تريليون",
      " كوادريليون",
      " كوينتيليون",
      " سكستيليون",
      " سبتيلليون",
      " أوكتيلليون",
      " نونيليون",
      " ديسيلليون",
    ],
  },
};

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
    if (iso.startsWith("fa")) return "persian";
    if (iso.startsWith("en")) return "english";
    if (iso.startsWith("ar")) return "arabic";
    return "english";
  } catch {
    return "english";
  }
}

function chunkUnderThousand(number0to999, language) {
  const w = words[language];
  let n = number0to999;
  let str = "";

  const hundreds = Math.floor(n / 100);
  if (hundreds > 0) {
    str += w.hundreds[hundreds];
    n %= 100;
  }

  if (n > 0) {
    if (str.length > 0) str += w.and;
    if (n < 10) {
      str += w.ones[n];
    } else if (n < 20) {
      str += w.teens[n - 10];
    } else {
      const tens = Math.floor(n / 10);
      str += w.tens[tens - 2];
      const ones = n % 10;
      if (ones > 0) str += w.and + w.ones[ones];
    }
  }

  return str;
}

export function numberToWords(value, lang) {
  const language = ["english", "persian", "arabic"].includes(lang)
    ? lang
    : detectLanguageFromQuasarOrStorage();
  const w = words[language];

  let nBig;
  if (typeof value === "bigint") {
    nBig = value;
  } else if (typeof value === "number") {
    if (!Number.isFinite(value)) throw new Error("Invalid number");
    nBig = BigInt(Math.trunc(value));
  } else {
    throw new Error("numberToWords expects a number or bigint");
  }

  if (nBig === 0n) return w.zero;
  if (nBig < 0n) return w.negative + numberToWords(-nBig, language);

  const parts = [];
  let thousandsIndex = 0;
  let tmp = nBig;

  while (tmp > 0n) {
    const part = Number(tmp % 1000n);
    if (part !== 0) {
      const chunk = chunkUnderThousand(part, language);
      const suffix = w.thousands[thousandsIndex] || "";
      parts.push(chunk + suffix);
    }
    tmp = tmp / 1000n;
    thousandsIndex++;
  }

  return parts.reverse().join(w.and);
}
