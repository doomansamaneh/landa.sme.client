<template>
  <q-card-actions class="fit row justify-end items-center q-pa-none">
    <span class="text-caption q-pr-lg">{{ indexRange }} از {{ paged.totalItems.toLocaleString() }}</span>
    <q-pagination
      v-if="showPaging"
      v-model="paged.currentPage"
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
      padding="3px 2px 1px 2px"
      round
      color="grey-8"
      active-color="primary"
      size="13px"
      class="pagination"
    />
    <q-space />
    <q-select
      dense
      class="select"
      outlined
      v-model="paged.pageSize"
      :options="pageSizeOptions"
      @update:model-value="handlePageChange"
      transition-show="flip-up"
      transition-hide="flip-down"
      popup-content-class="text-caption text-weight-medium text-grey-8"
    />
  </q-card-actions>
</template>

<script setup>
import { computed } from "vue"

const props = defineProps({
  pagination: Object
})

const paged = computed(() => props.pagination)

const showPaging = computed(() => paged.value.totalItems > paged.value.pageSize)

const maxPage = computed(() =>
  Math.ceil(paged.value.totalItems / paged.value.pageSize)
)

const pageSizeOptions = computed(() => {
  let options = [5]
  if (paged.value.totalItems > 5) options.push(10)
  if (paged.value.totalItems > 10) options.push(25)
  if (paged.value.totalItems > 25) options.push(50)
  if (paged.value.totalItems > 50) options.push(100)
  return options
})

const indexRange = computed(() => {
  const startIdx = (paged.value.currentPage - 1) * paged.value.pageSize + 1
  const endIdx = Math.min(
    startIdx + paged.value.pageSize - 1,
    paged.value.totalItems
  )
  return `${startIdx} - ${endIdx}`
})

const emit = defineEmits(["page-changed"])
function handlePageChange(val) {
  emit("page-changed")
}
</script>