<template>
  <toolbar-desktop margin title="گزارش مرور فروش" />

  <advanced-search />

  <q-card flat class="bordered shadow q-mt-md">
    <div
      class="row justify-between overflow-hidden primary-gradient-1"
    >
      <q-tabs
        v-model="tab"
        class="col text-h6 text-weight-700 primary-tabs"
        :indicator-color="$q.dark.isActive ? 'yellow' : 'primary'"
        :active-color="$q.dark.isActive ? 'yellow' : 'primary'"
        align="left"
        inline-label
        narrow-indicator
      >
        <q-tab name="pg" class="text-h6 text-weight-700">
          <template #default>
            <div class="row no-wrap items-center">
              <q-avatar
                rounded
                text-color="white"
                icon="o_bubble_chart"
                size="md"
                class="primary-gradient primary-shadow q-mr-md"
              />
              <div class="text-h6 no-letter-spacing">
                گروه کالا و خدمات
              </div>
            </div>
          </template>
        </q-tab>
        <q-tab name="prd" class="text-h6 text-weight-700">
          <template #default>
            <div class="row no-wrap items-center">
              <q-avatar
                rounded
                text-color="white"
                icon="o_subject"
                size="md"
                class="primary-gradient primary-shadow q-mr-md"
              />
              <div class="text-h6 no-letter-spacing">
                کالا و خدمات
              </div>
            </div>
          </template>
        </q-tab>
        <q-tab name="crm" class="text-h6 text-weight-700">
          <template #default>
            <div class="row no-wrap items-center">
              <q-avatar
                rounded
                text-color="white"
                icon="o_menu"
                size="md"
                class="primary-gradient primary-shadow q-mr-md"
              />
              <div class="text-h6 no-letter-spacing">طرف حساب</div>
            </div>
          </template>
        </q-tab>
        <q-tab name="prdCrm" class="text-h6 text-weight-700">
          <template #default>
            <div class="row no-wrap items-center">
              <q-avatar
                rounded
                text-color="white"
                icon="o_view_comfy"
                size="md"
                class="primary-gradient primary-shadow q-mr-md"
              />
              <div class="text-h6 no-letter-spacing">
                طرف حساب/کالا و خدمت
              </div>
            </div>
          </template>
        </q-tab>
        <q-tab name="il" class="text-h6 text-weight-700">
          <template #default>
            <div class="row no-wrap items-center">
              <q-avatar
                rounded
                text-color="white"
                icon="o_receipt"
                size="md"
                class="primary-gradient primary-shadow q-mr-md"
              />
              <div class="text-h6 no-letter-spacing">ریزگردش</div>
            </div>
          </template>
        </q-tab>
      </q-tabs>

      <data-grid-toolbar
        dense
        class="col-1 flex justify-end q-pa-md"
        :table-store="tableStore"
      />
    </div>

    <q-separator size="1px" />

    <q-tab-panels
      v-model="tab"
      animated
      keep-alive_
      class="transparent"
    >
      <q-tab-panel name="pg" class="no-padding">
        <review-pg />
      </q-tab-panel>
      <q-tab-panel name="prd" class="no-padding">
        <review-prd />
      </q-tab-panel>
      <q-tab-panel name="crm" class="no-padding">
        <review-customer />
      </q-tab-panel>
      <q-tab-panel name="prdCrm" class="no-padding">
        <review-prd-customer />
      </q-tab-panel>
      <q-tab-panel name="il" class="no-padding">
        <review-item />
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
</template>

<script setup>
  import { ref } from "vue";
  import { useDataTable } from "src/composables/useDataTable";

  import ReviewPg from "../desktop/ReviewProductGroup.vue";
  import ReviewPrd from "../desktop/ReviewProduct.vue";
  import ReviewCustomer from "../desktop/ReviewCustomer.vue";
  import ReviewPrdCustomer from "../desktop/ReviewProductCustomer.vue";
  import ReviewItem from "../desktop/ReviewItem.vue";

  import AdvancedSearch from "components/areas/sls/_shared/invoice/desktop/index/AdvancedSearch.vue";
  import ToolbarDesktop from "components/shared/ToolBarDesktop.vue";
  import DataGridToolbar from "components/shared/dataTables/desktop/DataGridToolbar.vue";

  const tableStore = useDataTable({
    dataSource: "",
    gridStore: "",
  });

  const tab = ref("pg");
</script>
