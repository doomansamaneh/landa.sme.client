<template>
  <data-grid
    :data-table-store="tableStore"
    :base-route="baseRoute"
    :create-url="`/${baseRoute}/create`"
    show-avatar
    show-badge
  >
    <template #header>
      <template></template>
    </template>

    <template #row-avatar-title="{ item }">
      {{ helper.getFirstChar(item.name) }}
    </template>

    <template #row-body="{ item }">
      <div class="row">
        <div class="col ellipsis text-body3 text-weight-500">
          {{ item.name }}
        </div>
        <menu-item-more @click="showItemSheet(item)" />
      </div>
      <div class="row">
        <div class="col ellipsis text-caption-sm">
          {{ item.loginName }}
        </div>
      </div>
    </template>
  </data-grid>

  <item-sheet
    v-if="itemSheetStatus"
    :table-store="tableStore"
    :status="itemSheetStatus"
    :base-route="baseRoute"
    :item="item"
    @hide="hideItemSheet"
  />
</template>

<script setup>
  import { ref } from "vue";
  import { helper } from "src/helpers";
  import { useDataTable } from "src/composables/useDataTable";

  import DataGrid from "components/shared/dataTables/mobile/DataGrid.vue";
  import MenuItemMore from "src/components/shared/buttons/MenuItemMore.vue";
  import ItemSheet from "./DataGridItemSheet.vue";

  const props = defineProps({
    tableStore: useDataTable,
    title: String,
    baseRoute: String,
  });

  const item = ref(null);
  const itemSheetStatus = ref(false);

  const showItemSheet = (row) => {
    item.value = row;
    itemSheetStatus.value = true;
  };
  const hideItemSheet = () => {
    itemSheetStatus.value = false;
  };
</script>
