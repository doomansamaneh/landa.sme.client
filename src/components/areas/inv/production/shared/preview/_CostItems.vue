<template>
  <q-markup-table bordered flat dense_ separator="horizontal">
    <thead>
      <tr>
        <th style="width: 1px">#</th>
        <th>سرفصل هزینه</th>
        <th style="width: 180px">
          هزینه ({{ model?.currencyTitle }})
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(row, index) in model?.costs"
        :key="index"
        class="q-pa-md"
      >
        <td class="text-center">{{ index + 1 }}</td>
        <td>{{ row.slCode }} - {{ row.slTitle }}</td>
        <td>
          {{ helper.formatNumber(row.amount) }}
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
