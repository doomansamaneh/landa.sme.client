<template>
  <q-card class="bordered">
    <q-card-section class="row justify-between items-center q-pa-lg">
      <div class="row items-center justify-between full-width">
        <q-item class="no-padding">
          <q-item-section avatar>
            <q-avatar
              rounded
              color="primary"
              text-color="white"
              icon="o_inventory_2"
              size="md"
              class="primary-shadow"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-body1 q-mb-xs">
              بیشترین فروش
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-btn
          no-caps
          class="primary-shadow primary-gradient text-white text-caption"
          padding="8px 16px"
          rounded
          unelevated
        >
          ماه جاری
        </q-btn>
      </div>
    </q-card-section>

    <q-card-section class="q-pt-none q-pb-md q-pr-none">
      <q-scroll-area
        style="height: 500px"
        :thumb-style="helper.thumbStyle"
        :bar-style="helper.barStyle"
      >
        <div class="q-gutter-y-md q-mx-sm">
          <q-list>
            <q-item
              v-for="(product, index) in products"
              :key="index"
              class="q-pl-none q-pb-md q-pr-lg border-radius-xs text-on-dark"
            >
              <div class="row q-gutter-x-sm items-center">
                <q-avatar
                  class="border-radius-xs"
                  square
                  v-if="product.picture"
                  color="primary"
                  text-color="white"
                  size="58px"
                >
                  <img :src="product.picture" />
                </q-avatar>

                <q-avatar
                  class="border-radius-xs primary-shadow"
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

              <div
                class="row items-center justify-between full-width"
              >
                <div class="col-8 q-pl-lg column">
                  <span class="text-caption">
                    {{ product.title }}
                  </span>
                  <span class="text-caption">
                    قیمت فروش : {{ product.price.toLocaleString() }}
                  </span>
                </div>
                <div class="col row justify-end items-center">
                  <q-item-label caption class="text-body3">
                    86 فروش
                  </q-item-label>
                </div>
              </div>
            </q-item>
          </q-list>
        </div>
      </q-scroll-area>
    </q-card-section>
  </q-card>
</template>

<script setup>
  import { ref, computed, onMounted } from "vue";
  import { helper } from "src/helpers";
  import { fetchWrapper } from "src/helpers";

  const products = ref([]);

  function getProducts() {
    fetchWrapper
      .post("cmn/product/getlookupData", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        handleResponse(response.data.data.items);
      });
  }

  function handleResponse(data) {
    products.value = data;
  }

  onMounted(() => {
    getProducts();
  });
</script>
