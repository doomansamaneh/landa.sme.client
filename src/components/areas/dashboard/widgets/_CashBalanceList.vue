<template>
  <q-item
    clickable
    v-for="item in dataSource.model.value"
    :key="item.id"
    :to="`/acc/accountDL/Preview/${item.id}`"
    class="no-decoration q-pl-lg q-pb-md q-pr-lg border-radius-xs text-on-dark"
  >
    <q-item-section avatar>
      <q-btn
        v-if="getBankLogo(item.label)"
        class="bordered no-pointer-events border-radius-xs"
        unelevated
        dense
        padding="10px"
      >
        <img
          :src="getBankLogo(item.label)"
          alt="Bank Logo"
          style="width: 42px; height: 42px"
        />
      </q-btn>
      <q-btn
        v-else
        class="bordered no-pointer-events border-radius-xs"
        unelevated
        dense
        padding="10px"
      >
        <div
          class="flex items-center justify-center"
          style="width: 42px; height: 42px"
        >
          <img
            src="/bank.svg"
            alt="Bank Logo"
            style="width: 36px; height: 36px"
          />
        </div>
      </q-btn>
    </q-item-section>

    <q-item-section>
      <span class="text-body3">
        {{ item.label }}
      </span>
      <span class="text-body3">
        <span>موجودی:</span>
        <span class="text-weight-600 q-px-xs">
          {{ helper.formatNumber(item.amount) }}
        </span>
      </span>
    </q-item-section>
  </q-item>
</template>

<script setup>
  import { helper } from "src/helpers";
  import { useBankAccount } from "../../acc/_composables/useBankAccount";
  import { getBankNameFromCardNumber } from "@persian-tools/persian-tools"; // Import Persian Tools method
  // import GotoDetail from "src/components/shared/buttons/GotoDetail.vue";

  const props = defineProps({
    dataSource: useBankAccount,
  });

  function getBankName(label) {
    const cardNumber = label.match(/\d{16}/);

    if (!cardNumber) {
      return null;
    }

    const bankName = getBankNameFromCardNumber(cardNumber[0]);

    return bankName;
  }

  function getBankLogo(label) {
    const bankName = getBankName(label);
    if (bankName && helper.bankLogos[bankName]) {
      return helper.bankLogos[bankName];
    }
  }
</script>
