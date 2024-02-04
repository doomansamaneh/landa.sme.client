<template>
  <q-card class="no-border no-shadow bg-transparent q-px-sm">
    <q-card-section class="no-padding">
      <div class="row items-center justify-between">
        <span class="text-body1 no-letter-spacing">مخاطبین</span>
        <q-btn
          round
          unelevated
          dense
          icon="o_close"
          v-close-popup
        />
      </div>
      <q-inner-loading
        :showing="tableStore.showLoader.value"
        class="transparent z-max"
      >
        <q-spinner
          size="52px"
          color="primary"
        />
      </q-inner-loading>
      <div class="q-my-lg">
        <q-input
          color="grey-5"
          outlined
          v-model="tableStore.pagination.value.searchTerm"
          placeholder="جستجو"
          dense
          clearable
          clear-icon="o_clear"
          rounded
          @keydown.enter="loadData"
          class="text-body2"
        >
          <template v-slot:prepend>
            <q-icon
              name="o_search"
              color="primary"
            />
          </template>
        </q-input>
      </div>

      <q-scroll-area
        style="height:calc(100vh - 160px)"
        :thumb-style="{ opacity: 0 }"
        :bar-style="{ opacity: 0 }"
      >
        <q-item
          v-for="(row, index) in customerStore.rows.value"
          :key="index"
          clickable
          v-close-popup
          class="no-padding border-radius-xs text-on-dark"
        >
          <div class="row q-gutter-x-sm items-center q-my-sm">
            <q-item-section avatar>
              <q-avatar
                v-if="row.avatar"
                color="primary"
                text-color="white"
                size="56px"
                square
                class="border-radius-sm"
              >
                <img :src="row.avatar">
              </q-avatar>

              <q-avatar
                size="56px"
                text-color="white"
                square
                class="border-radius-sm"
                :style="{ backgroundColor: helper.generateDarkAvatarColor(row.name) }"
                v-else
              >
                <div class="char text-body1 text-bold">
                  {{ helper.getFirstChar(row.name) }}
                </div>
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label
                class="ellipsis text-on-dark text-caption text-bold"
                style="width:200px"
              >
                {{ row.code }} {{ row.name }}
              </q-item-label>
              <q-item-label
                v-if="row.locationName"
                caption
                class="ellipsis q-mt-xs"
                style="width: 200px;"
              >
                <q-icon
                  name="o_location_on"
                  size="13px"
                  color="primary"
                />
                {{ row.locationName }} {{ row.address }}
              </q-item-label>
              <div class="row items-center">
                <q-item-label
                  caption
                  class="flex rtl"
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
                  class="flex q-ml-xs rtl"
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
              </div>
            </q-item-section>
          </div>
        </q-item>

        <div
          v-if="!tableStore.showLoader.value && customerStore.rows.value.length === 0"
          class="text-on-dark"
        >
          <no-data-found />
        </div>

        <div
          class="row justify-center"
          v-if="hasMoreData"
        >
          <q-btn
            rounded
            unelevated
            @click="gotoNext"
            class="full-width primary-shadow q-ma-lg bg-primary text-white"
          >
            <span class="text-body3">بارگزاری بیشتر</span>
          </q-btn>
        </div>
      </q-scroll-area>

    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref, computed, onMounted } from "vue"
import { useDataTable } from "src/composables/useDataTable"
import { useCustomerGrid } from "src/components/areas/crm/_composables/useCustomerGrid"
import { helper } from "src/helpers"
import NoDataFound from "src/components/shared/DataTables/NoDataFound.vue"

const customerStore = useCustomerGrid()

const tableStore = useDataTable("crm/customer/getLookupData", customerStore.columns, customerStore)

async function gotoNext() {
  if (hasMoreData.value) {
    tableStore.pagination.value.currentPage += 1
    await reloadData()
  }
}

async function reloadData() {
  await tableStore.reloadData()
  customerStore.rows.value = [...customerStore.rows.value, ...tableStore.rows.value]
}

async function loadData() {
  tableStore.pagination.value.currentPage = 1
  await tableStore.reloadData()
  customerStore.rows.value = tableStore.rows.value
}

const hasMoreData = computed(() => {
  return tableStore.pagination.value.currentPage < tableStore.pagination.value.totalPages
});

onMounted(() => {
  loadData()
})

</script>

<style>
.header {
  position: sticky;
  top: 0;
}

.footer {
  position: sticky;
  bottom: 0;
}
</style>
