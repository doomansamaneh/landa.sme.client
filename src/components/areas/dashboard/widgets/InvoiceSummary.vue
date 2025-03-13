<template>
  <q-card
    :class="[isShakingComputed ? 'widget' : '']"
    class="shadow border-radius-lg bordered fit"
  >
    <template v-if="isShakingComputed">
      <q-btn
        class="off-btn bordered absolute-top-right q-ma-sm z-1"
        round
        dense
        unelevated
        @click="hideWidget"
      >
        <q-icon name="o_visibility_off" />
      </q-btn>
    </template>

    <div
      :class="
        isShakingComputed ? 'no-pointer-events' : 'pointer-events-all'
      "
    >
      <q-card-section>
        <div class="row items-center q-gutter-md justify-between">
          <widget-title label="فاکتورهای فروش" icon="o_receipt" />
          <q-btn
            to="/sls/invoice/create"
            unelevated
            :round="$q.screen.xs"
            :rounded="$q.screen.gt.xs"
            class="bordered bg-dark q-py-xs"
          >
            <q-icon name="o_add" size="20px" />
            <span
              class="text-weight-300 q-ml-xs"
              v-if="$q.screen.gt.xs"
            >
              ایجاد فاکتور
            </span>
          </q-btn>
        </div>
      </q-card-section>

      <q-card-section class="row q-gutter-lg">
        <div class="col-md col-sm-5 col-xs-12">
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

                <q-tooltip class="custom-tooltip text-body1">
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

        <div class="col-md col-sm-5 col-xs-12">
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

                <q-tooltip class="custom-tooltip text-body1">
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

        <div class="col-md col-sm-5 col-xs-12">
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
                  class="active-shine orange-gradient orange-shadow"
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

                <q-tooltip class="custom-tooltip text-body1">
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

        <div class="col-md col-sm-5 col-xs-12">
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
                  class="active-shine red-gradient red-shadow"
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

                <q-tooltip class="custom-tooltip text-body1">
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
    </div>
  </q-card>
</template>

<script setup>
  import { ref, computed } from "vue";
  import { helper } from "src/helpers";
  import { useInvoiceSummary } from "src/components/areas/dashboard/_composables/useInvoiceSummary";
  import { useGeneralTab } from "src/components/areas/dashboard/_composables/useGeneralTab";

  import WidgetTitle from "src/components/areas/dashboard/widgets/WidgetTitle.vue";

  const emit = defineEmits(["hideWidget"]);

  const hideWidget = () => {
    emit("hideWidget");
  };

  const draggable = useGeneralTab();
  const dataStore = useInvoiceSummary();

  const isShakingComputed = computed(() => draggable.isShaking.value);
  const isHoveredComputed = computed(() => draggable.isHovered.value);
</script>

<style lang="scss" scoped>
  .clickable-btn {
    position: relative;
    transition: transform 0.2s ease-in-out;
  }

  .clickable-btn:hover {
    transform: scale(1.05);
  }

  .clickable-btn.q-btn--dense {
    padding: 0 !important;
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
