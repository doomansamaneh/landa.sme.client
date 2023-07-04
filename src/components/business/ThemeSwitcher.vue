<template>
  <div class="flex justify-between items-center q-px-xs">
    <q-toggle color="blue-8" v-model="darkMode" unchecked-icon="light_mode" checked-icon="dark_mode" />
    <div class="q-gutter-x-xs">
      <q-icon name="circle" size="xs" color="blue-5" class="cursor-pointer" icon="format_paint"
        @click="selectTheme('blue')" />
      <q-icon name="circle" size="xs" color="green" class="cursor-pointer" @click="selectTheme('green')" />
      <q-icon name="circle" size="xs" color="orange" class="cursor-pointer" @click="selectTheme('orange')" />
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted, watch } from "vue"
  import { useQuasar } from "quasar"

  const $q = useQuasar()

  const darkMode = ref(false)
  const selectedTheme = ref("")

  // const changeMode = (value) => {
  //   quasar.dark.set(value ? "auto" : false)
  //   localStorage.setItem("darkMode", value)
  // }

  watch(darkMode, (newVal) => {
    //$q.dark.set(value ? "auto" : false)
    if (newVal) {
      document.body.classList.remove(`body--light`)
      document.body.classList.add(`body--dark`)
    }
    else {
      document.body.classList.remove(`body--dark`)
      document.body.classList.add(`body--light`)
    }
    localStorage.setItem("darkMode", newVal)
  })

  onMounted(() => {
    const darkModeisActive = localStorage.getItem("darkMode")
    if (darkModeisActive === "true") {
      darkMode.value = true
    }

    const storedTheme = localStorage.getItem("selectedTheme")
    if (storedTheme) {
      selectTheme(storedTheme)
    }
  })

  const selectTheme = (theme) => {
    if (selectedTheme.value) {
      document.body.classList.remove(`theme--${selectedTheme.value}`)
    }
    document.body.classList.add(`theme--${theme}`)
    selectedTheme.value = theme
    localStorage.setItem("selectedTheme", theme)
  }
</script>
<style></style>