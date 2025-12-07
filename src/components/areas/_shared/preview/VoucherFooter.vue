<template>
  <div class="q-table__middle scroll">
    <table
      :style="$q.screen.gt.xs ? 'width:100%' : 'width:900px'"
      style="
        border-collapse: collapse;
        font-size: 13px;
        border-width: 1px;
        border-style: solid;
        border-image: initial;
        margin-top: 5px;
      "
      class="print-preview-table"
    >
      <tbody>
        <tr>
          <td
            style="
              border-width: 1px;
              border-style: solid;
              border-image: initial;
              width: 50%;
              vertical-align: top;
              padding: 5px 5px 80px;
            "
            class="text-body2"
          >
            <slot name="cell1">
              {{ $t("shared.labels.preparedBy") }}
            </slot>
          </td>
          <td
            style="
              border-width: 1px;
              border-style: solid;
              border-image: initial;
              vertical-align: top;
              padding: 5px 5px 80px;
            "
            class="text-body2"
          >
            <slot name="cell2">
              {{ $t("shared.labels.approvedBy") }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
  const props = defineProps({
    model: Object,
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
