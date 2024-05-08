<template>

  <data-grid
    id="printable"
    ref="dataGrid"
    :grid-store="gridStore"
    data-source="acc/report/getItemData"
    separator="horizontal"
    flat_
    multiSelect
    numbered
    bordered
    dense_
    wrapCells
    expandable
  >
    <!-- <template #expand="{ item }">
      <details-grid :filter-expersions="getFilterExpersion(item)" :item="item">
        <template #expand="{ item }">
          <div class="q-pb-md">
            <preview :item="item" />
          </div>
        </template>
      </details-grid>
      {{ item }}
    </template> -->
  </data-grid>
</template>

<script setup>
import { ref } from "vue";
import { useCustomerAccountDetailsGrid } from "src/components/areas/acc/report/_composables/useCustomerAccountDetailsGrid.js";
import { helper } from "src/helpers/helper";

import Toolbar from "src/components/shared/ToolBarDesktop.vue";
import DataGrid from "src/components/shared/dataTables/desktop/DataGrid.vue";

const dataGrid = ref(null);
const gridStore = useCustomerAccountDetailsGrid();
</script>
