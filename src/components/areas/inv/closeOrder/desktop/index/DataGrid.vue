<template>
  <q-card bordered>
    <div class="row justify-between primary-gradient-1">
      <div class="row items-center q-px-md">
        <q-avatar
          rounded
          text-color="white"
          size="md"
          icon="o_subject"
          class="primary-gradient primary-shadow"
        />
        <card-title v-if="title" :title="title" />
      </div>
      <data-grid-toolbar
        class="q-pa-md"
        :table-store="tableStore"
        :baseRoute="baseRoute"
      />
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
  import CardTitle from "src/components/shared/CardTitle.vue";
  import DataGridToolbar from "components/shared/dataTables/desktop/DataGridToolbar.vue";

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
