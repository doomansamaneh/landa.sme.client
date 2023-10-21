<template>
  <div class="row q-gutter-lg q-px-sm q-pb-sm">
    <div class="col">
      <div class="q-gutter-md">
        <div>
          <q-item-label
            caption
            class="q-mb-sm"
          >شناسه ملی</q-item-label>
          <q-input
            outlined
            dense
          />
        </div>
        <div>
          <q-item-label
            caption
            class="q-mb-sm"
          >شماره ثبت</q-item-label>
          <q-input
            outlined
            dense
          />
        </div>
        <div>
          <q-item-label
            caption
            class="q-mb-sm"
          >شماره کارگاه بیمه</q-item-label>
          <q-input
            outlined
            dense
          />
        </div>
      </div>
    </div>
    <div class="col">
      <div class="q-gutter-md">
        <div>
          <q-item-label
            caption
            class="q-mb-sm"
          >شناسه اقتصادی</q-item-label>
          <q-input
            outlined
            dense
          />
        </div>
        <div>
          <q-item-label
            caption
            class="q-mb-sm"
          >تاریخ ثبت</q-item-label>
          <date-time />
        </div>
        <div>
          <q-item-label
            caption
            class="q-mb-sm"
          >شرح</q-item-label>
          <q-input
            v-model="text"
            outlined
            type="textarea"
            autogrow
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import DateTime from "src/components/shared/Forms/DateTimePicker.vue"

const selectedContactType = ref(null)
const status = ref(false)

const items = [
  {
    label: 'نشانی اداره',
    value: 'office',
    icon: 'o_apartment'
  },
  {
    label: 'نشانی کارخانه',
    value: 'factory',
    icon: 'o_factory'
  },
  {
    label: 'نشانی خانه',
    value: 'home',
    icon: 'o_home'
  },
  {
    label: 'نشانی دفتر فروش',
    value: 'salesOffice',
    icon: 'o_apartment'
  },
  {
    label: 'نشانی دفتر مرکزی',
    value: 'headquarter',
    icon: 'o_apartment'
  },
]

</script>
<style scoped>
.q-item__label--caption {
  font-size: 16px;
  letter-spacing: 0;
  color: #697588;
}
</style>
