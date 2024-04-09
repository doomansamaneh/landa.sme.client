<template>

  <div class="row" :class="$q.screen.gt.xs ? 'q-col-gutter-xl' : 'q-col-gutter-lg'">
    <div class="col-md-4 col-sm-4 col-xs-12">
      <div class="row justify-center items-center">
        <q-avatar size="200px" class="q-my-md">
          <img class="avatar" src="https://cdn.quasar.dev/img/avatar4.jpg">
        </q-avatar>
      </div>
      <div class="column items-center q-gutter-y-sm q-mt-sm">
        <q-btn style="width: 150px;" rounded flat class="primary-shadow bg-primary text-body2 text-white">آپلود تصویر جدید</q-btn>
        <q-btn style="width: 150px;" rounded flat class="text-body2 text-on-dark">حذف</q-btn>
      </div>
    </div>
    <div class="col-md col-sm col-xs-12">
      <div class="q-col-gutter-lg">
        <div>
          <q-item-label class="q-mb-sm text-body2 caption-on-dark no-letter-spacing">نام و نام خانوادگی</q-item-label>
          <custom-input outlined dense />
        </div>
        <div class="row q-col-gutter-lg">
          <div class="col-md-8 col-sm-8 col-xs-12">
            <q-item-label class="q-mb-sm text-body2 caption-on-dark no-letter-spacing">کد</q-item-label>
            <custom-input outlined dense />
          </div>
          <div class="col-md col-sm col-xs-12">
            <q-item-label class="q-mb-sm text-body2 caption-on-dark no-letter-spacing">جنسیت</q-item-label>
            <div class="row q-pt-xs q-col-gutter-md">
              <q-radio size="46px" class="text-body2 no-letter-spacing" name="shape" v-model="gender" val="man" label="مرد" dense />
              <q-radio size="46px" class="text-body2 no-letter-spacing" name="shape" v-model="gender" val="woman" label="زن" dense />
            </div>
          </div>
        </div>

        <div>
          <q-item-label class="q-mb-sm text-body2 caption-on-dark no-letter-spacing">واحد سازمانی</q-item-label>
          <custom-input />
        </div>
        <div>
          <q-item-label class="q-mb-sm text-body2 caption-on-dark no-letter-spacing">نقش</q-item-label>
          <div class="q-gutter-sm q-pt-xs">
            <q-checkbox size="46px" class="q-mb-sm text-body2 no-letter-spacing" dense v-model="type" val="customer" label="مشتری" />
            <q-checkbox size="46px" class="q-mb-sm text-body2 no-letter-spacing" dense v-model="type" val="supplier" label="تامین کننده" />
            <q-checkbox size="46px" class="q-mb-sm text-body2 no-letter-spacing" dense v-model="type" val="marketer" label="بازاریاب" />
            <q-checkbox size="46px" class="q-mb-sm text-body2 no-letter-spacing" dense v-model="type" val="shareholder" label="سهامدار" />
            <q-checkbox size="46px" class="q-mb-sm text-body2 no-letter-spacing" dense v-model="type" val="personnel" label="پرسنل" />
          </div>
        </div>
        <div>
          <q-item-label class="q-mb-sm text-body2 caption-on-dark no-letter-spacing">شرح</q-item-label>
          <custom-input v-model="text" outlined type="textarea" autogrow />
        </div>
        <div>
          <q-item-label class="q-mb-sm text-body2 caption-on-dark no-letter-spacing">وضعیت</q-item-label>
          <q-checkbox size="46px" class="q-mb-sm text-body2 no-letter-spacing" dense v-model="status" label="فعال" />
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref } from "vue"

import CustomInput from "src/components/shared/forms/CustomInput.vue"

const gender = ref(null)
const status = ref(false)
const type = ref([])

</script>

