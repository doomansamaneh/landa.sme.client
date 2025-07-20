<template>
  <q-footer
    v-if="$q.screen.lt.sm"
    bordered
    class="bottom-navigation-background text-on-dark"
    :class="$q.dark.isActive ? 'bg-dark' : 'bg-light'"
  >
    <div class="row items-center q-py-sm">
      <navigation-item
        :label="$t('shared.labels.menu')"
        icon="menu"
        :isActive="isActiveMenu"
        @click="goToMenu"
      />
      <navigation-item
        :label="$t('shared.labels.dashboard')"
        icon="dashboard"
        :isActive="isActiveDashboard"
        @click="goToDashboard"
      />
      <navigation-item
        :label="$t('shared.labels.contacts')"
        icon="person_search"
        :isActive="isActiveContact"
        @click="goToContact"
      />
      <navigation-item
        :label="$t('shared.labels.support')"
        icon="support_agent"
        :isActive="isActiveTicket"
        @click="goToTicket"
      />
      <navigation-item
        :label="$t('shared.labels.profile')"
        icon="account_circle"
        :isActive="isActiveProfile"
        @click="goToProfile"
      />
    </div>
  </q-footer>
</template>

<script setup>
  import { computed } from "vue";
  import { useRouter, useRoute } from "vue-router";
  import { useContactDrawer } from "src/composables/useContactDrawer";

  import NavigationItem from "src/components/layouts/main/mobile/NavigationItem.vue";

  const router = useRouter();
  const route = useRoute();

  const contactDrawerStore = useContactDrawer();

  const goToDashboard = () => router.push("/dashboard");
  const goToProfile = () => router.push("/scr/users/settings");
  const goToTicket = () => router.push("/tickets");
  const goToContact = () => router.push("/crm/customer");
  const goToMenu = () => router.push("/menu");

  const isActiveDashboard = computed(
    () => route.path === "/dashboard"
  );
  const isActiveProfile = computed(
    () => route.path === "/scr/users/settings"
  );
  const isActiveTicket = computed(() => route.path === "/tickets");
  const isActiveContact = computed(
    () => route.path === "/crm/customer"
  );
  const isActiveMenu = computed(() => route.path === "/menu");
</script>
