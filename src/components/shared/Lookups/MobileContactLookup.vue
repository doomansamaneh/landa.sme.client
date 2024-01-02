<template>
  <q-card class="no-border no-shadow bg-transparent">
    <q-card-section class="no-padding">
      <div class="q-py-lg">
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
      :style="$q.screen.gt.xs ? 'height: calc(100vh - 180px);' : 'height: calc(100vh - 350px);'"
      :thumb-style="helper.thumbStyle"
      :bar-style="helper.barStyle"
    >
      <q-item
        @click="goToCustomer"
        v-for="(row, index) in customerStore.rows.value"
        :key="index"
        clickable
        v-close-popup
        class="no-padding text-on-dark"
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

      <!-- <div class="flex justify-center q-py-md">
        <q-input
          color="grey-5"
          outlined
          v-model="searchText"
          placeholder="جستجو در کالا"
          dense
          rounded
          clearable
          clear-icon="o_close"
          class="full-width text-caption"
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
        style="height:calc(100vh - 325px);"
        :thumb-style="helper.thumbStyle"
        :bar-style="helper.barStyle"
        class="q-mt-sm"
      >
        <div class="q-gutter-y-md">
          <q-list>
            <q-item
              v-for="(product, index) in products"
              :key="index"
              clickable
              v-close-popup
              class="no-padding border-radius-xs text-on-dark"
              @click="createInvoice.incrementQuantity(product)"
            >
              <template v-if="createInvoice.getProductQuantity(product.id) > 0">
                <q-btn
                  unelevated
                  round
                  size="sm"
                  color="secondary"
                  class="z-max text-bold q-ma-sm absolute-top-left"
                  @click.stop="createInvoice.incrementQuantity(product)"
                >
                  <div class="text-body1">
                    {{ createInvoice.getProductQuantity(product.id) }}
                  </div>
                </q-btn>
                <q-btn
                  class="absolute-top-right"
                  flat
                  unelevated
                  round
                  color="red"
                  size="sm"
                  @click.stop="createInvoice.removeProduct(product)"
                >
                  <q-icon
                    name="o_close"
                    color="red"
                    size="20px"
                  />
                </q-btn>
              </template>
              <div class="row q-gutter-x-sm items-center q-my-sm">
                <q-avatar
                  class="border-radius-xs"
                  square
                  v-if="product.picture"
                  color="primary"
                  text-color="white"
                  size="58px"
                >
                  <img :src="product.picture">
                </q-avatar>

                <q-avatar
                  class="border-radius-xs"
                  square
                  size="58px"
                  color="primary"
                  text-color="white"
                  v-else
                >
                  <div class="char text-body1 text-bold">
                    {{ helper.getFirstChar(product.title) }}
                  </div>
                </q-avatar>
              </div>
              <q-item-section class="q-pl-md">
                <q-item-label class="text-caption">{{ product.title }}</q-item-label>
                <q-item-label class="text-caption-sm"><span class="text-caption-sm text-bold">موجودی: </span>{{
                  product.stock }}</q-item-label>
                <q-item-label class="text-caption-sm"><span class="text-caption-sm text-bold">قیمت فروش: </span>{{
                  product.price.toLocaleString() }}</q-item-label>
              </q-item-section>

            </q-item>
          </q-list>
        </div>
      </q-scroll-area> -->
    </q-card-section>
  </q-card>
</template>

<script setup>
// import { ref, computed, onMounted } from "vue"
// import { useQuasar } from "quasar"
// import { useDataTable } from "src/composables/useDataTable"
// import PageBar from "./PageBar.vue"
// import NoDataFound from "./NoDataFound.vue"
// import customInput from "src/components/shared/Forms/CustomInput.vue"

// import { helper } from "src/helpers";
// import { fetchWrapper } from "src/helpers";
// import ToolBar from "src/components/shared/ToolBar.vue"
// import { useCreateInvoice } from "src/components/areas/sls/_composables/useCreateInvoice"

// const createInvoice = useCreateInvoice()
// const tab = ref('my-products')
// const products = ref([])

// function getProducts() {
//   fetchWrapper
//     .post("cmn/product/getlookupData", {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     })
//     .then((response) => {
//       handleResponse(response.data.data.items);
//     });
// }

// function handleResponse(data) {
//   console.log(data);
//   products.value = data;
// }

// const pulseProduct = computed(() => (createInvoice.rows.value.length < 1 ? 'pulse' : ''));

// onMounted(() => {
//   getProducts(),
//     createInvoice
// })

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
