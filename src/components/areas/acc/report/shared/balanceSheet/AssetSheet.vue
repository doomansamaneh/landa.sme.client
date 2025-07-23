<template>
  <q-card flat class="shadow bordered">
    <q-card-section class="q-px-lg">
      <balance-sheet-card-header
        :title="$t('shared.labels.asset')"
        icon="o_attach_money"
        icon-class="primary-gradient primary-shadow"
      />
    </q-card-section>

    <q-card-section class="q-pt-none q-pb-md_ q-pr-none">
      <q-list class="statement-bar q-pr-md q-pl-sm">
        <balance-sheet-item-header :title="$t('shared.labels.currentAssets')" />

        <div>
          <balance-sheet-item
            v-for="item in currentAssets"
            :key="item.id"
            :item="item"
            class="q-my-sm"
          />
        </div>

        <balance-sheet-item-header :title="$t('shared.labels.fixedAssets')" />

        <div class="q-pl-xs">
          <balance-sheet-item
            v-for="item in fixedAssets"
            :key="item.id"
            :item="item"
            class="q-my-sm"
          />
        </div>
      </q-list>
    </q-card-section>

    <q-separator />

    <q-card-section>
      <q-item>
        <q-item-section>
          <q-item-label lines="1" class="text-h6 text-weight-600">
            {{$t('shared.labels.total')}}
          </q-item-label>
        </q-item-section>

        <q-item-section side class="ext-subtitle1 text-weight-700">
          {{ helper.formatNumber(totalCA + totalFA) }}
        </q-item-section>
      </q-item>
    </q-card-section>
  </q-card>
</template>

<script setup>
  import { computed, ref } from "vue";
  import { useI18n } from 'vue-i18n';
  import { helper } from "src/helpers/helper";
  import { accountCLType } from "src/constants";

  import BalanceSheetItem from "./BalanceSheetItem.vue";
  import BalanceSheetItemHeader from "./BalanceSheetItemHeader.vue";
  import BalanceSheetCardHeader from "./BalanceSheetCardHeader.vue";

  const props = defineProps({
    model: Object,
  });

  const currentAssets = computed(() =>
    props.model.reviewItems.filter(
      (item) => item.clId === accountCLType.currentAsset
    )
  );

  const fixedAssets = computed(() =>
    props.model.reviewItems.filter(
      (item) => item.clId === accountCLType.fixedAsset
    )
  );

  const totalCA = computed(() =>
    currentAssets.value.reduce(
      (sum, item) => sum + item.debitRemained - item.creditRemained,
      0
    )
  );

  const totalFA = computed(() =>
    fixedAssets.value.reduce(
      (sum, item) => sum + item.debitRemained - item.creditRemained,
      0
    )
  );
  const { t: $t } = useI18n();
</script>
