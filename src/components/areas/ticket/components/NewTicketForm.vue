<template>
  <q-form @submit.prevent="onSubmit" ref="form">
    <div class="q-mb-md">
      <custom-input
        v-model="ticketModel.title"
        label="عنوان"
        required
      />
    </div>

    <div class="q-mb-md">
      <custom-select
        v-model="ticketModel.category"
        :options="categories"
        label="دسته‌بندی"
        required
      />
    </div>

    <div class="q-mb-md">
      <custom-select
        v-model="ticketModel.priority"
        :options="priorities"
        label="اولویت"
      />
    </div>

    <div class="q-mb-md">
      <custom-input
        v-model="ticketModel.description"
        type="textarea"
        label="توضیحات"
        required
      />
    </div>

    <div class="row justify-end q-mt-md">
      <q-btn
        no-caps
        label="ارسال تیکت"
        type="submit"
        color="primary"
      />
    </div>
  </q-form>
</template>

<script setup>
  import { ref } from "vue";
  import CustomInput from "src/components/shared/Forms/CustomInput.vue";
  import CustomSelect from "src/components/shared/Forms/CustomSelect.vue";

  const props = defineProps({
    ticketModel: {
      type: Object,
      required: true,
    },
  });

  const emit = defineEmits(["submit"]);

  const form = ref(null);

  const categories = [
    "مشکل فنی",
    "درخواست ویژگی جدید",
    "گزارش خطا",
    "پرسش عمومی",
    "سایر",
  ];

  const priorities = [
    { label: "کم", value: "low" },
    { label: "متوسط", value: "medium" },
    { label: "زیاد", value: "high" },
  ];

  async function onSubmit() {
    try {
      const isValid = await form.value.validate();
      if (!isValid) return;
      emit("submit", form.value);
    } catch (error) {
      console.error("Form validation error:", error);
    }
  }
</script>
