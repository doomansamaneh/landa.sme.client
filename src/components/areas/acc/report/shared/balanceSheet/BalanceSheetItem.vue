<template>
  <q-item
    class="border-radius-sm q-px-sm q-py-xs q-my-sm"
    clickable
    v-ripple
  >
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
  </q-item>
</template>

<script setup>
  import { helper } from "src/helpers/helper";

  const props = defineProps({
    item: Object,
    useCredit: Boolean,
  });
</script>
