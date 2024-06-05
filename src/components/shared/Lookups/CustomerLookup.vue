<template>
  <lookup-view
    dataSource="crm/customer/getlookupData"
    sortColumn="code"
    textTemplate="{{ code }} {{ name }}"
    searchField="name"
    columns="code,name"
    ref="lookup"
  >
    <template #td="{ row }">
      <q-item
        class="rounded-borders"
        style="padding: 12px;"
        clickable
        v-close-popup
      >
        <div class="row items-center-">
          <q-tooltip :delay="700" class="text-body3 custom-tooltip">
            <span v-if="row.code">{{ row.code }} -</span>
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
              class="ellipsis text-on-dark text-caption text-bold q-pb-xs"
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
    </template>

    <template #title>فروشنده</template>
  </lookup-view>
</template>

<script setup>
  import { ref } from "vue";
  import { helper } from "src/helpers";

  import LookupView from "src/components/shared/dataTables/LookupView.vue";

  const lookup = ref(null);

  defineExpose({
    lookup,
  });
</script>
