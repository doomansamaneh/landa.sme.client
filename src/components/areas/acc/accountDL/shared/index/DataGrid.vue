<template>
  <toolbar-container
    v-if="grid"
    :title="title"
    :table-store="grid?.tableStore"
  />

  <data-grid
    ref="grid"
    :title="$t('main-menu-items.Acc_AccountDL_View')"
    base-route="acc/accountDL"
    create-url="/acc/accountGL/create"
    data-source="acc/accountDL/getGridData"
    :grid-store="gridStore"
    icon="view_comfy"
    toolbar_
    expandable
  >
    <template #filter-typeId="{ item }">
      <custom-select
        v-model="item.value"
        :options="
          helper.getEnumOptions(accountDLType, 'accountDLType')
        "
        @update:model-value="grid?.tableStore?.reloadData"
      />
    </template>

    <template #cell-code="{ item }">
      {{ item.code }}
      <small v-if="item.syncCode">({{ item.syncCode }})</small>
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
      <preview
        :title="$t('main-menu-items.Acc_AccountDL_View')"
        :item="item"
        inside
      />
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
  import ToolbarContainer from "./ToolbarContainer.vue";

  const gridStore = useBaseInfoGrid({
    columns: accountDLColumns,
    sortColumn: "code",
  });

  const grid = ref(null);
</script>
