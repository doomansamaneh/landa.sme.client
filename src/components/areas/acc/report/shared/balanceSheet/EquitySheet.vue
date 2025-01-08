<template>
  <q-card flat class="shadow bordered">
    <q-card-section class="q-px-lg">
      <balance-sheet-card-header
        icon="o_attach_money"
        icon-class="green-gradient green-shadow"
        title="سرمایه"
      />
    </q-card-section>

    <q-card-section class="q-pt-none q-pb-md_ q-pr-none">
      <q-list class="statement-bar q-pr-md q-pl-sm">
        <balance-sheet-item-header title="حقوق صاحبان سرمایه" />

        <div class="q-pl-xs sub-item-container_">
          <balance-sheet-item
            v-for="item in equityList"
            :key="item.id"
            :item="item"
            use-credit
            class="q-my-sm"
          />
        </div>

        <q-item
          v-if="netIncome"
          class="border-radius-sm q-px-sm q-py-xs q-my-sm"
          clickable
          v-ripple
        >
          <q-item-section class="q-pr-sm" avatar>
            <div
              class="bordered border-radius-sm text-body2 no-letter-spacing q-py-xs q-px-sm"
            >
              *
            </div>
          </q-item-section>

          <q-item-section>سود و زیان سال جاری</q-item-section>

          <q-item-section side>
            <span>
              {{ helper.formatNumber(netIncome) }}
            </span>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>

    <q-separator />

    <q-card-section>
      <q-item>
        <q-item-section>
          <q-item-label lines="1" class="text-h6 text-weight-600">
            جمع کل
          </q-item-label>
        </q-item-section>

        <q-item-section side class="ext-subtitle1 text-weight-700">
          {{ helper.formatNumber(total + netIncome) }}
        </q-item-section>
      </q-item>
    </q-card-section>
  </q-card>
</template>

<script setup>
  import { computed } from "vue";
  import { helper } from "src/helpers/helper";
  import { accountCLType } from "src/constants";

  import BalanceSheetItem from "./BalanceSheetItem.vue";
  import BalanceSheetItemHeader from "./BalanceSheetItemHeader.vue";
  import BalanceSheetCardHeader from "./BalanceSheetCardHeader.vue";

  const props = defineProps({
    model: Object,
  });

  const equityList = computed(() =>
    props.model.reviewItems.filter(
      (item) => item.clId === accountCLType.equity
    )
  );

  const total = computed(() =>
    equityList.value.reduce(
      (sum, item) => sum + item.creditRemained - item.debitRemained,
      0
    )
  );

  const netIncome = computed(() =>
    props.model.reviewItems.reduce(
      (sum, item) => sum + item.debitRemained - item.creditRemained,
      0
    )
  );
</script>
