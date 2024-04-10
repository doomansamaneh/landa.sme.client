<template>
  <tool-bar margin :title="title" back-button />

  <q-card class="form-container">
    <q-card-section>
      <q-form ref="form" autofocus>
        <master-section :form-store="formStore" />
        <detail-section :form-store="formStore" />
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref } from "vue";
import { useBaseInfoModel } from "src/components/areas/_shared/_composables/useBaseInfoModel";
import { customerModel } from "src/models/areas/crm/customerModel";

import ToolBar from "src/components/shared/FormToolBar.vue";
import MasterSection from "./_MasterSection.vue";
import DetailSection from "./_DetailSection.vue";

const props = defineProps({
  title: String,
  action: String,
});

const form = ref(null);
const formStore = useBaseInfoModel({
  baseRoute: "crm/customer",
  model: customerModel,
});
</script>
