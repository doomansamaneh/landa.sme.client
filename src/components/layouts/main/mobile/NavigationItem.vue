<template>
  <div class="col text-center" @click="handleClick">
    <q-btn
      dense
      unelevated
      padding="2px 14px"
      rounded
      :class="buttonClass"
    >
      <q-icon :size="iconSize" :name="iconFill" />
    </q-btn>
    <div
      :class="labelClass"
      class="q-mt-xs text-center text-weight-500"
    >
      {{ label }}
    </div>
  </div>
</template>

<script setup>
  import { computed } from "vue";
  import { useQuasar } from "quasar";

  const props = defineProps({
    label: String,
    icon: String,
    isActive: Boolean,
  });

  const emits = defineEmits(["click"]);

  const $q = useQuasar();

  const handleClick = (event) => {
    event.preventDefault();
    emits("click");
  };

  const buttonClass = computed(() =>
    props.isActive
      ? $q.dark.isActive
        ? "bg-yellow-7 active-shine text-dark"
        : "primary-gradient active-shine text-white"
      : ""
  );

  const labelClass = computed(() =>
    props.isActive
      ? $q.dark.isActive
        ? "text-yellow"
        : "text-primary"
      : ""
  );

  const iconFill = computed(() =>
    props.isActive ? props.icon : `o_${props.icon}`
  );

  const iconSize = "22px";
</script>
