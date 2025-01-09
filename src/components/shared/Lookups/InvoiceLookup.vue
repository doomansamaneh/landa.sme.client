<template>
  <lookup-view
    ref="lookup"
    dataSource="sls/invoice/getDocLookupData"
    sortColumn="no"
    textTemplate="{{ no }} - {{ customerName }}"
    searchField="no"
    columns="no,customerName,subject"
  >
    <template #thead-index>
      <div>#</div>
    </template>

    <template #thead-cols="{ tableStore }">
      <div class="col-2">
        <header-column
          fieldName="no"
          title="شماره"
          :table-store="tableStore"
        />
      </div>

      <div class="col-3">
        <header-column
          fieldName="customerName"
          title="مخاطب"
          :table-store="tableStore"
        />
      </div>
      <div class="col">
        <header-column
          fieldName="subject"
          title="شرح"
          :table-store="tableStore"
        />
      </div>
    </template>

    <template #tbody-index="{ index }">
      <div>{{ index + 1 }}</div>
    </template>

    <template #tbody-cols="{ item }">
      <div class="col-2">
        <span class="q-mr-sm text-body2 no-letter-spacing">
          {{ item.no }}
        </span>
      </div>
      <div class="col-3">
        <span class="text-body2 no-letter-spacing">
          {{ item.customerName }}
        </span>
      </div>
      <div class="col">
        <span class="text-body2 no-letter-spacing">
          {{ item.subject }}
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
