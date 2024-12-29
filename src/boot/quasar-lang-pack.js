// -- With @quasar/app-vite --

import { Quasar } from "quasar"

// relative path to your node_modules/quasar/..
// change to YOUR path
const langList = import.meta.glob(
  "../../node_modules/quasar/lang/{en-US,fa-IR,ar}.js"
)
// or just a select few (example below with only DE and FR):
// import.meta.glob('../../node_modules/quasar/lang/(de|fr).mjs')

export default async () => {
  const langIso = localStorage.getItem("selectedLanguage") || "fa-IR" // ... some logic to determine it (use Cookies Plugin?)

  try {
    langList[`../../node_modules/quasar/lang/${langIso}.js`]().then((lang) => {
      Quasar.lang.set(lang.default)
    })
  } catch (err) {
    // Requested Quasar Language Pack does not exist,
    // let's not break the app, so catching error
  }
}
