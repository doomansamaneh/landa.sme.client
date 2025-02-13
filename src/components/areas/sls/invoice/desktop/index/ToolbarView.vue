<template>
  <toolbar-desktop
    :title="title"
    :table-store="tableStore"
    :crud-store="crudStore"
    :base-route="baseRoute"
    buttons
    margin
  >
    <template #buttons-create>
      <q-btn
        class="primary-gradient primary-shadow text-white text-body2"
        rounded
        unelevated
        no-caps
      >
        <q-icon size="20px" name="o_add" class="q-mr-xs" />
        {{ $t("shared.labels.create") }}

        <q-menu class="border-radius-lg" cover>
          <q-list dense padding style="width: 200px">
            <menu-item
              :to="`/${baseRoute}/create`"
              icon="o_add"
              :title="$t('shared.labels.create')"
            />

            <menu-item
              :to="`/${baseRoute}/createV2`"
              icon="o_bolt"
              :title="$t('shared.labels.createV2')"
            />
          </q-list>
        </q-menu>
      </q-btn>
    </template>

    <template #bootons-edit="{ row }">
      <menu-button-edit :to="`/${baseRoute}/edit/${row.id}`" />
      <menu-button-copy :to="`/${baseRoute}/copy/${row.id}`" />
    </template>

    <template #buttons-batch-action>
      <menu-button
        @click="editBatch"
        :title="$t('shared.labels.editBatch')"
        icon="o_edit"
        :badge-count="selectedIds?.length"
      />
    </template>

    <template #buttons-custom="{ row }">
      <menu-item
        :title="$t('shared.labels.reorder')"
        icon="o_cached"
        @click="reorder"
      />
      <q-separator class="q-my-sm" />

      <template v-if="row">
        <menu-item
          :title="$t('shared.labels.cancelInvoice')"
          icon="o_close"
          @click="cancelInvoice(row.id)"
        />

        <menu-item
          :title="$t('shared.labels.copyToPurchase')"
          icon="o_shopping_cart"
          :to="`/sls/purchase/copy/${row.id}`"
        />

        <menu-item
          :title="$t('shared.labels.salesReturn')"
          icon="o_undo"
          :to="`/sls/salesReturn/createFromInvoice/${row.id}`"
        />

        <q-separator class="q-my-sm" />

        <menu-item
          :title="$t('shared.labels.print')"
          icon="o_print"
          @click="downloadPdf(row.id)"
        />
      </template>

      <menu-item
        :title="$t('shared.labels.printBatch')"
        icon="o_print"
        @click="downloadBatchPdf()"
      />
    </template>
  </toolbar-desktop>
</template>

<script setup>
  import ToolbarDesktop from "components/shared/ToolBarDesktop.vue";
  import MenuItem from "src/components/shared/buttons/MenuItem.vue";
  import MenuButton from "src/components/shared/buttons/MenuButton.vue";
  import MenuButtonEdit from "src/components/shared/buttons/MenuButtonEdit.vue";
  import MenuButtonCopy from "src/components/shared/buttons/MenuButtonCopy.vue";

  const props = defineProps({
    title: String,
    tableStore: Object,
    crudStore: Object,
    selectedIds: Array,
    baseRoute: { type: String, default: "sls/invoice" },
  });

  const emits = defineEmits([
    "downloadPdf",
    "download-batch-pdf",
    "reorder",
    "edit-batch",
    "cancel-invoice",
  ]);

  function downloadPdf(id) {
    emits("download-pdf", id);
  }

  function downloadBatchPdf() {
    emits("download-batch-pdf");
  }

  function editBatch() {
    emits("edit-batch");
  }

  function reorder() {
    emits("reorder");
  }

  function cancelInvoice(id) {
    emits("cancel-invoice", id);
  }
</script>
