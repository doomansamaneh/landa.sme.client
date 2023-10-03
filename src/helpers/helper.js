import { useI18n } from "vue-i18n"
import { exportFile, useQuasar } from "quasar"

export const helper = {
  getEnumOptions(obj) {
    const { t } = useI18n()
    let list = []
    Object.keys(obj).forEach(key => {
      const label = t(`shared.labels.${key}`)
      list.push({ label: label, value: obj[key] })
    })
    return list
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
  }
}



