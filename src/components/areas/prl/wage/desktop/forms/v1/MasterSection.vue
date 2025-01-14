<template>
  <div class="row q-col-gutter-md">
    <div class="col-md-3 col-sm-6 col-xs-12">
      <custom-select
        v-model="localFormStore.model.value.month"
        label="ماه"
        :options="months"
        required
      />
    </div>
    <div class="col-md-3 col-sm-6 col-xs-12">
      <date-time
        v-model="localFormStore.model.value.date"
        label="تاریخ"
        required
      />
    </div>
    <div class="col-md-3 col-sm-6 col-xs-12">
      <custom-input
        v-model="localFormStore.model.value.insuranceNo"
        label="کد کارگاه"
        required
      />
    </div>
  </div>

  <div class="row q-mt-md">
    <div class="col-md-9 col-sm-12 col-xs-12">
      <custom-input
        v-model="localFormStore.model.value.summary"
        label="شرح"
        type="textarea"
      />
    </div>
  </div>
</template>

<script setup>
  import { computed } from "vue";

  import DateTime from "src/components/shared/forms/DateTimePicker.vue";
  import CustomInput from "src/components/shared/forms/CustomInput.vue";
  import CustomSelect from "src/components/shared/forms/CustomSelect.vue";

  const props = defineProps({
    formStore: Object,
  });

  const localFormStore = computed(() => props.formStore);

  const months = computed(() =>
    Array.from({ length: 12 }, (_, i) => ({
      label: i + 1,
      value: i + 1,
    }))
  );
</script>
