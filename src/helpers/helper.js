export const helper = {
  getEnumOptions(obj) {
    let list = []
    Object.keys(obj).forEach(key => {
      //todo: translate key $t(shared.labels.key)
      list.push({ label: key, value: obj[key] })
    })
    return list
  },
}
