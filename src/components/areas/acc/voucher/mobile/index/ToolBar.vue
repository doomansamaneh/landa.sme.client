<template>
  <tool-bar
    :table-store="tableStore"
    :crud-store="crudStore"
    :base-route="baseRoute"
    :title="title"
    activation_
    search-btn
    sort-btn
  >
    <template #buttons-custom>
      <q-item clickable v-close-popup tabindex="0" @click="reorder">
        <q-item-section avatar>
          <q-avatar class="bg-on-dark text-on-dark">
            <q-icon name="cached" />
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <div class="text-body2 no-letter-spacing">
            {{ $t("shared.labels.reorder") }}
          </div>
        </q-item-section>
      </q-item>

      <q-separator size="0.5px" class="q-my-sm" />

      <template v-if="tableStore.activeRow?.value">
        <q-item
          clickable
          v-close-popup
          tabindex="0"
          @click="downloadPdf"
        >
          <q-item-section avatar>
            <q-avatar class="bg-on-dark text-on-dark">
              <q-icon name="o_print" />
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <div class="text-body2 no-letter-spacing">
              {{ $t("shared.labels.print") }}
            </div>
          </q-item-section>
        </q-item>
      </template>

      <q-item
        clickable
        v-close-popup
        tabindex="0"
        @click="downloadBatchPdf"
      >
        <q-item-section avatar>
          <q-avatar class="bg-on-dark text-on-dark">
            <q-icon name="o_print" />
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <div class="text-body2 no-letter-spacing">
            {{ $t("shared.labels.printBatch") }}
          </div>
        </q-item-section>
      </q-item>
    </template>

    <template #advanced-search>
      <advanced-search />
    </template>
  </tool-bar>
</template>

<script setup>
  import { useQuasar } from "quasar";
  import { useDataTable } from "src/composables/useDataTable";

  import ToolBar from "components/shared/ToolBarMobile.vue";
  import AdvancedSearch from "./AdvancedSearch.vue";

  const props = defineProps({
    toolbar: Boolean,
    title: String,
    tableStore: useDataTable,
    crudStore: Object,
    selectedIds: Array,
    baseRoute: { type: String, default: "acc/voucher" },
  });
  const $q = useQuasar();

  const emits = defineEmits([
    "downloadPdf",
    "download-batch-pdf",
    "reorder",
  ]);

  function downloadPdf(id) {
    emits("download-pdf", id);
  }

  function downloadBatchPdf() {
    emits("download-batch-pdf");
  }

  function reorder() {
    emits("reorder");
  }
</script>
