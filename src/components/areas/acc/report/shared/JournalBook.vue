<template>
  <toolbar-desktop margin :title="title" />

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
        title="گزارش دفتر الکترونیکی"
        icon="o_menu_book"
      />

      <card-tab
        name="cl"
        title="گزارش دفتر روزنامه"
        icon="o_bubble_chart"
      />

      <card-tab name="gl" title="گزارش دفتر کل" icon="o_subject" />

      <card-tab
        name="sl"
        title="Total: گزارش دفتر روزنامه"
        icon="o_menu"
      />

      <card-tab
        name="dl"
        title="Total: گزارش دفتر کل"
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
          title="گزارش دفتر"
          sub-title="الکترونیکی"
        />
      </q-tab-panel>

      <q-tab-panel name="cl" class="no-padding">
        <journal-book-default
          sort-column="voucherNo,code"
          title="گزارش دفتر روزنامه"
        />
      </q-tab-panel>
      <q-tab-panel name="gl" class="no-padding">
        <journal-book-default
          sort-column="code,voucherNo"
          title="گزارش دفتر کل"
        />
      </q-tab-panel>
      <q-tab-panel name="sl" class="no-padding">
        <journal-book-total
          sort-column="month,code,credit"
          title="Total: گزارش دفتر روزنامه"
        />
      </q-tab-panel>
      <q-tab-panel name="dl" class="no-padding">
        <journal-book-total
          sort-column="code,month,credit"
          title="Total: گزارش دفتر کل"
        />
      </q-tab-panel>
    </q-tab-panels>
  </q-card>
</template>

<script setup>
  import { ref } from "vue";
  import { journalBookTaxColumns } from "../../_composables/constants";

  import JournalBookDefault from "../desktop/JournalBookDefault.vue";
  import JournalBookTotal from "../desktop/JournalBookTotal.vue";
  import ReviewItem from "../desktop/AccountItem.vue";
  import AdvancedSearch from "../../voucher/desktop/index/AdvancedSearch.vue";

  import CardTabs from "src/components/shared/CardTabs.vue";
  import CardTab from "src/components/shared/CardTab.vue";
  import ToolbarDesktop from "components/shared/ToolBarDesktop.vue";

  const props = defineProps({
    title: String,
  });

  const tab = ref("el");
</script>
