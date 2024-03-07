<template>
  <tool-bar :title="title" :submit-call-back="submitForm"> </tool-bar>
  <div class="form-container">
    <q-form ref="form" autofocus>
      <q-card>
        <q-card-section>
          <master-section :form-store="formStore" />
        </q-card-section>
        <q-card-section>
          <detail-section :form-store="formStore" />
        </q-card-section>
      </q-card>
    </q-form>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useInvoiceModel } from "src/components/areas/sls/_composables/useInvoiceModel";

import ToolBar from "src/components/shared/FormToolBar.vue";
import MasterSection from "./v1/MasterSection.vue";
import DetailSection from "./v1/DetailSection.vue";

const props = defineProps({
  action: String,
  title: String,
});

const form = ref(null);
const route = useRoute();
const router = useRouter();
const formStore = useInvoiceModel();

onMounted(() => {
  formStore.crudStore.getById(route.params.id);
});

async function submitForm() {
  await form.value.validate().then(async (success) => {
    if (success) {
      const response = await formStore.crudStore.createOrEdit(props.action);
      if (response?.data?.code === 200) router.back();
    } else {
      //todo: how to show validation message to user
      alert("validation error");
    }
  });
}
</script>
