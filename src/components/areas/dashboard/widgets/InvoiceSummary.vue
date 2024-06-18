<template>
  <q-card class="border-radius-lg bordered no-shadow">
    <q-card-section class="q-pa-lg">
      <div class="row items-center justify-between">
        <div class="text-h6 text-weight-700">فاکتورهای فروش</div>
        <q-btn
          to="/sls/invoice/create"
          unelevated
          rounded
          class="bordered-btn bg-dark q-py-xs"
        >
          <q-icon name="o_add" size="16px" class="q-mr-xs" />
          ایجاد فاکتور
        </q-btn>
      </div>
      <div
        class="text-body2 no-letter-spacing"
        :class="$q.screen.lt.md ? '      q-mt-lg' : 'q-mt-sm'"
      >
        تبریک میگم، %47.4 رشد داشته اید.
        <span class="text-body3 no-letter-spacing">در ماه گذشته</span>
      </div>
    </q-card-section>

    <q-card-section
      class="row q-gutter-lg q-pt-none q-px-lg q-pt-sm q-pb-lg"
    >
      <div class="col col-md col-sm-12 col-xs-12">
        <q-item class="no-padding">
          <q-item-section avatar>
            <q-avatar
              rounded
              text-color="white"
              icon="o_receipt"
              size="xl"
              class="grey-gradient grey-shadow"
            />
          </q-item-section>

          <q-item-section class="q-pl-xs">
            <q-item-label class="text-body3 q-mb-xs">
              جمع کل
            </q-item-label>
            <q-item-label class="text-h6 text-weight-700">
              {{ formatNumber(dataStore.data?.value?.amount) }}

              <q-tooltip
                class="custom-tooltip text-body1 no-letter-spacing"
              >
                {{ dataStore.data?.value?.amount.toLocaleString() }}
              </q-tooltip>
            </q-item-label>
          </q-item-section>
        </q-item>
      </div>

      <div class="col col-md col-sm-12 col-xs-12">
        <q-item class="no-padding">
          <q-item-section avatar>
            <q-avatar
              rounded
              text-color="white"
              icon="o_arrow_downward"
              size="xl"
              class="green-gradient green-shadow"
            />
          </q-item-section>

          <q-item-section class="q-pl-xs">
            <q-item-label class="text-body3 q-mb-xs">
              دریافت شده
            </q-item-label>
            <q-item-label class="text-h6 text-weight-700">
              {{ formatNumber(dataStore.data?.value?.payedAmount) }}

              <q-tooltip
                class="custom-tooltip text-body1 no-letter-spacing"
              >
                {{
                  dataStore.data?.value?.payedAmount.toLocaleString()
                }}
              </q-tooltip>
            </q-item-label>
          </q-item-section>
        </q-item>
      </div>

      <div class="col col-md col-sm-12 col-xs-12">
        <q-item class="no-padding">
          <q-item-section avatar>
            <q-btn
              flat
              dense
              size="0"
              to="/sls/invoice/remained/remainedThisYear"
              class="thisyear-clickable-btn"
            >
              <q-avatar
                rounded
                text-color="white"
                size="xl"
                class="orange-gradient orange-shadow"
              >
                <q-icon
                  color="white"
                  size="23px"
                  name="o_account_balance_wallet"
                />
              </q-avatar>
            </q-btn>
          </q-item-section>

          <q-item-section class="q-pl-xs">
            <q-item-label class="text-body3 q-mb-xs">
              مانده امسال
            </q-item-label>
            <q-item-label class="text-h6 text-weight-700">
              {{
                formatNumber(dataStore.data?.value?.remainedAmount)
              }}

              <q-tooltip
                class="custom-tooltip text-body1 no-letter-spacing"
              >
                {{
                  dataStore.data?.value?.remainedAmount.toLocaleString()
                }}
              </q-tooltip>
            </q-item-label>
          </q-item-section>
        </q-item>
      </div>

      <div class="col col-md col-sm-12 col-xs-12">
        <q-item class="no-padding">
          <q-item-section avatar>
            <q-btn
              flat
              dense
              size="0"
              to="/sls/invoice/remained/remainedAll"
              class="all-clickable-btn"
            >
              <q-avatar
                rounded
                text-color="white"
                size="xl"
                class="red-gradient red-shadow"
              >
                <q-icon
                  color="white"
                  size="23px"
                  name="o_account_balance_wallet"
                />
              </q-avatar>
            </q-btn>
          </q-item-section>

          <q-item-section class="q-pl-xs">
            <q-item-label class="text-body3 q-mb-xs">
              مانده از قبل
            </q-item-label>
            <q-item-label class="text-h6 text-weight-700">
              {{
                formatNumber(
                  dataStore.data?.value?.remainedAmountAll -
                    dataStore.data?.value?.remainedAmount
                )
              }}

              <q-tooltip
                class="custom-tooltip text-body1 no-letter-spacing"
              >
                {{
                  (
                    dataStore.data?.value?.remainedAmountAll -
                    dataStore.data?.value?.remainedAmount
                  ).toLocaleString()
                }}
              </q-tooltip>
            </q-item-label>
          </q-item-section>
        </q-item>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
  import { useInvoiceSummary } from "src/components/areas/dashboard/_composables/useInvoiceSummary";
  const dataStore = useInvoiceSummary();

  const formatNumber = (number) => {
    if (number < 1000) {
      return number.toString();
    } else if (number < 1000000) {
      const thousands = Math.floor(number / 1000);
      return `${thousands} هزار`;
    } else if (number < 1000000000) {
      const millions = Math.floor(number / 1000000);
      return `${millions} میلیون`;
    } else if (number < 1000000000000) {
      const billions = Math.floor(number / 1000000000);
      return `${billions} میلیارد`;
    } else {
      const trillions = Math.floor(number / 1000000000000);
      return `${trillions}  همت`;
    }
  };
</script>

<style lang="scss" scoped>
  .thisyear-clickable-btn {
    transition: transform 0.1s ease-in-out,
      box-shadow 0.1s ease-in-out;
  }
  .thisyear-clickable-btn:hover {
    transform: scale(1.5);
    box-shadow: 0 0 8px 0 $orange-2;
  }

  .all-clickable-btn {
    transition: transform 0.1s ease-in-out,
      box-shadow 0.1s ease-in-out;
  }
  .all-clickable-btn:hover {
    transform: scale(1.5);
    box-shadow: 0 0 8px 0 $red-2;
  }
</style>
