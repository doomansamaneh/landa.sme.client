<template>
  <div>
    <div class="flex items-center q-gutter-md no-wrap">
      <q-avatar
        v-if="icon"
        rounded
        :text-color="textColor"
        :icon="icon"
        :size="size"
        :class="props.class"
      />
      <div class="text-h6">
        <slot name="title">{{ label }}</slot>
      </div>
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    label: String,
    textColor: {
      type: String,
      default: "white",
    },
    icon: String,
    size: {
      type: String,
      default: "md",
    },
    class: {
      type: String,
      default: "primary-gradient primary-shadow",
    },
  });
</script>
