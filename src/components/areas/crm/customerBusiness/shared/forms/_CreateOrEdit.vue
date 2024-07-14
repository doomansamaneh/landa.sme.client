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
          <custom-input v-model="model.nationalNo" />
        </div>
        <div>
          <q-item-label
            class="text-body2 no-letter-spacing caption-on-dark q-mb-sm"
          >
            شماره ثبت
          </q-item-label>
          <custom-input v-model="model.regNo" />
        </div>
        <div>
          <q-item-label
            class="text-body2 no-letter-spacing caption-on-dark q-mb-sm"
          >
            شماره کارگاه بیمه
          </q-item-label>
          <custom-input v-model="model.insuranceWorkNo" />
        </div>
      </div>
    </div>
    <div class="col-md col-sm col-xs-12">
      <div class="q-gutter-lg">
        <div>
          <q-item-label
            class="text-body2 no-letter-spacing caption-on-dark q-mb-sm"
          >
            کد اقتصادی
          </q-item-label>
          <custom-input v-model="model.taxNo" />
        </div>
        <div>
          <q-item-label
            class="text-body2 no-letter-spacing caption-on-dark q-mb-sm"
          >
            تاریخ ثبت
          </q-item-label>
          <date-time v-model="model.regDate" />
        </div>
        <div>
          <q-item-label
            class="text-body2 no-letter-spacing caption-on-dark q-mb-sm"
          >
            شعبه
          </q-item-label>
          <custom-input v-model="model.branchNo" />
        </div>
      </div>
    </div>
  </div>
  <div class="row q-mt-lg">
    <div class="col-md-12">
      <q-item-label
        class="text-body2 no-letter-spacing caption-on-dark q-mb-sm"
      >
        شرح
      </q-item-label>
      <custom-input
        v-model="model.comment"
        type="textarea"
        autogrow
      />
    </div>
  </div>
</template>

<script setup>
  import { ref, computed } from "vue";

  import CustomInput from "src/components/shared/forms/CustomInput.vue";
  import DateTime from "src/components/shared/forms/DateTimePicker.vue";

  const props = defineProps({
    item: Object,
  });

  const model = computed(() => props.item);
</script>
