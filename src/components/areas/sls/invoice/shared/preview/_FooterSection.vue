<template>
  <q-markup-table flat bordered dense separator="cell">
    <tbody>
      <tr>
        <td colspan="100%">
          <div>
            <strong v-if="model.value.contractTitle">
              {{ model.value.contractTitle }} /
            </strong>
            <div class="text-wrap" v-html="model.value.summary"></div>
          </div>
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

<style>
.text-wrap {
  white-space: pre-line;
  word-wrap: break-word;
}
</style>
