<template>
  <q-form @submit.prevent="onSubmit" ref="form">
    <div class="q-mb-md">
      <custom-select
        v-model="model.typeId"
        :options="helper.getEnumOptions(feedbackType, 'feedbackType')"
        label="نوع"
        required
      />
    </div>

    <div class="q-mb-md">
      <custom-input
        label="شرح"
        type="textarea"
        v-model="model.comment"
        required
      />
    </div>

    <div class="row justify-end q-mt-md">
      <q-btn
        rounded
        unelevated
        color="primary"
        class="primary-shadow primary-gradient"
        type="submit"
      >
        <div class="text-body1">ارسال تیکت</div>
      </q-btn>
    </div>
  </q-form>
</template>

<script setup>
  import { ref } from "vue";
  import { defineEmits } from "vue";
  import { helper } from "src/helpers";
  import { feedbackType, guidEmpty } from "src/constants";
  import { useFormActions } from "src/composables/useFormActions";

  import CustomInput from "src/components/shared/forms/CustomInput.vue";
  import CustomSelect from "src/components/shared/forms/CustomSelect.vue";

  const model = ref({
    statusId: 1,
    userId: guidEmpty,
    businessId: guidEmpty,
  });
  const formStore = useFormActions("business", model);
  const form = ref(null);
  const emit = defineEmits(["submit"]);

  async function onSubmit() {
    const result = await formStore.submitForm(
      form.value,
      "addFeedback"
    );
    if (result) {
      emit("submit");
    }
  }
</script>
