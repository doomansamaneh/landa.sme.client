<template>
  <q-list>
    <q-expansion-item
      class="balance-sheet-expansion-item"
      header-class="border-radius-sm"
      :group="`${item.glCode}-statement-parent`"
      switch-toggle-side
      @show="expandGL"
    >
      <template #header>
        <q-item-section class="q-pr-sm" avatar>
          <div
            class="bordered border-radius-sm text-body2 no-letter-spacing q-py-xs q-px-sm"
          >
            {{ item.glCode }}
          </div>
        </q-item-section>

        <q-item-section>
          {{ item.glTitle }}
        </q-item-section>

        <q-item-section side>
          <span v-if="useCredit">
            <span v-if="item.creditRemained">
              {{ helper.formatNumber(item.creditRemained) }}
            </span>
            <span v-if="item.debitRemained" class="text-red">
              ({{ helper.formatNumber(item.debitRemained) }})
            </span>
          </span>
          <span v-else>
            <span v-if="item.debitRemained">
              {{ helper.formatNumber(item.debitRemained) }}
            </span>
            <span v-if="item.creditRemained" class="text-red">
              ({{ helper.formatNumber(item.creditRemained) }})
            </span>
          </span>
        </q-item-section>
      </template>

      <div class="border-right q-ml-lg">
        <q-item
          v-for="slItem in item.items"
          :key="slItem.slId"
          clickable
          :group="`${item.glCode}-statement-child`"
          class="q-my-sm q-ml-xs border-radius-sm"
          style="padding: 12px"
        >
          <q-item-section class="q-pr-sm" avatar>
            <div
              class="bordered border-radius-sm text-body2 no-letter-spacing q-py-xs q-px-sm"
            >
              {{ slItem.slCode }}
            </div>
          </q-item-section>

          <q-item-section>
            {{ slItem.slTitle }}
          </q-item-section>

          <q-item-section side>
            <span v-if="useCredit">
              <span v-if="slItem.creditRemained">
                {{ helper.formatNumber(slItem.creditRemained) }}
              </span>
              <span v-if="slItem.debitRemained" class="text-red">
                ({{ helper.formatNumber(slItem.debitRemained) }})
              </span>
            </span>
            <span v-else>
              <span v-if="slItem.debitRemained">
                {{ helper.formatNumber(slItem.debitRemained) }}
              </span>
              <span v-if="slItem.creditRemained" class="text-red">
                ({{ helper.formatNumber(slItem.creditRemained) }})
              </span>
            </span>
          </q-item-section>
        </q-item>
      </div>
    </q-expansion-item>
  </q-list>
</template>

<script setup>
  import { helper } from "src/helpers/helper";
  import { useBalanceSheet } from "../../../_composables/useBalanceSheet";

  const props = defineProps({
    item: Object,
    useCredit: Boolean,
  });

  const dataStore = useBalanceSheet();

  const expandGL = async () => {
    await dataStore.loadSLData(props.item);
  };
</script>
