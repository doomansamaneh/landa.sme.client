<template>
  <div class="q-table__middle scroll">
    <table
      :style="$q.screen.gt.xs ? 'width:100%' : 'width:900px'"
      style="
        border: 1px solid #2d2d2d;
        border-collapse: collapse;
        font-size: 12px;
      "
    >
      <tbody>
        <tr>
          <td
            style="padding: 5px; border: 1px solid #2d2d2d"
            colspan="100%"
          >
            <div>
              <strong v-if="model.value.contractTitle">
                {{ model.value.contractTitle }}
                <span v-if="model.value.summary" style="padding: 5px">
                  /
                </span>
              </strong>
              <span
                class="text-wrap"
                v-html="model.value.summary"
              ></span>
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
            class="text-body2 no-letter-spacing vertical-top"
          >
            مهر و امضا فروشنده
            <div v-if="showSignature && signatureSource">
              <img :src="signatureSource" alt="signature" />
            </div>
          </td>
          <td
            style="padding: 5px; border: 1px solid #2d2d2d"
            class="text-body2 no-letter-spacing vertical-top"
          >
            مهر و امضا خریدار
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
  import { ref, onMounted, computed } from "vue";
  import { mediaType, baseUrl } from "src/constants";
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
