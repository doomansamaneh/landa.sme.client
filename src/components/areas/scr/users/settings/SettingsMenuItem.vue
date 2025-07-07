<template>
  <q-item
    class="q-py-sm"
    :class="$q.screen.gt.xs ? '' : 'q-px-none'"
    clickable
    :to="to"
  >
    <q-item-section :class="$q.screen.lt.sm ? 'q-mx-md' : ''">
      <q-item-label class="text-on-dark text-body2">
        {{ label }}
      </q-item-label>
    </q-item-section>

    <q-item-section side :class="$q.screen.lt.sm ? 'q-mx-sm' : ''">
      <q-btn no-caps round dense unelevated>
        <q-icon
          :class="iconClass"
          :name="icon || expandIcon"
          :size="icon ? '20px' : '24px'"
        />
      </q-btn>
    </q-item-section>
  </q-item>
  <q-separator size="1px" />
</template>

<script setup>
  import { computed } from "vue";
  import { useQuasar } from "quasar";

  const props = defineProps({
    to: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      default: "",
    },
    iconClass: {
      type: String,
      default: "",
    },
  });

  const $q = useQuasar();

  const expandIcon = computed(() =>
    $q.lang.rtl ? "chevron_left" : "chevron_right"
  );
</script>
