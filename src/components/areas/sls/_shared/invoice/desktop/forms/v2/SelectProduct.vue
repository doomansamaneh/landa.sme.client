<template>
  <q-card bordered flat>
    <div class="q-px-md">
      <q-tabs
        v-model="tab"
        class="text-h6 text-weight-700 primary-tabs_"
        :indicator-color="$q.dark.isActive ? 'yellow' : 'primary'"
        :active-color="$q.dark.isActive ? 'yellow' : 'primary'"
        align="left"
        inline-label
        narrow-indicator
        @update:model-value="tabChanged"
      >
        <q-tab name="mostSold" class="q-mr-xs">
          <template #default>
            <q-icon name="o_inventory_2" size="xs" class="q-mr-sm" />
            <div class="text-body3 text-bold">پر فروشها</div>
          </template>
        </q-tab>
        <q-tab name="latest" class="q-mr-xs">
          <template #default>
            <q-icon
              name="o_question_mark"
              size="xs"
              class="q-mr-sm"
            />
            <div class="text-body3 text-bold">تازه‌ترین فروشها</div>
          </template>
        </q-tab>
        <q-tab name="default" class="q-mr-xs">
          <template #default>
            <q-icon
              name="o_question_mark"
              size="xs"
              class="q-mr-sm"
            />
            <div class="text-body3 text-bold">به ترتیب کد</div>
          </template>
        </q-tab>
      </q-tabs>
    </div>
    <q-separator />

    <loadable-data-grid
      ref="grid"
      data-source="cmn/product/getLookupData"
      sort-column="quantity"
      :sort-column-order="sortOrder.descending"
      first-load
    >
      <template #item="{ item }">
        <q-item
          clickable
          class="text-on-dark"
          @click.stop="formStore.addProduct(item)"
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
                {{ helper.getFirstChar(item.title) }}
              </div>
              <q-badge
                v-if="formStore.getProductQuantity(item.id)"
                class="inset-shadow-down text-body3 text-bold no-letter-spacing q-px-sm q-py-sm"
                floating
                color="negative"
              >
                {{
                  helper.formatNumber(
                    formStore.getProductQuantity(item.id)
                  )
                }}
              </q-badge>
            </q-avatar>
          </div>

          <div class="row items-center justify-between full-width">
            <div class="col-9 q-pl-lg column">
              <span class="text-body3 no-letter-spacing">
                {{ item.code }} - {{ item.title }}
              </span>
              <span
                v-if="item.purchasePrice"
                class="text-body3 no-letter-spacing"
              >
                قیمت خرید:
                {{ helper.formatNumber(item.purchasePrice) }}
              </span>
              <span class="text-body3 no-letter-spacing">
                قیمت فروش:
                {{ helper.formatNumber(item.price) }}
              </span>
              <span
                v-if="item.maxPrice"
                class="text-body3 no-letter-spacing"
              >
                بیشترین قیمت فروش:
                {{ helper.formatNumber(item.maxPrice) }}
              </span>
              <span
                v-if="item.typeId !== productType.service"
                class="text-body3 no-letter-spacing"
              >
                موجودی:
                <q-icon
                  v-if="item.stock <= 0"
                  class="text-warning"
                  name="warning"
                ></q-icon>
                {{ helper.formatNumber(item.stock) }}
              </span>
            </div>
            <div
              v-if="formStore.getProductQuantity(item.id)"
              class="col row justify-end items-center"
            >
              <q-btn
                flat
                unelevated
                round
                color="red"
                size="sm"
                @click.stop="formStore.removeProduct(item)"
              >
                <q-icon name="o_close" color="red" size="20px" />
              </q-btn>
            </div>
          </div>
        </q-item>
      </template>
    </loadable-data-grid>
  </q-card>
</template>

<script setup>
  import { ref, computed } from "vue";
  import { helper } from "src/helpers";
  import { useInvoiceModel } from "src/components/areas/sls/_composables/useInvoiceModel";
  import { productType, sortOrder } from "src/constants";

  import LoadableDataGrid from "src/components/shared/dataTables/LoadableDataGrid.vue";

  const props = defineProps({
    formStore: useInvoiceModel,
  });

  const grid = ref(null);
  const tab = ref("mostSold");
  const pulseProduct = computed(
    () => ""
    //props.formStore.model.value.invoiceItems.length < 1 ? "pulse" : ""
  );

  async function tabChanged(e) {
    if (e === "mostSold") {
      grid.value.tableStore.pagination.value.sortColumn = "quantity";
      grid.value.tableStore.pagination.value.sortOrder =
        sortOrder.descending;
    } else if (e === "latest") {
      grid.value.tableStore.pagination.value.sortColumn = "lastDate";
      grid.value.tableStore.pagination.value.sortOrder =
        sortOrder.descending;
    } else {
      grid.value.tableStore.pagination.value.sortColumn = "code";
      grid.value.tableStore.pagination.value.sortOrder =
        sortOrder.ascending;
    }
    await grid.value.loadData();
  }
</script>

<style lang="scss" scoped>
  .pulse {
    animation: pulse 3s infinite;
  }
  .custom-toggle {
    border: 1px solid var(--q-primary);
  }
</style>
