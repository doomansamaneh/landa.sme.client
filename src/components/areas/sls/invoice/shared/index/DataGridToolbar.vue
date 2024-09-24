<template>
  <template v-if="$q.screen.xs">
    <toolbar-mobile
      :table-store="tableStore"
      :crud-store="crudStore"
      :title="title"
      base-route="sls/invoice"
      activation
      search-btn
    >
      <template #buttons-custom>
        <q-separator size="0.5px" class="q-my-sm" />
        <q-item
          clickable
          v-close-popup
          tabindex="0"
          @click="editBatch"
        >
          <div class="q-py-sm">
            <q-item-section avatar>
              <q-avatar class="bg-on-dark" size="sm">
                <q-icon name="o_edit" />
              </q-avatar>
            </q-item-section>
          </div>
          <q-item-section>
            <div class="text-body2 no-letter-spacing">
              {{ $t("shared.labels.editBatch") }}
            </div>
          </q-item-section>
        </q-item>
      </template>

      <template #search-btn>
        <q-btn
          round
          class="q-mr-sm"
          unelevated
          dense
          v-if="!tableStore?.activeRow?.value"
        >
          <q-icon name="sort" />
        </q-btn>
        <q-btn
          round
          unelevated
          dense
          v-if="!tableStore?.activeRow?.value"
          @click="showSearchModal"
        >
          <q-icon name="o_filter_alt" />
        </q-btn>
      </template>
    </toolbar-mobile>
  </template>
  <template v-else>
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
          @click="
            formStore.cancelInvoice(row.id, tableStore.reloadData)
          "
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
            @click="formStore.downloadPdf(row.id)"
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
          @click="formStore.downloadBatchPdf()"
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
</template>

<script setup>
  import { ref, computed } from "vue";
  import { useQuasar } from "quasar";
  import { useDataTable } from "src/composables/useDataTable";

  import { useFormActions } from "src/composables/useFormActions";
  import { useInvoiceModel } from "../../../_composables/useInvoiceModel";

  import ToolbarDesktop from "components/shared/ToolBarDesktop.vue";
  import ToolbarMobile from "components/shared/ToolBarMobile.vue";

  import EditBatch from "src/components/areas/sls/invoice/shared/forms/EditBatchDialog.vue";
  import ReorderInvoice from "src/components/areas/sls/invoice/shared/forms/ReorderDialog.vue";

  const props = defineProps({
    toolbar: Boolean,
    title: String,
    tableStore: useDataTable,
  });

  const baseRoute = "sls/Invoice";
  const $q = useQuasar();

  const crudStore = useFormActions(baseRoute);
  const formStore = useInvoiceModel({ baseRoute: baseRoute });

  const selectedIds = computed(() =>
    props.tableStore.selectedRows?.value.map((item) => item.id)
  );

  function editBatch() {
    $q.dialog({
      component: EditBatch,
      componentProps: {
        selectedIds: selectedIds?.value,
      },
    }).onOk(async () => {
      await props.tableStore.reloadData();
    });
  }

  function reorder() {
    $q.dialog({
      component: ReorderInvoice,
    }).onOk(async () => {
      await props.tableStore.reloadData();
    });
  }
</script>
