<template>
  <q-item
    v-for="item in dataSource.model.value"
    :key="item.id"
    class="q-pr-sm q-pl-none q-pb-md border-radius-xs text-on-dark"
  >
    <div class="row q-gutter-x-sm items-center">
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
    </div>

    <div class="row items-center justify-between full-width">
      <div class="col-9 q-pl-lg column">
        <span class="text-body3 no-letter-spacing">
          {{ item.label }}
        </span>
        <span class="text-body3 no-letter-spacing">
          <span>موجودی:</span>
          <span class="text-weight-600 q-px-xs">
            {{ helper.formatNumber(item.amount) }}
          </span>
        </span>
      </div>
      <div class="col row justify-end items-center">
        <goto-detail :to="`/acc/accountDL/Preview/${item.id}`" />
      </div>
    </div>
  </q-item>
</template>

<script setup>
  import { helper } from "src/helpers";
  import { useBankAccount } from "../../acc/_composables/useBankAccount";
  import { getBankNameFromCardNumber } from "@persian-tools/persian-tools"; // Import Persian Tools method
  import GotoDetail from "src/components/shared/buttons/GotoDetail.vue";

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
