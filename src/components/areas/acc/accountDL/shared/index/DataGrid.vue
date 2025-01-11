<template>
  <data-grid
    ref="grid"
    toolbar
    base-route="acc/accountDL"
    data-source="acc/accountDL/getGridData"
    :title="$t('main-menu-items.Acc_AccountDL_View')"
    :grid-store="gridStore"
    create-url="/acc/accountGL/create"
    activation
    expandable
  >
    <template #filter-typeId="{ item }">
      <custom-select
        v-model="item.value"
        :options="
          helper.getEnumOptions(accountDLType, 'accountDLType')
        "
        @update:model-value="grid?.reloadData"
      />
    </template>

    <template #cell-code="{ item }">
      {{ item.code }}
      <small v-if="item.syncCode">({{ item.syncCode }})</small>
    </template>

    <template #cell-debitRemained="{ item }">
      {{ helper.formatNumber(item.debitRemained) }}
    </template>

    <template #cell-creditRemained="{ item }">
      {{ helper.formatNumber(item.creditRemained) }}
    </template>

    <template #cell-typeId="{ item }">
      {{
        $t(
          `shared.accountDLType.${helper.getEnumType(
            item.typeId,
            accountDLType
          )}`
        )
      }}
    </template>

    <template #expand="{ item }">
      <preview :item="item" inside />
    </template>
  </data-grid>
</template>

<script setup>
  import { ref } from "vue";
  import { useBaseInfoGrid } from "src/components/areas/_shared/_composables/useBaseInfoGrid";
  import { accountDLColumns } from "src/components/areas/acc/_composables/constants";
  import { helper } from "src/helpers";
  import { accountDLType } from "src/constants";

  import DataGrid from "components/areas/_shared/baseInfo/shared/index/DataGrid.vue";
  import CustomSelect from "src/components/shared/forms/CustomSelect.vue";
  import Preview from "../preview/IndexView.vue";

  const gridStore = useBaseInfoGrid({
    columns: accountDLColumns,
    sortColumn: "code",
  });

  const grid = ref(null);
</script>
