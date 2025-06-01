<template>
  <bottom-sheet header :status="status" @hide="hide">
    <template #header-title>
      <slot name="header-title" :item="item">
        {{ item.no }} / {{ item.customerName }}
      </slot>
    </template>

    <template #body>
      <q-list padding>
        <slot name="items" :item="item">
          <sheet-items
            :item="item"
            :base-route="baseRoute"
            :table-store="tableStore"
            :delete-call-back="deleteCallBack"
          />
        </slot>
      </q-list>
    </template>
  </bottom-sheet>
</template>

<script setup>
  import { useDataTable } from "src/composables/useDataTable";

  import BottomSheet from "components/shared/BottomSheet.vue";
  import SheetItems from "./DataGridItemSheetItems.vue";

  const props = defineProps({
    tableStore: useDataTable,
    baseRoute: String,
    title: String,
    status: Boolean,
    item: Object,
    deleteCallBack: Function,
  });

  const emits = defineEmits(["hide"]);

  const hide = () => {
    emits("hide");
  };
</script>
