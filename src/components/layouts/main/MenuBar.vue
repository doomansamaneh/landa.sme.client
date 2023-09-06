<template>
  <q-drawer
    :class="$q.dark.isActive ? 'bg-dark' : 'bg-white'"
    side="left"
    :width="305"
    :model-value="drawer"
    :breakpoint="500"
    bordered
  >
    <div class="searchbar-sidebar q-my-md q-px-md">
      <q-input
        color="grey-5"
        outlined
        v-model="searchText"
        placeholder="جستجو در منو"
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
      <div class="settings" @click="gotoDashboard">
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
          ref="expansion"
          group="menu"
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
        <q-item class="flex items-center q-mb-xs q-mt-sm cursor-pointer">
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
</template>

<script setup>
import { ref, onMounted, computed } from "vue"
import { fetchWrapper } from "src/helpers"
import { useRouter } from "vue-router"

const router = useRouter()
const props = defineProps({
  drawer: Boolean
})
const items = ref([])
const searchText = ref("")

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

const gotoDashboard = () => {
  router.push("/dashboard")
  alert("you are going to dashbord...")
}

onMounted(() => {
  getMenuItems()
})
</script>
