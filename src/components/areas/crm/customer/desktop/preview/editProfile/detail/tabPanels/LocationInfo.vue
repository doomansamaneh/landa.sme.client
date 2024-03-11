<template>

  <q-form ref="form" autofocus class="q-mb-lg">
    <div class="row q-col-gutter-lg">
      <div class="col">
        <div class="row q-col-gutter-lg">
          <div class="col">
            <div>
              <q-item-label class="text-body2 no-letter-spacing caption-on-dark q-mb-sm">نوع تماس</q-item-label>
              <custom-input dense outlined />
            </div>
          </div>
          <div class="col">
            <div>
              <q-item-label class="text-body2 no-letter-spacing caption-on-dark q-mb-sm">محل جغرافیایی</q-item-label>
             <custom-input dense outlined />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col">
      <div class="q-my-md">
        <div>
          <q-item-label class="text-body2 no-letter-spacing caption-on-dark q-mb-sm">نشانی</q-item-label>
          <q-input v-model="text" outlined type="textarea" autogrow />
        </div>
      </div>
    </div>
    <div class="row q-gutter-x-lg">
      <div class="col">
        <div>
          <q-item-label class="text-body2 no-letter-spacing caption-on-dark q-mb-sm">طبقه</q-item-label>
          <custom-input outlined dense />
        </div>
      </div>
      <div class="col">
        <div>
          <q-item-label class="text-body2 no-letter-spacing caption-on-dark q-mb-sm">بخش</q-item-label>
          <custom-input outlined dense />
        </div>
      </div>
      <div class="col">
        <div>
          <q-item-label class="text-body2 no-letter-spacing caption-on-dark q-mb-sm">اتاق</q-item-label>
          <custom-input outlined dense />
        </div>
      </div>
    </div>
    <div class="row q-gutter-x-lg q-mt-md">
      <div class="col">
        <div>
          <q-item-label class="text-body2 no-letter-spacing caption-on-dark q-mb-sm">کد پستی</q-item-label>
          <custom-input outlined dense />
        </div>
      </div>
      <div class="col">
        <div>
          <q-item-label class="text-body2 no-letter-spacing caption-on-dark q-mb-sm">صندوق پستی</q-item-label>
          <custom-input outlined dense />
        </div>
      </div>
      <div class="col">
        <div>
          <q-item-label class="text-body2 no-letter-spacing caption-on-dark q-mb-sm">وضعیت</q-item-label>
          <q-checkbox size="46px" dense v-model="type" val="customer" label="اصلی" />
        </div>
      </div>
    </div>
  </q-form>

</template>

<script setup>
import { ref } from "vue"
import CustomInput from "src/components/shared/forms/CustomInput.vue"

const gender = ref(null)
const status = ref(false)
const type = ref([])
</script>

