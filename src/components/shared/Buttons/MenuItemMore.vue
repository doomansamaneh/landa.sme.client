<template>
  <div class="col-2 row justify-end text-caption text-weight-300">
    <q-btn
      class="absolute-top-right q-ma-sm"
      round
      dense
      unelevated
      size="11px"
      @click.prevent="click"
    >
      <q-icon name="more_vert" size="20px" />
    </q-btn>
  </div>
</template>

<script setup>
  const emits = defineEmits(["click"]);

  const click = () => {
    emits("click");
  };
</script>
