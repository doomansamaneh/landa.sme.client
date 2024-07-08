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

  getEnumType(value, enumType) {
    for (const key in enumType) {
      if (enumType[key] === value) {
        return key;
      }
    }
    return enumType[0];
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

  getSubtotal(selectedRows, fieldName) {
    if (!selectedRows) return 0;
    return selectedRows.reduce((sum, item) => {
      return sum + item[fieldName];
    }, 0);
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
    left: "4px",
    borderRadius: "5px",
    width: "6px",
    opacity: 0.75,
  },

  barStyle: {
    left: "2px",
    width: "8px",
    opacity: 0.2,
  },

  parseNumber(number) {
    if (!number) return "0";
    const cleanedValue = number.toString().replace(/,/g, "");
    return parseFloat(cleanedValue);
  },

  downloadFile(response, fileName) {
    const blob = new Blob([response.data], {
      type: response.data.type,
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  },

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
};
