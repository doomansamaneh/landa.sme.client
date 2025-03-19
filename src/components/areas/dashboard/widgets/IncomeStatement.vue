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
      <q-card-section class="q-pb-none">
        <widget-title label="صورت سود و زیان" icon="o_balance" />
      </q-card-section>

      <q-card-section class="q-pr-none">
        <q-scroll-area
          style="height: 350px"
          :thumb-style="helper.thumbStyle"
          :bar-style="helper.barStyle"
        >
          <q-list bordered_ _padding class="q-pr-md rounded-borders">
            <template
              v-for="item in dataStore.accountClCodes.value"
              :key="item.clTypeId"
            >
              <q-item-label
                header
                class="bg-on-dark border-radius-sm"
                style="padding: 12px"
              >
                <span class="text-body1 text-on-dark text-weight-600">
                  {{ item.clCode }} - {{ item.clTitle }}
                </span>
              </q-item-label>

              <q-item
                class="border-radius-sm q-px-sm q-py-xs q-my-sm"
                clickable
                v-ripple
                v-for="glItem in dataStore.getFilteredItems(
                  item.clCode
                )"
                :key="glItem.glCode"
              >
                <q-item-section class="q-pr-sm" avatar>
                  <div
                    class="bordered border-radius-sm text-body2 q-py-xs q-px-sm"
                  >
                    {{ glItem.glCode }}
                  </div>
                </q-item-section>

                <q-item-section>
                  {{ glItem.glTitle }}
                </q-item-section>

                <q-item-section
                  side
                  v-if="item.clTypeId === accountCLTypeIds.revenue"
                >
                  <span v-if="glItem.credit">
                    {{ helper.formatNumber(glItem.credit) }}
                  </span>
                  <span v-if="glItem.debit" class="text-red">
                    ({{ helper.formatNumber(glItem.debit) }})
                  </span>
                </q-item-section>
                <q-item-section
                  side
                  v-else-if="
                    item.clTypeId === accountCLTypeIds.expense
                  "
                >
                  <span v-if="glItem.debit">
                    {{ helper.formatNumber(glItem.debit) }}
                  </span>
                  <span v-if="glItem.credit" class="text-red">
                    ({{ helper.formatNumber(glItem.credit) }})
                  </span>
                </q-item-section>
              </q-item>

              <q-separator spaced v-if="false" />
            </template>
          </q-list>
        </q-scroll-area>
      </q-card-section>

      <q-separator />
      <q-card-section>
        <q-item class="no-padding">
          <q-item-section avatar top>
            <q-avatar
              icon="attach_money"
              text-color="white"
              class="green-gradient"
            />
          </q-item-section>

          <q-item-section>
            <q-item-label lines="1" class="text-h6 text-weight-600">
              درآمد خالص
            </q-item-label>
            <q-item-label lines="1">
              سود پیش از کسر مالیات
            </q-item-label>
          </q-item-section>

          <q-item-section side class="ext-subtitle1 text-weight-700">
            {{ helper.formatNumber(dataStore.totalIcome.value) }}
          </q-item-section>
        </q-item>
      </q-card-section>
    </div>
  </q-card>
</template>

<script setup>
  import { computed } from "vue";
  import { helper } from "src/helpers";
  import { useIncomeStatement } from "../../acc/_composables/useIncomeStatement";
  import { accountCLTypeIds } from "src/constants";
  import { useGeneralTab } from "src/components/areas/dashboard/_composables/useGeneralTab";

  import WidgetTitle from "src/components/areas/dashboard/widgets/WidgetTitle.vue";

  const dataStore = useIncomeStatement();
  const draggable = useGeneralTab();

  const emit = defineEmits(["hideWidget"]);

  const hideWidget = () => {
    emit("hideWidget");
  };

  const isShakingComputed = computed(
    () => draggable.state.isShaking.value
  );
</script>
