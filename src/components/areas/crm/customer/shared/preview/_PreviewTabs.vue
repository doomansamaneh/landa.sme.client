<template>
  <q-card>
    <div
      class="row justify-between overflow-hidden primary-gradient-1 q-mt-lg"
    >
      <q-tabs
        v-model="tab"
        class="wrap-tab scroll text-h6 text-weight-700"
        :indicator-color="$q.dark.isActive ? 'yellow' : 'primary'"
        :active-color="$q.dark.isActive ? 'yellow' : 'primary'"
        align="left"
        inline-label
        narrow-indicator
        mobile-arrows
      >
        <custom-tab
          name="main"
          title="اطلاعات پایه"
          icon="o_person"
        />

        <custom-tab
          name="quote"
          title="پیش فاکتورها"
          icon="o_assignment"
        />

        <custom-tab
          name="invoice"
          title="فاکتورها"
          icon="o_receipt"
        />

        <custom-tab name="review" title="گردش حساب" icon="o_repeat" />

        <custom-tab
          name="check"
          title="چکهای دریافتی، پرداختی"
          icon="o_receipt"
        />

        <custom-tab name="log" title="تاریخچه" icon="o_history" />
      </q-tabs>
    </div>

    <q-separator size="1px" />

    <q-card-section class="q-pa-lg">
      <q-tab-panels
        v-model="tab"
        animated
        keep-alive
        class="transparent"
      >
        <q-tab-panel name="main" class="no-padding">
          <base-info v-if="item.id" :item="item" />
        </q-tab-panel>
        <q-tab-panel name="quote" class="no-padding">
          <quote-review :item="item" />
        </q-tab-panel>
        <q-tab-panel name="invoice" class="no-padding">
          <invoice-review :item="item" />
        </q-tab-panel>
        <q-tab-panel name="review" class="no-padding">
          <account-review :item="item" />
        </q-tab-panel>
        <q-tab-panel name="check" class="no-padding">
          <check-item :customer-id="item.id" />
        </q-tab-panel>
        <q-tab-panel name="log" class="no-padding">
          <log :entity-id="item.id" entity-name="Crm.[Customer]" />
        </q-tab-panel>
      </q-tab-panels>
    </q-card-section>
  </q-card>
</template>

<script setup>
  import { ref } from "vue";
  import { useQuasar } from "quasar";

  import BaseInfo from "./_TabPanelBaseInfo.vue";
  import QuoteReview from "./_TabPanelQuote.vue";
  import InvoiceReview from "./_TabPanelInvoice.vue";
  import AccountReview from "./_TabPanelAccount.vue";
  import CheckItem from "src/components/areas/trs/report/shared/CheckItem.vue";
  import Log from "src/components/areas/_shared/log/PreviewLog.vue";
  import CustomTab from "src/components/shared/CustomTab.vue";

  const props = defineProps({
    item: Object,
  });

  const $q = useQuasar();
  const tab = ref("main");
</script>
