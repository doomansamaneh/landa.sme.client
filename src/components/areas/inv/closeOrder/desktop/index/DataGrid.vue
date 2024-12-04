<template>
  <q-card bordered>
    <div class="row justify-between primary-gradient-1">
      <div class="row items-center q-px-md">
        <custom-tab
          behavior="heading"
          :title="title"
          icon="o_subject"
        />
      </div>
    </div>

    <q-separator size="1px" />

    <data-grid
      ref="dataGrid"
      :data-source="dataSource"
      :grid-store="gridStore"
      separator="horizontal"
      multiSelect
      numbered
      flat
      bordered_
      toolbar
      wrapCells
      dense
      expandable
    >
      <template #cell-amount="{ item }">
        {{ helper.formatNumber(item.amount) }}
      </template>
      <template #cell-date="{ item }">
        {{ item.date?.substring(0, 10) }}
      </template>

      <template #expand="{ item }">
        <preview inside :item="item" />
      </template>

      <template #footer-subtotal="{ selectedRows }">
        <td :colspan="colspan" class="text-right">
          {{ $t("shared.labels.selectedRows") }}
        </td>
        <td>
          <b>
            {{
              helper.formatNumber(
                helper.getSubtotal(selectedRows, "amount")
              )
            }}
          </b>
        </td>
        <td colspan="100%"></td>
      </template>
    </data-grid>
  </q-card>
</template>

<script setup>
  import { ref, computed } from "vue";
  import { helper } from "src/helpers";

  import DataGrid from "src/components/shared/dataTables/desktop/DataGrid.vue";
  import Preview from "../../shared/preview/IndexView.vue";
  import CustomTab from "src/components/shared/CustomTab.vue";

  const props = defineProps({
    gridStore: Object,
    crudStore: Object,
    dataSource: String,
    baseRoute: String,
    title: String,
  });

  const dataGrid = ref(null);

  const tableStore = computed(() => dataGrid?.value?.tableStore);

  const colspan = computed(
    () =>
      tableStore?.value?.columns.value.findIndex(
        (column) => column.name === "amount"
      ) +
      1 + //numbered column
      1 //multi check column
  );

  defineExpose({
    tableStore,
  });
</script>
