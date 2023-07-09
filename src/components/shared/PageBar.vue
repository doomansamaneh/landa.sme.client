<template>
  <div class="pagination col-8 flex items-center">
    <q-pagination
      v-if="showPaging"
      v-model="currentPage"
      :min="1"
      :max="maxPage"
      direction-links
      boundary-links
      icon-first="keyboard_double_arrow_left"
      icon-last="keyboard_double_arrow_right"
      icon-prev="chevron_left"
      icon-next="chevron_right"
      @update:model-value="handlePageChange"
      gutter="xs"
      padding="2px 4px 2px 4px"
      round
      color="grey-8"
      active-color="primary"
    />
  </div>
</template>

<script setup>
import { ref, computed, emit } from "vue"

const currentPage = ref(1)
const pageSize = ref(5)
const totalItems = ref(0)

const showPaging = computed(() => totalItems.value > pageSize.value)
const maxPage = computed(() => Math.ceil(totalItems.value / pageSize.value))

function handlePageChange(page) {
  currentPage.value = page
  emit("page-change", page)
}
</script>
