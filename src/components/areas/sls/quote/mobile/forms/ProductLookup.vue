<template>
  <tool-bar>
    <template #header>
      <q-badge
        v-if="tableStore?.pagination.value.totalItems > 0"
        rounded
        outline
        :label="tableStore?.pagination.value.totalItems"
        class="q-mr-sm bg-dark text-on-dark text-body2"
      />
      <span class="no-letter-spacing" :class="$q.screen.gt.sm ? 'text-h6' : 'text-body2'"
        >ایجاد فاکتور فروش</span
      >
      <q-btn padding="6px 12px" flat @click="$router.go(-1)">
        <q-icon name="arrow_back" size="sm" />
      </q-btn>
    </template>
    <template #buttons>
      <q-btn
        class="bg-primary text-white text-body2"
        padding="6px 12px"
        rounded
        no-caps
        unelevated
      >
        {{ $t("shared.labels.save") }}
      </q-btn>
      <q-btn class="bordered-btn_bg-dark text-body2" rounded unelevated>
        {{ $t("shared.labels.more") }}

        <q-menu fit :offset="[0, 10]">
          <q-list dense padding style="width: 200px">
            <q-item clickable v-close-popup tabindex="0">
              <div class="q-py-sm">
                <q-item-section avatar>
                  <q-avatar class="bg-on-dark" size="sm"
                    ><q-icon name="o_refresh" size="14px"
                  /></q-avatar>
                </q-item-section>
              </div>
              <q-item-section>
                <div class="text-caption">تازه‌سازی</div>
              </q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable v-close-popup tabindex="0">
              <div class="q-py-sm">
                <q-item-section avatar>
                  <q-avatar class="bg-on-dark" size="sm"
                    ><q-icon name="o_close" size="14px"
                  /></q-avatar>
                </q-item-section>
              </div>
              <q-item-section>
                <div class="text-caption">غیر‌فعال‌سازی</div>
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup tabindex="0">
              <div class="q-py-sm">
                <q-item-section avatar>
                  <q-avatar class="bg-on-dark" size="sm"
                    ><q-icon name="o_check" size="14px"
                  /></q-avatar>
                </q-item-section>
              </div>
              <q-item-section>
                <div class="text-caption">فعال سازی</div>
              </q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable v-close-popup tabindex="0">
              <div class="q-py-sm">
                <q-item-section avatar>
                  <q-avatar class="bg-on-dark" size="sm"
                    ><q-icon name="o_download" size="16px"
                  /></q-avatar>
                </q-item-section>
              </div>
              <q-item-section>
                <div class="text-caption">تبدیل به اکسل</div>
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
    </template>
  </tool-bar>
  <q-card class="no-border no-shadow bg-transparent q-mt-xl">
    <q-card-section class="no-padding">
      <div class="flex justify-center q-py-md">
        <q-input
          color="grey-5"
          outlined
          v-model="searchText"
          placeholder="جستجو"
          dense
          rounded
          clearable
          clear-icon="o_close"
          class="full-width text-body2"
        >
          <template v-slot:prepend>
            <q-icon name="o_search" color="primary" />
          </template>
        </q-input>
      </div>

      <q-scroll-area
        style="height: calc(100vh - 325px)"
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
                  <q-icon name="o_close" color="red" size="20px" />
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
                  <img :src="product.picture" />
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
                <q-item-label class="text-caption">{{
                  product.title
                }}</q-item-label>
                <q-item-label class="text-caption-sm"
                  ><span class="text-caption-sm text-bold">موجودی: </span
                  >{{ product.stock }}</q-item-label
                >
                <q-item-label class="text-caption-sm"
                  ><span class="text-caption-sm text-bold">قیمت فروش: </span
                  >{{ product.price.toLocaleString() }}</q-item-label
                >
              </q-item-section>
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
import ToolBar from "src/components/shared/ToolBar.vue";
import { useCreateInvoice } from "src/components/areas/sls/_composables/useCreateInvoice";

const createInvoice = useCreateInvoice();
const tab = ref("my-products");
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
  console.log(data);
  products.value = data;
}

const pulseProduct = computed(() =>
  createInvoice.rows.value.length < 1 ? "pulse" : ""
);

onMounted(() => {
  getProducts(), createInvoice;
});
</script>
