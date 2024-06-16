<template>
  <div class="row q-col-gutter-md">
    <div class="col-md-3 col-sm-6 col-xs-12">
      <q-item-label caption class="q-mb-sm">ماه</q-item-label>
      <custom-select
        v-model="localFormStore.model.value.month"
        :options="months"
        hide-bottom-space
      />
    </div>
    <div class="col-md-3 col-sm-6 col-xs-12">
      <q-item-label caption class="q-mb-sm">تاریخ</q-item-label>
      <date-time
        v-model="localFormStore.model.value.date"
        hide-bottom-space
      />
    </div>
    <div class="col-md-3 col-sm-6 col-xs-12">
      <q-item-label caption class="q-mb-sm">کد کارگاه</q-item-label>
      <custom-input
        v-model="localFormStore.model.value.insuranceNo"
        hide-bottom-space
      />
    </div>
  </div>

  <div class="row q-mt-md">
    <div class="col-md-9 col-sm-12 col-xs-12">
      <q-item-label caption class="q-mb-sm">شرح</q-item-label>
      <custom-input
        v-model="localFormStore.model.value.summary"
        hide-bottom-space
      />
    </div>
  </div>
</template>

<script setup>
  import { ref, computed } from "vue";

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
