<template>
  <q-drawer
    class="menu-bar"
    side="left"
    :width="263"
    :model-value="menuBar"
    :breakpoint="500"
    bordered
  >
    <q-scroll-area
      class="fit"
      dark
      :thumb-style="thumbStyle"
      :bar-style="barStyle"
    >
      <div class="searchbar-sidebar q-my-md q-px-md">
        <q-input
          color="grey-5"
          outlined
          v-model="searchText"
          :placeholder="$t('main-menu-items.search')"
          dense
          rounded
          class="text-caption"
        >
          <template v-slot:prepend>
            <q-icon
              name="o_search"
              color="primary"
            />
          </template>
          <template v-slot:append>
            <q-icon
              name="clear"
              class="cursor-pointer"
              size="16px"
              color="primary"
              @click="clearSearch"
              v-if="!isSearchEmpty"
            />
          </template>
        </q-input>
      </div>
      <q-list class="menu-list q-ml-sm q-mr-xs">
        <div
          class="settings"
          @click="gotoDashboard"
        >
          <q-item class="flex items-center cursor-pointer">
            <q-icon
              name="o_dashboard"
              class="settings q-mr-sm"
              color="primary"
              size="xs"
            ></q-icon>
            <span class="text-sm">{{ $t("main-menu-items.dashboard") }}</span>
          </q-item>
        </div>
        <div
          v-for="parentItem in drawerMenuItems"
          :key="parentItem.name"
        >
          <q-expansion-item
            ref="expansion"
            group="menu"
            :label="parentItem.title"
            :icon="`o_${parentItem.icon}`"
            class="text-sm"
          >
            <q-item
              v-for="subItem in parentItem.subItems"
              :key="subItem.name"
              :to="subItem.url"
              clickable
              class="q-mx-md q-my-xs"
            >
              <q-item-section
                avatar
                class="item-section"
              >
                <q-icon
                  :name="`o_${subItem.icon}`"
                  size="xs"
                />
              </q-item-section>
              <q-item-section>
                <span class="text-caption"> {{ subItem.title }} </span>
              </q-item-section>
            </q-item>
          </q-expansion-item>
        </div>
        <q-separator inset />
        <div class="settings">
          <q-item class="flex items-center q-mb-md q-mt-sm cursor-pointer">
            <q-icon
              name="o_settings"
              class="settings q-mr-sm"
              color="orange"
              size="xs"
            ></q-icon>
            <span class="text-sm">{{ $t("main-menu-items.settings") }}</span>
          </q-item>
        </div>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

<script setup>
import { ref, onMounted, computed } from "vue"
import { fetchWrapper } from "src/helpers"
import { useRouter } from "vue-router"
import { useI18n } from "vue-i18n"

const { t } = useI18n()

const router = useRouter()
const props = defineProps({
  menuBar: Boolean
})

const items = ref([])
const searchText = ref("")

async function getMenuItems() {
  await fetchWrapper
    .get("scr/users/getMenuItems")
    .then((response) => {
      handleMenuItemsData(response.data.data)
    })
    .finally(() => { })
}

function handleMenuItemsData(data) {
  data.forEach((item) => {
    item.title = t(`main-menu-items.${item.title}`)
  })
  items.value = data
}

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
          subItem.title.toLowerCase().includes(searchLower) || subItem.name.toLowerCase().includes(searchLower)
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

const gotoDashboard = () => {
  router.push("/dashboard")
  //alert("you are going to dashbord...")
}

function clearSearch() {
  searchText.value = ""
}

const isSearchEmpty = computed(() =>
  !searchText.value || searchText.value.trim().length === 0
)

const thumbStyle = {
  left: '4px',
  borderRadius: '5px',
  // backgroundColor: '#027be3',
  width: '6px',
  opacity: 0.75
}

const barStyle = {
  left: '2px',
  // borderRadius: '9px',
  // backgroundColor: 'red',
  width: '8px',
  opacity: 0.2
}

onMounted(() => {
  getMenuItems()
})
</script>

<style lang="scss">
.text-sm {
  font-size: 13px;
}

.menu-bar {
  .q-focus-helper {
    display: none;
  }
}

.q-item__section--side {

  padding-right: 8px;

  .q-icon {
    font-size: 18px;
  }
}
</style>
