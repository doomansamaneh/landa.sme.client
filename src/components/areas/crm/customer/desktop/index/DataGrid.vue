<template>
  <data-grid
    :data-table-store="tableStore"
    flat
    toolbar
    multiSelect
    numbered
    dense
    expandable
    wrapCells
    @row-dbl-click="gotoPreview"
  >
    <template #filter-typeId="{ item }">
      <custom-select
        v-model="item.value"
        :options="helper.getEnumOptions(customerType, 'customerType')"
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

    <template #cell-typeId="{ item }">
      {{
        $t(
          `shared.customerType.${helper.getEnumType(
            item.typeId,
            customerType
          )}`
        )
      }}
    </template>

    <template #cell-isActive="{ item }">
      <is-active :is-active="item.isActive" />
    </template>

    <template #cell-actions="{ item }">
      <row-tool-bar
        :base-route="baseRoute"
        :item="item"
        :table-store="tableStore"
        :crud-store="crudStore"
      />
    </template>

    <template #expand="{ item }">
      <preview inside :item="item" :base-route="baseRoute" />
    </template>
  </data-grid>
</template>

<script setup>
  import { useRouter } from "vue-router";
  import { helper } from "src/helpers";
  import { useDataTable } from "src/composables/useDataTable";
  import { customerType, isActiveOptions } from "src/constants";

  import DataGrid from "src/components/shared/dataTables/desktop/DataGrid.vue";
  import CustomSelect from "src/components/shared/forms/CustomSelect.vue";
  import IsActive from "src/components/shared/IsActive.vue";
  import Preview from "../../shared/preview/IndexView.vue";

  const props = defineProps({
    tableStore: useDataTable,
    baseRoute: { type: String, default: "acc/voucher" },
  });

  const router = useRouter();

  async function reloadData() {
    await props.tableStore.reloadData();
  }

  function gotoPreview(row) {
    router.push(`/${props.baseRoute}/preview/${row.id}`);
  }
</script>
