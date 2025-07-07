<template>
  <q-card class="bordered">
    <q-card-section class="q-pl-lg row items-center justify-between">
      <q-toggle
        dense
        size="40px"
        class="text-body2"
        label="نمایش موجودی صفر"
        left-label
        v-model="searchStore.searchModel.value.showZeroStock"
        @update:model-value="searchStore.applySearch"
      />

      <q-btn
        no-caps
        @click="expanded = !expanded"
        padding="6px 12px"
        rounded
        unelevated
        dense
        class="text-body2"
      >
        <q-icon
          :name="
            expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'
          "
          class="q-mr-xs"
        />
        <span class="text-body2">
          {{ $t("shared.labels.advancedSearch") }}
        </span>
      </q-btn>
    </q-card-section>

    <div>
      <q-slide-transition duration="500">
        <div class="q-px-lg" v-show="expanded">
          <div class="row items-center">
            <q-option-group
              style="gap: 8px"
              class="row items-center"
              inline
              dense
              size="44px"
              :options="
                helper.getEnumOptions(productType, 'productType')
              "
              type="checkbox"
              v-model="searchStore.searchModel.value.productTypeIds"
            />
          </div>

          <div class="row q-col-gutter-md q-mt-sm">
            <div class="col-md-4 col-sm-6 col-xs-12">
              <product-group-lookup
                v-model:selectedId="
                  searchStore.searchModel.value.productGroupId
                "
                v-model:selectedText="
                  searchStore.searchModel.value.productGroupTitle
                "
                :placeholder="$t('shared.labels.productGroupTitle')"
              />
            </div>
          </div>

          <div class="row q-col-gutter-md q-mt-sm">
            <div class="col-md-4 col-sm-6 col-xs-12">
              <inventory-lookup
                v-model:selectedId="
                  searchStore.searchModel.value.inventoryId
                "
                v-model:selectedText="
                  searchStore.searchModel.value.inventoryTitle
                "
                :placeholder="$t('shared.labels.inventoryTitle')"
              />
            </div>
          </div>

          <q-card-actions
            class="row q-col-gutter-md items-center q-px-none q-py-lg"
          >
            <div
              class="row items-center justify-end col-md-12 col-sm-12 col-xs-12"
            >
              <q-btn
                no-caps
                class="q-mr-sm text-body2 primary-shadow primary-gradient text-white"
                rounded
                padding="8px 16px"
                unelevated
                @click="searchStore.applySearch"
              >
                <q-icon name="search" class="q-mr-xs" size="20px" />
                {{ $t("shared.labels.search") }}
              </q-btn>
              <q-btn
                no-caps
                class="text-body2"
                rounded
                unelevated
                padding="8px 16px"
                flat
                @click="searchStore.clearSearch"
              >
                <q-icon name="clear" class="q-mr-xs" size="20px" />
                {{ $t("shared.labels.clearSearch") }}
              </q-btn>
            </div>
          </q-card-actions>
        </div>
      </q-slide-transition>
    </div>
  </q-card>
</template>

<script setup>
  import { ref } from "vue";
  import { helper } from "src/helpers";
  import { productType } from "src/constants";
  import { useProductStockSearch } from "../../_composables/useProductStockSearch";

  import ProductGroupLookup from "src/components/shared/lookups/ProductGroupLookup.vue";
  import InventoryLookup from "src/components/shared/lookups/InventoryLookup.vue";

  const expanded = ref(false);
  const searchStore = useProductStockSearch();
</script>
