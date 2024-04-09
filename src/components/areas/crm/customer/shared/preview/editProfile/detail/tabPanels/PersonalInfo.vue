<template>

  <q-form ref="form" class="q-mb-lg" autofocus>
    <div class="row q-col-gutter-lg">
      <div class="col-md col-sm col-xs-12">
        <div class="q-gutter-lg">
          <div>
            <q-item-label class="text-body2 no-letter-spacing caption-on-dark q-mb-sm">شرکت وابسته</q-item-label>
            <custom-input outlined dense />
          </div>
          <div>
            <q-item-label class="text-body2 no-letter-spacing caption-on-dark q-mb-sm">کد ملی</q-item-label>
            <custom-input outlined dense />
          </div>
          <div>
            <q-item-label class="text-body2 no-letter-spacing caption-on-dark q-mb-sm">شماره بیمه</q-item-label>
            <custom-input outlined dense />
          </div>
          <div>
            <q-item-label class="text-body2 no-letter-spacing caption-on-dark q-mb-sm">تاریخ تولد</q-item-label>
            <date-time />
          </div>
          <div>
            <q-item-label class="text-body2 no-letter-spacing caption-on-dark q-mb-sm">تاریخ صدور</q-item-label>
            <date-time />
          </div>
          <div>
            <q-item-label class="text-body2 no-letter-spacing caption-on-dark q-mb-sm">وضعیت نظام وظیفه</q-item-label>
            <custom-input outlined dense />
          </div>
          <div>
            <q-item-label class="text-body2 no-letter-spacing caption-on-dark q-mb-sm">وضعیت تاهل</q-item-label>
            <custom-input outlined dense />
          </div>
          <div>
            <q-item-label class="text-body2 no-letter-spacing caption-on-dark q-mb-sm">تعداد فرزند</q-item-label>
            <custom-input outlined dense />
          </div>
        </div>
      </div>
      <div class="col-md col-sm col-xs-12">
        <div class="q-gutter-lg">
          <div>
            <q-item-label class="text-body2 no-letter-spacing caption-on-dark q-mb-sm">شغل</q-item-label>
            <custom-input />
          </div>
          <div>
            <q-item-label class="text-body2 no-letter-spacing caption-on-dark q-mb-sm">شماره شناسنامه</q-item-label>
            <custom-input outlined dense />
          </div>
          <div>
            <q-item-label class="text-body2 no-letter-spacing caption-on-dark q-mb-sm">ملیت</q-item-label>
            <custom-input />
          </div>
          <div>
            <q-item-label class="text-body2 no-letter-spacing caption-on-dark q-mb-sm">محل تولد</q-item-label>
            <custom-input outlined dense />
          </div>
          <div>
            <q-item-label class="text-body2 no-letter-spacing caption-on-dark q-mb-sm">محل صدور</q-item-label>
            <custom-input outlined dense />
          </div>
          <div>
            <q-item-label class="text-body2 no-letter-spacing caption-on-dark q-mb-sm">نام پدر</q-item-label>
            <custom-input outlined dense />
          </div>
          <div>
            <q-item-label class="text-body2 no-letter-spacing caption-on-dark q-mb-sm">تاریخ ازدواج</q-item-label>
            <date-time />
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
