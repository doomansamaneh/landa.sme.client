<template>
  <tool-bar
    :title="title"
    @submit-call-back="formStore.crudStore.submitForm(form, action)"
  />

  <q-card class="form-container">
    <q-card-section>
      <q-form ref="form" autofocus> </q-form>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref } from "vue";
import { helper } from "src/helpers";
import { useBaseInfoModel } from "src/components/areas/_shared/_composables/useBaseInfoModel";
import { customerModel } from "src/models/areas/crm/customerModel";

import ToolBar from "src/components/shared/FormToolBar.vue";
import CustomInput from "src/components/shared/forms/CustomInput.vue";
import CustomSelect from "src/components/shared/forms/CustomSelect.vue";

const props = defineProps({
  action: String,
  title: String,
});

const form = ref(null);
const formStore = useBaseInfoModel({
  baseRoute: "crm/customer",
  model: customerModel,
});
</script>
