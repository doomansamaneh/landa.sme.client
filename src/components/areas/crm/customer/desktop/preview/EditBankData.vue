<template>
  <div class="row q-gutter-lg q-pb-sm q-px-sm">
    <div class="col">
      <div>
        <q-item-label
          caption
          class="q-mb-sm"
        >بانک</q-item-label>
        <!-- <organ-unit-lookup /> -->
      </div>
    </div>
    <div class="col">
      <div>
        <q-item-label
          caption
          class="q-mb-sm"
        >شماره حساب</q-item-label>
        <q-input
          dense
          outlined
        />
      </div>
    </div>
  </div>
  <div class="row q-gutter-lg q-pt-sm q-px-sm">
    <div class="col">
      <div>
        <q-item-label
          caption
          class="q-mb-sm"
        >شماره کارت</q-item-label>
        <q-input
          dense
          outlined
        />
      </div>
    </div>
    <div class="col">
      <div>
        <q-item-label
          caption
          class="q-mb-sm"
        >شماره شبا</q-item-label>
        <q-input
          dense
          outlined
        />
      </div>
    </div>
  </div>
  <div class="col">
    <div class="q-mx-sm q-my-md">
      <div>
        <q-item-label
          caption
          class="q-mb-sm"
        >نشانی</q-item-label>
        <q-input
          v-model="text"
          outlined
          type="textarea"
          autogrow
        />
      </div>
    </div>
  </div>
  <div class="row q-px-sm q-pb-sm">
    <div>
        <q-item-label
          caption
          class="q-mb-sm"
        >وضعیت</q-item-label>
        <q-checkbox
          dense
          v-model="type"
          val="customer"
          label="اصلی"
        />
      </div>
    </div>
</template>

<script setup>
import { ref } from "vue"
// import OrganUnitLookup from "src/components/shared/Lookups/OrganUnitLookup.vue"

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
