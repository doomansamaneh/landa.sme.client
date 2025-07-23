<template>
  <q-card flat class="shadow bordered">
    <q-card-section class="q-px-lg">
      <balance-sheet-card-header
        icon="o_attach_money"
        icon-class="orange-gradient red-shadow"
        :title="$t('shared.labels.liability')"
      />
    </q-card-section>

    <q-card-section class="q-pt-none q-pb-md_ q-pr-none">
      <q-list class="statement-bar q-pr-md q-pl-sm">
        <template v-if="totalCL.value !== 0">
          <balance-sheet-item-header :title="$t('shared.labels.currentLiability')" />

          <div>
            <balance-sheet-item
              v-for="item in currentList"
              :key="item.id"
              :item="item"
              use-credit
              class="q-my-sm"
            />
          </div>
        </template>

        <template v-if="totalFL.value !== 0">
          <balance-sheet-item-header :title="$t('shared.labels.longTermLiability')" />

          <div class="q-pl-xs sub-item-container">
            <balance-sheet-item
              v-for="item in longTermList"
              :key="item.id"
              :item="item"
              use-credit
              class="q-my-sm"
            />
          </div>
        </template>
      </q-list>
    </q-card-section>

    <q-separator />

    <q-card-section>
      <q-item>
        <q-item-section>
          <q-item-label lines="1" class="text-h6 text-weight-600">
            {{$t('shared.labels.liabilityTotal')}}
          </q-item-label>
        </q-item-section>

        <q-item-section side class="ext-subtitle1 text-weight-700">
          {{ helper.formatNumber(totalCL + totalFL) }}
        </q-item-section>
      </q-item>
    </q-card-section>
  </q-card>
</template>

<script setup>
  import { computed } from "vue";
  import { useI18n } from 'vue-i18n';
  import { helper } from "src/helpers/helper";
  import { accountCLType } from "src/constants";

  import BalanceSheetItem from "./BalanceSheetItem.vue";
  import BalanceSheetItemHeader from "./BalanceSheetItemHeader.vue";
  import BalanceSheetCardHeader from "./BalanceSheetCardHeader.vue";

  const props = defineProps({
    model: Object,
  });

  const currentList = computed(() =>
    props.model.reviewItems.filter(
      (item) => item.clId === accountCLType.currentLiability
    )
  );

  const longTermList = computed(() =>
    props.model.reviewItems.filter(
      (item) => item.clId === accountCLType.longTermLiability
    )
  );

  const totalCL = computed(() =>
    currentList.value.reduce(
      (sum, item) => sum + item.creditRemained - item.debitRemained,
      0
    )
  );

  const totalFL = computed(() =>
    longTermList.value.reduce(
      (sum, item) => sum + item.creditRemained - item.debitRemained,
      0
    )
  );
  const { t: $t } = useI18n();
</script>
