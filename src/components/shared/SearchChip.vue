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
        {{ $t(`shared.labels.${item.label}`) }}:
        {{ getFormattedValue(item) }}
      </q-chip>
    </template>
  </div>
</template>

<script setup>
  import { computed } from "vue";
  import { helper } from "src/helpers";
  import {
    depositType,
    dateRange,
    taxSentStatus,
  } from "src/constants";
  import { useI18n } from "vue-i18n";

  const { t } = useI18n();

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

  const getFormattedValue = (item) => {
    // Handle enum values translation
    if (item.name === "dateRange") {
      return t(
        `shared.labels.${helper.getEnumType(item.value, dateRange)}`
      );
    } else if (item.name === "depositType") {
      return t(
        `shared.labels.${helper.getEnumType(item.value, depositType)}`
      );
    } else if (item.name === "taxStatus") {
      return t(
        `shared.labels.${helper.getEnumType(
          item.value,
          taxSentStatus
        )}`
      );
    }
    return item.value;
  };
</script>
