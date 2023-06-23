<template>
  <div class="flex justify-between items-center q-px-xs">
    <q-toggle
      color="blue-8"
      v-model="darkMode"
      unchecked-icon="light_mode"
      checked-icon="dark_mode"
    />
    <div class="q-gutter-x-xs">
      <q-icon
        name="circle"
        size="xs"
        color="primary"
        class="cursor-pointer"
        icon="format_paint"
      />
      <q-icon name="circle" size="xs" color="green" class="cursor-pointer" />
      <q-icon name="circle" size="xs" color="red" class="cursor-pointer" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue"
import { useQuasar } from "quasar"

const $q = useQuasar()

const darkMode = ref(false)

watch(darkMode, (newVal) => {
  $q.dark.set(newVal ? "auto" : false)
  localStorage.setItem("darkMode", newVal)
})

onMounted(() => {
  const darkModeisActive = localStorage.getItem("darkMode")
  if (darkModeisActive === "true") {
    darkMode.value = true
  }
})
</script>
