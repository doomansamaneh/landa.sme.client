<template>
  <q-tab :name="name" class="q-mr-xs text-weight-700 text-on-dark">
    <template #default>
      <div class="row items-center no-wrap">
        <q-avatar
          rounded
          text-color="white"
          :icon="icon"
          size="md"
          :class="avatarClass"
        />
        <div class="text-h6 no-letter-spacing q-ml-md q-my-sm">
          {{ title }}
        </div>
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
