<template>
  <div
    :class="$q.screen.gt.sm ? 'flex items-center justify-center' : ''"
  >
    <div>
      <div>
        <div class="text-h6 text-weight-700 q-mb-md">تنظیمات</div>
        <q-card
          class="bordered overflow-hidden"
          :class="[$q.screen.gt.sm ? 'settings-card' : 'full-width']"
        >
          <q-card-section class="no-padding">
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
                  :item="authStore.user.id"
                  :text-holder="authStore.user.fullName"
                  :avatar="avatar"
                />
              </q-item-section>

              <q-item-section>
                <q-item-label class="text-on-dark text-body2">
                  {{ authStore.user.fullName }}
                </q-item-label>
                <q-item-label class="caption-on-dark text-body3">
                  {{ authStore.user.loginName }}
                </q-item-label>
              </q-item-section>

              <q-item-section
                side
                :class="$q.screen.lt.sm ? 'q-mx-sm' : ''"
              >
                <q-btn round dense unelevated>
                  <q-icon :name="expandIcon()" size="24px" />
                </q-btn>
              </q-item-section>
            </q-item>

            <q-separator size="1px" />

            <q-item
              class="q-py-sm"
              :class="$q.screen.gt.xs ? '' : 'q-px-none'"
              clickable
              to="/scr/users/settings/theme"
            >
              <q-item-section
                :class="$q.screen.lt.sm ? 'q-mx-md' : ''"
              >
                <q-item-label class="text-on-dark text-body2">
                  رنگ تم‌ و زبان
                </q-item-label>
              </q-item-section>

              <q-item-section
                side
                :class="$q.screen.lt.sm ? 'q-mx-sm' : ''"
              >
                <q-btn round dense unelevated>
                  <q-icon :name="expandIcon()" size="24px" />
                </q-btn>
              </q-item-section>
            </q-item>

            <q-separator size="1px" />

            <q-item
              class="q-py-sm"
              :class="$q.screen.gt.xs ? '' : 'q-px-none'"
              clickable
              to="/scr/users/settings/changePassword"
            >
              <q-item-section
                :class="$q.screen.lt.sm ? 'q-mx-md' : ''"
              >
                <q-item-label class="text-on-dark text-body2">
                  تغییر رمز عبور
                </q-item-label>
              </q-item-section>

              <q-item-section
                side
                :class="$q.screen.lt.sm ? 'q-mx-sm' : ''"
              >
                <q-btn round dense unelevated>
                  <q-icon :name="expandIcon()" size="24px" />
                </q-btn>
              </q-item-section>
            </q-item>
          </q-card-section>
        </q-card>
      </div>

      <q-card
        class="q-mt-xl bordered overflow-hidden"
        :class="[$q.screen.gt.sm ? 'settings-card' : 'full-width']"
      >
        <q-card-section class="no-padding">
          <q-item
            class="q-py-sm"
            :class="$q.screen.gt.xs ? '' : 'q-px-none'"
            clickable
            to="/business"
          >
            <q-item-section :class="$q.screen.lt.sm ? 'q-mx-md' : ''">
              <q-item-label class="text-on-dark text-body2">
                کسب و کارهای من
              </q-item-label>
            </q-item-section>

            <q-item-section
              :class="$q.screen.lt.sm ? 'q-mx-sm' : ''"
              side
            >
              <q-btn round dense unelevated>
                <q-icon :name="expandIcon()" size="24px" />
              </q-btn>
            </q-item-section>
          </q-item>

          <q-separator size="1px" />

          <q-item
            class="q-py-sm"
            :class="$q.screen.gt.xs ? '' : 'q-px-none'"
            clickable
            to="/account/login"
          >
            <q-item-section :class="$q.screen.lt.sm ? 'q-mx-md' : ''">
              <q-item-label class="text-on-dark text-body2">
                خروج از حساب
              </q-item-label>
            </q-item-section>

            <q-item-section
              side
              :class="$q.screen.lt.sm ? 'q-mx-sm' : ''"
            >
              <q-btn round dense unelevated>
                <q-icon
                  class="mirror"
                  :name="logoutIcon()"
                  size="20px"
                />
              </q-btn>
            </q-item-section>
          </q-item>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup>
  import { computed } from "vue";
  import { useMeta, useQuasar } from "quasar";
  import { useAuthStore } from "src/stores";

  import CustomerAvatar from "src/components/shared/CustomerAvatar.vue";
  import { helper } from "src/helpers/helper";

  const $q = useQuasar();
  const authStore = useAuthStore();

  const metaData = {
    title: "لاندا",
    titleTemplate: (title) => `تنظیمات`,
  };

  useMeta(metaData);

  const expandIcon = () => {
    if ($q.lang.rtl) {
      return "chevron_left";
    } else {
      return "chevron_right";
    }
  };

  const logoutIcon = () => {
    if ($q.lang.rtl) {
      return "o_logout";
    } else {
      return "o_logout";
    }
  };

  const username = computed(() => {
    if (authStore.user) return authStore.user.fullName;
    return "";
  });

  const avatar = "https://cdn.quasar.dev/img/boy-avatar.png";
</script>

<style lang="scss">
  .settings-card {
    width: 900px;
  }
</style>
