<template>
  <div>
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
        <slot name="avatar">
          <q-avatar class="bg-on-dark text-on-dark">
            <q-icon :name="icon" />
          </q-avatar>
        </slot>
      </q-item-section>

      <q-item-section class="text-body2">
        {{ title }}
      </q-item-section>
    </q-item>
  </div>
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
