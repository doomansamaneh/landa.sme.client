<template>
  <data-view
    ref="paymentGrid"
    :dataSource="paymentDataSource"
    :grid-store="gridStore"
    class="q-my-xl"
  >
    <template #header>
      <q-item class="card-header q-px-lg q-py-lg">
        <q-item-section>
          <q-item-label class="text-h6 text-weight-700">
            {{ $t("pages.payments") }}
          </q-item-label>
          <q-item-label caption>
            {{ business?.title }}
          </q-item-label>
        </q-item-section>
        <q-card-actions class="no-padding">
          <div class="flex items-center">
            <q-btn
              no-caps
              round
              unelevated
              class="text-on-dark"
              dense
              @click="refreshPayments"
            >
              <q-icon size="20px" name="o_refresh" />
              <q-tooltip class="custom-tooltip">
                {{ $t("shared.labels.refresh") }}
              </q-tooltip>
            </q-btn>
          </div>
          <div class="flex items-center">
            <back-button />
            <renew-subscribtion
              class="bg-green text-white"
              size="12px"
              :business="business"
            />
          </div>
        </q-card-actions>
      </q-item>
    </template>

    <template #body="{ item }">
      <div class="col-5">
        <div class="flex justify-start">
          <q-item-label caption class="text-on-dark">
            <q-icon
              class="expire-date-clock"
              name="history"
              size="xs"
            />
            {{ item.fromDateString }} -
            {{ item.toDateString }}
          </q-item-label>
        </div>
      </div>

      <div class="col-2 flex items-center justify-start">
        <q-item-label caption>
          {{ helper.formatNumber(item.amount) }}
          <span>{{ $t("page.payment-history.rial") }}</span>
          <q-tooltip class="custom-tooltip" :delay="600">
            {{ $t("page.payment-history.amount-paid") }}
          </q-tooltip>
        </q-item-label>
      </div>
      <div
        class="expire-date-container col-3 flex items-center justify-start"
      >
        <q-item-label
          caption
          v-if="
            item.statusTitle == 'Enum_BusinessPaymentStatus_Trial'
          "
        >
          <q-icon name="circle" color="orange" size="8px" />
          {{ $t("page.payment-history.trial") }}
        </q-item-label>
        <q-item-label caption v-else>
          <q-icon name="circle" color="positive" size="8px" />
          {{ $t("page.payment-history.paid") }}
        </q-item-label>
      </div>
      <div class="more-options col-1 q-pl-md">
        <q-btn
          no-caps
          class="more-icon text-on-dark"
          unelevated
          falt
          round
          icon="more_horiz"
          size="md"
          dense
        >
          <q-tooltip class="custom-tooltip" :delay="600">
            {{ $t("page.buttons.more-tooltip") }}
          </q-tooltip>
        </q-btn>
        <q-menu transition-show="jump-down" transition-hide="jump-up">
          <q-list padding>
            <q-item clickable v-close-popup>
              <q-item-section>
                <router-link :to="getDetailUrl(item)">
                  <div class="flex items-center q-gutter-x-sm">
                    <q-avatar
                      icon="o_visibility"
                      class="bg-on-dark"
                      size="md"
                    />
                    <div class="text-body2">
                      {{ $t("page.payment-history.buttons.view") }}
                    </div>
                  </div>
                </router-link>
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </div>
    </template>
  </data-view>
</template>

<script setup>
  import { ref, computed, onMounted } from "vue";
  import { useRoute } from "vue-router";
  import { fetchWrapper, helper } from "src/helpers";

  import BackButton from "src/components/shared/buttons/GoBackLink.vue";
  import DataView from "src/components/shared/dataTables/desktop/DataView.vue";
  import RenewSubscribtion from "src/components/management/shared/RenewSubscribtionLink.vue";

  const route = useRoute();

  const business = ref(null);
  const paymentGrid = ref(null);

  const props = defineProps({
    gridStore: Object,
  });

  const businessId = route.params.businessId;

  const paymentDataSource = computed(
    () => `business/getBusinessPaymentGridData/${businessId}`
  );

  async function loadData() {
    await fetchWrapper
      .get(`business/GetBusiness/${businessId}`)
      .then((response) => {
        business.value = response.data.data;
      });
  }

  async function refreshPayments() {
    paymentGrid.value.reloadData();
  }

  function getDetailUrl(item) {
    return `/business/PaymentDetail/${item.id}`;
  }

  onMounted(() => {
    loadData();
  });
</script>

<style lang="scss">
  .business-name {
    max-width: 160px;
  }

  .q-item__label--caption {
    font-size: 14px;
    letter-spacing: 0;
    color: #2d2d2d;
  }

  /* //todo: add class for this kind of a */
  a {
    text-decoration: none;
    color: inherit;
  }

  .business-name-btn {
    .q-focus-helper {
      display: none;
    }
  }
</style>
