<template>
  <q-card-section>
    <div class="q-table__middle scroll">
      <table
        :style="$q.screen.gt.xs ? 'width:100%' : 'width:900px'"
        style="
          border-width: 1px;
          border-style: solid;
          border-image: initial;
          border-collapse: collapse;
          font-size: 13px;
        "
      >
        <tbody>
          <tr v-if="comment">
            <td
              style="
                padding: 5px;
                border-width: 1px;
                border-style: solid;
                border-image: initial;
              "
              colspan="100%"
            >
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
                border-width: 1px;
                border-style: solid;
                border-image: initial;
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
              style="
                padding: 5px;
                border-width: 1px;
                border-style: solid;
                border-image: initial;
              "
              class="text-body2 vertical-top"
            >
              مهر و امضا خریدار
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </q-card-section>
</template>

<script setup>
  import { useQuasar } from "quasar";

  const props = defineProps({
    comment: String,
    showSignature: Boolean,
    signatureSource: String,
  });

  const $q = useQuasar();
</script>
