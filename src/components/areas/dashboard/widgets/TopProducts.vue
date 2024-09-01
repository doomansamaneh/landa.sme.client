<template>
  <q-card class="no-shadow bordered">
    <q-card-section class="q-pb-none q-pt-lg q-px-lg row justify-between items-center">
      <div class="row items-center justify-between full-width">
        <q-item class="no-padding">
          <q-item-section avatar>
            <q-avatar
              rounded
              text-color="white"
              icon="o_inventory_2"
              size="md"
              class="primary-gradient primary-shadow"
            />
          </q-item-section>
          <q-item-section class="q-pl-xs">
            <q-item-label class="text-h6 text-weight-700 q-mb-xs">
              بیشترین فروش کالا و خدمات
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-btn
          padding="6px 12px"
          rounded
          icon="refresh"
          unelevated
          @click="grid.loadData()"
        ></q-btn>
      </div>
    </q-card-section>

    <q-card-section class="q-pt-none_ q-pb-md_ q-pr-none q-pl-lg">
      <q-scroll-area
        style="height: 350px"
        :thumb-style="helper.thumbStyle"
        :bar-style="helper.barStyle"
      >
        <loadable-data-grid
          ref="grid"
          data-source="sls/report/getInvoiceByProduct"
          :grid-store="gridStore"
        >
          <template #item="{ item }">
            <q-item
              class="q-pl-none q-pb-md q-pr-lg border-radius-xs text-on-dark"
            >
              <div class="row q-gutter-x-sm items-center">
                <q-avatar
                  class="primary-gradient primary-shadow border-radius-xs"
                  square
                  v-if="item.picture"
                  text-color="white"
                  size="58px"
                >
                  <img :src="item.picture" />
                </q-avatar>

                <q-avatar
                  class="border-radius-xs"
                  square
                  size="58px"
                  text-color="white"
                  :style="helper.generateAvatarStyle(item.id)"
                  v-else
                >
                  <div class="char text-body1 text-bold">
                    {{ helper.getFirstChar(item.productTitle) }}
                  </div>
                </q-avatar>
              </div>

              <div
                class="row items-center justify-between full-width"
              >
                <div class="col-8 q-pl-lg column">
                  <span class="text-caption no-letter-spacing">
                    {{ item.productCode }} - {{ item.productTitle }}
                  </span>
                  <span class="text-caption no-letter-spacing">
                    قیمت فروش : {{ item.price?.toLocaleString() }}
                  </span>
                  <span class="text-caption no-letter-spacing">
                    جمع کل :
                    <strong>
                      {{ item.amount?.toLocaleString() }}
                    </strong>
                  </span>
                </div>
                <div class="col row justify-end items-center">
                  <q-item-label
                    caption
                    class="text-body3 no-letter-spacing q-mx-xs"
                  >
                    تعداد:
                    <strong>
                      {{ item.quantity?.toLocaleString() }}
                    </strong>
                  </q-item-label>
                  <goto-detail
                    :to="`/cmn/product/Preview/${item.id}`"
                  />
                </div>
              </div>
            </q-item>
          </template>
        </loadable-data-grid>
      </q-scroll-area>
    </q-card-section>
  </q-card>
</template>

<script setup>
  import { ref } from "vue";
  import { helper } from "src/helpers";
  import { useInvoiceProductState } from "../../sls/_composables/useInvoiceProductState";

  import LoadableDataGrid from "src/components/shared/dataTables/LoadableDataGrid.vue";
  import GotoDetail from "src/components/shared/buttons/GotoDetail.vue";

  const gridStore = useInvoiceProductState();
  const grid = ref(null);
</script>
