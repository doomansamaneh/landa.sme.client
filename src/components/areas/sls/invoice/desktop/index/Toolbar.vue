<template>
  <toolbar-desktop
    :title_="title"
    :table-store="tableStore"
    :crud-store="crudStore"
    :base-route="baseRoute"
    buttons
    margin
  >
    <template #buttons-create>
      <q-btn
        class="primary-gradient primary-shadow text-white text-body2 no-letter-spacing"
        padding="6px 12px"
        rounded
        no-caps
        unelevated
      >
        <q-icon size="20px" name="o_add" class="q-mr-sm" />
        {{ $t("shared.labels.create") }}

        <q-menu class="border-radius-lg" cover>
          <q-list dense padding style="width: 200px">
            <q-item
              clickable
              v-close-popup
              tabindex="0"
              :to="`/${baseRoute}/create`"
            >
              <div class="q-py-sm">
                <q-item-section avatar>
                  <q-avatar class="bg-on-dark" size="sm">
                    <q-icon name="o_add" size="20px" />
                  </q-avatar>
                </q-item-section>
              </div>
              <q-item-section>
                <div class="text-body2 no-letter-spacing">
                  {{ $t("shared.labels.create") }}
                </div>
              </q-item-section>
            </q-item>
            <q-item
              clickable
              v-close-popup
              tabindex="0"
              :to="`/${baseRoute}/createV2`"
            >
              <div class="q-py-sm">
                <q-item-section avatar>
                  <q-avatar class="bg-on-dark" size="sm">
                    <q-icon name="o_bolt" size="20px" />
                  </q-avatar>
                </q-item-section>
              </div>
              <q-item-section>
                <div class="text-body2 no-letter-spacing">
                  {{ $t("shared.labels.create") }} سریع
                </div>
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
      <!-- <q-btn
          class="primary-gradient primary-shadow text-white text-body2 no-letter-spacing"
          padding="6px 12px"
          rounded
          no-caps
          unelevated
          :to="`/${baseRoute}/create`"
        >
          <q-icon size="20px" name="o_add" class="q-mr-sm" />
          {{ $t("shared.labels.create") }}
        </q-btn>
        <q-btn
          class="text-body2 no-letter-spacing"
          padding="6px 12px"
          rounded
          no-caps
          unelevated
          :to="`/${baseRoute}/createV2`"
        >
          <q-icon size="20px" name="o_add" class="q-mr-sm" />
          {{ $t("shared.labels.create") }}v2
        </q-btn> -->
    </template>

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
    <template #buttons-batch-action>
      <q-btn
        padding="6px 12px"
        class="text-body2 no-letter-spacing"
        rounded
        unelevated
        no-caps
        @click="editBatch"
      >
        <q-icon size="20px" name="o_edit" class="q-mr-sm" />
        {{ $t("shared.labels.editBatch") }}
        <q-badge floating>
          {{ selectedIds?.length }}
        </q-badge>
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

      <q-separator class="q-my-sm" />

      <q-item
        v-if="row"
        clickable
        v-close-popup
        tabindex="0"
        @click="cancelInvoice(row.id)"
      >
        <q-item-section avatar class="q-py-sm">
          <q-avatar class="bg-on-dark text-red" size="sm">
            <q-icon name="o_close" size="20px" />
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <div class="text-body2 no-letter-spacing">
            {{ $t("shared.labels.cancelInvoice") }}
          </div>
        </q-item-section>
      </q-item>

      <template v-if="row">
        <q-item
          clickable
          v-close-popup
          tabindex="0"
          :to="`/sls/purchase/copy/${row.id}`"
        >
          <q-item-section avatar class="q-py-sm">
            <q-avatar class="bg-on-dark" size="sm">
              <q-icon name="o_shopping_cart" size="20px" />
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <div class="text-body2 no-letter-spacing">
              {{ $t("shared.labels.copyToPurchase") }}
            </div>
          </q-item-section>
        </q-item>

        <q-item
          clickable
          v-close-popup
          tabindex="0"
          :to="`/sls/salesReturn/createFromInvoice/${row.id}`"
        >
          <q-item-section avatar class="q-py-sm">
            <q-avatar class="bg-on-dark" size="sm">
              <q-icon name="o_undo" size="20px" />
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <div class="text-body2 no-letter-spacing">
              {{ $t("shared.labels.salesReturn") }}
            </div>
          </q-item-section>
        </q-item>

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
        @click="downloadBatchPdf()"
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
  import ToolbarDesktop from "components/shared/ToolBarDesktop.vue";

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
