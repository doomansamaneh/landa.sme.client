<template>
  <tool-bar
    :inside="inside"
    :margin="!inside"
    :title="title"
    buttons
    back-button
  >
    <template #buttons>
      <q-btn
        :to="`/${baseRoute}/edit/${id}`"
        class="primary-gradient primary-shadow text-white text-body2 no-letter-spacing"
        padding="6px 12px"
        rounded
        unelevated
        no-caps
      >
        <q-icon size="20px" name="o_edit" class="q-mr-xs" />
        {{ $t("shared.labels.edit") }}
      </q-btn>
      <q-btn
        :to="`/${baseRoute}/copy/${id}`"
        class="text-body2 no-letter-spacing"
        padding="6px 12px"
        rounded
        unelevated
        no-caps
      >
        <q-icon size="20px" name="o_copy" class="q-mr-xs" />
        {{ $t("shared.labels.copy") }}
      </q-btn>
      <q-btn
        @click="crudStore.deleteById(id)"
        class="text-body2 no-letter-spacing"
        padding="6px 12px"
        rounded
        unelevated
        no-caps
      >
        <q-icon size="20px" name="o_delete" class="q-mr-xs" />
        {{ $t("shared.labels.delete") }}
      </q-btn>
      <q-btn
        @click="helper.print('invoicePreview')"
        class="text-body2 no-letter-spacing"
        padding="6px 12px"
        rounded
        unelevated
        no-caps
      >
        <q-icon size="20px" name="o_print" class="q-mr-xs" />
        {{ $t("shared.labels.print") }}
      </q-btn>
    </template>
  </tool-bar>

  <div class="row q-col-gutter-lg" style="margin-top: -16px">
    <div class="col-md-8 col-sm-12 col-xs-12">
      <q-card bordered>
        <div id="invoicePreview">
          <header-section
            :model="model"
            :title="$t('main-menu-items.Inv_Production_View')"
          >
            <template #header>
              <div class="q-gutter-sm">
                <span>انبار مبدا:</span>
                <span class="q-px-sm">
                  {{ model?.inventoryTitle }}
                </span>
              </div>
              <div class="q-gutter-sm">
                <span>انبار مقصد:</span>
                <span class="q-px-sm">
                  {{ model?.toInventoryTitle }}
                </span>
              </div>
            </template>
          </header-section>

          <q-card-section class="q-gutter-y-sm_">
            <q-tabs
              v-model="tab"
              class="text-weight-700 bg-green q-mt-lg"
              :indicator-color="$q.dark.isActive ? 'yellow' : 'white'"
              :active-color="$q.dark.isActive ? 'yellow' : 'white'"
              align="left"
              inline-label
              narrow-indicator
            >
              <q-tab
                class="q-mr-xs"
                name="usedItem"
                label="کالاهای استفاده شده"
                icon="o_keyboard"
              />
              <q-tab
                class="q-mr-xs"
                name="cost"
                label="سربار و هزینه"
                icon="o_assignment"
              />
              <q-tab
                class="q-mr-xs"
                name="scrap"
                label="ضایعات"
                icon="o_assignment"
              />
              <q-tab
                class="q-mr-xs"
                name="product"
                label="کالاهای تولید شده"
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
  import { useRoute, useRouter } from "vue-router";
  import { helper } from "src/helpers";
  import { useFormActions } from "src/composables/useFormActions";

  import ToolBar from "src/components/shared/ToolBarDesktop.vue";
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

  const route = useRoute();
  const router = useRouter();

  const id = computed(() => props.item?.id ?? route.params.id);

  function deleteCallBack() {
    //voucherStore.state.firstLoad.value = false;
    router.back();
  }

  onMounted(() => {
    crudStore.getById(id.value);
  });
</script>
