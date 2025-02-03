<template>
  <toolbar-desktop margin :title="title" />

  <advanced-search />

  <tip-banner :tip="tip" closeable class="q-mb-md" />

  <chip
    icon="filter_alt"
    icon-remove="o_close"
    color="primary"
    class="q-mb-sm"
    :store="accountReviewStore"
    key-type="accountTreeType"
  />

  <q-card flat class="bordered shadow">
    <card-tabs
      v-model="accountReviewStore.tab.value"
      class="text-h6 text-weight-700 primary-tabs"
      :indicator-color="$q.dark.isActive ? 'yellow' : 'primary'"
      :active-color="$q.dark.isActive ? 'yellow' : 'primary'"
      align="left"
      inline-label
      narrow-indicator
      mobile-arrows
    >
      <card-tab
        name="cl"
        :title="$t('shared.accountTreeType.cl')"
        icon="o_bubble_chart"
      />

      <card-tab
        name="gl"
        :title="$t('shared.accountTreeType.gl')"
        icon="o_subject"
      />

      <card-tab
        name="sl"
        :title="$t('shared.accountTreeType.sl')"
        icon="o_menu"
      />

      <card-tab
        name="dl"
        :title="$t('shared.accountTreeType.dl')"
        icon="o_view_comfy"
      />

      <card-tab
        name="slDl"
        :title="$t('shared.accountTreeType.slDl')"
        icon="o_view_comfy"
      />

      <card-tab
        name="il"
        :title="$t('shared.labels.accountItem')"
        icon="o_receipt"
      />
    </card-tabs>

    <q-tab-panels
      v-model="accountReviewStore.tab.value"
      animated
      keep-alive
      class="transparent"
    >
      <q-tab-panel name="cl" class="no-padding">
        <review-cl
          :title="$t('shared.accountTreeType.cl')"
          :report-store="accountReviewStore"
        />
      </q-tab-panel>
      <q-tab-panel name="gl" class="no-padding">
        <review-gl
          :title="$t('shared.accountTreeType.gl')"
          :report-store="accountReviewStore"
        />
      </q-tab-panel>
      <q-tab-panel name="sl" class="no-padding">
        <review-sl
          :title="$t('shared.accountTreeType.sl')"
          :report-store="accountReviewStore"
        />
      </q-tab-panel>
      <q-tab-panel name="dl" class="no-padding">
        <review-dl
          :title="$t('shared.accountTreeType.dl')"
          :report-store="accountReviewStore"
        />
      </q-tab-panel>
      <q-tab-panel name="slDl" class="no-padding">
        <review-sl-dl
          :title="$t('shared.accountTreeType.slDl')"
          :report-store="accountReviewStore"
        />
      </q-tab-panel>
      <q-tab-panel name="il" class="no-padding">
        <review-item
          :title="$t('shared.labels.accountItem')"
          :report-store="accountReviewStore"
        />
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
</template>

<script setup>
  import { useAccountReview } from "src/components/areas/acc/_composables/useAccountReview";

  import ReviewCl from "../desktop/ReviewCL.vue";
  import ReviewGl from "../desktop/ReviewGL.vue";
  import ReviewSl from "../desktop/ReviewSL.vue";
  import ReviewDl from "../desktop/ReviewDL.vue";
  import ReviewSlDl from "../desktop/ReviewSLDL.vue";
  import ReviewItem from "../desktop/AccountItem.vue";
  import Chip from "src/components/shared/CustomChip.vue";

  import CardTabs from "src/components/shared/CardTabs.vue";
  import CardTab from "src/components/shared/CardTab.vue";
  import AdvancedSearch from "../../voucher/desktop/index/AdvancedSearch.vue";
  import ToolbarDesktop from "components/shared/ToolBarDesktop.vue";
  import TipBanner from "src/components/shared/TipBanner.vue";

  const props = defineProps({
    title: String,
  });

  const accountReviewStore = useAccountReview();

  const tip =
    "بر روی سطر مورد نظر دابل کلیک کنید تا گردشهای آن ردیف را در  تب‌های پس از آن مشاهده کنید";
</script>
