<template>
  <q-card bordered>
    <card-title :title="title" />
    <q-card-section class="q-px-none">
      <data-grid
        ref="dataGrid"
        :data-source="dataSource"
        :grid-store="gridStore"
        separator="horizontal"
        flat
        multiSelect
        numbered
        bordered_
        expandable
      >
        <template #filter-isActive="{ item }">
          <custom-select
            v-model="item.value"
            :options="
              helper.getEnumOptions(
                isActiveOptions,
                'isActiveOptions'
              )
            "
            @update:model-value="reloadData"
          />
        </template>

        <template #cell-isActive="{ item }">
          <is-active :is-active="item.isActive" />
        </template>

        <template #cell-income="{ item }">
          {{ helper.formatNumber(item.income) }}
        </template>
        <template #cell-no="{ item }">
          {{ item.no }}
          <div v-if="item.taxCode">
            <small class="caption-on-dark">
              tax: {{ item.taxCode }}
            </small>
          </div>
        </template>
        <template #cell-expense="{ item }">
          {{ helper.formatNumber(item.expense) }}
        </template>
        <template #cell-netIncome="{ item }">
          {{ helper.formatNumber(item.netIncome) }}
        </template>
        <template #cell-startDate="{ item }">
          {{ item.startDate?.substring(0, 10) }}
        </template>
        <template #cell-finishDate="{ item }">
          {{ item.finishDate?.substring(0, 10) }}
        </template>

        <template #expand="{ item }">
          <preview inside :item="item" />
        </template>

        <template #cell-actions="{ item }">
          <row-tool-bar
            :base-route="baseRoute"
            :item="item"
            :table-store="tableStore"
            :crud-store="crudStore"
          />
        </template>
      </data-grid>
    </q-card-section>
  </q-card>
</template>

<script setup>
  import { ref, computed } from "vue";
  import { helper } from "src/helpers";
  import { isActiveOptions } from "src/constants";

  import RowToolBar from "src/components/shared/RowToolBar.vue";
  import CustomSelect from "src/components/shared/forms/CustomSelect.vue";
  import DataGrid from "src/components/shared/dataTables/desktop/DataGrid.vue";
  import IsActive from "src/components/shared/IsActive.vue";
  import Preview from "../../shared/preview/IndexView.vue";
  import CardTitle from "src/components/shared/CardTitle.vue";

  const props = defineProps({
    gridStore: Object,
    crudStore: Object,
    dataSource: String,
    baseRoute: String,
    title: String,
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
