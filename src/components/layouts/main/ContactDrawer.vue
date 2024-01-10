<template>
  <q-drawer
    bordered
    side="right"
    v-model="contactDrawerStore.state.value"
    overlay
    :width="$q.screen.lt.md ? '300' : '350'"
    :breakpoint="500"
    class="no-scroll"
    :class="$q.dark.isActive ? 'bg-dark' : 'bg-light'"
  >
    <q-inner-loading
      :showing="tableStore.showLoader.value"
      class="transparent z-max"
    >
      <q-spinner
        size="52px"
        color="primary"
      />
    </q-inner-loading>

    <div class="q-px-md q-py-lg">
      <q-input
        color="grey-5"
        outlined
        v-model="tableStore.pagination.value.searchTerm"
        :placeholder="$t('shared.labels.contact-search')"
        dense
        clearable
        clear-icon="o_clear"
        rounded
        @keydown.enter="loadData"
        class="text-caption"
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
      :style="$q.screen.gt.xs ? 'height: calc(100vh - 180px);' : 'height: calc(100vh - 180px);'"
      :thumb-style="helper.thumbStyle"
      :bar-style="helper.barStyle"
    >
      <q-item
        @click="goToCustomer"
        v-for="(row, index) in customerStore.rows.value"
        :key="index"
        clickable
        v-close-popup
        class="text-on-dark"
      >
        <div class="row q-gutter-x-md items-center q-my-xs q-pl-sm">
          <q-item-section avatar>
            <q-avatar
              v-if="row.avatar"
              color="primary"
              text-color="white"
              size="52px"
              square
              class="border-radius-xs"
            >
              <img :src="row.avatar">
            </q-avatar>

            <q-avatar
              size="52px"
              color="primary"
              text-color="white"
              square
              class="primary-shadow border-radius-xs"
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
          class="primary-shadow q-ma-lg bg-primary text-white"
        >
          <span class="text-body3">بارگزاری بیشتر</span>
        </q-btn>
      </div>
    </q-scroll-area>
  </q-drawer>
</template>

<script setup>
import { ref, computed } from "vue"
import { useRouter } from "vue-router"
import { useDataTable } from "src/composables/useDataTable"
import { useCustomer } from "src/components/areas/crm/_composables/useCustomer"
import { useContactDrawer } from "src/composables/useContactDrawer"
import { helper } from "src/helpers"
import NoDataFound from "src/components/shared/DataTables/NoDataFound.vue"

const customerStore = useCustomer()
const contactDrawerStore = useContactDrawer()

const tableStore = useDataTable("crm/customer/getLookupData", customerStore.columns, customerStore)
const router = useRouter()

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

const goToCustomer = () => {
  router.push("/crm/customer")
}

</script>
