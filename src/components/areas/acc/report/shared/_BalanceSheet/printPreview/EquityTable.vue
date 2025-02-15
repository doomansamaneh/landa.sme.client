<template>
  <div class="text-body1 text-center text-bold q-mb-sm">
    {{ title }}
  </div>

  <table
    v-if="total !== 0 && netIncome !== 0"
    class="balance-sheet-preview-table"
  >
    <thead>
      <tr>
        <th colspan="2">حقوق صاحبان سهام</th>
      </tr>
    </thead>

    <tbody>
      <template v-for="item in equityList" :key="item.id">
        <tr>
          <td>{{ item.glCode }} - {{ item.glTitle }}</td>
          <td style="width: 20%">
            {{
              helper.formatNumber(
                item.debitRemained - item.creditRemained
              )
            }}
          </td>
        </tr>
      </template>
    </tbody>
  </table>

  <table class="balance-sheet-preview-table">
    <tr>
      <td class="text-bold">جمع سرمایه</td>
      <td class="text-bold" style="width: 20%">
        {{ helper.formatNumber(total) }}
      </td>
    </tr>

    <tr>
      <td>سود و زیان سال جاری</td>
      <td>
        {{ helper.formatNumber(netIncome) }}
      </td>
    </tr>

    <tr>
      <td class="text-bold">جمع کل</td>
      <td class="text-bold">
        {{ helper.formatNumber(netIncome + total) }}
      </td>
    </tr>
  </table>
</template>

<script setup>
  import { computed } from "vue";
  import { helper } from "src/helpers";
  import { accountCLType } from "src/constants";

  const props = defineProps({
    model: Object,
    assetType: String,
    title: String,
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

<style lang="scss">
  .balance-sheet-preview-table {
    width: 100%;
    border-collapse: collapse;
  }
  .balance-sheet-preview-table th,
  .balance-sheet-preview-table td {
    border: none;
    padding: 5px;
    text-align: start;
  }
  .balance-sheet-preview-table th {
    background-color: #f2f2f2;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
</style>
