import { exportFile, useQuasar } from "quasar";
import { useI18n } from "vue-i18n";

export const helper = {
  getEnumOptions(obj, prefix) {
    const { t } = useI18n();
    let list = [];
    Object.keys(obj).forEach((key) => {
      let labelKey = `shared.labels.${key}`;
      if (prefix) labelKey = `shared.${prefix}.${key}`;
      list.push({ label: t(labelKey), value: obj[key] });
    });
    return list;
  },

  updateModel(source, target) {
    if (source && target)
      Object.keys(source).forEach((key) => {
        if (target.hasOwnProperty(key) && target[key] !== source[key])
          source[key] = target[key];
      });
  },

  getEnumType(value, enumType) {
    for (const key in enumType) {
      if (enumType[key] === value) {
        return key;
      }
    }
    return enumType[0];
  },

  getMonths() {
    return Array.from({ length: 12 }, (v, i) => i + 1);
  },

  parseDateString(dateString) {
    const [datePart, timePart] = dateString
      .replace(",", "")
      .split(" ");
    const [year, month, day] = datePart.split("/").map(Number);
    const [hours = 0, minutes = 0, seconds = 0] = timePart
      .split(":")
      .map(Number);

    return {
      year,
      month,
      day,
      hours,
      minutes,
      seconds,
    };
  },

  formatPersianDate(dateString) {
    const persianMonths = [
      "فروردین",
      "اردیبهشت",
      "خرداد",
      "تیر",
      "مرداد",
      "شهریور",
      "مهر",
      "آبان",
      "آذر",
      "دی",
      "بهمن",
      "اسفند",
    ];
    const [year, month, day] = dateString.split("/");
    const persianMonth = persianMonths[parseInt(month, 10) - 1];
    return `${parseInt(day)} ${persianMonth}`;
  },

  dateToNumber(date) {
    const seconds =
      date.seconds +
      date.minutes * 60 +
      date.hours * 3600 +
      date.day * 86400 +
      date.month * 2592000 + // Rough estimate for months
      date.year * 31104000;
    return seconds;
  },

  deepEqual(obj1, obj2) {
    // Check if both are strictly equal (for primitive types)
    if (obj1 === obj2) {
      return true;
    }

    // Check if both are arrays
    if (Array.isArray(obj1) && Array.isArray(obj2)) {
      // Compare length
      if (obj1.length !== obj2.length) {
        return false;
      }

      // Compare items in arrays recursively
      for (let i = 0; i < obj1.length; i++) {
        if (!this.deepEqual(obj1[i], obj2[i])) {
          return false;
        }
      }

      return true;
    }

    // Check if both are objects (and not null)
    if (
      obj1 !== null &&
      typeof obj1 === "object" &&
      obj2 !== null &&
      typeof obj2 === "object"
    ) {
      const keys1 = Object.keys(obj1);
      const keys2 = Object.keys(obj2);

      // Check if both objects have the same number of keys
      if (keys1.length !== keys2.length) {
        return false;
      }

      // Compare each key's value recursively
      for (let key of keys1) {
        if (!this.deepEqual(obj1[key], obj2[key])) {
          return false;
        }
      }

      return true;
    }

    // If none of the above conditions matched, objects are not equal
    return false;
  },

  generateGradientColor(input) {
    let hash = 0;
    if (input) {
      for (let i = 0; i < input.length; i++) {
        hash = input.charCodeAt(i) + ((hash << 5) - hash);
      }
    }

    // Convert hash to hexadecimal color code
    const color = (hash & 0x00ffffff).toString(16).toUpperCase();

    // Ensure the color code is 6 characters long
    const baseColor = `#${"000000".substring(
      0,
      6 - color.length
    )}${color}`;

    // Function to adjust the brightness of the color
    function adjustColor(color, factor) {
      const rgb = parseInt(color.slice(1), 16); // Convert hex to integer
      const r = Math.min(255, Math.floor((rgb >> 16) * factor)); // Extract and adjust red
      const g = Math.min(
        255,
        Math.floor(((rgb >> 8) & 0x00ff) * factor)
      ); // Extract and adjust green
      const b = Math.min(255, Math.floor((rgb & 0x0000ff) * factor)); // Extract and adjust blue
      return `#${((1 << 24) + (r << 16) + (g << 8) + b)
        .toString(16)
        .slice(1)
        .toUpperCase()}`; // Combine and convert back to hex
    }

    // Create a lighter color and a darker color for the gradient
    const lighterColor = adjustColor(baseColor, 1.3);
    const darkerColor = adjustColor(baseColor, 0.7);

    // Darken the darker color further for the box shadow
    const boxShadowColor = adjustColor(darkerColor, 0.7);

    // Create the gradient CSS string
    const gradient = `linear-gradient(135deg, ${lighterColor}, ${darkerColor})`;

    return { gradient, boxShadowColor };
  },

  generateAvatarStyle(id) {
    const { gradient, boxShadowColor } =
      this.generateGradientColor(id);
    const $q = useQuasar();
    return {
      background: gradient,
      ...($q.dark.isActive
        ? {}
        : { boxShadow: `0 4px 8px -4px ${boxShadowColor}` }),
    };
  },

  darkenColor(hex, factor) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    const darkenedR = Math.round(r * (1 - factor));
    const darkenedG = Math.round(g * (1 - factor));
    const darkenedB = Math.round(b * (1 - factor));

    const darkenedHex = `#${darkenedR
      .toString(16)
      .padStart(2, "0")}${darkenedG
      .toString(16)
      .padStart(2, "0")}${darkenedB.toString(16).padStart(2, "0")}`;

    return darkenedHex;
  },

  getSubtotal(items, fieldName) {
    if (!items) return 0;
    return items.reduce((sum, item) => {
      return sum + item[fieldName];
    }, 0);
  },

  formatNumber(number, fraction) {
    const absNum = Math.abs(number || 0).toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: fraction || 0,
    });
    if (number < 0) {
      return `(${absNum})`;
    }
    return absNum;
  },

  formatNumberReadable(number) {
    if (typeof number !== "number" || isNaN(number)) return "";

    const absNum = Math.abs(number);
    const suffix = number < 0 ? "(" : "";
    const postfix = number < 0 ? ")" : "";

    const format = (num, unit) => {
      const rounded = num % 1 === 0 ? num.toFixed(0) : num.toFixed(1);
      return rounded.replace(/\.0$/, "") + " " + unit;
    };

    const formattedNumber =
      absNum < 1e3
        ? absNum.toString()
        : absNum < 1e6
        ? format(absNum / 1e3, "هزار")
        : absNum < 1e9
        ? format(absNum / 1e6, "میلیون")
        : absNum < 1e12
        ? format(absNum / 1e9, "میلیارد")
        : format(absNum / 1e12, "همت");

    return suffix + formattedNumber + postfix;
  },

  exportCsv(rows, columns) {
    function wrapCsvValue(val, formatFn, row) {
      let formatted = formatFn !== void 0 ? formatFn(val, row) : val;

      formatted =
        formatted === void 0 || formatted === null
          ? ""
          : String(formatted);

      formatted = formatted.split('"').join('""');

      return `"${formatted}"`;
    }

    const content = [columns.map((col) => wrapCsvValue(col.label))]
      .concat(
        rows.map((row) =>
          columns
            .map((col) =>
              wrapCsvValue(
                typeof col.field === "function"
                  ? col.field(row)
                  : row[col.field === void 0 ? col.name : col.field],
                col.format,
                row
              )
            )
            .join(",")
        )
      )
      .join("\r\n");

    const status = exportFile(
      "landa-sme.csv",
      "\ufeff" + content,
      "text/csv"
    );

    const $q = useQuasar();
    if (status !== true) {
      $q.notify({
        message: "Browser denied file download...",
        color: "negative",
        icon: "warning",
      });
    }
  },

  separatePhoneNumbers(phoneNumber) {
    function faToEnNumbers(input) {
      const persianToEnglishMap = {
        "۰": "0",
        "۱": "1",
        "۲": "2",
        "۳": "3",
        "۴": "4",
        "۵": "5",
        "۶": "6",
        "۷": "7",
        "۸": "8",
        "۹": "9",
      };

      return input.replace(
        /[۰-۹]/g,
        (match) => persianToEnglishMap[match]
      );
    }
    const convertedPhoneNumber = faToEnNumbers(phoneNumber);

    if (convertedPhoneNumber.length === 8) {
      return `${convertedPhoneNumber.slice(
        0,
        3
      )} ${convertedPhoneNumber.slice(
        3,
        6
      )} ${convertedPhoneNumber.slice(6, 8)}`;
    } else if (convertedPhoneNumber.length === 11) {
      return `${convertedPhoneNumber.slice(
        0,
        4
      )} ${convertedPhoneNumber.slice(
        4,
        7
      )} ${convertedPhoneNumber.slice(7, 11)}`;
    } else {
      const formattedNumber = [];
      for (let i = 0; i < convertedPhoneNumber.length; i += 4) {
        formattedNumber.push(convertedPhoneNumber.slice(i, i + 4));
      }
      return formattedNumber.join(" ");
    }
  },

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  },

  getFirstChar(str) {
    return str?.charAt(0);
  },

  isGuid(str) {
    const guidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return guidRegex.test(str);
  },

  thumbStyle: {
    borderRadius: "9px",
    width: "7px",
    opacity: 1,
  },

  barStyle: {
    borderRadius: "9px",
    width: "7px",
    opacity: 0.2,
  },

  horizontalThumbStyle: {
    background: "red",
    borderRadius: "9px",
    height: "7px",
    opacity: 0.2,
  },

  horizontalBarStyle: {
    borderRadius: "9px",
    height: "7px",
    opacity: 1,
  },
  parseNumber(number) {
    if (!number) return "0";
    const cleanedValue = number.toString().replace(/,/g, "");
    return parseFloat(cleanedValue);
  },

  // downloadFile(response, fileName) {
  //   const blob = new Blob([response.data], {
  //     type: response.data.type,
  //   });
  //   const url = window.URL.createObjectURL(blob);
  //   const a = document.createElement("a");
  //   a.style.display = "none";
  //   a.href = url;
  //   a.download = fileName;
  //   document.body.appendChild(a);
  //   a.click();
  //   window.URL.revokeObjectURL(url);
  // },

  print(printId) {
    const printableElement = document.querySelector(`#${printId}`);
    const clonedElement = printableElement.cloneNode(true);

    const direction =
      window.getComputedStyle(printableElement).direction;

    const iframe = document.createElement("iframe");
    iframe.style.position = "absolute";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.border = "0";

    document.body.appendChild(iframe);

    const printWindow = iframe.contentWindow;

    printWindow.document.write(
      `<html><head><title>landa-SME Print</title>`
    );
    printWindow.document.write(
      `<style>body { direction: ${direction}; }</style>`
    );
    printWindow.document.write("</head><body>");
    printWindow.document.write('<div class="printable"></div>');
    printWindow.document.write("</body></html>");
    printWindow.document.close();

    const printableContainer =
      printWindow.document.querySelector(".printable");
    printableContainer.appendChild(clonedElement);

    const styles = document.querySelectorAll(
      'style, link[rel="stylesheet"]'
    );
    styles.forEach((style) => {
      printWindow.document.head.appendChild(style.cloneNode(true));
    });

    setTimeout(() => {
      printWindow.print();
      document.body.removeChild(iframe);
    }, 500);
  },

  bankLogos: {
    "بانک صادرات ایران": "src/assets/mellat-logo.png",
    "بانک سپه": "src/assets/sepah-logo.png",
    "بانک ملی ایران": "src/assets/melli-logo.png",
    "بانک تجارت": "src/assets/images/bank-logos/tejarat-logo.png",
    "بانک مسکن": "src/assets/maskan-logo.png",
    "بانک ملت": "src/assets/mellat-logo.png",
    "بانک شهر": "src/assets/shahr-logo.png",
    "بانک اقتصاد نوین":
      "src/assets/images/bank-logos/eghtesad-novin-logo.png",
    "بانک ایران زمین": "src/assets/iran-zamin-logo.png",
    "بانک پارسیان": "src/assets/parsian-logo.png",
    "بانک پاسارگاد": "src/assets/pasargad-logo.png",
    "بانک سرمایه": "src/assets/sarmayeh-logo.png",
    "بانک قوامین": "src/assets/qavamin-logo.png",
    "بانک صنعت معدن": "src/assets/sant-madan-logo.png",
    "بانک آینده": "src/assets/ayandeh-logo.png",
    "بانک مهر ایران": "src/assets/mehr-iran-logo.png",
    "بانک کارآفرین": "src/assets/karafarin-logo.png",
    "بانک توسعه تعاون": "src/assets/cooperative-logo.png",
    "بانک توسعه صادرات ایران": "src/assets/cooperative-logo.png",
    "بانک کشاورزی": "src/assets/keshavarzi-logo.png",
    "بانک دی": "src/assets/dey-logo.png",
    "بانک گردشگری": "src/assets/tourism-logo.png",
    "بانک آینده": "src/assets/ayandeh-logo.png",
    "بانک سامان": "src/assets/saman-logo.png",
    "بانک رفاه کارگران": "src/assets/refah-logo.png",
    "بانک ایران و ونزوئلا": "src/assets/iran-venezuela-logo.png",
    "بانک سینا": "src/assets/sina-logo.png",
    "بانک خاورمیانه": "src/assets/middle-east-logo.png",
    "بانک تات": "src/assets/tat-logo.png",
    "بانک کوثر": "src/assets/kosar-logo.png",
    "بانک حکمت ایرانیان": "src/assets/hekmat-logo.png",
    "موسسه مالی و اعتباری ملل": "src/assets/melal-logo.png",
    "موسسه مالی و اعتباری توسعه": "src/assets/tose-logo.png",
    "موسسه مالی و اعتباری نور": "src/assets/nour.png",
    "موسسه مالی و اعتباری کاسپین": "src/assets/kaspian-logo.png",
  },
};
