<template>
  <q-card class="bordered fit no-shadow">
    <q-tabs
      v-model="tab"
      inline-label
      indicator-color="primary"
      outside-arrows
      class="text-on-dark"
    >
      <q-tab
        name="my-products"
        class="q-py-sm"
      >

        <template #default>
          <q-icon
            name="o_inventory_2"
            size="xs"
            class="q-mr-sm"
          />
          <div class="text-body3 text-bold">
            کالاهای من
          </div>
        </template>
      </q-tab>
      <q-tab
        name="test-1"
        class="q-py-sm"
      >
        <template #default>
          <q-icon
            name="o_question_mark"
            size="xs"
            class="q-mr-sm"
          />
          <div class="text-body3 text-bold">
            تست 1
          </div>
        </template>
      </q-tab>
      <q-tab
        name="test-2"
        class="q-py-sm"
      >
        <template #default>
          <q-icon
            name="o_question_mark"
            size="xs"
            class="q-mr-sm"
          />
          <div class="text-body3 text-bold">
            تست 2
          </div>
        </template>
      </q-tab>
    </q-tabs>
    <q-tab-panels
      v-model="tab"
      animated
      keep-alive
      class="transparent"
    >
      <q-tab-panel
        name="my-products"
        class="no-padding"
      >
        <div class="flex justify-center q-pa-md">
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
          style="height: 510px;"
          class="q-mb-md"
          :thumb-style="helper.thumbStyle"
          :bar-style="helper.barStyle"
        >
          <div class="q-gutter-y-md q-pa-sm q-mx-sm">
            <q-list>
              <q-item
                v-for="(product, index) in products"
                :key="index"
                clickable
                v-close-popup
                class="q-py-sm border-radius-xs text-on-dark"
                @click="createInvoice.incrementQuantity(product)"
              >
                <template v-if="createInvoice.getProductQuantity(product.id) > 0">
                  <q-btn
                    unelevated
                    round
                    size="sm"
                    color="secondary"
                    class="z-max text-bold q-ma-sm absolute-top-left"
                    @click="createInvoice.incrementQuantity(product)"
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
                  <q-item-label class="text-body3">{{ product.code }}</q-item-label>
                  <q-item-label class="text-body3">{{ product.title }}</q-item-label>
                </q-item-section>

              </q-item>
            </q-list>
          </div>
        </q-scroll-area>
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
</template>


<script setup>
import { ref, computed, onMounted } from "vue"
import { helper } from "src/helpers";
import { fetchWrapper } from "src/helpers";
import { useCreateInvoice } from "src/components/areas/sls/_composables/useCreateInvoice"

const createInvoice = useCreateInvoice()
const tab = ref('my-products')
const products = ref([])

function getProducts() {
  fetchWrapper
    .post("cmn/product/getlookupData", {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      handleResponse(response.data.data.items);
    });
}

function handleResponse(data) {
  // console.log(data);
  products.value = data;
}

onMounted(() => {
  getProducts(),
    createInvoice
})

</script>
