<template>
  <q-header
    bordered
    class="q-px-sm"
    :class="$q.dark.isActive ? 'bg-dark' : 'bg-light'"
  >
    <q-toolbar class="text-dark row justify-between">
      <div class="q-gutter-xs">
        <q-btn
          flat
          @click="$emit('toggle-drawer')"
          round
          dense
          icon="menu"
          class="text-on-dark"
        />
      </div>
      <q-toolbar-title class="text-subtitle2 text-bold flex justify-start">
        <span class="text-on-dark q-pr-sm">{{ selectedBusiness.title }}</span>
        <div class="row q-gutter-x-sm q-px-md">
          <q-badge class="q-pl-sm q-py-xs">{{ $t('shared.labels.today') }}: {{
            date.toLocaleDateString("fa-IR", options) }}
          </q-badge>
          <q-btn
            outline
            dense
            class="q-py-xs q-px-sm text-caption"
            color="primary"
          >سال مالی: 1402</q-btn>
        </div>
      </q-toolbar-title>
      <div class="row items-center">
        <q-separator
          vertical
          inset
        />
        <div class="row items-center q-pr-lg q-pl-md">
          <switch-theme />
        </div>
        <q-separator
          vertical
          inset
        />
        <div class="row q-gutter-x-sm q-ml-sm">
          <q-btn
            flat
            dense
            round
            color=""
            icon="o_contacts"
            class="btn-icon text-on-dark gt-xs"
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
            class="btn-icon text-on-dark"
          >
            <q-menu
              class="no-shadow z-max"
              transition-show="jump-down"
              transition-hide="jump-up"
              :offset="[51, 24]"
            >
              <q-list
                dense
                padding
                class="user-profile"
              >
                <q-item-label
                  class="text-h6"
                  header
                >
                  <div class="column items-center justify-center q-mt-md">
                    <div class="q-my-md">
                      <span class="text-on-dark">{{ username }}</span>
                    </div>
                  </div>
                </q-item-label>
                <q-item
                  clickable
                  v-close-popup
                  tabindex="0"
                  class="q-py-sm"
                  @click="changePasswordDialog"
                >
                  <div class="q-py-sm">
                    <q-item-section avatar>
                      <q-avatar
                        class="dark-icon"
                        icon="password"
                        size="md"
                      />
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
                      <q-avatar
                        class="dark-icon"
                        icon="o_business"
                        size="md"
                      />
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
                      <q-avatar
                        class="dark-icon"
                        icon="o_logout"
                        size="md"
                      />
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
            class="btn-icon text-on-dark"
            size="14px"
          >
            <q-menu
              fit
              class="no-shadow z-max"
              transition-show="jump-down"
              transition-hide="jump-up"
              :offset="[10, 24]"
            >
              <q-list
                dense
                padding
                class="user-setting"
              >
                <q-item-label
                  class="text-h6"
                  header
                >
                  <div class="column items-center justify-center q-mt-md">
                    <div class="q-mt-md">
                      <span class="text-on-dark">تنظیمات</span>
                    </div>
                  </div>
                </q-item-label>
                <div class="row justify-center q-py-sm">
                  <switch-language class="language-main-layout" />
                </div>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
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

const date = new Date()
const options = {
  year: "numeric",
  month: "numeric",
  day: "numeric"
}
</script>
