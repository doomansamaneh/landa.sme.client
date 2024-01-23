import { useI18n } from "vue-i18n"
import { exportFile, useQuasar } from "quasar"

export const helper = {
  getEnumOptions(obj, prefix) {
    const { t } = useI18n()
    let list = []
    Object.keys(obj).forEach(key => {
      let labelKey = `shared.labels.${key}`
      if (prefix) labelKey = `shared.${prefix}.${key}`
      list.push({ label: t(labelKey), value: obj[key] })
    })
    return list
  },

  // newGuid() {
  //   // Generate a random array of 16 bytes (128 bits)
  //   const byteArray = new Uint8Array(16);
  //   crypto.getRandomValues(byteArray);

  //   // Set the version (4) and variant (8-11) bits
  //   byteArray[6] = (byteArray[6] & 0x0F) | 0x40; // version 4
  //   byteArray[8] = (byteArray[8] & 0x3F) | 0x80; // variant 10

  //   // Convert the array to a hexadecimal string
  //   const hexArray = Array.from(byteArray).map(byte => byte.toString(16).padStart(2, '0'));
  //   const uuid = hexArray.join('');

  //   // Insert dashes at the appropriate positions
  //   return `${uuid.slice(0, 8)}-${uuid.slice(8, 12)}-${uuid.slice(12, 16)}-${uuid.slice(16, 20)}-${uuid.slice(20)}`;
  // },

  generateDarkAvatarColor(input) {
    // Simple hash function to generate a color based on the input
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
      hash = input.charCodeAt(i) + ((hash << 5) - hash);
    }

    // Convert the hash to a color in hexadecimal format
    const color = (hash & 0x00FFFFFF).toString(16).toUpperCase();

    // Pad the color with zeros if needed
    const darkColor = `#${"00000".substring(0, 6 - color.length)}${color}`;

    // Adjust the darkness, you can experiment with the multiplier
    const darkerColor = this.darkenColor(darkColor, 0.3);

    return darkerColor;
  },

  darkenColor(hex, factor) {
    // Convert hex to RGB
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    // Darken the color by a factor (e.g., 0.3)
    const darkenedR = Math.round(r * (1 - factor));
    const darkenedG = Math.round(g * (1 - factor));
    const darkenedB = Math.round(b * (1 - factor));

    // Convert back to hex
    const darkenedHex = `#${darkenedR.toString(16).padStart(2, '0')}${darkenedG.toString(16).padStart(2, '0')}${darkenedB.toString(16).padStart(2, '0')}`;

    return darkenedHex;
  },

  getSubtotal(selectedRows, fieldName) {
    return selectedRows.reduce((sum, item) => { return sum + item[fieldName] }, 0)
  },

  exportCsv(rows, columns) {
    function wrapCsvValue(val, formatFn, row) {
      let formatted = formatFn !== void 0
        ? formatFn(val, row)
        : val

      formatted = formatted === void 0 || formatted === null
        ? ''
        : String(formatted)

      formatted = formatted.split('"').join('""')

      /**
       * Excel accepts \n and \r in strings, but some other CSV parsers do not
       * Uncomment the next two lines to escape new lines
       */
      // .split('\n').join('\\n')
      // .split('\r').join('\\r')

      return `"${formatted}"`
    }

    const content = [columns.map(col => wrapCsvValue(col.label))].concat(
      rows.map(row => columns.map(col => wrapCsvValue(
        typeof col.field === 'function'
          ? col.field(row)
          : row[col.field === void 0 ? col.name : col.field],
        col.format,
        row
      )).join(','))
    ).join('\r\n')

    const status = exportFile(
      'landa-sme.csv',
      "\ufeff" + content,
      'text/csv')

    const $q = useQuasar()
    if (status !== true) {
      $q.notify({
        message: 'Browser denied file download...',
        color: 'negative',
        icon: 'warning'
      })
    }
  },

  separatePhoneNumbers(phoneNumber) {

    function faToEnNumbers(input) {
      // Define a mapping of Persian numerals to English numerals
      const persianToEnglishMap = {
        '۰': '0',
        '۱': '1',
        '۲': '2',
        '۳': '3',
        '۴': '4',
        '۵': '5',
        '۶': '6',
        '۷': '7',
        '۸': '8',
        '۹': '9',
      };

      // Use a regular expression to replace Persian numerals with English numerals
      return input.replace(/[۰-۹]/g, (match) => persianToEnglishMap[match]);
    }
    // Convert Persian numerals to English numerals (as shown in the previous response)
    const convertedPhoneNumber = faToEnNumbers(phoneNumber);

    // Your existing logic to format the phone number based on the number of digits
    if (convertedPhoneNumber.length === 8) {
      return `${convertedPhoneNumber.slice(0, 3)} ${convertedPhoneNumber.slice(3, 6)} ${convertedPhoneNumber.slice(6, 8)}`;
    } else if (convertedPhoneNumber.length === 11) {
      return `${convertedPhoneNumber.slice(0, 4)} ${convertedPhoneNumber.slice(4, 7)} ${convertedPhoneNumber.slice(7, 11)}`;
    } else {
      const formattedNumber = [];
      for (let i = 0; i < convertedPhoneNumber.length; i += 4) {
        formattedNumber.push(convertedPhoneNumber.slice(i, i + 4));
      }
      return formattedNumber.join(' ');
    }
  },

  getFirstChar(str) {
    return str?.charAt(0)
  },

  thumbStyle: {
    left: '4px',
    borderRadius: '5px',
    width: '6px',
    opacity: 0.75
  },

  barStyle: {
    left: '2px',
    width: '8px',
    opacity: 0.2
  }

}
