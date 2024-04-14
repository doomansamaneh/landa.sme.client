<template>
  <q-icon
    v-if="showSortIcon"
    :name="isAscending ? 'arrow_drop_up' : 'arrow_drop_down'"
    size="20px"
    color="primary"
  />
  <span @click="sortColumn" class="text-body3 no-letter-spacing text-bold cursor-pointer">
    {{ title }}
  </span>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  title: String,
  fieldName: String,
  tableStore: Object,
});

function sortColumn() {
  props.tableStore.sortColumn({ name: props.fieldName, sortable: true });
}

const isAscending = computed(
  () => props.tableStore.pagination.value.sortOrder === 1
);

const showSortIcon = computed(
  () => props.tableStore.pagination.value.sortColumn === props.fieldName
);
</script>
