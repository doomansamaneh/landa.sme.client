<template>
  <nav>
    <q-header
      bordered
      class="bg-white q-px-sm"
      :class="$q.dark.isActive ? 'bg-dark' : 'bg-white'"
    >
      <q-toolbar class="text-dark row justify-between">
        <div class="menu-button q-gutter-xs">
          <q-btn
            flat
            @click="drawerRight = !drawerRight"
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
          class="text-subtitle2 text-bold col-6 flex justify-start"
        >
          <span class="text q-pr-sm">{{ selectedBusiness.title }}</span>
          <span class="text">-</span>
          <span class="text q-pl-sm text-weight-medium"> سال مالی: 1402</span>
        </q-toolbar-title>

        <div class="search-bar col-4 q-mr-xl gt-sm">
          <q-input
            color="grey-5"
            outlined
            v-model="text"
            dense
            class="home q-py-sm text-caption"
            placeholder="جستوجوی پیشرفته"
            rounded
          >
            <template v-slot:prepend>
              <q-icon name="search" color="primary" />
            </template>
            <template v-slot:append>
              <q-btn
                flat
                round
                dense
                size="12px"
                color=""
                icon="tune"
                class="btn-icon"
              />
            </template>
          </q-input>
        </div>
        <div class="round-icons q-gutter-sm">
          <q-btn
            flat
            dense
            round
            color=""
            icon="o_person_search"
            class="btn-icon gt-xs"
            size="14px"
          />
          <q-btn
            flat
            dense-dark
            round
            color="text"
            icon="o_account_circle"
            size="14px"
            class="btn-icon"
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
                      <q-avatar
                        class="dark-icon"
                        icon="o_date_range"
                        size="md"
                      />
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
            class="btn-icon"
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
                <q-item
                  clickable
                  tabindex="0"
                  class="q-py-sm row justify-center"
                >
                  <div class="q-py-sm">
                    <switch-language />
                  </div>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      :class="$q.dark.isActive ? 'bg-dark' : 'bg-white'"
      side="left"
      v-model="drawerRight"
      show-if-above
      :width="305"
      :breakpoint="500"
      class="drawer"
    >
      <div class="searchbar-sidebar q-my-md q-px-md">
        <q-input
          color="grey-5"
          outlined
          v-model="searchText"
          placeholder="جستوجو در منو"
          dense
          rounded
          class="text-caption"
        >
          <template v-slot:prepend>
            <q-icon name="o_search" color="primary" />
          </template>
        </q-input>
      </div>

      <q-list class="menu-list q-ml-sm q-mr-xs">
        <div class="settings">
          <q-item class="flex items-center cursor-pointer">
            <q-icon
              name="o_dashboard"
              class="settings q-mr-md"
              color="primary"
              size="sm"
            ></q-icon>
            <span class="">{{ $t("drawer.items.dashboard") }}</span>
          </q-item>
        </div>
        <div v-for="parentItem in drawerMenuItems" :key="parentItem.name">
          <q-expansion-item
            :label="$t(`drawer.items.${parentItem.title}`)"
            :icon="`o_${parentItem.icon}`"
          >
            <q-item
              v-for="subItem in parentItem.subItems"
              :key="subItem.name"
              :to="subItem.url"
              clickable
              class="q-mx-md q-my-sm"
            >
              <q-item-section avatar class="item-section">
                <q-icon :name="`o_${subItem.icon}`" />
              </q-item-section>
              <q-item-section>{{
                $t(`drawer.sub-items.${subItem.title}`)
              }}</q-item-section>
            </q-item>
          </q-expansion-item>
        </div>
        <q-separator inset />
        <div class="settings">
          <q-item class="flex items-center q-mb-xl q-mt-sm cursor-pointer">
            <q-icon
              name="o_settings"
              class="settings q-mr-md"
              color="orange"
              size="sm"
            ></q-icon>
            <span class="">{{ $t("drawer.items.settings") }}</span>
          </q-item>
        </div>
      </q-list>
    </q-drawer>
  </nav>
</template>

<script setup>
import { ref, onMounted, computed } from "vue"
import { useRoute } from "vue-router"
import { useRouter } from "vue-router"
import { useQuasar } from "quasar"
import { fetchWrapper } from "src/helpers"
import { useSelectedBusinessStore } from "src/stores/selected-business.js"
import ChangePasswordDialog from "src/components/users/ChangePasswordDialog.vue"
import { useAuthStore } from "src/stores"
import SwitchTheme from "src/components/shared/SwitchTheme.vue"
import SwitchLanguage from "src/components/shared/SwitchLanguage.vue"

const selectedBusiness = useSelectedBusinessStore()
const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const $q = useQuasar()

const title = ref("")
const items = ref([])
const drawerRight = ref(false)
const searchText = ref("")

async function loadData() {
  const businessId = route.params.businessId
  if (businessId)
    await fetchWrapper
      .get(`business/GetBusiness/${businessId}`)
      .then((response) => {
        handleBusinessData(response.data.data)
      })
}

async function getMenuItems() {
  await fetchWrapper
    .get("scr/users/getMenuItems")
    .then((response) => {
      handleMenuItemsData(response.data.data)
    })
    .finally(() => {})
}

function handleMenuItemsData(data) {
  items.value = data
}

function handleBusinessData(data) {
  localStorage.setItem("businessTitle", data.title)
  const businessTitle = localStorage.getItem("businessTitle")
  selectedBusiness.title = businessTitle
}

const username = computed(() => {
  if (authStore.user) return authStore.user.fullName
  return ""
})

function changePasswordDialog() {
  $q.dialog({
    component: ChangePasswordDialog
  })
}

onMounted(() => {
  loadData(), getMenuItems()
})

const drawerMenuItems = computed(() => {
  const menuItemsWithSubItems = items.value.filter((item) =>
    items.value.some((subItem) => subItem.parentName === item.name)
  )

  const menuItemsIncludingSubItems = menuItemsWithSubItems.map((item) => ({
    ...item,
    subItems: items.value.filter((subItem) => subItem.parentName === item.name)
  }))

  if (searchText.value.trim() === "") {
    return menuItemsIncludingSubItems
  } else {
    const searchLower = searchText.value.toLowerCase()
    return menuItemsIncludingSubItems
      .map((item) => {
        const menuItemsWithSubItems = item.subItems.filter((subItem) =>
          subItem.title.toLowerCase().includes(searchLower)
        )

        if (
          menuItemsWithSubItems.length > 0 ||
          item.title.toLowerCase().includes(searchLower)
        ) {
          return {
            ...item,
            subItems: menuItemsWithSubItems
          }
        } else {
          return null
        }
      })
      .filter(Boolean)
  }
})

const gotoBusiness = () => {
  router.push("/business")
}
</script>

<style lang="scss">
.drawer {
  border-right: 1px solid rgb(219, 219, 219);
  border-left: none;
}

.q-focus-helper {
  display: none;
}

.user-profile {
  min-width: 240px;
  border: 1px solid #2d2d2d2d;
  border-radius: inherit;
}

.user-setting {
  min-width: 240px;
  min-height: 400px;
  border: 1px solid #2d2d2d2d;
  border-radius: inherit;
}

.q-item__section--avatar {
  min-width: 0;
}

.q-item.q-router-link--active {
  background-color: $select;
  border-radius: 8px;
  border-left: 4px solid $primary;
}
</style>
