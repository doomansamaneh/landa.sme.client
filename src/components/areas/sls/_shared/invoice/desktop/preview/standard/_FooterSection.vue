<template>
  <div class="q-table__middle scroll">
    <table
      :style="$q.screen.gt.xs ? 'width:100%' : 'width:900px'"
      style="
        border: 1px solid #2d2d2d;
        border-collapse: collapse;
        font-size: 13px;
      "
    >
      <tbody>
        <tr
          v-if="
            model?.invoiceRemained &&
            configStore.model.value.companySetting
              .showRemainedInInvoice
          "
        >
          <td
            style="
              padding: 5px;
              border: 1px solid #2d2d2d;
              text-align: left;
            "
            colspan="100%"
          >
            <span>
              <strong style="padding: 0 5px">جمع دریافتی:</strong>
              {{
                helper.formatNumber(model.invoiceRemained.payedAmount)
              }}
            </span>

            <span>
              <strong style="padding: 0 5px">مانده:</strong>
              <span class="text-weight-600">
                {{
                  helper.formatNumber(
                    model.invoiceRemained.remainedAmount
                  )
                }}
              </span>
            </span>

            <template v-if="model.invoiceRemained.otherRemained">
              <span>
                <strong style="padding: 0 5px">مانده از قبل:</strong>
                <span class="text-weight-600">
                  {{
                    helper.formatNumber(
                      model.invoiceRemained.otherRemained
                    )
                  }}
                </span>
              </span>

              <span>
                <strong style="padding: 0 5px">جمع مانده:</strong>
                {{
                  helper.formatNumber(
                    model.invoiceRemained.totalRemained
                  )
                }}
              </span>
            </template>
          </td>
        </tr>

        <tr v-if="model.contractTitle || model.summary || comment">
          <td
            style="padding: 5px; border: 1px solid #2d2d2d"
            colspan="100%"
          >
            <div>
              <strong v-if="model.contractTitle">
                {{ model.contractTitle }}
                <span v-if="model.summary" style="padding: 5px">
                  /
                </span>
              </strong>
              <span class="text-wrap" v-html="model.summary"></span>
            </div>

            <div
              v-if="comment"
              class="text-wrap"
              v-html="comment"
            ></div>
          </td>
        </tr>

        <tr>
          <td
            style="
              padding: 5px;
              border: 1px solid #2d2d2d;
              height: 90px;
            "
            class="text-body2 vertical-top"
          >
            مهر و امضا فروشنده
            <div v-if="showSignature && signatureSource">
              <img
                :src="signatureSource"
                alt="signature"
                style="width: 120px"
              />
            </div>
          </td>
          <td
            style="padding: 5px; border: 1px solid #2d2d2d"
            class="text-body2 vertical-top"
          >
            مهر و امضا خریدار
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
  import { ref, onMounted } from "vue";
  import { helper } from "src/helpers";
  import { mediaType } from "src/constants";

  import { useAppConfigModel } from "src/components/areas/cmn/_composables/useAppConfigModel";

  const props = defineProps({
    model: Object,
    comment: String,
    showSignature: Boolean,
  });

  const signatureSource = ref(null);
  const configStore = useAppConfigModel();
  onMounted(async () => {
    signatureSource.value = await configStore.getAvatar(
      mediaType.signature,
      74,
      45
    );
  });
</script>

<style lang="scss">
  .text-wrap {
    white-space: pre-line;
    word-wrap: break-word;
  }

  .sign-place {
    width: 50%;
    padding-bottom: 120px;
  }
</style>
