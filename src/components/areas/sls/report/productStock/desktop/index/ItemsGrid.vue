<template>
  <tool-bar :inside="useTableStore.openInPage.value" buttons title="کاردکس کالا">
    <template #buttons>
      <q-btn
        :to="`/sls/invoice/edit/${id}`"
        class="bg-primary primary-shadow text-white text-body2 no-letter-spacing"
        padding="6px 12px"
        rounded
        unelevated
        no-caps
      >
        <q-icon size="20px" name="o_edit" class="q-mr-xs" />
        اصلاح موجودی
      </q-btn>

      <q-btn padding="6px 12px" class="text-body2 no-letter-spacing" rounded unelevated>
        <q-icon size="20px" name="more_horiz" class="q-mr-xs" />
        {{ $t("shared.labels.more") }}

        <q-menu class="border-radius-lg" fit :offset="[0, 10]">
          <q-list>
            <q-item clickable v-close-popup tabindex="0" @click="tableStore.exportAll()">
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
          </q-list>
        </q-menu>
      </q-btn>
    </template>
  </tool-bar>

  <div class="row q-col-gutter-md" :class="useTableStore.openInPage.value ? 'q-pb-lg' : 'q-mt-xs q-py-lg'">
    <div class="col-md col-sm-6 col-xs-12">
      <div class="text-body3 no-letter-spacing q-mb-sm">کد</div>
      <q-field dense outlined>
        <template v-slot:control>
          <div class="text-body3 no-letter-spacing">{{ item?.code }}</div>
        </template>
      </q-field>
    </div>

    <div class="col-md col-sm-6 col-xs-12">
      <div class="text-body3 no-letter-spacing q-mb-sm">عنوان</div>
      <q-field dense outlined>
        <template v-slot:control>
          <div class="text-body3 no-letter-spacing">{{ item?.title }}</div>
        </template>
      </q-field>
    </div>

    <div class="col-md col-sm-6 col-xs-12">
      <div class="text-body3 no-letter-spacing q-mb-sm">گروه</div>
      <q-field dense outlined>
        <template v-slot:control>
          <div class="text-body3 no-letter-spacing">گروه لوازم اداری و مصرفی</div>
        </template>
      </q-field>
    </div>

    <div class="col-md col-sm-6 col-xs-12">
      <div class="text-body3 no-letter-spacing q-mb-sm">موجودی اول دوره</div>
      <q-field dense outlined>
        <template v-slot:control>
          <div class="text-body3 no-letter-spacing">{{ item?.salesQuantity }}</div>
        </template>
      </q-field>
    </div>
  </div>

  <data-grid
    class="q-mb-sm"
    ref="dataGrid"
    :data-source="dataSource"
    :grid-store="gridStore"
    separator="horizontal"
    flat_
    multiSelect_
    numbered
    bordered
    wrapCells_
    dense
    :expandable="true"
  >
    <template #filter-isActive="{ col }">
      <custom-select
        v-model="col.value"
        :options="isActiveOptions"
        @update:model-value="reloadData"
      />
    </template>

    <template #cell-isActive="{ item }">
      <is-active :is-active="item.isActive" />
    </template>

    <template v-for="(slot, name) in $slots" :key="slot" #[name]="{ item }">
      <slot :name="name" :item="item"></slot>
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
</template>

<script setup>
import { ref, computed } from "vue";
import { isActiveOptions, sqlOperator } from "src/constants";
import { useProductStockItemsGrid } from "src/components/areas/sls/_composables/useProductStockItemsGrid.js";
import { useRoute } from "vue-router";

import RowToolBar from "src/components/shared/RowToolBar.vue";
import CustomSelect from "src/components/shared/forms/CustomSelect.vue";
import DataGrid from "src/components/shared/dataTables/desktop/DataGrid.vue";
import ToolBar from "src/components/shared/ToolBarDesktop.vue";
import IsActive from "src/components/shared/IsActive.vue";

const route = useRoute();
const props = defineProps({
  filterExpersions: Array,
  item: Object,
});

const dataGrid = ref(null);
const dataSource = "sls/report/getProductStockItems";

async function reloadData() {
  await tableStore.value.reloadData();
}

const tableStore = computed(() => dataGrid?.value?.tableStore);

const productId = route.params.productId;

const filterExpersions = computed(() => {
  if (props.filterExpersions) {
    return props.filterExpersions;
  } else {
    if (productId) {
      return [
        {
          fieldName: "ii.productId",
          operator: sqlOperator.equal,
          value: productId,
        },
      ];
    }
  }

  return "";
});

const gridStore = useProductStockItemsGrid(filterExpersions.value);

defineExpose({
  tableStore,
});
</script>
