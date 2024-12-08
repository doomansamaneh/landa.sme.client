<template>
  <q-card flat class="bordered shadow">
    <card-title title="کالا و خدمات" icon="o_desktop_mac" />

    <data-grid
      :data-table-store="tableStore"
      flat
      toolbar
      multiSelect
      numbered
      dense
      expandable
      @row-dbl-click="gotoPreview"
    >
      <template #filter-typeId="{ item }">
        <custom-select
          v-model="item.value"
          :options="helper.getEnumOptions(productType, 'productType')"
          @update:model-value="reloadData"
        />
      </template>
      <template #filter-isActive="{ item }">
        <custom-select
          v-model="item.value"
          :options="
            helper.getEnumOptions(isActiveOptions, 'isActiveOptions')
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
        <preview inside :item="item" :base-route="baseRoute" />
      </template>
    </data-grid>
  </q-card>
</template>

<script setup>
  import { useRouter } from "vue-router";
  import { helper } from "src/helpers";
  import { isActiveOptions, productType } from "src/constants";
  import { useDataTable } from "src/composables/useDataTable";

  import DataGrid from "src/components/shared/dataTables/desktop/DataGrid.vue";
  import RowToolBar from "src/components/shared/RowToolBar.vue";
  import CustomSelect from "src/components/shared/forms/CustomSelect.vue";
  import Preview from "../../shared/preview/IndexView.vue";
  import CardTitle from "src/components/shared/CardTitle.vue";

  const props = defineProps({
    title: String,
    tableStore: useDataTable,
    baseRoute: String,
  });

  const router = useRouter();

  async function reloadData() {
    await props.tableStore.reloadData();
  }

  function gotoPreview(row) {
    router.push(`/${props.baseRoute}/preview/${row.id}`);
  }
</script>
