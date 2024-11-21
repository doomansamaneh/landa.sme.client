<template>
  <template v-if="$q.screen.xs">
    <toolbar-mobile
      :title="title"
      :table-store="tableStore"
      :base-route="baseRoute"
      buttons
      margin
    />
  </template>
  <template v-else>
    <toolbar-desktop
      :title="title"
      :table-store="tableStore"
      buttons
      margin
    >
      <template #buttons>
        <q-btn
          class="primary-gradient primary-shadow text-white text-body2 no-letter-spacing"
          rounded
          unelevated
          no-caps
        >
          <q-icon size="20px" name="o_print" class="q-mr-xs" />
          {{ $t("shared.labels.print") }}

        </q-btn>
      </template>
    </toolbar-desktop>
  </template>
</template>

<script setup>
  import { computed } from "vue";
  import { useQuasar } from "quasar";
  import { useDataTable } from "src/composables/useDataTable";

  import ToolbarDesktop from "src/components/shared/ToolBarDesktop.vue";
  import ToolbarMobile from "src/components/shared/ToolBarMobile.vue";

  const props = defineProps({
    toolbar: Boolean,
    title: String,
    tableStore: useDataTable,
  });

  const baseRoute = "sls/Invoice";
  const $q = useQuasar();
</script>
