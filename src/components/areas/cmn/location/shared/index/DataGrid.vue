<template>
  <data-grid
    ref="dataGrid"
    toolbar
    base-route="cmn/location"
    data-source="cmn/location/getGridData"
    :title="$t('main-menu-items.Cmn_Location_View')"
    :columns="locationColumns"
    activation
  >
    <template #filter-typeId="{ item }">
      <custom-select
        v-model="item.value"
        :options="helper.getEnumOptions(locationType, 'locationType')"
        @update:model-value="dataGrid?.reloadData()"
      />
    </template>

    <template #cell-typeId="{ item }">
      {{
        $t(
          `shared.locationType.${helper.getEnumType(
            item.typeId,
            locationType
          )}`
        )
      }}
    </template>
  </data-grid>
</template>

<script setup>
  import { ref } from "vue";
  import { helper } from "src/helpers";
  import { locationType } from "src/constants";
  import { locationColumns } from "../../../_composables/constants";

  import CustomSelect from "src/components/shared/forms/CustomSelect.vue";
  import DataGrid from "components/areas/_shared/baseInfo/shared/index/DataGrid.vue";

  const dataGrid = ref(null);
</script>
