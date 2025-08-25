<template>
  <li :class="entryClasses">
    <div class="custom-timeline__subtitle">
      <slot name="subtitle">
        <span>{{ subtitle }}</span>
      </slot>
    </div>

    <div :class="dotClasses">
      <slot name="avatar">
        <template v-if="icon">
          <q-icon
            :name="icon"
            class="row items-center justify-center"
          />
        </template>
        <template v-else-if="avatar">
          <customer-avatar
            size="36px"
            text-color="white"
            :item="authStore.currentUser?.id"
            :text-holder="authStore.currentUser?.fullName"
            text-holder-class="text-body1 text-weight-900"
            :avatar="avatar"
          />
        </template>
      </slot>
    </div>

    <div class="custom-timeline__content">
      <h6 class="custom-timeline__title">
        <slot name="title">{{ title }}</slot>
      </h6>
      <slot></slot>
    </div>
  </li>
</template>

<script setup>
  import { computed, inject } from "vue";
  import { useAuthStore } from "src/stores";
  import CustomerAvatar from "src/components/shared/CustomerAvatar.vue";

  const props = defineProps({
    heading: Boolean,
    tag: {
      type: String,
      default: "h3",
    },
    side: {
      type: String,
      default: "right",
      validator: (v) => ["left", "right"].includes(v),
    },
    icon: String,
    avatar: String,
    color: String,
    title: String,
    subtitle: String,
    body: String,
  });

  const authStore = useAuthStore();
  const timeline = inject("timeline");

  const entryClasses = computed(() => {
    return `custom-timeline__entry custom-timeline__entry--${props.side}`;
  });

  const dotClasses = computed(() => {
    return `custom-timeline__dot text-${
      props.color || timeline.color
    }`;
  });
</script>
