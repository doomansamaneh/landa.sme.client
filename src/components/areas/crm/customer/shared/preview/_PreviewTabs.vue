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
        <q-tab name="main" class="text-h6 text-weight-700">
          <template #default>
            <div class="row items-center no-wrap q-py-sm q-my-xs">
              <q-avatar
                rounded
                text-color="white"
                icon="o_person"
                size="md"
                class="primary-gradient primary-shadow q-mr-md"
              />
              <div class="text-h6 no-letter-spacing">
                اطلاعات پایه
              </div>
            </div>
          </template>
        </q-tab>

        <q-tab name="quote" class="text-h6 text-weight-700">
          <template #default>
            <div class="row items-center no-wrap q-py-sm q-my-xs">
              <q-avatar
                rounded
                text-color="white"
                icon="o_assignment"
                size="md"
                class="primary-gradient primary-shadow q-mr-md"
              />
              <div class="text-h6 no-letter-spacing">
                پیش‌فاکتورها
              </div>
            </div>
          </template>
        </q-tab>

        <q-tab name="invoice" class="text-h6 text-weight-700">
          <template #default>
            <div class="row items-center no-wrap q-py-sm q-my-xs">
              <q-avatar
                rounded
                text-color="white"
                icon="o_receipt"
                size="md"
                class="primary-gradient primary-shadow q-mr-md"
              />
              <div class="text-h6 no-letter-spacing">
                فاکتورهای فروش
              </div>
            </div>
          </template>
        </q-tab>

        <q-tab name="review" class="text-h6 text-weight-700">
          <template #default>
            <div class="row items-center no-wrap q-py-sm q-my-xs">
              <q-avatar
                rounded
                text-color="white"
                icon="o_repeat"
                size="md"
                class="primary-gradient primary-shadow q-mr-md"
              />
              <div class="text-h6 no-letter-spacing">گردش حساب</div>
            </div>
          </template>
        </q-tab>

        <q-tab name="check" class="text-h6 text-weight-700">
          <template #default>
            <div class="row items-center no-wrap q-py-sm q-my-xs">
              <q-avatar
                rounded
                text-color="white"
                icon="o_receipt"
                size="md"
                class="primary-gradient primary-shadow q-mr-md"
              />
              <div class="text-h6 no-letter-spacing">
                چکهای دریافتی، پرداختی
              </div>
            </div>
          </template>
        </q-tab>

        <q-tab name="log" class="text-h6 text-weight-700">
          <template #default>
            <div class="row items-center no-wrap q-py-sm q-my-xs">
              <q-avatar
                rounded
                text-color="white"
                icon="o_history"
                size="md"
                class="primary-gradient primary-shadow q-mr-md"
              />
              <div class="text-h6 no-letter-spacing">تاریخچه</div>
            </div>
          </template>
        </q-tab>
      </q-tabs>
    </div>

    <q-separator size="1px" />

    <q-card-section class="q-pa-lg">
      <template v-if="tab === 'main'">
        <base-info v-if="item.id" :item="item" />
      </template>
      <quote-review v-if="tab === 'quote'" :item="item" />
      <invoice-review v-if="tab === 'invoice'" :item="item" />
      <account-review v-if="tab === 'review'" :item="item" />
      <check-item v-if="tab === 'check'" :customer-id="item.id" />
      <log
        v-if="tab === 'log'"
        :entity-id="item.id"
        entity-name="Crm.[Customer]"
      />
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

  const props = defineProps({
    item: Object,
  });

  const $q = useQuasar();
  const tab = ref("main");
</script>
