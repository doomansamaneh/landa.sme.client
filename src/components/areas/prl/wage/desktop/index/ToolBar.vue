<template>
  <toolbar-desktop
    v-if="tableStore"
    :table-store="tableStore"
    :crud-store="crudStore"
    :title="$t('main-menu-items.Prl_Wage_View')"
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
        v-if="row"
        clickable
        v-close-popup
        tabindex="0"
        @click="exportInsurance(row.id)"
      >
        <q-item-section avatar class="q-py-sm">
          <q-avatar class="bg-on-dark" size="sm">
            <q-icon name="o_save" size="20px" />
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <div class="text-body2 no-letter-spacing">
            {{ $t("shared.labels.downloadInsurrance") }}
          </div>
        </q-item-section>
      </q-item>

      <q-item
        v-if="row"
        clickable
        v-close-popup
        tabindex="0"
        @click="exportTax(row.id)"
      >
        <q-item-section avatar class="q-py-sm">
          <q-avatar class="bg-on-dark" size="sm">
            <q-icon name="o_save" size="20px" />
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <div class="text-body2 no-letter-spacing">
            {{ $t("shared.labels.downloadTax") }}
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
  </toolbar-desktop>
</template>

<script setup>
  import ToolbarDesktop from "components/shared/ToolBarDesktop.vue";
  import { useWageModel } from "../../../_composables/useWageModel";

  const props = defineProps({
    tableStore: Object,
    crudStore: Object,
  });

  const baseRoute = "prl/wage";
  const formStore = useWageModel({ baseRoute: baseRoute });

  const exportTax = (id) => {
    formStore.exportTax(id);
  };
  const exportInsurance = (id) => {
    formStore.exportInsurance(id);
  };
</script>
