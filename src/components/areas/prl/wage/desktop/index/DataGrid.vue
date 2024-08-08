<template>
  <q-card bordered>
    <q-card-section class="text-center">
      <h6 class="text-weight-700 no-letter-spacing">
        {{ title }}
      </h6>
    </q-card-section>
    <q-separator />
    <q-card-section class="q-px-none">
      <data-grid
        ref="dataGrid"
        :base-route="baseRoute"
        :data-source="dataSource"
        :title="$t('main-menu-items.Prl_Wage_View')"
        :create-url="`/${baseRoute}/create`"
        :grid-store="gridStore"
        @row-dbl-click="rowDblClick"
        expandable
        flat
        toolbar
      >
        <template #cell-amount="{ item }">
          {{ item.amount?.toLocaleString() }}
        </template>
        <template #cell-taxAmount="{ item }">
          {{ item.taxAmount?.toLocaleString() }}
        </template>
        <template #cell-insurranceAmount="{ item }">
          {{ item.insurranceAmount?.toLocaleString() }}
        </template>

        <template #expand="{ item }">
          <preview inside :item="item" />
        </template>
      </data-grid>
    </q-card-section>
  </q-card>
</template>

<script setup>
  import { ref, computed } from "vue";
  import { useRouter } from "vue-router";

  import DataGrid from "src/components/shared/dataTables/desktop/DataGrid.vue";
  import Preview from "../../shared/preview/IndexView.vue";

  const props = defineProps({
    baseRoute: String,
    dataSource: String,
    gridStore: Object,
    title: String,
  });

  const dataGrid = ref(null);
  const router = useRouter();

  function rowDblClick(row) {
    router.push(`/prl/wage/preview/${row.id}`);
  }

  const tableStore = computed(() => dataGrid?.value?.tableStore);

  defineExpose({
    tableStore,
  });
</script>
