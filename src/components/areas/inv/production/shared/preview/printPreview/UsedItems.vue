<template>
  <div
    class="section-container q-mb-lg"
    v-if="model?.usedItems?.length > 0"
  >
    <div class="text-body2 text-bold q-mb-sm">
      {{ $t("shared.labels.productionUsedItems") }}
    </div>
    <table class="print-preview-table">
      <thead>
        <tr>
          <th style="width: 1px">#</th>
          <th>{{ $t("shared.labels.productTitle") }}</th>
          <th>{{ $t("shared.labels.productUnitTitle") }}</th>
          <th style="width: 180px">
            {{ $t("shared.columns.quantity") }}
          </th>
          <th style="width: 180px">
            {{ $t("shared.columns.price") }}
            {{ $t("shared.columns.per") }} ({{
              model?.currencyTitle
            }})
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, index) in model?.usedItems"
          :key="index"
          class="q-pa-md"
        >
          <td class="text-center">{{ index + 1 }}</td>
          <td>{{ row.productCode }} - {{ row.productTitle }}</td>
          <td>
            {{ row.productUnitTitle }}
          </td>
          <td>
            {{ helper.formatNumber(row.quantity) }}
          </td>
          <td>
            {{ helper.formatNumber(row.price) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
  import { helper } from "src/helpers";

  const props = defineProps({
    model: Object,
  });
</script>

<style lang="scss" scoped>
  .print-body {
    .section-container {
      page-break-inside: avoid;
    }
  }

  .print-preview-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
  }

  .print-preview-table th,
  .print-preview-table td {
    border: 1px solid #ddd;
    padding: 8px 12px;
  }

  .print-preview-table th {
    background-color: #f8f9fa;
    -webkit-print-color-adjust: exact;
    font-weight: bold;
  }

  .print-preview-table tr:nth-child(even) {
    background-color: #f2f2f2;
    -webkit-print-color-adjust: exact;
  }

  @media print {
    .section-container {
      page-break-inside: avoid;
    }

    .print-preview-table {
      page-break-inside: avoid;
    }
  }
</style>
