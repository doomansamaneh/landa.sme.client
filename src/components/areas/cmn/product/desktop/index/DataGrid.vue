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
        dataSource="cmn/product/getGridData"
        :grid-store="gridStore"
        separator="horizontal"
        flat
        multiSelect
        numbered
        toolbar
        expandable
      >
        <template #filter-typeId="{ item }">
          <custom-select
            v-model="item.value"
            :options="
              helper.getEnumOptions(productType, 'productType')
            "
            @update:model-value="reloadData"
          />
        </template>
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

        <template #cell-code="{ item }">
          {{ item.code }}
          <div v-if="item.taxCode">
            <small class="caption-on-dark">
              tax: {{ item.taxCode }}
            </small>
          </div>
        </template>

        <template #cell-typeId="{ item }">
          {{
            $t(
              `shared.productType.${helper.getEnumType(
                item.typeId,
                productType
              )}`
            )
          }}
        </template>

        <template #cell-purchasePrice="{ item }">
          {{ item.purchasePrice.toLocaleString() }}
        </template>
        <template #cell-price="{ item }">
          {{ item.price.toLocaleString() }}
        </template>

        <template #cell-isActive="{ item }">
          <q-btn
            v-if="item.isActive"
            round
            dense
            size="10px"
            unelevated
            icon="o_done"
            text-color="white"
            class="green-gradient green-shadow no-pointer-events"
          />
          <q-btn
            v-else
            round
            dense
            size="10px"
            unelevated
            icon="o_close"
            text-color="white"
            class="red-gradient red-shadow no-pointer-events"
          />
        </template>

        <template #cell-actions="{ item }">
          <row-tool-bar
            base-route="cmn/product"
            :item="item"
            :table-store="tableStore"
            :crud-store="crudStore"
          />
        </template>

        <template #expand="{ item }">
          <preview :item="item" inside />
        </template>
      </data-grid>
    </q-card-section>
  </q-card>
</template>

<script setup>
  import { ref, computed } from "vue";
  import { helper } from "src/helpers";
  import { isActiveOptions, productType } from "src/constants";

  import RowToolBar from "src/components/shared/RowToolBar.vue";
  import CustomSelect from "src/components/shared/forms/CustomSelect.vue";
  import DataGrid from "src/components/shared/dataTables/desktop/DataGrid.vue";
  import Preview from "../../shared/preview/IndexView.vue";

  const props = defineProps({
    gridStore: Object,
    crudStore: Object,
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
