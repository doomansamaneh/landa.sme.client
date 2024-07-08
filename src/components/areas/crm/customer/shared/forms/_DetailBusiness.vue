<template>
  <div class="row q-col-gutter-lg">
    <div class="col-md col-sm col-xs-12">
      <div class="q-gutter-lg">
        <div>
          <q-item-label
            class="text-body2 no-letter-spacing caption-on-dark q-mb-sm"
          >
            شناسه ملی
          </q-item-label>
          <custom-input
            v-model="model.value.customerBusiness.nationalNo"
          />
        </div>
        <div>
          <q-item-label
            class="text-body2 no-letter-spacing caption-on-dark q-mb-sm"
          >
            شماره ثبت
          </q-item-label>
          <custom-input
            v-model="model.value.customerBusiness.regNo"
          />
        </div>
        <div>
          <q-item-label
            class="text-body2 no-letter-spacing caption-on-dark q-mb-sm"
          >
            شماره کارگاه بیمه
          </q-item-label>
          <custom-input
            v-model="model.value.customerBusiness.insuranceWorkNo"
          />
        </div>
      </div>
    </div>
    <div class="col-md col-sm col-xs-12">
      <div class="q-gutter-lg">
        <div>
          <q-item-label
            class="text-body2 no-letter-spacing caption-on-dark q-mb-sm"
          >
            شناسه اقتصادی
          </q-item-label>
          <custom-input
            v-model="model.value.customerBusiness.taxNo"
          />
        </div>
        <div>
          <q-item-label
            class="text-body2 no-letter-spacing caption-on-dark q-mb-sm"
          >
            تاریخ ثبت
          </q-item-label>
          <date-time v-model="model.value.customerBusiness.regDate" />
        </div>
        <div>
          <q-item-label
            class="text-body2 no-letter-spacing caption-on-dark q-mb-sm"
          >
            شرح
          </q-item-label>
          <custom-input
            v-model="model.value.customerBusiness.comment"
            type="textarea"
            autogrow
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { computed } from "vue";

  import CustomInput from "src/components/shared/forms/CustomInput.vue";
  import DateTime from "src/components/shared/forms/DateTimePicker.vue";

  const props = defineProps({
    formStore: Object,
  });

  const model = computed(() => props.formStore.model);
</script>
