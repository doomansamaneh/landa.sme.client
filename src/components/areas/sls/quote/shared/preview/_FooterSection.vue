<template>
  <table
    style="
      border: 1px solid #2d2d2d;
      width: 100%;
      border-collapse: collapse;
      font-size: 12px;
    "
  >
    <tbody>
      <tr>
        <td style="padding: 5px; border: 1px solid #2d2d2d" colspan="100%">
          <div>
            <strong v-if="model.value.contractTitle">
              {{ model.value.contractTitle }}
              <span v-if="model.value.summary" style="padding: 5px">/</span>
            </strong>
            <span class="text-wrap" v-html="model.value.summary"></span>
          </div>
          <div
            v-if="appConfigStore.model.value?.companySetting?.invoiceComment"
            class="text-wrap"
            v-html="appConfigStore.model.value?.companySetting?.invoiceComment"
          ></div>
        </td>
      </tr>
      <tr>
        <td
          style="padding: 40px 6px; border: 1px solid #2d2d2d"
          class="text-body2 no-letter-spacing"
        >
          مهر و امضا فروشنده
        </td>
        <td
          style="padding: 40px 6px; border: 1px solid #2d2d2d"
          class="text-body2 no-letter-spacing"
        >
          مهر و امضا خریدار
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { useAppConfigModel } from "src/components/areas/cmn/_composables/useAppConfigModel";

const props = defineProps({
  model: Object,
});

const appConfigStore = useAppConfigModel();
</script>

<style lang="scss">
.text-wrap {
  white-space: pre-line;
  word-wrap: break-word;
}
</style>
