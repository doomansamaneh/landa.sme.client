<template>
  <div>
    <data-grid
      ref="dataGrid"
      dataSource="cmn/product/getGridData"
      createUrl="/cmn/product/create"
      :grid-store="gridStore"
      base-route="cmn/product"
      show-avatar
    >
      <template #row-avatar-title="{ item }">
        {{ helper.getFirstChar(item.title) }}
      </template>

      <template #row-body="{ item }">
        <div class="row">
          <div class="col ellipsis q-gutter-x-xs">
            <is-active :is-active="item.isActive" />
            <span
              class="text-body3 no-letter-spacing text-weight-500_"
            >
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
  </div>

  <item-sheet
    v-if="itemSheetStatus"
    :table-store="tableStore"
    :status="itemSheetStatus"
    base-route="cmn/product"
    :item="item"
    @hide="hideItemSheet"
  />
</template>

<script setup>
  import { ref, computed } from "vue";
  import { helper } from "src/helpers";

  import DataGrid from "src/components/shared/dataTables/mobile/DataGrid.vue";
  import IsActive from "src/components/shared/IsActive.vue";
  import ItemSheet from "./DataGridItemSheet.vue";
  import MenuItemMore from "src/components/shared/buttons/MenuItemMore.vue";

  const props = defineProps({
    gridStore: Object,
    crudStore: Object,
  });

  const dataGrid = ref(null);
  const tableStore = computed(() => dataGrid.value?.tableStore);

  const item = ref(null);
  const itemSheetStatus = ref(false);

  const showItemSheet = (row) => {
    item.value = row;
    itemSheetStatus.value = true;
  };
  const hideItemSheet = () => {
    itemSheetStatus.value = false;
  };

  async function reloadData() {
    await tableStore.value.reloadData();
  }

  defineExpose({
    tableStore,
  });
</script>
