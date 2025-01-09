<template>
  <lookup-view
    ref="lookup"
    dataSource="cmn/productGroup/getlookupData"
    v-model:selectedId="selectedId"
    v-model:selectedText="selectedText"
    sortColumn="code"
    columns="code,title"
    textTemplate="{{code}} - {{ title }}"
    searchField="title"
  >
    <template #thead-index>
      <div>#</div>
    </template>

    <template #thead-cols="{ tableStore }">
      <div style="width: 20%">
        <header-column
          fieldName="no"
          :title="$t('shared.labels.code')"
          :table-store="tableStore"
        />
      </div>
      <div class="col">
        <header-column
          fieldName="title"
          :title="$t('shared.labels.title')"
          :table-store="tableStore"
        />
      </div>
    </template>

    <template #tbody-index="{ index }">
      <div>{{ index + 1 }}</div>
    </template>

    <template #tbody-cols="{ item }">
      <div style="width: 20%">{{ item.code }}</div>
      <div class="col">
        <span class="q-mr-sm text-body2 no-letter-spacing">
          {{ item.title }}
        </span>
      </div>
    </template>
  </lookup-view>
</template>

<script setup>
  import { ref } from "vue";

  import LookupView from "src/components/shared/dataTables/LookupView.vue";

  const lookup = ref(null);

  defineExpose({
    lookup,
  });
</script>
