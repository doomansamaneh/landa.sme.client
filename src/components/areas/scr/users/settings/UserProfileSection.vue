<template>
  <q-item
    class="q-py-md"
    :class="$q.screen.gt.xs ? '' : 'q-px-none'"
    clickable
  >
    <q-item-section
      class="q-mr-sm"
      top
      avatar
      :class="$q.screen.lt.sm ? 'q-mx-md' : ''"
    >
      <customer-avatar
        size="56px"
        text-color="white"
        :item="user.id"
        :text-holder="user.fullName"
        :avatar="avatar"
        text-holder-class="text-h5 q-pb-xs"
      />
    </q-item-section>

    <q-item-section>
      <q-item-label class="text-on-dark text-body2">
        {{ user.fullName }}
      </q-item-label>
      <q-item-label class="caption-on-dark text-body3">
        {{ user.loginName }}
      </q-item-label>
    </q-item-section>

    <q-item-section side :class="$q.screen.lt.sm ? 'q-mx-sm' : ''">
      <q-btn no-caps round dense unelevated>
        <q-icon :name="expandIcon" size="24px" />
      </q-btn>
    </q-item-section>
  </q-item>
  <q-separator size="1px" />
</template>

<script setup>
  import { computed } from "vue";
  import { useQuasar } from "quasar";

  import CustomerAvatar from "src/components/shared/CustomerAvatar.vue";

  const props = defineProps({
    user: {
      type: Object,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
  });

  const $q = useQuasar();

  const expandIcon = computed(() =>
    $q.lang.rtl ? "chevron_left" : "chevron_right"
  );
</script>
