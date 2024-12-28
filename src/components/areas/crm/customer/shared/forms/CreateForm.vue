<template>
  <q-form ref="form" autofocus>
    <master-section :form-store="formStore" />
    <detail-section :form-store="formStore" />
  </q-form>
</template>

<script setup>
  import { onMounted, ref } from "vue";
  import { useRoute } from "vue-router";
  import { useCustomerModel } from "../../../_composables/useCustomerModel";

  import MasterSection from "./_MasterSection.vue";
  import DetailSection from "./_DetailSection.vue";

  const props = defineProps({
    title: String,
    action: String,
  });

  const form = ref(null);
  const route = useRoute();
  const formStore = useCustomerModel({
    baseRoute: "crm/customer",
  });

  async function submitForm(callBack) {
    return await formStore.submitForm(
      form.value,
      props.action,
      callBack
    );
  }

  onMounted(() => {
    formStore.getById(route.params.id);
  });

  defineExpose({
    submitForm,
  });
</script>
