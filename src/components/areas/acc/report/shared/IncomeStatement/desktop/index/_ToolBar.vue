<template>
  <toolbar-desktop
    :title="title"
    :table-store="tableStore"
    :crud-store="crudStore"
    :base-route="baseRoute"
    buttons
    margin
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
  </toolbar-desktop>
</template>

<script setup>
  import ToolbarDesktop from "components/shared/ToolBarDesktop.vue";

  const props = defineProps({
    title: String,
    tableStore: Object,
    crudStore: Object,
    selectedIds: Array,
    baseRoute: { type: String, default: "acc/report" },
  });
</script>
