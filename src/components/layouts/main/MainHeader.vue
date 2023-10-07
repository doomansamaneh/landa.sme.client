<template>
  <q-header
    bordered
    class="q-px-sm q-py-xs"
    :class="$q.dark.isActive ? 'bg-dark' : 'bg-light'"
  >
    <q-toolbar class="text-dark row justify-between">
      <div class="q-gutter-xs">
        <q-btn
          flat
          @click="$emit('toggle-drawer')"
          round
          dense
          size="16px"
          icon="menu"
          class="text-on-dark"
        />
      </div>
      <q-toolbar-title class="text-subtitle2 text-bold row justify-start items-center">
        <div class="column">
          <span class="text-on-dark q-pr-lg">{{ selectedBusiness.title }}</span>
          <today-date />
        </div>
        <q-btn
          class="bordered-btn bg-dark text-on-dark"
          padding="4px 12px"
          unelevated
          @click="exportTable"
        ><q-icon
            name="o_calendar_today"
            class="q-pr-sm"
            size="16px"
          />سال مالی: 1402</q-btn>
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
        <div class="row q-gutter-x-md q-ml-md">
          <q-btn
            round
            unelevated
            dense
            icon="o_notifications"
            class="text-on-dark"
          >
            <q-badge
              v-if="notif"
              floating
              color="red"
              rounded
            >4</q-badge>
            <q-menu
              class="no-shadow z-max"
              transition-show="jump-down"
              transition-hide="jump-up"
              :offset="[100, 24]"
              max-width="350px"
              max-height="300px"
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
                  <div class="column items-center justify-between q-mt-md">
                    <div class="q-gutter-x-xl">
                      <span class="text-on-dark">اعلانها</span>
                      <q-btn
                        @click="markAll"
                        unelevated
                        rounded
                        class="text-on-dark text-caption"
                      >
                        <q-icon
                          name="o_done_all"
                          size="xs"
                        />
                        <span class="q-ml-xs">همه خوانده‌شده</span>
                      </q-btn>
                    </div>
                  </div>
                </q-item-label>
                <q-item
                  clickable
                  tabindex="0"
                  class="q-py-sm"
                >
                  <div class="q-py-sm">
                    <q-item-section avatar>
                      <q-avatar
                        class="dark-icon"
                        size="md"
                        icon="history"
                      >
                        <q-badge
                          v-if="notif"
                          floating
                          color="red"
                          rounded
                        >4</q-badge>
                      </q-avatar>
                    </q-item-section>
                  </div>
                  <q-item-section>
                    <span class="text-caption">
                      موعد پرداخت چک رسیده
                    </span>
                  </q-item-section>
                  <q-icon-section class="row items-center">
                    <q-btn
                      icon="o_more_horiz"
                      unelevated
                      round
                      size="xs"
                      dense
                    >
                      <q-menu>
                        <q-list
                          dense
                          padding
                        >
                          <q-item clickable>
                            <q-item-section>
                              <span class="text-caption">
                                تبدیل به خوانده‌نشده
                              </span>
                            </q-item-section>
                          </q-item>
                        </q-list>
                      </q-menu>
                    </q-btn>
                  </q-icon-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
          <q-btn
            flat
            dense
            round
            icon="o_contacts"
            class="btn-icon text-on-dark gt-xs"
            size="14px"
          >

            <q-drawer
              side="right"
              v-model="contactSerachDrawer"
              show-if-above
              :width="200"
              :breakpoint="700"
              elevated
              class="bg-primary text-white"
            >
              <q-scroll-area class="fit">
                <div class="q-pa-sm">
                  <div
                    v-for="n in 50"
                    :key="n"
                  >Drawer {{ n }} / 50</div>
                </div>
              </q-scroll-area>
            </q-drawer>

          </q-btn>
          <q-btn
            flat
            dense-dark
            round
            dense
            icon="o_account_circle"
            size="14px"
            class="btn-icon text-on-dark"
          >
            <q-menu
              class="no-shadow z-max"
              transition-show="jump-down"
              transition-hide="jump-up"
              :offset="[60, 24]"
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
import TodayDate from "src/components/shared/TodayDate.vue"
import { useSelectedBusinessStore } from "src/stores/selected-business.js"

const authStore = useAuthStore()
const router = useRouter()
const $q = useQuasar()
const selectedBusiness = useSelectedBusinessStore()

const notif = ref(true)
const contactSerachDrawer = ref(false)
const emit = defineEmits(["toggle-drawer"])

const username = computed(() => {
  if (authStore.user) return authStore.user.fullName
  return ""
})

const markAll = () => {
  notif.value = false
}

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
