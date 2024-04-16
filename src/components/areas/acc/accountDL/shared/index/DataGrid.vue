<template>
  <data-grid
    toolbar
    base-route="acc/accountDL"
    data-source="acc/accountDL/getGridData"
    :title="$t('main-menu-items.Acc_AccountDL_View')"
    :grid-store="gridStore"
    create-url="/acc/accountDL/create"
  >
    <!-- <template #filter-typeId="{ item }">
      <custom-select
        v-model="item.value"
        :options="helper.getEnumOptions(accountDLType, 'accountDLType')"
        @update:model-value="reloadData"
      />
    </template> -->
    <template #cell-code="{ item }">
      {{ item.code }}
      <small v-if="item.syncCode">({{ item.syncCode }})</small>
    </template>
    <template #cell-debitRemained="{ item }">
      {{ item.debitRemained.toLocaleString() }}
    </template>
    <template #cell-creditRemained="{ item }">
      {{ item.creditRemained.toLocaleString() }}
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
  </data-grid>
</template>

<script setup>
import { helper } from "src/helpers";
import { accountDLType } from "src/constants";
import { useBaseInfoGrid } from "src/components/areas/_shared/_composables/useBaseInfoGrid";
import { accountDLColumns } from "src/components/areas/acc/_composables/constants";

import DataGrid from "components/areas/_shared/baseInfo/shared/index/DataGrid.vue";
import CustomSelect from "src/components/shared/forms/CustomSelect.vue";

const gridStore = useBaseInfoGrid({
  columns: accountDLColumns,
  sortColumn: "code",
});
</script>
