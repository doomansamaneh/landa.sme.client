<template>
  <q-card-actions class="fit row justify-start items-center q-pa-none">
    <slot name="reload"></slot>
    <span
      v-if="showPageCount"
      class="text-caption q-pr-lg"
    >
      {{ indexRange }} {{ $t("shared.labels.from") }} {{ paged.totalItems }}
    </span>
    <!-- //todo: use css class instead of styling size and padding -->
    <q-pagination
      v-if="showPaging"
      v-model="paged.currentPage"
      min="1"
      :max="max"
      :max-pages="maxPages"
      ellipses
      boundary-numbers
      direction-links
      boundary-links
      icon-first="keyboard_double_arrow_left"
      icon-last="keyboard_double_arrow_right"
      icon-prev="chevron_left"
      icon-next="chevron_right"
      gutter="xs"
      round
      padding="3px 2px 1px 2px"
      size="13px"
      color="grey-8"
      active-color="primary"
      class="pagination"
      @update:model-value="handlePageChange"
    />
    <template v-if="sizeSeletion">
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
    </template>
  </q-card-actions>
</template>

<script setup>
import { computed } from "vue"

const props = defineProps({
  pagination: Object,
  sizeSeletion: Boolean,
  showPageCount: Boolean,
  maxPages: Number
})

const paged = computed(() => props.pagination)

const showPaging = computed(() => paged.value.totalItems > paged.value.pageSize)

const max = computed(() =>
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
