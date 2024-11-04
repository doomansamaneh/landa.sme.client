<template>
  <toolbar-desktop margin title="گزارش مرور حساب" />

  <advanced-search :search-model="searchModel" />

  <q-card flat class="bordered shadow">
    <div
      class="row justify-between overflow-hidden primary-gradient-1"
    >
      <q-tabs
        v-model="tab"
        class="text-h6 text-weight-700 primary-tabs"
        :indicator-color="$q.dark.isActive ? 'yellow' : 'primary'"
        :active-color="$q.dark.isActive ? 'yellow' : 'primary'"
        align="left"
        inline-label
        narrow-indicator
      >
        <q-tab name="cl" class="text-h6 text-weight-700">
          <template #default>
            <div class="row items-center">
              <q-avatar
                rounded
                text-color="white"
                icon="o_bubble_chart"
                size="md"
                class="primary-gradient primary-shadow q-mr-md"
              />
              <div class="text-h6 no-letter-spacing">گروه حساب</div>
            </div>
          </template>
        </q-tab>
        <q-tab name="gl" class="text-h6 text-weight-700">
          <template #default>
            <div class="row items-center">
              <q-avatar
                rounded
                text-color="white"
                icon="o_subject"
                size="md"
                class="primary-gradient primary-shadow q-mr-md"
              />
              <div class="text-h6 no-letter-spacing">حساب کل</div>
            </div>
          </template>
        </q-tab>
        <q-tab name="sl" class="text-h6 text-weight-700">
          <template #default>
            <div class="row items-center">
              <q-avatar
                rounded
                text-color="white"
                icon="o_menu"
                size="md"
                class="primary-gradient primary-shadow q-mr-md"
              />
              <div class="text-h6 no-letter-spacing">حساب معین</div>
            </div>
          </template>
        </q-tab>
        <q-tab name="dl" class="text-h6 text-weight-700">
          <template #default>
            <div class="row items-center">
              <q-avatar
                rounded
                text-color="white"
                icon="o_view_comfy"
                size="md"
                class="primary-gradient primary-shadow q-mr-md"
              />
              <div class="text-h6 no-letter-spacing">حساب تفصیلی</div>
            </div>
          </template>
        </q-tab>
        <q-tab
          name="il"
          class="text-h6 text-weight-700"
        >
          <template #default>
            <div class="row items-center">
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

      <data-grid-toolbar class="q-pa-md" :table-store="tableStore" />
    </div>

    <q-separator size="1px" />

    <q-tab-panels
      v-model="tab"
      animated
      keep-alive_
      class="transparent"
    >
      <q-tab-panel name="cl" class="no-padding">
        <review-cl />
      </q-tab-panel>
      <q-tab-panel name="gl" class="no-padding">
        <review-gl />
      </q-tab-panel>
      <q-tab-panel name="sl" class="no-padding">
        <review-sl />
      </q-tab-panel>
      <q-tab-panel name="dl" class="no-padding">
        <review-dl />
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

  import ReviewCl from "../desktop/ReviewCL.vue";
  import ReviewGl from "../desktop/ReviewGL.vue";
  import ReviewSl from "../desktop/ReviewSL.vue";
  import ReviewDl from "../desktop/ReviewDL.vue";
  import ReviewItem from "../desktop/AccountItem.vue";

  import AdvancedSearch from "../../voucher/desktop/index/AdvancedSearch.vue";
  import ToolbarDesktop from "components/shared/ToolBarDesktop.vue";
  import DataGridToolbar from "components/shared/dataTables/desktop/DataGridToolbar.vue";

  const tab = ref("cl");

  const tableStore = useDataTable({
    dataSource: "",
    gridStore: "",
  });
</script>
