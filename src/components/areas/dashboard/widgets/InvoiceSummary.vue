<template>
  <q-card class="shadow border-radius-lg bordered no-shadow">
    <q-card-section class="q-pa-lg">
      <div class="row items-center q-gutter-md justify-between">
        <q-item class="no-padding">
          <q-item-section avatar>
            <q-avatar
              rounded
              text-color="white"
              icon="o_receipt"
              size="md"
              class="primary-gradient primary-shadow"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-h6 text-weight-700">
              فاکتورهای فروش
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-btn
          to="/sls/invoice/create"
          unelevated
          rounded
          class="bordered bg-dark q-py-xs"
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
      <div class="col-md col-sm-12 col-xs-12">
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

          <q-item-section>
            <q-item-label class="text-body3 q-mb-xs">
              جمع کل
            </q-item-label>
            <q-item-label
              v-if="!dataStore.isLoading.value"
              class="text-h6 text-weight-700"
            >
              {{
                helper.formatNumberReadable(
                  dataStore.data?.value?.amount
                )
              }}

              <q-tooltip
                class="custom-tooltip text-body1 no-letter-spacing"
              >
                {{
                  helper.formatNumber(dataStore.data?.value?.amount)
                }}
              </q-tooltip>
            </q-item-label>

            <div v-else class="text-regular">
              {{ $t("shared.labels.calculating") }}
            </div>
          </q-item-section>
        </q-item>
      </div>

      <div class="col-md col-sm-12 col-xs-12">
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

          <q-item-section>
            <q-item-label class="text-body3 q-mb-xs">
              دریافت شده
            </q-item-label>
            <q-item-label
              v-if="!dataStore.isLoading.value"
              class="text-h6 text-weight-700"
            >
              {{
                helper.formatNumberReadable(
                  dataStore.data?.value?.payedAmount
                )
              }}

              <q-tooltip
                class="custom-tooltip text-body1 no-letter-spacing"
              >
                {{
                  helper.formatNumber(
                    dataStore.data?.value?.payedAmount
                  )
                }}
              </q-tooltip>
            </q-item-label>
            <div v-else class="text-regular">
              {{ $t("shared.labels.calculating") }}
            </div>
          </q-item-section>
        </q-item>
      </div>

      <div class="col-md col-sm-12 col-xs-12">
        <q-item class="no-padding">
          <q-item-section avatar>
            <q-btn
              flat
              dense
              size="0"
              to="/sls/invoice/remained/remainedThisYear"
              class="clickable-btn"
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
              <div class="mouse-icon"></div>
            </q-btn>
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-body3 q-mb-xs">
              مانده امسال
            </q-item-label>
            <q-item-label
              v-if="!dataStore.isLoading.value"
              class="text-h6 text-weight-700"
            >
              {{
                helper.formatNumberReadable(
                  dataStore.data?.value?.remainedAmount
                )
              }}

              <q-tooltip
                class="custom-tooltip text-body1 no-letter-spacing"
              >
                {{
                  helper.formatNumber(
                    dataStore.data?.value?.remainedAmount
                  )
                }}
              </q-tooltip>
            </q-item-label>
            <div v-else class="text-regular">
              {{ $t("shared.labels.calculating") }}
            </div>
          </q-item-section>
        </q-item>
      </div>

      <div class="col-md col-sm-12 col-xs-12">
        <q-item class="no-padding">
          <q-item-section avatar>
            <q-btn
              flat
              dense
              size="0"
              to="/sls/invoice/remained/remainedAll"
              class="clickable-btn"
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
              <div class="mouse-icon"></div>
            </q-btn>
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-body3 q-mb-xs">
              مانده از قبل
            </q-item-label>
            <q-item-label
              v-if="!dataStore.isLoading.value"
              class="text-h6 text-weight-700"
            >
              {{
                helper.formatNumberReadable(
                  dataStore.data?.value?.remainedAmountAll -
                    dataStore.data?.value?.remainedAmount
                )
              }}

              <q-tooltip
                class="custom-tooltip text-body1 no-letter-spacing"
              >
                {{
                  helper.formatNumber(
                    dataStore.data?.value?.remainedAmountAll -
                      dataStore.data?.value?.remainedAmount
                  )
                }}
              </q-tooltip>
            </q-item-label>
            <div v-else class="text-regular">
              {{ $t("shared.labels.calculating") }}
            </div>
          </q-item-section>
        </q-item>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
  import { helper } from "src/helpers";
  import { useInvoiceSummary } from "src/components/areas/dashboard/_composables/useInvoiceSummary";
  const dataStore = useInvoiceSummary();
</script>

<style lang="scss" scoped>
  .clickable-btn {
    position: relative;
    transition: transform 0.2s ease-in-out;
  }

  .clickable-btn:hover {
    transform: scale(1.05);
  }

  .mouse-icon {
    width: 18px;
    height: 18px;
    background: url("src/assets/mouse.png") no-repeat center;
    background-size: contain;
    position: absolute;
    right: 4px;
    top: 80%;
    transform: translateY(-50%);
    animation: mouseMovment 4s infinite ease-in-out;
  }

  @keyframes mouseMovment {
    0% {
      transform: translate(0, -2px);
    }
    50% {
      transform: translate(0, 0px);
    }
    100% {
      transform: translate(0, -2px);
    }
  }
</style>
