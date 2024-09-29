<template>
  <toolbar-desktop
    :table-store="tableStore"
    :crud-store="crudStore"
    :base-route="baseRoute"
    buttons
    margin
  >
    <template #bootons-edit="{ row }">
      <q-btn
        padding="6px 12px"
        :to="`/${baseRoute}/edit/${row.id}`"
        class="text-body2 no-letter-spacing"
        rounded
        unelevated
        no-caps
      >
        <q-icon size="20px" name="o_edit" class="q-mr-sm" />
        {{ $t("shared.labels.edit") }}
      </q-btn>

      <q-btn
        padding="6px 12px"
        :to="`/${baseRoute}/copy/${row.id}`"
        class="text-body2 no-letter-spacing"
        rounded
        unelevated
        no-caps
      >
        <q-icon size="20px" name="o_copy" class="q-mr-sm" />
        {{ $t("shared.labels.copy") }}
      </q-btn>
    </template>

    <template #buttons-custom="{ row }">
      <q-item clickable v-close-popup tabindex="0" @click="reorder">
        <q-item-section avatar class="q-py-sm">
          <q-avatar class="bg-on-dark" size="sm">
            <q-icon name="o_cached" size="20px" />
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <div class="text-body2 no-letter-spacing">
            {{ $t("shared.labels.reorder") }}
          </div>
        </q-item-section>
      </q-item>

      <template v-if="row">
        <q-separator class="q-my-sm" />

        <q-item
          clickable
          v-close-popup
          tabindex="0"
          @click="downloadPdf(row.id)"
        >
          <q-item-section avatar class="q-py-sm">
            <q-avatar class="bg-on-dark" size="sm">
              <q-icon name="o_print" size="20px" />
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
        <q-item-section class="q-py-sm" avatar>
          <q-avatar class="bg-on-dark" size="sm">
            <q-icon name="o_print" size="20px" />
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <div class="text-body2 no-letter-spacing">
            {{ $t("shared.labels.printBatch") }}
          </div>
        </q-item-section>
      </q-item>
    </template>
  </toolbar-desktop>
</template>

<script setup>
  import { useDataTable } from "src/composables/useDataTable";

  import ToolbarDesktop from "components/shared/ToolBarDesktop.vue";

  const props = defineProps({
    toolbar: Boolean,
    title: String,
    tableStore: useDataTable,
    crudStore: Object,
    selectedIds: Array,
    baseRoute: { type: String, default: "acc/voucher" },
  });

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
