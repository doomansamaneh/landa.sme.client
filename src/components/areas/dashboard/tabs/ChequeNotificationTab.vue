<template>
  <div
    v-access="`acc.report.accountReview`"
    class="row q-col-gutter-lg"
    :style="$q.screen.gt.sm ? 'padding-top: 38px' : 'padding-top: 0'"
  >
    <!-- Desktop View: Two separate cards -->
    <template v-if="$q.screen.gt.xs">
      <div class="col-12">
        <q-card bordered>
          <card-title
            :title="$t('dashboard.chequeNotificationTab.received')"
            icon="o_receipt"
          />
          <check-data-grid-desktop
            :filter-expression="receiptFilter"
          />
        </q-card>
      </div>
      <div class="col-12">
        <q-card bordered>
          <card-title
            :title="$t('dashboard.chequeNotificationTab.payed')"
            icon="o_payment"
          />
          <check-data-grid-desktop :filter-expression="payedFilter" />
        </q-card>
      </div>
    </template>

    <!-- Mobile View: Tabs -->
    <template v-else>
      <div class="col-12">
        <div
          :style="`margin-top: ${
            $q.screen.xs ? 24 : $q.screen.sm ? 36 : 0
          }px`"
        >
          <q-page-sticky
            class="block bg-main z-2"
            position="top"
            expand
            style="margin-top: 36px"
          >
            <q-tabs
              v-model="activeTab"
              no-caps
              inline-label
              narrow-indicator
              dense
              :active-color="$q.dark.isActive ? 'yellow' : 'primary'"
              align="left"
            >
              <q-tab
                name="received"
                :icon="'o_receipt'"
                :label="
                  $t('dashboard.chequeNotificationTab.received')
                "
              />
              <q-tab
                name="payed"
                :icon="'o_payment'"
                :label="$t('dashboard.chequeNotificationTab.payed')"
              />
            </q-tabs>

            <q-separator />
          </q-page-sticky>
        </div>

        <q-tab-panels keep-alive v-model="activeTab">
          <q-tab-panel name="received" class="q-pa-none">
            <check-data-grid-mobile
              :filter-expression="receiptFilter"
            />
          </q-tab-panel>
          <q-tab-panel name="payed" class="q-pa-none">
            <check-data-grid-mobile
              :filter-expression="payedFilter"
            />
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </template>
  </div>
</template>

<script setup>
  import { ref } from "vue";
  import {
    sqlOperator,
    documentType,
    paymentStatus,
  } from "src/constants";

  import CheckDataGridDesktop from "src/components/areas/trs/report/desktop/_CheckItemDataGrid.vue";
  import CheckDataGridMobile from "src/components/areas/trs/report/mobile/_CheckItemDataGrid.vue";
  import CardTitle from "src/components/shared/CardTitle.vue";

  const activeTab = ref("received");

  const receiptFilter = [
    {
      fieldName: "d.TypeId",
      operator: sqlOperator.equal,
      value: documentType.receipt,
    },
    {
      fieldName: "pi.StatusId",
      operator: sqlOperator.in,
      value: `${paymentStatus.normal},${paymentStatus.transferedToBank}`,
    },
  ];

  const payedFilter = [
    {
      fieldName: "d.TypeId",
      operator: sqlOperator.equal,
      value: documentType.payment,
    },
    {
      fieldName: "pi.StatusId",
      operator: sqlOperator.in,
      value: `${paymentStatus.normal},${paymentStatus.transferedToBank}`,
    },
  ];
</script>
