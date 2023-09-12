import { useI18n } from "vue-i18n"

export const helper = {
  getEnumOptions(obj) {
    const { t } = useI18n();
    let list = []
    Object.keys(obj).forEach(key => {
      const label = t(`shared.labels.${key}`);
      list.push({ label: label, value: obj[key] })
    })
    return list
  },
  getSubtotal(selectedRows, fieldName) {
    return selectedRows.reduce((sum, item) => { return sum + item[fieldName] }, 0)
  }
}
