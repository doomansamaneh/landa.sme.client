<template>
  <q-icon
    v-if="showSortIcon"
    :name="isAscending ? 'arrow_drop_up' : 'arrow_drop_down'"
    size="20px"
    color="primary"
  />
  <span
    @click="sortColumn"
    class="cursor-pointer"
  >{{ title }}</span>
</template>

<script setup>
import { computed } from "vue"

const props = defineProps({
  title: String,
  fieldName: String,
  lookup: Object
})

function sortColumn() {
  props.lookup.tableStore.sortColumn({ name: props.fieldName, sortable: true })
}

const isAscending = computed(() => props.lookup.tableStore.pagination.value.sortOrder === 1)
const showSortIcon = computed(() => props.lookup.tableStore.pagination.value.sortColumn === props.fieldName)
</script>
