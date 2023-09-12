<template>
  <div class="q-gutter-xs">
    <template
      v-for="item in searchItems"
      :key="item.name"
    >
      <q-chip
        removable
        @remove="removeItem(item)"
        color="primary"
        text-color="white"
        icon="search"
      >
        {{ $t(`shared.labels.${item.label}`) }}: {{ $t(`shared.labels.${item.value}`) }}
      </q-chip>
    </template>
  </div>
</template>

<script setup>
import { computed } from "vue"

const props = defineProps({
  searchModel: Object,
  removeItem: Function
})

const searchItems = computed(() => {
  const list = [];
  if (props.searchModel != null)
    Object.keys(props.searchModel).forEach(key => {
      const value = props.searchModel[key]
      if (key && value)
        list.push({ name: key, label: key, value: value })
    })
  return list
})
</script>
