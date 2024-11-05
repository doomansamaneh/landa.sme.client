<template>
  <tool-bar
    :table-store="tableStore"
    :crud-store="crudStore"
    :title="title"
    :base-route="baseRoute"
  >
    <template #buttons>
      <q-btn
        class="primary-gradient primary-shadow text-white text-body2 no-letter-spacing"
        padding="6px 12px"
        rounded
        no-caps
        unelevated
      >
        <q-icon size="20px" name="o_print" class="q-mr-sm" />
        {{ $t("shared.labels.print") }}
      </q-btn>
    </template>
  </tool-bar>
</template>

<script setup>
  import { useDataTable } from "src/composables/useDataTable";
  import { useInvoiceSearch } from "src/components/areas/sls/_composables/useInvoiceSearch";

  import ToolBar from "src/components/shared/ToolBarMobile.vue";
  import MenuItem from "src/components/shared/buttons/MenuItem.vue";
  import MenuItemPrint from "src/components/shared/buttons/MenuItemPrint.vue";

  const props = defineProps({
    tableStore: useDataTable,
    crudStore: Object,
    baseRoute: String,
    title: String,
    showTaxApi: Boolean,
  });
</script>
