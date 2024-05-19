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
            style="
              vertical-align: top;
              padding: 40px 6px;
              border: 1px solid #2d2d2d;
            "
            class="text-body2 no-letter-spacing"
          >
            تهیه کننده
          </td>
          <td
            style="
              vertical-align: top;
              padding: 40px 6px;
              border: 1px solid #2d2d2d;
            "
            class="text-body2 no-letter-spacing"
          >
            تصویب کننده
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
  import { useAppConfigModel } from "src/components/areas/cmn/_composables/useAppConfigModel";

  const props = defineProps({
    model: Object,
    comment: String,
    showSignature: Boolean,
  });

  const appConfigStore = useAppConfigModel();
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
