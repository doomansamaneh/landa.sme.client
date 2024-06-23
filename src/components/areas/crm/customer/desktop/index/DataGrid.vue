<template>
  <data-grid
    ref="dataGrid"
    :data-source="dataSource"
    :grid-store="gridStore"
    separator="horizontal"
    flat_
    multiSelect
    numbered
    bordered
    wrapCells
    dense_
    expandable
    @row-dbl-click="gotoPreview"
  >
    <template #filter-typeId="{ item }">
      <custom-select
        v-model="item.value"
        :options="helper.getEnumOptions(customerType, 'customerType')"
        @update:model-value="reloadData"
      />
    </template>

    <template #filter-isActive="{ item }">
      <custom-select
        v-model="item.value"
        :options="isActiveOptions"
        @update:model-value="reloadData"
      />
    </template>

    <template #cell-typeId="{ item }">
      {{
        $t(
          `shared.customerType.${helper.getEnumType(
            item.typeId,
            customerType
          )}`
        )
      }}
    </template>

    <template #cell-isActive="{ item }">
      <is-active :is-active="item.isActive" />
    </template>

    <template #cell-actions="{ item }">
      <row-tool-bar
        :base-route="baseRoute"
        :item="item"
        :table-store="tableStore"
        :crud-store="crudStore"
      />
    </template>

    <template #expand="{ item }">
      <div class="q-pa-md">
        <customer-preview :item="item" />
      </div>
    </template>
  </data-grid>
</template>

<script setup>
  import { ref, computed } from "vue";
  import { useRouter } from "vue-router";
  import { helper } from "src/helpers";
  import { isActiveOptions, customerType } from "src/constants";

  import RowToolBar from "src/components/shared/RowToolBar.vue";
  import CustomSelect from "src/components/shared/forms/CustomSelect.vue";
  import DataGrid from "src/components/shared/dataTables/desktop/DataGrid.vue";
  import CustomerPreview from "components/areas/crm/customer/shared/preview/IndexView.vue";
  import IsActive from "src/components/shared/IsActive.vue";

  const props = defineProps({
    gridStore: Object,
    crudStore: Object,
    dataSource: String,
    baseRoute: String,
  });

  const router = useRouter();
  const dataGrid = ref(null);

  async function reloadData() {
    await tableStore.value.reloadData();
  }

  const tableStore = computed(() => dataGrid?.value?.tableStore);

  function gotoPreview(row) {
    router.push(`/crm/customer/preview/${row.id}`);
  }

  defineExpose({
    tableStore,
  });
</script>
