<template>
  <template v-if="behavior === 'heading'">
    <div class="row items-center">
      <q-avatar
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
  </template>

  <template v-else>
    <q-tab :name="name" class="q-mr-xs text-weight-700">
      <template #default>
        <div class="row items-center">
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
</template>

<script setup>
  const props = defineProps({
    behavior: String,
    name: String,
    icon: String,
    title: String,
    avatarClass: {
      type: String,
      default: "primary-gradient primary-shadow",
    },
  });
</script>
