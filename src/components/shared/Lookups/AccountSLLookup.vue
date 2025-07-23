<template>
  <lookup-view
    dataSource="acc/accountSL/getlookupData"
    textTemplate="{{code}} - {{ title }}"
    columns="code,title"
    sortColumn="code"
    :filterExpression="filterExpression"
    ref="lookup"
  >
    <template #thead-index>
      <div>#</div>
    </template>

    <template #thead-cols="{ tableStore }">
      <div style="width: 16%">
        <header-column
          fieldName="code"
          :title="$t('shared.columns.code')"
          :table-store="tableStore"
        />
      </div>
      <div class="col">
        <header-column
          fieldName="title"
          :title="$t('shared.columns.title')"
          :table-store="tableStore"
        />
      </div>
    </template>

    <template #tbody-index="{ index }">
      <div>{{ index + 1 }}</div>
    </template>

    <template #tbody-cols="{ item }">
      <div style="width: 16%">{{ item.code }}</div>
      <div class="col">
        <span class="q-mr-sm text-body2">
          {{ item.title }}
        </span>
        <small class="text-body3">({{ item.glTitle }})</small>
      </div>
    </template>
  </lookup-view>
</template>

<script setup>
  import { ref } from "vue";
  import { useI18n } from "vue-i18n";

  import LookupView from "src/components/shared/dataTables/LookupView.vue";
  import HeaderColumn from "src/components/shared/lookups/_HeaderColumn.vue";

  const { t } = useI18n();

  const props = defineProps({
    filterExpression: Array,
  });

  const lookup = ref(null);

  defineExpose({
    lookup,
  });
</script>
