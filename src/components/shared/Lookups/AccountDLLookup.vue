<template>
  <lookup-view
    ref="lookup"
    dataSource="acc/accountDL/getlookupData"
    sortColumn="code"
    textTemplate="{{ code }} - {{ title }}"
    columns="code,title"
    :filterExpression="filterExpression"
  >
    <template #thead-index>
      <div>#</div>
    </template>

    <template #thead-cols="{ tableStore }">
      <div style="width: 16%">
        <header-column
          fieldName="code"
          title="کد"
          :table-store="tableStore"
        />
      </div>
      <div class="col">
        <header-column
          fieldName="title"
          title="عنوان"
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
  import HeaderColumn from "src/components/shared/lookups/_HeaderColumn.vue";

  const props = defineProps({
    filterExpression: Array,
  });

  const lookup = ref(null);
  const test = () => {
    alert("dl lookup");
  };

  defineExpose({
    lookup,
    test,
  });
</script>
