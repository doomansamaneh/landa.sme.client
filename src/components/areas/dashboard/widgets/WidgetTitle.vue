<template>
  <div>
    <div class="flex items-center q-gutter-md">
      <q-avatar
        v-if="icon"
        rounded
        :text-color="textColor"
        :icon="icon"
        :size="size"
        :class="props.class"
      />
      <div v-if="label" class="text-h6">
        <span>{{ label }}</span>
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
