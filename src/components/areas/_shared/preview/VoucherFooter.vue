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
              padding: 40px 6px;
            "
            class="text-body2"
          >
            <slot name="cell1">تهیه کننده</slot>
          </td>
          <td
            style="
              border-width: 1px;
              border-style: solid;
              border-image: initial;
              vertical-align: top;
              padding: 40px 6px;
            "
            class="text-body2"
          >
            <slot name="cell2">تصویب کننده</slot>
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
