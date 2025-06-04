<template>
  <div class="row q-col-gutter-lg">
    <div class="col-md col-sm col-xs-12">
      <div class="q-gutter-lg">
        <div>
          <custom-input
            label="شناسه ملی"
            v-model="model.nationalNo"
          />
        </div>
        <div>
          <custom-input label="شماره ثبت" v-model="model.regNo" />
        </div>
        <div>
          <custom-input
            label="شماره کارگاه بیمه"
            v-model="model.insuranceWorkNo"
          />
        </div>
      </div>
    </div>
    <div class="col-md col-sm col-xs-12">
      <div class="q-gutter-lg">
        <div>
          <custom-input label="کد اقتصادی" v-model="model.taxNo" />
        </div>
        <div>
          <date-time label="تاریخ ثبت" v-model="model.regDate" />
        </div>
        <div>
          <custom-input label="شعبه" v-model="model.branchNo" />
        </div>
      </div>
    </div>
  </div>
  <div class="row q-mt-lg">
    <div class="col-12">
      <custom-input
        label="شرح"
        v-model="model.comment"
        type="textarea"
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
