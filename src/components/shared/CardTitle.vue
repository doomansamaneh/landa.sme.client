<template>
  <div class="row justify-between primary-gradient-1">
    <div class="row items-center q-px-md">
      <q-avatar
        v-if="icon"
        rounded
        text-color="white"
        :icon="icon"
        size="md"
        :class="avatarClass"
      />
      <div
        class="text-h6 text-weight-700 no-letter-spacing q-ml-md q-my-sm q-py-xs"
      >
        {{ title }}
      </div>
    </div>
    <div class="flex items-center q-px-md">
      <slot name="header-toolbar" />
    </div>
  </div>
  <q-separator size="1px" />
</template>

<script setup>
  const props = defineProps({
    title: String,
    icon: String,
    avatarClass: {
      type: String,
      default: "primary-gradient primary-shadow",
    },
  });
</script>
