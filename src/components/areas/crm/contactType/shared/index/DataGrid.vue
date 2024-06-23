<template>
  <data-grid
    ref="dataGrid"
    toolbar
    base-route="crm/contactType"
    data-source="crm/contactType/getGridData"
    :title="$t('main-menu-items.Crm_ContactType_View')"
    :columns="contactTypeColumns"
    activation
  >
    <template #filter-typeId="{ item }">
      <custom-select
        v-model="item.value"
        :options="helper.getEnumOptions(contactType, 'contactType')"
        @update:model-value="dataGrid?.reloadData()"
      />
    </template>

    <template #cell-typeId="{ item }">
      {{
        $t(
          `shared.contactType.${helper.getEnumType(
            item.typeId,
            contactType
          )}`
        )
      }}
    </template>
  </data-grid>
</template>

<script setup>
  import { ref } from "vue";
  import { helper } from "src/helpers";
  import { contactType } from "src/constants";
  import { contactTypeColumns } from "../../../_composables/constants";

  import CustomSelect from "src/components/shared/forms/CustomSelect.vue";
  import DataGrid from "components/areas/_shared/baseInfo/shared/index/DataGrid.vue";

  const dataGrid = ref(null);
</script>
