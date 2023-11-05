<template>
  <lookup-view
    dataSource="crm/customer/getlookupData"
    orderByField="code"
    textTemplate="{{ code }} {{ name }}"
    searchField="name"
    ref="lookup"
  >
    <template #thead>
      <div class="row items-center">
        <div class="col-1">#</div>
        <div class="col-2">
          <header-column
            fieldName="code"
            title="کد"
            :lookup="lookup"
          />
        </div>
        <div class="col q-pr-md">
          <header-column
            fieldName="name"
            title="نام"
            :lookup="lookup"
          />
        </div>
        <q-btn
          dense
          unelevated
          color="primary"
          class="q-py-sm q-px-md"
          rounded
        >
          <q-icon
            name="o_add"
            size="xs"
            class="q-pr-xs"
          />
          <span class="text-caption">ایجاد</span>
        </q-btn>
      </div>
    </template>

    <template #td="{ row, index }">
      <div class="col-1 row items-center text-caption">{{ index + 1 }}</div>
      <div class="col-2 row items-center text-caption">{{ row.code }}</div>

      <div class="col-9">
        <q-item class="q-pa-none">
          <div class="row q-gutter-x-md items-center">
            <q-item-section avatar>
              <q-avatar
                v-if="row.avatar"
                color="primary"
                text-color="white"
                size="42px"
              >
                <img :src="row.avatar">
              </q-avatar>

              <q-avatar
                size="42px"
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
                style="width:200px"
              >
                {{ row.name }}
              </q-item-label>
              <q-item-label
                v-if="row.locationName"
                caption
                class="ellipsis q-mt-xs"
                style="width: 350px;"
              >
                <q-icon
                  name="o_location_on"
                  size="13px"
                  color="primary"
                />
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
      </div>
    </template>
  </lookup-view>
</template>

<script setup>
import { ref } from "vue"
import LookupView from "src/components/shared/DataTables/LookupView.vue"
import HeaderColumn from "src/components/shared/Lookups/HeaderColumn.vue"
import { helper } from "src/helpers"

const lookup = ref(null)

defineExpose({
  lookup
})
</script>

<style></style>
