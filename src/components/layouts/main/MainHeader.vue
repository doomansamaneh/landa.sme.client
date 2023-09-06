<template>
  <q-header
    bordered
    class="q-px-sm"
    :class="$q.dark.isActive ? 'bg-dark' : 'bg-light'"
  >
    <q-toolbar class="text-dark row justify-between">
      <div class="menu-button q-gutter-xs">
        <q-btn
          flat
          @click="$emit('toggle-drawer')"
          round
          dense
          icon="menu"
          class="text"
        />
        <q-btn
          flat
          round
          dense
          color="text"
          icon="search"
          class="text-dark xs"
        />
      </div>
      <div class="search-for-mobile xs"></div>
      <q-toolbar-title
        class="text-subtitle2 text-bold col-4 flex justify-start"
      >
        <span class="text q-pr-sm">{{ selectedBusiness.title }}</span>
        <span class="text">-</span>
        <span class="text q-pl-sm text-weight-medium"> سال مالی: 1402</span>
      </q-toolbar-title>

      <div class="col q-mr-xl gt-sm">
        <!-- <bread-crumbs class="home-bread-crumbs" /> -->
      </div>
      <div class="round-icons q-gutter-sm">
        <q-btn
          flat
          dense
          round
          color=""
          icon="o_person_search"
          class="btn-icon text gt-xs"
          size="14px"
        />
        <q-btn
          flat
          dense-dark
          round
          dense
          color=""
          icon="o_account_circle"
          size="14px"
          class="btn-icon text"
        >
          <q-menu
            class="no-shadow z-max"
            transition-show="jump-down"
            transition-hide="jump-up"
            :offset="[51, 24]"
          >
            <q-list dense padding class="user-profile">
              <q-item-label class="text-h6" header>
                <div class="column items-center justify-center q-mt-md">
                  <div class="q-mt-md">
                    <span class="username">{{ username }}</span>
                  </div>
                </div>
              </q-item-label>
              <q-item clickable v-ripple v-close-popup class="q-mt-md">
                <div class="q-py-sm">
                  <q-item-section avatar>
                    <q-avatar class="dark-icon" icon="o_date_range" size="md" />
                  </q-item-section>
                </div>

                <q-item-section>تغییر سال مالی</q-item-section>
              </q-item>
              <q-item
                clickable
                v-close-popup
                tabindex="0"
                class="q-py-sm"
                @click="changePasswordDialog"
              >
                <div class="q-py-sm">
                  <q-item-section avatar>
                    <q-avatar class="dark-icon" icon="password" size="md" />
                  </q-item-section>
                </div>
                <q-item-section>
                  {{ $t("business-layout.buttons.change-password") }}
                </q-item-section>
              </q-item>
              <q-item
                clickable
                v-close-popup
                tabindex="0"
                class="q-py-sm"
                @click="gotoBusiness"
              >
                <div class="q-py-sm">
                  <q-item-section avatar>
                    <q-avatar class="dark-icon" icon="o_business" size="md" />
                  </q-item-section>
                </div>
                <q-item-section>
                  {{ $t("pages.business") }}
                </q-item-section>
              </q-item>
              <q-item
                clickable
                v-close-popup
                tabindex="0"
                class="q-py-sm"
                @click="authStore.logout()"
              >
                <div class="q-py-sm">
                  <q-item-section avatar>
                    <q-avatar class="dark-icon" icon="o_logout" size="md" />
                  </q-item-section>
                </div>
                <q-item-section>{{
                  $t("business-layout.buttons.logout")
                }}</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
        <q-btn
          flat
          dense
          round
          color=""
          icon="o_settings"
          class="btn-icon text"
          size="14px"
        >
          <q-menu
            fit
            class="no-shadow z-max"
            transition-show="jump-down"
            transition-hide="jump-up"
            :offset="[10, 24]"
          >
            <q-list dense padding class="user-setting">
              <q-item-label class="text-h6" header>
                <div class="column items-center justify-center q-mt-md">
                  <div class="q-mt-md">
                    <span class="username">تنظیمات</span>
                  </div>
                </div>
              </q-item-label>
              <q-item
                clickable
                v-ripple
                v-close-popup
                class="q-mt-md row justify-center"
              >
                <div class="q-py-sm">
                  <switch-theme />
                </div>
              </q-item>
              <q-item clickable tabindex="0" class="q-py-sm row justify-center">
                <div class="q-py-sm">
                  <switch-language class="language-main-layout" />
                </div>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </div>
    </q-toolbar>
  </q-header>
</template>

<script setup>
import { ref, computed } from "vue"
import ChangePasswordDialog from "src/components/users/ChangePasswordDialog.vue"
import { useAuthStore } from "src/stores"
import { useQuasar } from "quasar"
import { useRouter } from "vue-router"
import SwitchTheme from "src/components/shared/SwitchTheme.vue"
import SwitchLanguage from "src/components/shared/SwitchLanguage.vue"
import BreadCrumbs from "src/components/shared/BreadCrumbs.vue"
import { useSelectedBusinessStore } from "src/stores/selected-business.js"

const authStore = useAuthStore()
const router = useRouter()
const $q = useQuasar()
const selectedBusiness = useSelectedBusinessStore()

const emit = defineEmits(["toggle-drawer"])

const title = ref("")
// const drawerRight = ref(false)

const username = computed(() => {
  if (authStore.user) return authStore.user.fullName
  return ""
})

function changePasswordDialog() {
  $q.dialog({
    component: ChangePasswordDialog
  })
}

const gotoBusiness = () => {
  router.push("/business")
}
</script>
