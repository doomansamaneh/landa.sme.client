<template>
  <q-card v-if="status" flat class="tips">
    <q-card-section>
      <slot name="title">
        <div class="q-mb-sm title">
          {{ title }}
        </div>
      </slot>
      <slot name="body">
        <div class="text-body1">{{ tip }}</div>
      </slot>
    </q-card-section>

    <slot name="close-btn">
      <q-btn
        no-caps
        v-if="closeable"
        dense
        unelevated
        round
        class="absolute-top-right q-ma-sm"
        @click="toggle"
      >
        <q-icon name="o_close" />
      </q-btn>
    </slot>
  </q-card>
</template>

<script setup>
  import { ref } from "vue";

  const props = defineProps({
    title: {
      type: String,
      default: "راهنما",
    },
    tip: String,
    closeable: Boolean,
  });

  const status = ref(true);

  const toggle = () => {
    status.value = !status.value;
  };
</script>
