<template>
  <q-card flat class="bordered shadow">
    <div class="row justify-between primary-gradient-1">
      <div class="row items-center q-px-md">
        <q-avatar
          rounded
          text-color="white"
          :icon="`o_${icon}`"
          size="md"
          class="primary-gradient primary-shadow"
        />
        <card-title v-if="title" :title="title" />
      </div>
      <data-grid-toolbar class="q-pa-md" :table-store="tableStore" />
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
      :expandable="expandable"
      toolbar-
    >
      <template #filter-isActive="{ item }">
        <custom-select
          v-model="item.value"
          :options="
            helper.getEnumOptions(isActiveOptions, 'isActiveOptions')
          "
          @update:model-value="reloadData"
        />
      </template>

      <template #cell-isActive="{ item }">
        <is-active :is-active="item.isActive" />
      </template>

      <template #cell-subject="{ item }">
        {{ item.subject }}
        <div v-if="item.summary" class="text-caption-sm">
          {{ item.summary }}
        </div>
        <div v-if="item.comment">
          {{ item.comment }}
        </div>
      </template>

      <template #cell-amount="{ item }">
        {{ item.amount?.toLocaleString() }}
      </template>

      <template #cell-actions="{ item }">
        <row-tool-bar
          :base-route="baseRoute"
          :item="item"
          :table-store="tableStore"
          :crud-store="crudStore"
        />
      </template>

      <template
        v-for="(slot, name) in $slots"
        :key="slot"
        #[name]="{ item }"
      >
        <slot :name="name" :item="item"></slot>
      </template>
    </data-grid>
  </q-card>
</template>

<script setup>
  import { ref, computed } from "vue";
  import { useQuasar } from "quasar";
  import { helper } from "src/helpers";
  import { isActiveOptions } from "src/constants";
  import { useDataTable } from "src/composables/useDataTable";

  import RowToolBar from "src/components/shared/RowToolBar.vue";
  import CustomSelect from "src/components/shared/forms/CustomSelect.vue";
  import DataGrid from "src/components/shared/dataTables/desktop/DataGrid.vue";
  import IsActive from "src/components/shared/IsActive.vue";
  import CardTitle from "src/components/shared/CardTitle.vue";
  import DataGridToolbar from "components/shared/dataTables/desktop/DataGridToolbar.vue";

  const props = defineProps({
    gridStore: Object,
    crudStore: Object,
    dataSource: String,
    baseRoute: String,
    expandable: Boolean,
    title: String,
    icon: String,
  });

  const dataGrid = ref(null);
  const $q = useQuasar();

  async function reloadData() {
    await tableStore.value.reloadData();
  }

  // const tableStore = computed(() => dataGrid?.value?.tableStore);

  const tableStore = useDataTable({
    dataSource: props.dataSource,
    store: props.gridStore,
  });

  defineExpose({
    tableStore,
  });
</script>
