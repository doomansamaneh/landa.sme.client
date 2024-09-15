<template>
  <template v-if="$q.screen.xs">
    <toolbar-mobile
      buttons
      :table-store="tableStore"
      :crud-store="crudStore"
      :title="title"
      :base-route="baseRoute"
      activation
    ></toolbar-mobile>
  </template>
  <template v-else>
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
        <q-item
          clickable
          v-close-popup
          tabindex="0"
          @click="operationStore?.reorder(tableStore.reloadData)"
        >
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
  </template>
</template>

<script setup>
  import { ref, computed } from "vue";
  import { useQuasar } from "quasar";
  import { useDataTable } from "src/composables/useDataTable";

  import { useFormActions } from "src/composables/useFormActions";
  import { useAccountingOperations } from "../../../_composables/useAccountingOperations";

  import ToolbarDesktop from "components/shared/ToolBarDesktop.vue";
  import ToolbarMobile from "components/shared/ToolBarMobile.vue";

  //import EditBatch from "../../desktop/forms/edi";

  const props = defineProps({
    toolbar: Boolean,
    title: String,
    tableStore: Object,
  });

  const baseRoute = "acc/voucher";
  const $q = useQuasar();

  const crudStore = useFormActions(baseRoute);
  const operationStore = useAccountingOperations();

  const selectedIds = computed(() =>
    props.tableStore.selectedRows?.value.map((item) => item.id)
  );

  // function editBatch() {
  //   $q.dialog({
  //     component: EditBatch,
  //     componentProps: {
  //       selectedIds: selectedIds?.value,
  //     },
  //   }).onOk(async () => {
  //     await reloadData();
  //   });
  // }
</script>
