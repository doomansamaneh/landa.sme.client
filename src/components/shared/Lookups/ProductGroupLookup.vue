<template>
  <lookup-view
    dataSource="cmn/productGroup/getlookupData"
    v-model:selectedId="selectedId"
    v-model:selectedText="selectedText"
    orderByField="code"
    columns="code,title"
    textTemplate="{{code}} - {{ title }}"
    searchField="title"
    ref="lookup"
  >
    <template #thead>
      <div class="row items-center q-gutter-x-md">
        <div class="col-1">#</div>
        <div class="col">
          <header-column
            fieldName="code"
            :title="$t('shared.labels.code')"
            :lookup="lookup"
          />
        </div>
        <div class="col">
          <header-column
            fieldName="title"
            :title="$t('shared.labels.title')"
            :lookup="lookup"
          />
        </div>
        <q-btn
          dense
          unelevated
          color="primary"
          class="absolute-top-right q-py-xs q-px-sm q-mr-sm"
          style="margin-top: 12px"
          rounded
          size="12px"
        >
          <q-icon name="o_add" size="14px" style="margin-left: 2px" />
          <span class="text-caption">ایجاد</span>
        </q-btn>
      </div>
    </template>

    <template #td="{ row, index }">
      <q-item clickable v-close-popup>
        <div class="row items-center q-gutter-x-md">
          <div class="col-1 text-caption">{{ index }}</div>
          <div class="col text-caption">{{ row.code }}</div>
          <div class="col text-caption">{{ row.title }}</div>
        </div>
      </q-item>
    </template>
  </lookup-view>
</template>

<script setup>
import { ref } from "vue";

import LookupView from "src/components/shared/dataTables/LookupView.vue";
import HeaderColumn from "src/components/shared/lookups/HeaderColumn.vue";

const lookup = ref(null);

// const selectedId = defineModel("selectedId");
// const selectedText = defineModel("selectedText");

defineExpose({
  lookup,
});
</script>
