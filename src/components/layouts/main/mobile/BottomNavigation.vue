<template>
  <q-footer
    v-if="$q.screen.lt.sm"
    bordered
    class="bottom-navigation text-on-dark"
    :class="$q.dark.isActive ? 'bg-dark' : 'bg-light'"
  >
    <div class="row items-center q-py-sm">
      <div class="col text-center">
        <div @click="menuBarStore.toggle()">
          <q-btn
            dense
            unelevated
            padding="2px 14px"
            rounded
            :class="
              menuBarStore.state.visible.value
                ? 'primary-gradient active-shine text-white'
                : ''
            "
          >
            <q-icon
              size="18px"
              :name="
                menuBarStore.state.visible.value ? 'menu' : 'o_menu'
              "
            />
          </q-btn>
          <div
            class="q-mt-xs text-center text-caption text-weight-500 no-letter-spacing"
          >
            منو
          </div>
        </div>
      </div>

      <div class="col text-center">
        <div @click="goToDashboard">
          <q-btn
            dense
            unelevated
            padding="2px 14px"
            rounded
            :class="
              isActiveDashboard
                ? 'primary-gradient active-shine text-white'
                : ''
            "
          >
            <q-icon
              size="18px"
              :name="isActiveDashboard ? 'dashboard' : 'o_dashboard'"
            />
          </q-btn>
          <div
            class="q-mt-xs text-center text-caption text-weight-500 no-letter-spacing"
          >
            پیشخوان
          </div>
        </div>
      </div>

      <div class="col text-center">
        <div @click="contactDrawerStore.toggle()">
          <q-btn
            dense
            unelevated
            padding="2px 14px"
            rounded
            :class="
              contactDrawerStore.state.value
                ? 'primary-gradient active-shine text-white'
                : ''
            "
          >
            <q-icon
              size="18px"
              :name="
                contactDrawerStore.state.value
                  ? 'person_search'
                  : 'o_person_search'
              "
            />
          </q-btn>
          <div
            class="q-mt-xs text-center text-caption text-weight-500 no-letter-spacing"
          >
            مخاطبین
          </div>
        </div>
      </div>

      <div class="col text-center">
        <div @click="goToProfile">
          <q-btn
            dense
            unelevated
            padding="2px 14px"
            rounded
            class="no-pointer-events"
            :class="
              isActiveProfile
                ? 'primary-gradient active-shine text-white'
                : ''
            "
          >
            <q-icon
              size="18px"
              :name="
                isActiveProfile
                  ? 'account_circle'
                  : 'o_account_circle'
              "
            />
          </q-btn>
          <div
            class="q-mt-xs text-center text-caption text-weight-500 no-letter-spacing"
          >
            نمایه
          </div>
        </div>
      </div>
    </div>
  </q-footer>
</template>

<script setup>
  import { computed } from "vue";
  import { useRouter, useRoute } from "vue-router";

  import { useContactDrawer } from "src/composables/useContactDrawer";
  import { useMenuBar } from "src/composables/useMenuBar";

  const router = useRouter();
  const route = useRoute();

  const contactDrawerStore = useContactDrawer();
  const menuBarStore = useMenuBar();

  const goToDashboard = () => {
    router.push("/dashboard");
  };

  const goToProfile = () => {
    router.push("/scr/users/settings");
  };

  const isActiveDashboard = computed(
    () => route.path === "/dashboard"
  );
  const isActiveProfile = computed(
    () => route.path === "/scr/users/settings"
  );
</script>
