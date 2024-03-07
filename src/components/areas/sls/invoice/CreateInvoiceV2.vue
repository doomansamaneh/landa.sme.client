<template>
  <div class="row q-gutter-x-xs" style="margin-top: 54px">
    <div style="width: 22%">
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
import ToolBar from "src/components/shared/ToolBar.vue";
import MasterSection from "src/components/areas/sls/invoice/desktop/forms/MasterSectionV2.vue";
import DetailSection from "src/components/areas/sls/invoice/desktop/forms/DetailSectionV2.vue";
import QuickAccess from "src/components/areas/sls/invoice/desktop/forms/QuickAccess.vue";
</script>
