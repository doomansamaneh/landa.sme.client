<template>
  <lookup-view
    dataSource="crm/customer/getlookupData"
    orderByField="code"
    textTemplate="{{ code }} {{ name }}"
    searchField="name"
    ref="lookup"
  >
    <template #thead>
      <div class="row q-gutter-x-md items-center" style="width: 200px">
        <div class="col-5 q-pr-md">
          <header-column fieldName="name" title="نام" :lookup="lookup" />
        </div>
        <div class="col-4">
          <header-column fieldName="code" title="کد" :lookup="lookup" />
        </div>
        <q-btn
          dense
          unelevated
          color="primary"
          class="absolute-top-right q-py-xs q-px-sm q-mr-sm"
          style="margin-top: 12px"
          rounded
          size="12px"
        >
          <q-icon name="o_add" size="14px" style="margin-left: 2px" />
          <span class="text-caption">ایجاد</span>
        </q-btn>
      </div>
    </template>

    <template #td="{ row }">
      <q-item clickable v-close-popup>
        <div class="row q-gutter-x-md items-center q-my-md q-pl-sm">
          <q-tooltip :delay="700" class="text-body3 custom-tooltip">
            {{ row.name }} - {{ row.locationName }} {{ row.address }}
          </q-tooltip>
          <q-item-section avatar>
            <q-avatar
              v-if="row.avatar"
              color="primary"
              text-color="white"
              size="52px"
              square
              class="border-radius-xs"
            >
              <img :src="row.avatar" />
            </q-avatar>

            <q-avatar
              square
              class="border-radius-xs"
              size="52px"
              color="primary"
              text-color="white"
              v-else
            >
              <div class="char text-body1 text-bold">
                {{ helper.getFirstChar(row.name) }}
              </div>
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label
              class="ellipsis text-on-dark text-caption text-bold q-py-xs"
              style="width: 200px"
            >
              {{ row.code }} {{ row.name }}
            </q-item-label>
            <q-item-label
              v-if="row.locationName"
              caption
              class="ellipsis q-mt-xs"
              style="width: 200px"
            >
              <q-icon name="o_location_on" size="13px" color="primary" />
              {{ row.locationName }} {{ row.address }}
            </q-item-label>
            <q-item-label
              caption
              class="flex justify-end q-gutter-x-xs rtl"
              v-if="row.phoneNo"
            >
              {{ helper.separatePhoneNumbers(row.phoneNo) }}
              <q-icon
                name="o_phone"
                class="q-mr-xs"
                color="primary"
                size="13px"
              />
            </q-item-label>
            <q-item-label
              caption
              class="flex justify-end q-gutter-x-xs rtl"
              v-if="row.mobileNo"
            >
              {{ helper.separatePhoneNumbers(row.mobileNo) }}
              <q-icon
                name="o_phone_android"
                class="q-mr-xs"
                color="primary"
                size="13px"
              />
            </q-item-label>
          </q-item-section>
        </div>
      </q-item>
    </template>
  </lookup-view>
</template>

<script setup>
import { ref } from "vue";
import { helper } from "src/helpers";

import LookupView from "src/components/shared/dataTables/LookupView.vue";
import HeaderColumn from "src/components/shared/lookups/HeaderColumn.vue";

const lookup = ref(null);

defineExpose({
  lookup,
});
</script>
