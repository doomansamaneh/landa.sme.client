<template>
  <q-card class="no-border no-shadow bg-transparent q-px-sm">
    <q-card-section class="no-padding">
      <div class="row items-center justify-between">
        <span class="text-body1 no-letter-spacing">کالا و خدمات</span>
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
          placeholder="جستجو"
          dense
          clearable
          clear-icon="o_clear"
          rounded
          @keydown.enter="loadData"
          v-model="tableStore.pagination.value.searchTerm"
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
        style="height:calc(100vh - 160px);"
        :thumb-style="{ opacity: 0 }"
        :bar-style="{ opacity: 0 }"
      >
        <q-item
          v-for="(row, index) in productStore.rows.value"
          :key="index"
          clickable
          v-close-popup
          class="no-padding border-radius-xs text-on-dark"
        >
          <div class="row q-gutter-x-sm items-center q-my-sm">
            <q-avatar
              class="border-radius-sm"
              square
              v-if="row.picture"
              color="primary"
              text-color="white"
              size="56px"
            >
              <img :src="row.picture">
            </q-avatar>

            <q-avatar
              class="border-radius-sm"
              square
              size="56px"
              text-color="white"
              :style="{ backgroundColor: helper.generateDarkAvatarColor(row.title) }"
              v-else
            >
              <div class="char text-body1 text-bold">
                {{ helper.getFirstChar(row.title) }}
              </div>
            </q-avatar>
          </div>
          <q-item-section class="q-pl-md">
            <q-item-label class="text-caption">{{ row.title }}</q-item-label>
            <q-item-label class="text-caption-sm"><span class="text-caption-sm text-bold">موجودی: </span>{{
              row.stock }}</q-item-label>
            <q-item-label class="text-caption-sm"><span class="text-caption-sm text-bold">قیمت فروش: </span>{{
              row.price.toLocaleString() }}</q-item-label>
          </q-item-section>

        </q-item>


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
import { useProduct } from "src/components/areas/cmn/_composables/useProduct.js"
import { helper } from "src/helpers"
import NoDataFound from "src/components/shared/DataTables/NoDataFound.vue"

const productStore = useProduct()

const tableStore = useDataTable("cmn/product/getlookupData", productStore.columns, productStore)

async function gotoNext() {
  if (hasMoreData.value) {
    tableStore.pagination.value.currentPage += 1
    await reloadData()
  }
}

async function reloadData() {
  await tableStore.reloadData()
  productStore.rows.value = [...productStore.rows.value, ...tableStore.rows.value]
}

async function loadData() {
  tableStore.pagination.value.currentPage = 1
  await tableStore.reloadData()
  productStore.rows.value = tableStore.rows.value
}

const hasMoreData = computed(() => {
  return tableStore.pagination.value.currentPage < tableStore.pagination.value.totalPages
});

onMounted(() => {
  loadData()
})

</script>

