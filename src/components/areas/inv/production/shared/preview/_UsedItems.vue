<template>
  <q-markup-table bordered flat dense_ separator="horizontal">
    <thead>
      <tr>
        <th style="width: 1px">#</th>
        <th>کالا</th>
        <th>واحد سنجش</th>
        <th style="width: 180px">تعداد/مقدار</th>
        <th style="width: 180px">
          قیمت فی ({{ model?.currencyTitle }})
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
  </q-markup-table>
</template>

<script setup>
  import { helper } from "src/helpers";

  const props = defineProps({
    model: Object,
  });
</script>
