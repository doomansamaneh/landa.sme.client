<template>
  <q-form ref="form" autofocus>
    <div>
      <q-item-label
        class="caption-on-dark text-body2 no-letter-spacing q-mb-sm"
      >
        ش شروع
      </q-item-label>
      <custom-input-number
        v-model="formStore.model.value.startNo"
        style="width: 50%"
      />
    </div>
  </q-form>
</template>

<script setup>
  import { ref } from "vue";
  import { useInvoiceModel } from "src/components/areas/sls/_composables/useInvoiceModel";
  import { invoiceReorderModel } from "src/models/areas/sls/invoiceModel";
  import CustomInputNumber from "src/components/shared/forms/CustomInputNumber.vue";

  const form = ref(null);
  const model = ref(invoiceReorderModel);
  const formStore = useInvoiceModel({
    baseRoute: "sls/invoice",
    model: model,
  });

  async function submitForm() {
    try {
      const isValid = await form.value.validate();

      if (isValid) {
        await formStore.reorder();
        return true;
      } else {
        // alert("Validation error");
        return false;
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      return false;
    }
  }

  defineExpose({
    submitForm,
  });
</script>
