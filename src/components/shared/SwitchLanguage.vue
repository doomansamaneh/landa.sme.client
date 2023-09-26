<template>
  <q-btn-dropdown
    no-caps
    icon="language"
    :label="cultureStore.culture.value.name"
    :options="cultures"
    class="lang-switcher text-primary text-bold"
    auto-close
  >
    <q-item-section class="z-max">
      <q-item
        class="z-max"
        clickable
        v-for="(lang, index) in cultures"
        :key="index"
      >
        <q-item-section @click="switchLanguage(lang.code)">
          <q-item-label>{{ lang.name }}</q-item-label>
        </q-item-section>
        <q-item-section v-if="cultureStore.culture.value.code === lang.code">
          <q-icon
            name="done"
            color="primary"
            size="xs"
            right
          ></q-icon>
        </q-item-section>
      </q-item>
    </q-item-section>
  </q-btn-dropdown>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue"
import { cultures } from "src/constants/enums"
import { useCulture } from "src/composables/useCulture";
import { useI18n } from "vue-i18n"

const cultureStore = useCulture()

//const { locale } = useI18n({ useScope: "global" })

function switchLanguage(code) {
  //locale.value = code
  cultureStore.setCulture(code)
}

// watch(locale, (newValue) => {
//   localStorage.setItem("selectedLanguage", newValue)
// })

// onMounted(() => {
//   setDigits()
// })

// function setDigits() {
//   document.body.classList.add(`digits--${cultureStore.culture.value.code}`)
// }

</script>
