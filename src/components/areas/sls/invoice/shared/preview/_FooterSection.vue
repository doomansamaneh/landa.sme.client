<template>
  <div class="print-only">
    <table
      style="border: 1px solid #2d2d2d; width: 100%; border-collapse: collapse"
    >
      <tbody>
        <tr>
          <td style="border: 1px solid #2d2d2d" colspan="100%">
            <div>
              <strong v-if="model.value.contractTitle">
                {{ model.value.contractTitle }} /
              </strong>
              <div
                class="text-wrap"
                style="padding: 16px 6px"
                v-html="model.value.summary"
              ></div>
              <div
                v-if="
                  appConfigStore.model.value?.companySetting?.invoiceComment
                "
                class="text-wrap"
                v-html="
                  appConfigStore.model.value?.companySetting?.invoiceComment
                "
              ></div>
            </div>
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
  </div>

  <div class="print-hide">
    <table
      style="width: 100%; border-collapse: collapse"
      :style="borderColor_()"
    >
      <tbody>
        <tr>
          <td :style="borderColor_()" colspan="100%">
            <div>
              <strong v-if="model.value.contractTitle">
                {{ model.value.contractTitle }} /
              </strong>
              <div
                class="text-wrap"
                style="padding: 16px 6px"
                v-html="model.value.summary"
              ></div>
              <div
                v-if="
                  appConfigStore.model.value?.companySetting?.invoiceComment
                "
                class="text-wrap"
                v-html="
                  appConfigStore.model.value?.companySetting?.invoiceComment
                "
              ></div>
            </div>
          </td>
        </tr>
        <tr>
          <td
            style="padding: 40px 6px"
            :style="borderColor_()"
            class="text-body2 no-letter-spacing"
          >
            مهر و امضا فروشنده
          </td>
          <td
            style="padding: 40px 6px"
            :style="borderColor_()"
            class="text-body2 no-letter-spacing"
          >
            مهر و امضا خریدار
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { useAppConfigModel } from "src/components/areas/cmn/_composables/useAppConfigModel";
import { useQuasar } from "quasar";

const props = defineProps({
  model: Object,
});

const appConfigStore = useAppConfigModel();

const $q = useQuasar();

const borderColor_ = () => {
  if ($q.dark.isActive) {
    return "border: 1px solid #ffffff70;";
  } else {
    return "border: 1px solid #2d2d2d;";
  }
};
</script>

<style lang="scss">
.text-wrap {
  white-space: pre-line;
  word-wrap: break-word;
}
</style>
