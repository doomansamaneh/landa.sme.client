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
            <div
              v-if="appConfigStore.model.value?.companySetting?.invoiceComment"
              class="text-wrap"
              v-html="
                appConfigStore.model.value?.companySetting?.invoiceComment
              "
            ></div>
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
import { useAppConfigModel } from "src/components/areas/cmn/_composables/useAppConfigModel";

const props = defineProps({
  model: Object,
});
const appConfigStore = useAppConfigModel();
</script>

<style>
.text-wrap {
  white-space: pre-line;
  word-wrap: break-word;
}
</style>
