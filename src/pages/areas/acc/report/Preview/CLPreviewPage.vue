<template>
  <index-view />
</template>

<script setup>
import IndexView from "src/components/areas/acc/report/shared/CLPreview/IndexView.vue";


const props = defineProps({
  dataSource: String,
  columns: Array,
  title: String
})
</script>
