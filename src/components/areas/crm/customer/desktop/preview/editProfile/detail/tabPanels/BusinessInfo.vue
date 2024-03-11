<template>

  <q-form ref="form" class="q-mb-lg" autofocus>
    <div class="row q-col-gutter-lg">
      <div class="col">
        <div class="q-gutter-md">
          <div>
            <q-item-label class="text-body2 no-letter-spacing caption-on-dark q-mb-sm">شناسه ملی</q-item-label>
            <custom-input outlined dense />
          </div>
          <div>
            <q-item-label class="text-body2 no-letter-spacing caption-on-dark q-mb-sm">شماره ثبت</q-item-label>
            <custom-input outlined dense />
          </div>
          <div>
            <q-item-label class="text-body2 no-letter-spacing caption-on-dark q-mb-sm">شماره کارگاه بیمه</q-item-label>
            <custom-input outlined dense />
          </div>
        </div>
      </div>
      <div class="col">
        <div class="q-gutter-md">
          <div>
            <q-item-label class="text-body2 no-letter-spacing caption-on-dark q-mb-sm">شناسه اقتصادی</q-item-label>
            <custom-input outlined dense />
          </div>
          <div>
            <q-item-label class="text-body2 no-letter-spacing caption-on-dark q-mb-sm">تاریخ ثبت</q-item-label>
            <date-time />
          </div>
          <div>
            <q-item-label class="text-body2 no-letter-spacing caption-on-dark q-mb-sm">شرح</q-item-label>
            <custom-input v-model="text" outlined type="textarea" autogrow />
          </div>
        </div>
      </div>
    </div>
  </q-form>

</template>

<script setup>
import { ref } from "vue"
import CustomInput from 'src/components/shared/forms/CustomInput.vue';
import DateTime from "src/components/shared/forms/DateTimePicker.vue"
</script>
