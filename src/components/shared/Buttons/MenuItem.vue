<template>
  <q-item
    clickable
    v-close-popup
    tabindex="0"
    v-ripple
    :to="to"
    @click="click"
  >
    <!-- <div v-if="icon" class="q-py-sm">
      <q-item-section avatar>
        <q-avatar class="bg-on-dark text-on-dark" size="sm">
          <q-icon size="20px" :name="icon" />
        </q-avatar>
      </q-item-section>
    </div> -->

    <q-item-section avatar v-if="icon">
      <q-avatar class="bg-on-dark text-on-dark">
        <q-icon :name="icon" />
      </q-avatar>
    </q-item-section>

    <q-item-section class="text-body2_ no-letter-spacing">
      1. {{ title }}
    </q-item-section>
  </q-item>
</template>

<script setup>
  const props = defineProps({
    icon: String,
    title: String,
    to: String,
  });

  const emits = defineEmits(["click"]);

  const click = () => {
    emits("click");
  };
</script>
