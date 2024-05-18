<template>
  <template v-if="$q.screen.xs">
    <toolbar-mobile
      v-if="toolbar"
      buttons
      :table-store="mobileGrid?.tableStore"
      :crud-store="crudStore"
      :title="title"
      :base-route="baseRoute"
      activation
    ></toolbar-mobile>

    <mobile
      :grid-store="gridStore"
      :crud-store="crudStore"
      :title="title"
      ref="mobileGrid"
    />
  </template>
  <template v-else>
    <toolbar-desktop
      v-if="toolbar"
      :table-store="desktopGrid?.tableStore"
      :crud-store="crudStore"
      :title="title"
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
        <q-item clickable v-close-popup tabindex="0">
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

        <q-item v-if="row" clickable v-close-popup tabindex="0">
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
          <q-item clickable v-close-popup tabindex="0">
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

          <q-item clickable v-close-popup tabindex="0">
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

          <q-item clickable v-close-popup tabindex="0">
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

        <q-item clickable v-close-popup tabindex="0">
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

    <desktop
      :grid-store="gridStore"
      :crud-store="crudStore"
      :base-route="baseRoute"
      :title="title"
      data-source="acc/voucher/getGridData"
      ref="desktopGrid"
    />
  </template>
</template>

<script setup>
  import { ref, computed } from "vue";
  import { useQuasar } from "quasar";
  import { useI18n } from "vue-i18n";
  import { useFormActions } from "src/composables/useFormActions";
  import { useBaseInfoGrid } from "src/components/areas/_shared/_composables/useBaseInfoGrid";
  import { useVoucherState } from "src/components/areas/acc/_composables/useVoucherState";

  import ToolbarDesktop from "components/shared/ToolBarDesktop.vue";
  import ToolbarMobile from "components/shared/ToolBarMobile.vue";
  import Desktop from "../../desktop/index/DataGrid.vue";
  import Mobile from "../../mobile/index/DataGrid.vue";

  import EditBatch from "src/components/areas/sls/invoice/shared/forms/EditBatchDialog.vue";

  const props = defineProps({
    toolbar: Boolean,
  });

  const { t } = useI18n();

  const title = t("main-menu-items.Acc_Voucher_View");
  const baseRoute = "acc/voucher";

  const $q = useQuasar();

  const accountStore = useVoucherState();
  const gridStore = useBaseInfoGrid(accountStore);
  const crudStore = useFormActions(baseRoute);
  const desktopGrid = ref(null);
  const mobileGrid = ref(null);

  const selectedIds = computed(() => {
    if (desktopGrid?.value != null)
      return desktopGrid.value.tableStore.selectedRows?.value.map(
        (item) => item.id
      );
    else
      return mobileGrid.value.tableStore.selectedRows?.value.map(
        (item) => item.id
      );
  });

  function editBatch() {
    $q.dialog({
      component: EditBatch,
      componentProps: {
        selectedIds: selectedIds?.value,
      },
    }).onOk(async () => {
      await reloadData();
    });
  }
</script>
