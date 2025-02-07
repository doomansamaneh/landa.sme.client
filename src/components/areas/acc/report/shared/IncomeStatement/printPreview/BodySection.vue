<template>
  <table
    v-if="!dataStore.showLoader.value"
    class="print-preview-table"
  >
    <tbody>
      <template
        v-for="item in dataStore.accountClCodes.value"
        :key="item.clTypeId"
      >
        <tr>
          <td
            class="text-bold text-body1 no-letter-spacing"
            style="padding: 12px"
            colspan="2"
          >
            {{ item.clCode }} - {{ item.clTitle }}
          </td>
        </tr>

        <tr
          v-for="glItem in dataStore.getFilteredItems(item.clCode)"
          :key="glItem.glCode"
        >
          <td
            class="text-body2 no-letter-spacing"
            style="padding: 12px 24px"
          >
            {{ glItem.glCode }} - {{ glItem.glTitle }}
          </td>

          <td
            class="text-body2 no-letter-spacing"
            style="padding: 12px; width: 25%"
            v-if="item.clTypeId === accountCLTypeIds.revenue"
          >
            <div v-if="glItem.credit">
              {{ helper.formatNumber(glItem.credit) }}
            </div>
            <div v-if="glItem.debit">
              ({{ helper.formatNumber(glItem.debit) }})
            </div>
          </td>
          <td
            class="text-body2 no-letter-spacing"
            style="padding: 12px; width: 25%"
            v-else-if="item.clTypeId === accountCLTypeIds.expense"
          >
            <div v-if="glItem.debit">
              {{ helper.formatNumber(glItem.debit) }}
            </div>
            <div v-if="glItem.credit">
              ({{ helper.formatNumber(glItem.credit) }})
            </div>
          </td>
        </tr>
      </template>

      <tr>
        <td style="padding: 12px">
          <div class="text-bold text-body1 no-letter-spacing">
            درآمد خالص
          </div>
          <div class="text-body2 no-letter-spacing caption-on-dark">
            سود پیش از کسر مالیات
          </div>
        </td>
        <td style="padding: 12px; width: 25%">
          <div class="text-bold text-body2 no-letter-spacing">
            {{ helper.formatNumber(dataStore.totalIcome.value) }}
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
  import { helper } from "src/helpers";
  import { useIncomeStatement } from "src/components/areas/acc/_composables/useIncomeStatement";
  import { accountCLTypeIds } from "src/constants";

  const dataStore = useIncomeStatement();
</script>

<style lang="scss">
  @media print {
    .print-preview-table {
      width: 100%;
      border-collapse: collapse;
    }
    .print-preview-table th,
    .print-preview-table td {
      border: 1px solid black;
      padding: 5px;
      text-align: start;
    }
    .print-preview-table th {
      background-color: #f2f2f2;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
  }
</style>
