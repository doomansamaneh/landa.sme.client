<template>
  <tool-bar
    :table-store="tableStore"
    :crud-store="crudStore"
    :title="title"
    base-route="sls/invoice"
    show-tax-api
  >
    <template #buttons-custom>
      <menu-item
        :title="$t('shared.labels.reorder')"
        icon="o_cached"
        @click="reorder"
      />
    </template>
  </tool-bar>
</template>

<script setup>
  import ToolBar from "../../../_shared/invoice/mobile/index/ToolBar.vue";
  import MenuItem from "src/components/shared/buttons/MenuItem.vue";

  const emits = defineEmits(["reorder"]);
  const reorder = () => {
    emits("reorder");
  };
</script>
