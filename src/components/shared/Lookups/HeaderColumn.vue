<template>
  <q-icon
    v-if="showSortIcon"
    :name="isAscending ? 'arrow_drop_up' : 'arrow_drop_down'"
    size="20px"
    color="primary"
  />
  <span @click="sortColumn()" class="cursor-pointer">{{ title }}</span>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue"

const props = defineProps({
  title: String,
  fieldName: String,
  lookup: Object
})

function sortColumn() {
  props.lookup.sortSelectedColumn(props.fieldName)
}

const isAscending = computed(() => !props.lookup.pagination.descending)
const showSortIcon = computed(
  () => props.lookup.pagination.sortBy === props.fieldName
)
</script>
