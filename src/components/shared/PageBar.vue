<template>
  <q-card-actions
    v-if="showPagebar"
    class="row justify-between dark-1 q-px-md q-py-md"
  >
    <q-pagination
      v-if="showPaging"
      v-model="paginationStore.currentPage"
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
      v-model="pagination.pageSize"
      :options="[5, 10, 20]"
      @update:model-value="handlePageChange"
      transition-show="flip-up"
      transition-hide="flip-down"
      popup-content-class="text-caption text-weight-medium text-grey-8"
    />
  </q-card-actions>
</template>

<script setup>
import { ref, onMounted, computed } from "vue"
import { usePaginationStore } from "src/stores/page-store.js"

const props = defineProps({
  pagination: Object,
  currentPage: Number,
  storeName: String
})

const paginationStore = usePaginationStore(props.storeName)

const pagination = ref(props.pagination)
const defaultPageSize = 5

const showPagebar = computed(() => {
  return pagination.value.totalItems > defaultPageSize
})

const showPaging = computed(
  () => pagination.value.totalItems > pagination.value.pageSize
)
const maxPage = computed(() =>
  Math.ceil(pagination.value.totalItems / pagination.value.pageSize)
)

const emit = defineEmits(["page-changed"])
function handlePageChange() {
  emit("page-changed", pagination.value)
}
</script>
