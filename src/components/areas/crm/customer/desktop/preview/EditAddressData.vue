<template>
  <div class="row q-gutter-lg q-px-sm q-pb-sm">
    <div class="col-4">
      <div>
        <q-item-label
          caption
          class="q-mb-sm"
        >نوع تماس</q-item-label>
        <q-select
          hide-dropdown-icon
          dense
          v-model="selectedContactType"
          @update:model-value="selectedContactType"
          :options="items"
          behavior="menu"
          outlined
          auto-close
          class="period-select"
        >
          <template #append>
            <q-icon
              name="o_expand_more"
              class="show-lookup-icon cursor-pointer"
              size="sm"
            />
          </template>
          <template v-slot:option="scope">
            <q-item
              v-bind="scope.itemProps"
              clickable
              v-close-popup
              tabindex="0"
            >
              <div class="q-py-sm">
                <q-item-section avatar>
                  <q-avatar
                    class="bg-on-dark"
                    size="sm"
                  ><q-icon
                      :name="scope.opt.icon"
                      size="14px"
                    /></q-avatar>
                </q-item-section>
              </div>
              <q-item-section>
                <div class="text-caption">{{ scope.opt.label }}</div>
              </q-item-section>
            </q-item>
          </template>
        </q-select>
      </div>
    </div>
    <div class="col-4">
      <div>
        <q-item-label
          caption
          class="q-mb-sm"
        >محل جغرافیایی</q-item-label>
        <organ-unit-lookup />
      </div>
    </div>
    <div class="col">

    </div>
  </div>
  <div class="col">
    <div class="q-mx-sm q-my-sm">
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
  <div class="row q-gutter-x-lg q-px-sm q-mt-md">
    <div class="col">
      <div>
        <q-item-label
          caption
          class="q-mb-sm"
        >طبقه</q-item-label>
        <q-input
          outlined
          dense
        />
      </div>
    </div>
    <div class="col">
      <div>
        <q-item-label
          caption
          class="q-mb-sm"
        >بخش</q-item-label>
        <q-input
          outlined
          dense
        />
      </div>
    </div>
    <div class="col">
      <div>
        <q-item-label
          caption
          class="q-mb-sm"
        >اتاق</q-item-label>
        <q-input
          outlined
          dense
        />
      </div>
    </div>
  </div>
  <div class="row q-gutter-x-lg q-mt-md q-pb-sm q-px-sm">
    <div class="col">
      <div>
        <q-item-label
          caption
          class="q-mb-sm"
        >کد پستی</q-item-label>
        <q-input
          outlined
          dense
        />
      </div>
    </div>
    <div class="col">
      <div>
        <q-item-label
          caption
          class="q-mb-sm"
        >صندوق پستی</q-item-label>
        <q-input
          outlined
          dense
        />
      </div>
    </div>
    <div class="col">
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
  </div>
</template>

<script setup>
import { ref } from "vue"
import OrganUnitLookup from "src/components/shared/Lookups/OrganUnitLookup.vue"

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
