<template>
  <q-form @submit.prevent="onSubmit" ref="form">
    <div class="q-mb-md">
      <q-input
        v-model="ticketModel.title"
        label="عنوان"
        :rules="[(val) => !!val || 'عنوان الزامی است']"
        outlined
      />
    </div>

    <div class="q-mb-md">
      <q-select
        v-model="ticketModel.category"
        :options="categories"
        label="دسته‌بندی"
        :rules="[(val) => !!val || 'دسته‌بندی الزامی است']"
        outlined
      />
    </div>

    <div class="q-mb-md">
      <q-select
        v-model="ticketModel.priority"
        :options="priorities"
        label="اولویت"
        outlined
      />
    </div>

    <div class="q-mb-md">
      <q-input
        v-model="ticketModel.description"
        type="textarea"
        label="توضیحات"
        :rules="[(val) => !!val || 'توضیحات الزامی است']"
        outlined
      />
    </div>

    <div class="row justify-end q-mt-md">
      <q-btn label="ارسال تیکت" type="submit" color="primary" />
    </div>
  </q-form>
</template>

<script setup>
  import { ref } from "vue";

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
