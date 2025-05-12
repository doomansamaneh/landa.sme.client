<template>
  <mobile :model="model" :load-data="loadData" />
  <desktop :model="model" :load-data="loadData" />
</template>

<script setup>
  import { onMounted, ref } from "vue";
  import { useRoute } from "vue-router";
  import { useFormActions } from "src/composables/useFormActions";

  import Desktop from "src/components/management/payment/paymentDetail/desktop/DetailView.vue";
  import Mobile from "src/components/management/payment/paymentDetail/mobile/DetailView.vue";

  const model = ref({});
  const route = useRoute();
  const actionStore = useFormActions("business", model, true);
  const loadData = async () => {
    const id = route.params.paymentId;
    const responseData = await actionStore.getById(
      id,
      "business/GetPayment",
      false
    );
  };

  onMounted(() => {
    loadData();
  });
</script>
