<template>
  <q-card-actions
    v-if="showPagebar"
    class="row justify-between dark-1 q-px-md q-py-md"
  >
    <span>{{ paged.totalItems.toLocaleString() }}</span>
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
      class="paged"
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
  pagination: Object,
})

const defaultPageSize = 5

const showPagebar = computed(() => paged.value.totalItems > defaultPageSize)

const paged = computed(() => props.pagination)

const showPaging = computed(() => paged.value.totalItems > paged.value.pageSize)

const maxPage = computed(() => Math.ceil(paged.value.totalItems / paged.value.pageSize))

const pageSizeOptions = computed(() => {
  let options = [5]
  if (paged.value.totalItems > 5) options.push(10)
  if (paged.value.totalItems > 10) options.push(25)
  if (paged.value.totalItems > 25) options.push(50)
  if (paged.value.totalItems > 50) options.push(100)
  return options
})

const emit = defineEmits(["page-changed"])
function handlePageChange() {
  emit("page-changed")
}
</script>
