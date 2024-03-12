<template>
  <q-markup-table flat bordered dense separator="cell">
    <tbody>
      <tr>
        <td colspan="100%">
          {{ model.value.contractTitle }}
          {{ model.value.subject }}
          {{ model.value.summary }}
        </td>
      </tr>
      <tr>
        <td style="width: 50%; min-height: 90px; height: 90px" class="text-top">
          مهر و امضا فروشنده
        </td>
        <td>مهر و امضا خریدار</td>
      </tr>
    </tbody>
  </q-markup-table>
</template>

<script setup>
const props = defineProps({
  model: Object,
});
</script>
