<template>
  <q-input
    outlined
    dense
    v-model="value"
    mask="date"
    clearable
    clear-icon="clear"
    :label="label"
    :placeholder="placeholder"
    class="text-caption"
    style="width: 195px;"
  >
    <template v-slot:append>
      <q-icon
        name="event"
        class="cursor-pointer"
      >
        <q-popup-proxy
          cover
          transition-show="scale"
          transition-hide="scale"
        >
          <q-date
            v-model="value"
            :calendar="calendar"
            today-btn
          />
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps(['modelValue', 'placeholder', 'label'])
const emit = defineEmits(['update:modelValue'])

const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})

const calendar = computed(() => culture.value.calendar)
//todo: remove this property to a general composable to be accessable every where
const culture = computed(() => {
  const currentLanguage = localStorage.getItem("selectedLanguage") || "fa-IR"
  const defaultCulture = { name: "en", calendar: "gregorian", title: "English", flag: "" }
  //todo: [DRY]: remove langs to constants,
  // use in languageStting
  // also, you could add other language specefic properties such as digits, ... to this object and use it, so u can delete extra if, then else
  // and your code is more clean
  const cultures = [
    { name: "fa-IR", calendar: "persian", title: "فارسی", flag: "" },
    { name: "fa", calendar: "persian", title: "فارسی", flag: "" },
    { name: "ar", calendar: "hijri", title: "العربیة", flag: "" }
  ]
  return cultures.filter((c) => c.name === currentLanguage)[0] ?? defaultCulture
})
</script>
