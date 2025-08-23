<template>
  <!-- <toolbar-desktop margin :title="title" /> -->

  <advanced-search />

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
      v-model="tab"
      class="text-h6 text-weight-700 primary-tabs"
      :indicator-color="$q.dark.isActive ? 'yellow' : 'primary'"
      :active-color="$q.dark.isActive ? 'yellow' : 'primary'"
      align="left"
      inline-label
      narrow-indicator
      mobile-arrows
    >
      <card-tab
        name="el"
        :title="t('shared.labels.electronicReport')"
        icon="o_menu_book"
      />

      <card-tab
        name="cl"
        :title="t('shared.labels.journalReport')"
        icon="o_bubble_chart"
      />

      <card-tab
        name="gl"
        :title="t('shared.labels.generalLedgerReport')"
        icon="o_subject"
      />

      <card-tab
        name="sl"
        :title="t('shared.labels.journalTotalReport')"
        icon="o_menu"
      />

      <card-tab
        name="dl"
        :title="
          t('shared.labels.generalLedgerTotalReport')
        "
        icon="o_view_comfy"
      />
    </card-tabs>

    <q-tab-panels
      v-model="tab"
      animated
      keep-alive
      class="transparent"
    >
      <q-tab-panel name="el" class="no-padding">
        <review-item
          :columns="journalBookTaxColumns"
          sort-column="voucherNo"
          :title="t('shared.labels.report')"
          :sub-title="t('shared.labels.electronic')"
        />
      </q-tab-panel>

      <q-tab-panel name="cl" class="no-padding">
        <journal-book-default
          sort-column="voucherNo,code"
          :title="t('shared.labels.journalReport')"
        />
      </q-tab-panel>
      <q-tab-panel name="gl" class="no-padding">
        <journal-book-default
          sort-column="code,voucherNo"
          :title="t('shared.labels.generalLedgerReport')"
        />
      </q-tab-panel>
      <q-tab-panel name="sl" class="no-padding">
        <journal-book-total
          sort-column="month,code,credit"
          :title="t('shared.labels.journalTotalReport')"
        />
      </q-tab-panel>
      <q-tab-panel name="dl" class="no-padding">
        <journal-book-total
          sort-column="code,month,credit"
          :title="
            t('shared.labels.generalLedgerTotalReport')
          "
        />
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
</template>

<script setup>
  import { ref } from "vue";
  import { useI18n } from "vue-i18n";
  import { journalBookTaxColumns } from "../../_composables/constants";

  import JournalBookDefault from "../desktop/JournalBookDefault.vue";
  import JournalBookTotal from "../desktop/JournalBookTotal.vue";
  import ReviewItem from "../desktop/AccountItem.vue";
  import AdvancedSearch from "../../voucher/desktop/index/AdvancedSearch.vue";

  import CardTabs from "src/components/shared/CardTabs.vue";
  import CardTab from "src/components/shared/CardTab.vue";
  // import ToolbarDesktop from "components/shared/toolbars/DynamicToolbarDesktop.vue";

  const { t } = useI18n();

  const props = defineProps({
    title: String,
  });

  const tab = ref("el");
</script>
