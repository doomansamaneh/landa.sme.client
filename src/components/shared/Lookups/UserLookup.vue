<template>
  <lookup-view
    ref="lookup"
    auto-focus
    dataSource="scr/users/getlookupData"
    sortColumn="loginName"
    textTemplate="{{ loginName }} / {{ name }}"
    columns="loginName,name"
    :filterExpression="filterExpression"
  >
    <template #thead-index>
      <div>#</div>
    </template>

    <template #thead-cols="{ tableStore }">
      <div class="col">
        <header-column
          fieldName="loginName"
          :title="$t('shared.columns.loginName')"
          :table-store="tableStore"
        />
      </div>
      <div class="col">
        <header-column
          fieldName="name"
          :title="$t('shared.columns.name')"
          :table-store="tableStore"
        />
      </div>
    </template>

    <template #tbody-index="{ index }">
      <div>{{ index + 1 }}</div>
    </template>

    <template #tbody-cols="{ item }">
      <div class="col">{{ item.loginName }}</div>
      <div class="col">
        {{ item.name }}
      </div>
    </template>
  </lookup-view>
</template>

<script setup>
  import { ref } from "vue";
  import { helper } from "src/helpers";

  import LookupView from "src/components/shared/dataTables/LookupView.vue";
  import HeaderColumn from "src/components/shared/lookups/_HeaderColumn.vue";

  const props = defineProps({
    filterExpression: Array,
  });

  const lookup = ref(null);

  defineExpose({
    lookup,
  });
</script>
