<template>
  <tool-bar
    :title="title"
    @submit-call-back="formStore.crudStore.submitForm(form, action)"
  />

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
import { vatModel } from "src/models/areas/cmn/vatModel";

import MasterSection from "./_MasterSection.vue";
import DetailSection from "./_DetailSection.vue";
import ToolBar from "src/components/shared/FormToolBar.vue";

const props = defineProps({
  action: String,
  title: String,
});

const form = ref(null);
const formStore = useBaseInfoModel({
  baseRoute: "cmn/vat",
  model: vatModel,
});
</script>
