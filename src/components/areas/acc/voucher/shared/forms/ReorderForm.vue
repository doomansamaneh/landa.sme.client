<template>
  <q-form ref="form" autofocus>
    <div>
      <q-item-label class="caption-on-dark text-body2 q-mb-sm">
        {{ $t("shared.columns.startNo") }}
      </q-item-label>
      <custom-input-number
        v-model="model.startNo"
        style="width: 50%"
      />
    </div>
  </q-form>
</template>

<script setup>
  import { ref } from "vue";

  import { useAccountingOperations } from "../../../_composables/useAccountingOperations";
  import CustomInputNumber from "src/components/shared/forms/CustomInputNumber.vue";

  const form = ref(null);
  const model = ref({ startNo: 1 });
  const operationStore = useAccountingOperations();

  async function submitForm() {
    const isValid = await form.value.validate();
    if (isValid) {
      await operationStore.reorder(model);
      return true;
    }
    return false;
  }

  defineExpose({
    submitForm,
  });
</script>
