<template>
  <q-markup-table bordered flat dense_ separator="horizontal">
    <thead>
      <tr>
        <th class="text-left" style="width: 1px">#</th>
        <th class="text-left">
          {{ $t("shared.labels.costHeading") }}
        </th>
        <th class="text-left" style="width: 180px">
          {{ $t("shared.labels.cost") }} ({{ model?.currencyTitle }})
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(row, index) in model?.costs"
        :key="index"
        class="q-pa-md"
      >
        <td class="text-left">{{ index + 1 }}</td>
        <td class="text-left">
          {{ row.slCode }} - {{ row.slTitle }}
        </td>
        <td class="text-left">
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
