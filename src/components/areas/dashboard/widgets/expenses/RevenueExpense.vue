<template>
  <q-card
    v-access="`acc.report.accountReview`"
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
        <widget-title
          label="مقایسه سود و زیان"
          icon="o_receipt_long"
        />
      </q-card-section>

      <q-card-section class="q-pt-none">
        <!-- <pre>{{ netIncomeStore.clItems }}</pre> -->
        <q-markup-table
          flat
          bordered
          wrap-cells_
          class="fit border-radius-xs"
        >
          <thead>
            <tr>
              <th class="text-left"></th>
              <th class="text-left">امسال</th>
              <th class="text-left">پارسال</th>
              <th class="text-left">%</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="row in netIncomeStore.clItems.value"
              :key="row.clId"
            >
              <td class="text-left">
                {{ row.clCode }} - {{ row.clTitle }}
              </td>
              <td class="text-left">
                {{
                  helper.formatNumber(
                    netIncomeStore.getThisYearAmount(row.clId)
                  )
                }}
              </td>
              <td class="text-left">
                {{
                  helper.formatNumber(
                    netIncomeStore.getLastYearAmount(row.clId)
                  )
                }}
              </td>
              <td>
                <q-icon
                  :name="
                    netIncomeStore.getPercentAmount(row.clId) > 0
                      ? 'arrow_upward'
                      : 'arrow_downward'
                  "
                  :color="
                    netIncomeStore.getPercentAmount(row.clId) > 0
                      ? 'green'
                      : 'red'
                  "
                />
                <span class="text-weight-500">
                  {{
                    helper.formatNumber(
                      netIncomeStore.getPercentAmount(row.clId)
                    )
                  }}
                </span>
              </td>
            </tr>
            <tr class="green-gradient text-white text-weight-600">
              <td>درآمد خالص</td>
              <td>
                {{
                  helper.formatNumber(
                    netIncomeStore.thisYearNetIncome.value
                  )
                }}
              </td>
              <td>
                {{
                  helper.formatNumber(
                    netIncomeStore.lastYearNetIncome.value
                  )
                }}
              </td>
              <td>
                <q-icon
                  :name="
                    netIncomeStore.netIncomePercent.value > 0
                      ? 'arrow_upward'
                      : 'arrow_downward'
                  "
                  :color="
                    netIncomeStore.netIncomePercent.value > 0
                      ? 'green'
                      : 'red'
                  "
                />
                <span class="text-weight-500">
                  {{
                    helper.formatNumber(
                      netIncomeStore.netIncomePercent.value
                    )
                  }}
                </span>
              </td>
            </tr>
          </tbody>
        </q-markup-table>
      </q-card-section>
    </div>
  </q-card>
</template>

<script setup>
  import { computed } from "vue";
  import { useGeneralTab } from "src/components/areas/dashboard/_composables/generalTab/useGeneralTab";
  import { useNetIncome } from "src/components/areas/acc/_composables/useNetIncome";

  import WidgetTitle from "src/components/areas/dashboard/widgets/WidgetTitle.vue";
  import { helper } from "src/helpers";

  const emit = defineEmits(["hideWidget"]);
  const draggable = useGeneralTab();

  const netIncomeStore = useNetIncome({});
  const hideWidget = () => {
    emit("hideWidget");
  };

  const isShakingComputed = computed(
    () => draggable.state.isShaking.value
  );
</script>

<style lang="scss" scoped>
  .q-table {
    td,
    th {
      padding: 6px 12px;
    }
  }
</style>
