<template>
  <div class="q-gutter-xs" v-if="searchItems?.length > 0">
    <template v-for="item in searchItems" :key="item.name">
      <q-chip
        v-if="showChip(item)"
        removable
        @remove="removeItem(item)"
        color="primary"
        text-color="white"
        icon="search"
      >
        {{ $t(`shared.labels.${item.label}`) }}: {{ item.value }}
      </q-chip>
    </template>
  </div>
</template>

<script setup>
  import { computed } from "vue";
  import { helper } from "src/helpers";

  const props = defineProps({
    searchModel: Object,
    removeItem: Function,
  });

  const searchItems = computed(() => {
    const list = [];
    if (props.searchModel != null)
      Object.keys(props.searchModel).forEach((key) => {
        const value = props.searchModel[key];
        if (key && value)
          list.push({ name: key, label: key, value: value });
      });
    return list;
  });

  const showChip = (item) => {
    if (Array.isArray(item.value)) {
      return item.value.length;
    } else return !helper.isGuid(item.value);
  };
</script>
