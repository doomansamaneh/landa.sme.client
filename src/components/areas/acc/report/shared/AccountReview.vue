<template>
  <toolbar-desktop margin :title="title" />

  <advanced-search :search-model="searchModel" />

  <q-card flat class="bordered shadow">
    <card-tabs
      v-model="tab"
      class="text-h6 text-weight-700 primary-tabs"
      :indicator-color="$q.dark.isActive ? 'yellow' : 'primary'"
      :active-color="$q.dark.isActive ? 'yellow' : 'primary'"
      align="left"
      inline-label
      narrow-indicator
      mobile-arrows
    >
      <card-tab name="cl" title="گروه حساب" icon="o_bubble_chart" />

      <card-tab name="gl" title="حساب کل" icon="o_subject" />

      <card-tab name="sl" title="حساب معین" icon="o_menu" />

      <card-tab name="dl" title="حساب تفصیلی" icon="o_view_comfy" />

      <card-tab name="il" title="ریزگردش" icon="o_receipt" />
    </card-tabs>

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
  </q-card>
</template>

<script setup>
  import { ref } from "vue";

  import ReviewCl from "../desktop/ReviewCL.vue";
  import ReviewGl from "../desktop/ReviewGL.vue";
  import ReviewSl from "../desktop/ReviewSL.vue";
  import ReviewDl from "../desktop/ReviewDL.vue";
  import ReviewItem from "../desktop/AccountItem.vue";

  import CardTabs from "src/components/shared/CardTabs.vue";
  import CardTab from "src/components/shared/CardTab.vue";
  import AdvancedSearch from "../../voucher/desktop/index/AdvancedSearch.vue";
  import ToolbarDesktop from "components/shared/ToolBarDesktop.vue";

  const props = defineProps({
    title: String,
  });
  const tab = ref("cl");
</script>
