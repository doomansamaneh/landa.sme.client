<template>
  <q-card
    bordered
    class="fit no-shadow"
  >
    <q-tabs
      v-model="tab"
      inline-label
      outside-arrows
      class="text-on-dark"
    >
      <q-tab
        name="my-products"
        class="q-py-sm"
      >

        <template #default>
          <q-badge
            transparent
            rounded
            floating
            text-color="white"
            color="red"
          >6</q-badge>

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
          style="height: 450px;"
          class="q-mb-md"
          :thumb-style="helper.thumbStyle"
          :bar-style="helper.barStyle"
        >
          <div class="products-container q-gutter-y-md q-pa-sm q-mx-md">
            <q-card
              v-ripple
              bordered
              v-for="product in products"
              :key="product.id"
              class="no-shadow card-hover cursor-pointer"
              style="min-height: 90px;"
            >
              <q-btn
                class="absolute-top-right"
                flat
                unelevated
                round
                color="red"
                size="sm"
                @click.stop="removeProduct"
              >
                <q-icon
                  name="o_close"
                  color="red"
                  size="14px"
                />
              </q-btn>
              <q-btn
                unelevated
                round
                size="sm"
                color="grey-6"
                class="absolute-top-left"
                @click.stop="addProduct"
              >
                <div class="text-bold text-body1">8</div>
              </q-btn>
              <div class="column q-gutter-y-xs absolute-bottom-left">
                <q-btn
                  square
                  unelevated
                  color="positive"
                  @click.stop="addProduct"
                  padding="2px 4px"
                >
                  <q-icon
                    name="o_add"
                    color="white"
                    size="14px"
                  />
                </q-btn>
                <q-btn
                  square
                  unelevated
                  color="orange-8"
                  @click.stop="minusProduct"
                  padding="2px 4px"
                >
                  <q-icon
                    name="o_remove"
                    color="white"
                    size="14px"
                  />
                </q-btn>
              </div>
              <div class="column items-center q-gutter-y-sm q-pa-md">
                <q-avatar
                  class="border-radius-xs"
                  square
                  v-if="product.avatar"
                >
                  <q-img src="https://cdn.quasar.dev/img/avatar.png" />
                </q-avatar>

                <q-avatar
                  text-color="white"
                  color="primary"
                >
                  <div class="text-bold text-body1">{{ helper.getFirstChar(product.title) }}</div>
                </q-avatar>
                <div class="column q-gutter-y-xs q-px-md text-caption text-center">
                  <div class="">{{ product.code }}</div>
                  <div class="">{{ product.title }}</div>
                </div>
              </div>
            </q-card>
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
  products.value = data;
}

const removeProduct = () => {
  alert("Product removed!")
}

const addProduct = () => {
  alert("Product added!")
}

onMounted(() => {
  getProducts()
})

</script>

<style>
.products-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}
</style>
