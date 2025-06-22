<template>
  <q-card flat class="bordered shadow">
    <card-title :icon="`o_${icon}`" :title="title" />

    <data-grid
      :data-table-store="tableStore"
      separator="horizontal"
      multiSelect
      numbered
      flat
      :expandable="expandable"
      :title="title"
      toolbar
    >
      <template #filter-isActive="{ item }">
        <custom-select
          v-model="item.value"
          :options="
            helper.getEnumOptions(isActiveOptions, 'isActiveOptions')
          "
          @update:model-value="tableStore.reloadData"
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
  import { helper } from "src/helpers";
  import { isActiveOptions } from "src/constants";
  import { useDataTable } from "src/composables/useDataTable";

  import RowToolBar from "src/components/shared/toolbars/DesktopRowToolbar.vue";
  import CustomSelect from "src/components/shared/forms/CustomSelect.vue";
  import DataGrid from "src/components/shared/dataTables/desktop/DataGrid.vue";
  import IsActive from "src/components/shared/IsActive.vue";
  import CardTitle from "src/components/shared/CardTitle.vue";

  const props = defineProps({
    tableStore: useDataTable,
    crudStore: Object,
    baseRoute: String,
    expandable: Boolean,
    title: String,
    icon: String,
  });
</script>
