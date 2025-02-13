<template>
  <data-grid
    :data-table-store="tableStore"
    :base-route="baseRoute"
    :create-url="`/${baseRoute}/create`"
    show-avatar
    show-badge_
  >
    <template #row-avatar-title="{ item }">
      {{ helper.getFirstChar(item.title) }}
    </template>

    <template #row-body="{ item }">
      <div class="row">
        <div class="col ellipsis q-gutter-x-xs">
          <is-active :is-active="item.isActive" />
          <span class="text-body3 text-weight-500_">
            {{ item.code }} - {{ item.title }}
          </span>
        </div>
        <menu-item-more @click="showItemSheet(item)" />
      </div>

      <div class="row q-gutter-x-xs">
        <span class="text-caption-sm">
          <span class="text-on-dark">گروه:</span>
          {{ item.productGroupTitle }}
        </span>
      </div>

      <div class="row q-gutter-x-xs">
        <span v-if="item.barcode" class="text-caption-sm">
          <span class="text-on-dark">بارکد:</span>
          {{ item.barcode }}
        </span>
        <span v-if="item.taxCode" class="text-caption-sm">
          <span class="text-on-dark">شناسه مالیاتی:</span>
          {{ item.taxCode }}
        </span>
      </div>

      <div class="row q-gutter-x-xs">
        <span v-if="item.price" class="text-caption-sm">
          <span class="text-on-dark">قیمت فروش:</span>
          {{ helper.formatNumber(item.price) }}
        </span>
        <span v-if="item.purchasePrice" class="text-caption-sm">
          <span class="text-on-dark">قیمت خرید:</span>
          {{ helper.formatNumber(item.purchasePrice) }}
        </span>
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

  import DataGrid from "src/components/shared/dataTables/mobile/DataGrid.vue";
  import IsActive from "src/components/shared/IsActive.vue";
  import ItemSheet from "./DataGridItemSheet.vue";
  import MenuItemMore from "src/components/shared/buttons/MenuItemMore.vue";

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
