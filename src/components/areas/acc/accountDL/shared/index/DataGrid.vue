<template>
  <data-grid
    ref="dataGrid"
    data-source="acc/accountDL/getGridData"
    :title="$t('main-menu-items.Acc_AccountDL_View')"
    :grid-store="gridStore"
    create-url="/acc/accountDL/create"
    separator="horizontal"
    flat_
    multiSelect
    numbered
    bordered
    wrapCells
    dense_
    expandable
  >
    <template #filter-typeId="{ item }">
      <custom-select
        v-model="item.value"
        :options="
          helper.getEnumOptions(accountDLType, 'accountDLType')
        "
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

    <template #cell-isActive="{ item }">
      <is-active :is-active="item.isActive" />
    </template>

    <template #cell-code="{ item }">
      {{ item.code }}
      <small v-if="item.syncCode">({{ item.syncCode }})</small>
    </template>
    <template #cell-debitRemained="{ item }">
      {{ item.debitRemained.toLocaleString() }}
    </template>
    <template #cell-creditRemained="{ item }">
      {{ item.creditRemained.toLocaleString() }}
    </template>
    <template #cell-typeId="{ item }">
      {{
        $t(
          `shared.accountDLType.${helper.getEnumType(
            item.typeId,
            accountDLType
          )}`
        )
      }}
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
      <preview :item="item" inside />
    </template>
  </data-grid>
</template>

<script setup>
  import { ref, computed } from "vue";
  import { isActiveOptions } from "src/constants";

  import { helper } from "src/helpers";
  import { accountDLType } from "src/constants";
  import { useBaseInfoGrid } from "src/components/areas/_shared/_composables/useBaseInfoGrid";
  import { accountDLColumns } from "src/components/areas/acc/_composables/constants";

  import RowToolBar from "src/components/shared/RowToolBar.vue";
  import CustomSelect from "src/components/shared/forms/CustomSelect.vue";
  import DataGrid from "src/components/shared/dataTables/desktop/DataGrid.vue";
  import Preview from "../preview/IndexView.vue";
  import IsActive from "src/components/shared/IsActive.vue";

  const gridStore = useBaseInfoGrid({
    columns: accountDLColumns,
    sortColumn: "code",
  });

  const dataGrid = ref(null);

  async function reloadData() {
    await tableStore.value.reloadData();
  }

  const tableStore = computed(() => dataGrid?.value?.tableStore);

  defineExpose({
    tableStore,
  });
</script>
