<template>
  <toolbar-desktop margin title="گزارش مرور حساب" />

  <advanced-search :search-model="searchModel" />

  <div class="q-mt-md">
    <q-tabs
      v-model="tab"
      class="border-radius-lg text-white q-mb-md primary-tabs"
      align="left"
      inline-label
      narrow-indicator
    >
      <q-tab
        name="cl"
        class="text-h6 text-weight-700"
        label="گروه حساب"
        icon="bubble_chart"
      />
      <q-tab
        name="gl"
        class="text-h6 text-weight-700"
        label="حساب کل"
        icon="subject"
      />
      <q-tab
        name="sl"
        class="text-h6 text-weight-700"
        label="حساب معین"
        icon="menu"
      />
      <q-tab
        name="dl"
        class="text-h6 text-weight-700"
        label="حساب تفصیلی"
        icon="view_comfy"
      />
      <q-tab
        name="il"
        class="text-h6 text-weight-700"
        label="ریزگردش"
        icon="receipt"
      />
    </q-tabs>

    <q-tab-panels
      v-model="tab"
      animated
      keep-alive
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
  </div>
</template>

<script setup>
  import { ref } from "vue";

  import ReviewCl from "../desktop/ReviewCL.vue";
  import ReviewGl from "../desktop/ReviewGL.vue";
  import ReviewSl from "../desktop/ReviewSL.vue";
  import ReviewDl from "../desktop/ReviewDL.vue";
  import ReviewItem from "../desktop/AccountItem.vue";

  import AdvancedSearch from "../../voucher/desktop/index/AdvancedSearch.vue";
  import ToolbarDesktop from "components/shared/ToolBarDesktop.vue";

  const tab = ref("cl");
</script>
