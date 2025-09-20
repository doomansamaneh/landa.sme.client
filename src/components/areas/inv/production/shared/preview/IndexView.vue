<template>
  <toolbar-container
    v-if="model"
    :model="model"
    :inside="inside"
    :margin="!inside"
    :title="title"
  />

  <div class="row q-col-gutter-lg">
    <div class="col-md-8 col-sm-12 col-xs-12">
      <q-card bordered>
        <div :ref="printStore.printRef">
          <header-section
            :model="model"
            :title="$t('main-menu-items.Inv_Production_View')"
          >
            <template #header>
              <div class="q-mt-sm q-gutter-y-sm">
                <div class="q-gutter-sm">
                  <span>
                    {{ $t("shared.columns.fromInventoryTitle") }}:
                  </span>
                  <span class="q-px-sm">
                    {{ model?.inventoryTitle }}
                  </span>
                </div>
                <div class="q-gutter-sm">
                  <span>
                    {{ $t("shared.columns.toInventoryTitle") }}:
                  </span>
                  <span class="q-px-sm">
                    {{ model?.toInventoryTitle }}
                  </span>
                </div>
              </div>
            </template>
          </header-section>

          <q-card-section class="q-gutter-y-sm_">
            <q-tabs
              v-model="tab"
              class="text-weight-700 bg-green"
              :indicator-color="$q.dark.isActive ? 'yellow' : 'white'"
              :active-color="$q.dark.isActive ? 'yellow' : 'white'"
              align="left"
              inline-label
              narrow-indicator
            >
              <q-tab
                class="q-mr-xs"
                name="usedItem"
                :label="$t('shared.labels.productionUsedItems')"
                icon="o_keyboard"
              />
              <q-tab
                class="q-mr-xs"
                name="cost"
                :label="$t('shared.labels.productionCosts')"
                icon="o_assignment"
              />
              <q-tab
                class="q-mr-xs"
                name="scrap"
                :label="$t('shared.labels.scrap')"
                icon="o_assignment"
              />
              <q-tab
                class="q-mr-xs"
                name="product"
                :label="$t('shared.labels.producedProducts')"
                icon="o_assignment"
              />
            </q-tabs>

            <q-tab-panels
              class="q-mt-md"
              v-model="tab"
              keep-alive
              animated
            >
              <q-tab-panel
                class="no-padding bg-main_"
                name="usedItem"
              >
                <used-items :model="model" />
              </q-tab-panel>
              <q-tab-panel class="no-padding bg-main_" name="cost">
                <cost-items :model="model" />
              </q-tab-panel>
              <q-tab-panel class="no-padding bg-main" name="scrap">
                <scarp-items :model="model" />
              </q-tab-panel>
              <q-tab-panel class="no-padding bg-main_" name="product">
                <product-items :model="model" />
              </q-tab-panel>
            </q-tab-panels>
          </q-card-section>
        </div>
      </q-card>
    </div>

    <div class="col-md-4 col-sm-12 col-xs-12">
      <detail-section :model="model" />
    </div>
  </div>
</template>

<script setup>
  import { ref, computed, onMounted } from "vue";
  import { useRoute } from "vue-router";
  import { usePrint } from "src/composables/usePrint";
  import { useFormActions } from "src/composables/useFormActions";

  import ToolbarContainer from "./ToolbarContainer.vue";
  import HeaderSection from "src/components/areas/_shared/preview/VoucherHeader.vue";
  import ProductItems from "./_ProductItems.vue";
  import UsedItems from "./_UsedItems.vue";
  import CostItems from "./_CostItems.vue";
  import ScarpItems from "./_ScarpItems.vue";
  import DetailSection from "./_DetailSection.vue";

  const props = defineProps({
    item: Object,
    title: String,
    inside: Boolean,
  });

  const baseRoute = "inv/production";
  const model = ref(null);
  const tab = ref("usedItem");

  const crudStore = useFormActions(baseRoute, model);
  const printStore = usePrint();
  const route = useRoute();

  const id = computed(() => props.item?.id ?? route.params.id);

  onMounted(() => {
    crudStore.getById(id.value);
  });
</script>
