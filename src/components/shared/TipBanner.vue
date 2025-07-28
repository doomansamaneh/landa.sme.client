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

<script>
  import { useI18n } from "vue-i18n";

  export default {
    props: {
      title: {
        type: String,
        default() {
          const { t } = useI18n();
          return t("shared.labels.userGuide");
        },
      },
      tip: String,
      closeable: Boolean,
    },
  };
</script>

<script setup>
  import { ref } from "vue";

  const status = ref(true);
  const toggle = () => {
    status.value = !status.value;
  };
</script>
