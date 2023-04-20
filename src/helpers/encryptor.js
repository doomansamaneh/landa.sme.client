export const encryptor = {
  encrypt(str) {
    if (!str) str = ""
    str = str == "undefined" || str == "null" ? "" : str
    try {
      const key = 146
      let pos = 0
      let ostr = ""
      while (pos < str.length) {
        ostr = ostr + String.fromCharCode(str.charCodeAt(pos) ^ key)
        pos += 1
      }
      return ostr
    } catch (ex) {
      console.log(ex)
      return ""
    }
  },
  decrypt(text) {}
}
