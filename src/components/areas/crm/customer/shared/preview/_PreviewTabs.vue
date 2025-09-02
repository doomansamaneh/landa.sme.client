<template>
  <q-card class="bordered shadow">
    <card-tabs
      v-model="tab"
      :indicator-color="$q.dark.isActive ? 'yellow' : 'primary'"
      :active-color="$q.dark.isActive ? 'yellow' : 'primary'"
      align="left"
      inline-label
      narrow-indicator
      mobile-arrows
    >
      <card-tab
        name="main"
        :title="$t('shared.labels.basicInfo')"
        icon="o_person"
      />

      <q-btn-dropdown
        no-caps
        dropdown-icon="o_expand_more"
        auto-close
        :class="
          tab === 'quote' || tab === 'invoice'
            ? 'q-tab--active'
            : 'q-tab--inactive'
        "
        stretch
        unelevated
      >
        <template #label>
          <div
            v-if="tab === 'quote' || tab === 'invoice'"
            class="q-mx-md q-tab--active q-tab__indicator absolute-bottom bg-primary"
            style="opacity: 1"
          />

          <q-avatar
            rounded
            text-color="white"
            size="md"
            class="q-mr-md primary-gradient primary-shadow"
          >
            <q-icon
              size="16px"
              :name="tab === 'quote' ? 'o_assignment' : 'o_receipt'"
            />
          </q-avatar>

          <div class="text-h6 text-weight-700">
            {{
              tab === "quote"
                ? $t("main-menu-items.Sls_Quote_View")
                : $t("shared.labels.salesInvoices")
            }}
          </div>
        </template>

        <q-list>
          <q-item clickable @click="tab = 'quote'">
            <q-item-section avatar>
              <q-avatar
                rounded
                text-color="white"
                color="primary"
                icon="o_assignment"
                size="md"
              />
            </q-item-section>
            <q-item-section class="text-h6 text-weight-700">
              {{ $t("main-menu-items.Sls_Quote_View") }}
            </q-item-section>
          </q-item>

          <q-item clickable @click="tab = 'invoice'">
            <q-item-section avatar>
              <q-avatar
                rounded
                text-color="white"
                color="primary"
                icon="o_receipt"
                size="md"
              />
            </q-item-section>
            <q-item-section class="text-h6 text-weight-700">
              {{ $t("shared.labels.salesInvoices") }}
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>

      <card-tab
        name="review"
        :title="$t('shared.labels.accountItem')"
        icon="o_repeat"
      />

      <card-tab
        name="check"
        :title="$t('shared.labels.paymentItemCheck')"
        icon="o_receipt"
      />

      <card-tab
        name="log"
        :title="$t('shared.labels.history')"
        icon="o_history"
      />
    </card-tabs>

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
  import CardTabs from "src/components/shared/CardTabs.vue";
  import CardTab from "src/components/shared/CardTab.vue";

  const props = defineProps({
    item: Object,
  });

  const $q = useQuasar();
  const tab = ref("main");
</script>
