<template>
  <toolbar-desktop margin :title="title" />

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
        mobile-arrows
      >
        <custom-tab
          name="cl"
          title="گروه حساب"
          icon="o_bubble_chart"
        />

        <custom-tab name="gl" title="حساب کل" icon="o_subject" />

        <custom-tab name="sl" title="حساب معین" icon="o_menu" />

        <custom-tab
          name="dl"
          title="حساب تفصیلی"
          icon="o_view_comfy"
        />

        <custom-tab name="il" title="ریزگردش" icon="o_receipt" />
      </q-tabs>
    </div>

    <q-separator size="1px" />

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

  import CustomTab from "src/components/shared/CustomTab.vue";
  import AdvancedSearch from "../../voucher/desktop/index/AdvancedSearch.vue";
  import ToolbarDesktop from "components/shared/ToolBarDesktop.vue";

  const props = defineProps({
    title: String,
  });
  const tab = ref("cl");
</script>
