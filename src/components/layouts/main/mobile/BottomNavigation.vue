<template>
  <q-footer
    v-if="$q.screen.lt.sm"
    bordered
    class="bottom-navigation-background text-on-dark"
    :class="$q.dark.isActive ? 'bg-dark' : 'bg-light'"
  >
    <div class="row items-center q-py-sm">
      <navigation-item
        label="منو"
        icon="menu"
        :isActive="isActiveMenu"
        @click="goToMenu"
      />
      <navigation-item
        label="پیشخوان"
        icon="dashboard"
        :isActive="isActiveDashboard"
        @click="goToDashboard"
      />
      <navigation-item
        label="مخاطبین"
        icon="person_search"
        :isActive="contactDrawerStore.state.value"
        @click="contactDrawerStore.toggle"
      />
      <navigation-item
        label="پیکربندی"
        icon="settings"
        :isActive="isActiveConfig"
        @click="goToConfig"
      />
      <navigation-item
        label="نمایه"
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
  const goToConfig = () => router.push("/cmn/appConfig");
  const goToMenu = () => router.push("/menu");

  const isActiveDashboard = computed(
    () => route.path === "/dashboard"
  );
  const isActiveProfile = computed(
    () => route.path === "/scr/users/settings"
  );
  const isActiveConfig = computed(
    () => route.path === "/cmn/appConfig"
  );
  const isActiveMenu = computed(() => route.path === "/menu");
</script>
