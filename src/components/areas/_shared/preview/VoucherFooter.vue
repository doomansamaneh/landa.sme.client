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
              width: 50%;
              vertical-align: top;
              padding: 40px 6px;
              border: 1px solid #2d2d2d;
            "
            class="text-body2 no-letter-spacing"
          >
            <slot name="cell1">تهیه کننده</slot>
          </td>
          <td
            style="
              vertical-align: top;
              padding: 40px 6px;
              border: 1px solid #2d2d2d;
            "
            class="text-body2 no-letter-spacing"
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
