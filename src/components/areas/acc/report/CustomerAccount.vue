<template>
  <Toolbar buttons title="گزارش حساب شخص" :table-store="dataGrid?.tableStore" margin>
    <template #buttons>
      <q-btn padding="6px 12px" class="text-body2 no-letter-spacing" rounded unelevated>
        <q-icon size="20px" name="more_horiz" class="q-mr-xs" />
        {{ $t("shared.labels.more") }}

        <q-menu class="border-radius-lg" fit :offset="[0, 10]">
          <q-list>
            <q-item
              clickable
              v-close-popup
              tabindex="0"
              @click="dataGrid?.tableStore.exportAll()"
            >
              <div class="q-py-sm">
                <q-item-section avatar>
                  <q-avatar class="bg-on-dark" size="sm"
                    ><q-icon name="o_download" size="20px"
                  /></q-avatar>
                </q-item-section>
              </div>
              <q-item-section>
                <div class="text-body2 no-letter-spacing">
                  {{ $t("shared.labels.eportToExcel") }}
                </div>
              </q-item-section>
            </q-item>
            <q-item
              clickable
              v-close-popup
              tabindex="0"
              @click="helper.print('printable')"
            >
              <div class="q-py-sm">
                <q-item-section avatar>
                  <q-avatar class="bg-on-dark" size="sm"
                    ><q-icon name="o_print" size="20px"
                  /></q-avatar>
                </q-item-section>
              </div>
              <q-item-section>
                <div class="text-body2 no-letter-spacing">
                  {{ $t("shared.labels.print") }}
                </div>
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </template>
  </Toolbar>

  <data-grid
    id="printable"
    ref="dataGrid"
    :grid-store="gridStore"
    title="گزارش حساب شخص"
    data-source="acc/report/getCustomerData"
    separator="horizontal"
    flat_
    multiSelect_
    numbered
    bordered
    dense_
    wrapCells
    expandable
    @row-dbl-click="gotoPreview"
  >
    <template #expand="{ item }">
      <div class="q-py-sm">
        <div class="text-h6 no-letter-spacing text-weight-700 q-py-md">
          {{ item.title }}
        </div>
        <details-grid :filter-expersions="getFilterExpersion(item)" :item="item">
        <template #expand="{ item }">
          <div class="q-pb-md">
            <preview :item="item" />
          </div>
        </template>
      </details-grid>
      </div>
    </template>
  </data-grid>
</template>

<script setup>
import { ref, computed } from "vue";
import { useCustomerAccountGrid } from "src/components/areas/acc/report/_composables/useCustomerAccountGrid.js";
import { helper } from "src/helpers/helper";
import { sqlOperator } from "src/constants";
import { useRouter } from "vue-router";

import Toolbar from "src/components/shared/ToolBarDesktop.vue";
import DataGrid from "src/components/shared/dataTables/desktop/DataGrid.vue";
import DetailsGrid from "src/components/areas/acc/report/CustomerAccountDetails.vue";

const dataGrid = ref(null);
const gridStore = useCustomerAccountGrid();
const router = useRouter()

const tableStore = computed(() => dataGrid.value?.tableStore);

const getFilterExpersion = (item) => {
  return [{ fieldName: "vi.dlId", operator: sqlOperator.equal, value: item.id }];
};

function gotoPreview(item) {
  router.push(`/acc/voucher/preview/${item.id}`);
} 
</script>
