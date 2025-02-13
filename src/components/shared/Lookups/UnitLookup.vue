<template>
  <lookup-view
    ref="lookup"
    dataSource="org/unit/getlookupData"
    sortColumn="code"
    textTemplate="{{ code }} {{ title }}"
    searchField="title"
    columns="code,title"
  >
    <template #thead-index>
      <div>#</div>
    </template>

    <template #thead-cols="{ tableStore }">
      <div style="width: 15%">
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
      <div style="width: 15%">{{ item.code }}</div>
      <div class="col">
        <span class="text-body2">
          {{ item.title }}
        </span>
      </div>
    </template>
  </lookup-view>
</template>

<script setup>
  import { ref } from "vue";

  import LookupView from "src/components/shared/dataTables/LookupView.vue";
  import HeaderColumn from "src/components/shared/lookups/_HeaderColumn.vue";

  const lookup = ref(null);

  defineExpose({
    lookup,
  });
</script>
