<template>
  <q-markup-table bordered flat dense_ separator="horizontal">
    <thead>
      <tr>
        <th class="text-left" style="width: 1px">#</th>
        <th class="text-left">
          {{ $t("shared.labels.productTitle") }}
        </th>
        <th class="text-left">
          {{ $t("shared.labels.productUnitTitle") }}
        </th>
        <th class="text-left" style="width: 180px">
          {{ $t("shared.columns.quantity") }}
        </th>
        <th class="text-left" style="width: 180px">
          {{ $t("shared.columns.price") }}
          {{ $t("shared.columns.per") }} ({{ model?.currencyTitle }})
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(row, index) in model?.usedItems"
        :key="index"
        class="q-pa-md"
      >
        <td class="text-left">{{ index + 1 }}</td>
        <td class="text-left">
          {{ row.productCode }} - {{ row.productTitle }}
        </td>
        <td class="text-left">
          {{ row.productUnitTitle }}
        </td>
        <td class="text-left">
          {{ helper.formatNumber(row.quantity) }}
        </td>
        <td class="text-left">
          {{ helper.formatNumber(row.price) }}
        </td>
      </tr>
    </tbody>
  </q-markup-table>
</template>

<script setup>
  import { helper } from "src/helpers";

  const props = defineProps({
    model: Object,
  });
</script>
