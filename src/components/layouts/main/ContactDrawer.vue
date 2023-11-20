<template>
  <q-drawer
    side="right"
    v-model="contactDrawerStore.state.value"
    overlay
    :width="350"
    :breakpoint="500"
    class="text-white no-scroll"
    bordered
  >
    <div class="q-ma-md">
      <q-input
        color="grey-5"
        outlined
        v-model="tableStore.pagination.value.searchTerm"
        :placeholder="$t('shared.labels.contact-search')"
        dense
        clearable
        clear-icon="o_clear"
        rounded
        @keydown.enter="reloadData"
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
      style="height: calc(100vh - 150px);"
      :thumb-style="helper.thumbStyle"
      :bar-style="helper.barStyle"
    >
      <q-infinite-scroll
        @load="onLoadRef"
      >
        <q-item
          @click="goToCustomer"
          v-for="(row, index) in rows"
          :key="index"
          clickable
          v-close-popup
          class="q-py-sm text-on-dark"
        >
          <div class="row q-gutter-x-md items-center q-my-md q-pl-sm">
            <q-item-section avatar>
              <q-avatar
                v-if="row.avatar"
                color="primary"
                text-color="white"
                size="52px"
              >
                <img :src="row.avatar">
              </q-avatar>

              <q-avatar
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
        <template v-slot:loading>
          <div class="row justify-center">
            <q-spinner-dots
              color="primary"
              size="40px"
            />
          </div>
        </template>
      </q-infinite-scroll>
    </q-scroll-area>
  </q-drawer>
</template>

<script setup>
import { ref, computed, onMounted } from "vue"
import { useRouter } from "vue-router"
import { useDataTable } from "src/composables/useDataTable"
import { useCustomer } from "src/components/areas/crm/_composables/useCustomer"
import { useContactDrawer } from "src/composables/useContactDrawer"
import { helper } from "src/helpers"

const customerStore = useCustomer()
const contactDrawerStore = useContactDrawer()

const tableStore = useDataTable("crm/customer/getLookupData", customerStore.columns, customerStore)
const router = useRouter()

const rows = ref([])

onMounted(() => {
  //tableStore.loadData()
  //rows.value = tableStore.rows.value//.push(...tableStore.rows.value)
})

async function gotoNext(index) {
  tableStore.pagination.value.currentPage += 1 //index
  await tableStore.reloadData()
  rows.value.push(...tableStore.rows.value)
}

async function reloadData() {
  tableStore.pagination.value.currentPage = 1
  await tableStore.reloadData()
  rows.value.push(...tableStore.rows.value)
}

const goToCustomer = () => {
  router.push("/crm/customer")
}

const onLoadRef = async (index, done) => {
  console.log(index)
  if (tableStore.pagination.value.totalItems > rows.value.length) {
    await gotoNext(index)
  }
  // else
  //   alert('there is no more items. stop scrolling')
  done()
}

</script>
