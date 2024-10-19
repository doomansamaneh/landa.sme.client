<template>
  <q-card v-if="dataStore.data?.value?.total" flat bordered>
    <q-card-section class="q-pa-lg">
      <div class="text-h6 text-weight-700">فاکتورهای فروش</div>
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
                  dataStore.data?.value?.total
                )
              }}

              <q-tooltip
                class="custom-tooltip text-body1 no-letter-spacing"
              >
                {{
                  helper.formatNumber(dataStore.data?.value?.total)
                }}
              </q-tooltip>
            </q-item-label>

            <div v-else class="text-regular">
              {{ $t("shared.labels.calculating") }}
            </div>
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

          <q-item-section>
            <q-item-label class="text-body3 q-mb-xs">
              امسال
            </q-item-label>
            <q-item-label
              v-if="!dataStore.isLoading.value"
              class="text-h6 text-weight-700"
            >
              {{
                helper.formatNumberReadable(
                  dataStore.data?.value?.thisYearTotal
                )
              }}

              <q-tooltip
                class="custom-tooltip text-body1 no-letter-spacing"
              >
                {{
                  helper.formatNumber(
                    dataStore.data?.value?.thisYearTotal
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

      <div class="col col-md col-sm-12 col-xs-12">
        <q-item class="no-padding">
          <q-item-section avatar>
            <q-btn flat dense size="0">
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
                  dataStore.data?.value?.payed
                )
              }}

              <q-tooltip
                class="custom-tooltip text-body1 no-letter-spacing"
              >
                {{
                  helper.formatNumber(dataStore.data?.value?.payed)
                }}
              </q-tooltip>
            </q-item-label>
            <div v-else class="text-regular">
              {{ $t("shared.labels.calculating") }}
            </div>
          </q-item-section>
        </q-item>
      </div>

      <div class="col col-md col-sm-12 col-xs-12">
        <q-item class="no-padding">
          <q-item-section avatar>
            <q-btn flat dense size="0">
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

          <q-item-section>
            <q-item-label class="text-body3 q-mb-xs">
              مانده
            </q-item-label>
            <q-item-label
              v-if="!dataStore.isLoading.value"
              class="text-h6 text-weight-700"
            >
              {{
                helper.formatNumberReadable(
                  dataStore.data?.value?.remained
                )
              }}

              <q-tooltip
                class="custom-tooltip text-body1 no-letter-spacing"
              >
                {{
                  helper.formatNumber(dataStore.data?.value?.remained)
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
  import { guidEmpty } from "src/constants";
  import { useCustomerInvoiceSummary } from "../../../_composables/useCustomerInvoiceSummary";

  const props = defineProps({
    customerId: String,
  });
  const dataStore = useCustomerInvoiceSummary(
    props.customerId ?? guidEmpty
  );
</script>
