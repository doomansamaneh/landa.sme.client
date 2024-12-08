<template>
  <q-tab :name="name">
    <template #default>
      <q-avatar
        rounded
        text-color="white"
        :icon="icon"
        size="md"
        :class="avatarClass"
      />
      <div
        class="text-h6 text-weight-700 no-letter-spacing q-ml-md q-my-sm"
      >
        {{ title }}
      </div>
    </template>
  </q-tab>
</template>

<script setup>
  const props = defineProps({
    name: String,
    icon: String,
    title: String,
    avatarClass: {
      type: String,
      default: "primary-gradient primary-shadow",
    },
  });
</script>
