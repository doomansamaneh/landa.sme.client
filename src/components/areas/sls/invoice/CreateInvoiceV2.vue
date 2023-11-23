<template>
  <tool-bar>
    <template #header>
      <q-badge
        v-if="tableStore?.pagination.value.totalItems > 0"
        rounded
        outline
        :label="tableStore?.pagination.value.totalItems"
        class="q-mr-sm bg-dark text-on-dark text-body2"
      />
      <span class="text-h6">ایجاد فاکتور فروش</span>
    </template>
    <template #buttons>
      <q-btn
        class="bg-primary text-white text-caption"
        padding="6px 12px"
        rounded
        no-caps
        unelevated
      >
        <q-icon
          name="o_add"
          class="q-mr-xs"
        />
        {{ $t("shared.labels.save") }}
      </q-btn>
      <q-btn
        class="bordered-btn_bg-dark text-caption"
        rounded
        unelevated
      >
        <q-icon
          name="more_horiz"
          class="q-mr-xs"
        />
        {{ $t("shared.labels.more") }}
      </q-btn>
    </template>
  </tool-bar>
  <div
    class="row q-gutter-x-xs"
    style="margin-top: 40px;"
  >
    <div style="width: 22%;">
      <quick-access />
    </div>

    <div class="col">
      <q-card class="bordered no-shadow q-pa-md fit">
        <q-card-section>
          <master-section />
        </q-card-section>
        <q-card-section class="q-mt-lg">
          <detail-section />
        </q-card-section>
      </q-card>

    </div>

  </div>
</template>

<script setup>
import ToolBar from "src/components/shared/ToolBar.vue"
import MasterSection from "src/components/areas/sls/invoice/create/MasterSectionV2.vue"
import DetailSection from "src/components/areas/sls/invoice/create/DetailSectionV2.vue"
import QuickAccess from "src/components/areas/sls/invoice/create/QuickAccess.vue"
</script>

