<template>
  <q-list>
    <q-expansion-item
      header-class="border-radius-sm"
      :group="`${item.glCode}-statement-parent`"
      @show="expandGL"
    >
      <template #header>
        <q-item-section avatar style="padding-left: 0">
          <q-icon class="q-mr-sm" size="20px" name="o_folder" />
        </q-item-section>

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

      <q-item
        v-for="slItem in item.items"
        :key="slItem.slId"
        class="q-ml-lg"
        clickable
        style="border-right: 1px solid blue"
        :group="`${item.glCode}-statement-child`"
      >
        <q-item-section avatar style="padding-left: 0">
          <q-icon class="q-mr-sm" size="20px" name="o_folder" />
        </q-item-section>
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

        <q-item-section side class="q-mr-lg">
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

      <!-- <q-expansion-item
        v-for="slItem in item.items"
        :key="slItem.slId"
        class="q-ml-lg"
        style="border-right: 1px solid blue"
        header-class="border-radius-sm"
        :group="`${item.glCode}-statement-child`"
      >
        <template #header>
          <q-item-section avatar style="padding-left: 0">
            <q-icon class="q-mr-sm" size="20px" name="o_folder" />
          </q-item-section>

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
        </template>
      </q-expansion-item> -->
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
