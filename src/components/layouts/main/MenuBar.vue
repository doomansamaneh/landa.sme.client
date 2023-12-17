<template>
  <q-drawer
    class="menu-bar no-scroll q-mb-xl q-pl-md"
    :class="$q.dark.isActive ? 'bg-dark' : 'bg-light' "
    side="left"
    :width="240"
    :model-value="menuBar"
    :breakpoint="400"
    :overlay="$q.screen.lt.md"

  >
    <div class="flex justify-center q-px-md q-pb-md">
      <q-input
        color="grey-5"
        outlined
        v-model="searchText"
        :placeholder="$t('main-menu-items.search')"
        dense
        rounded
        clearable
        clear-icon="o_close"
        class="full-width text-caption"
      >
        <template v-slot:prepend>
          <q-icon
            name="o_search"
            color="primary"
            size="18px"
          />
        </template>
      </q-input>
    </div>

    <q-scroll-area
      style="height: calc(100% - 80px);"
      :thumb-style="helper.thumbStyle"
      :bar-style="helper.barStyle"
    >
      <q-list class="menu-list">
        <q-item
          class="flex items-center cursor-pointer q-mr-md"
          to="/dashboard"
        >
          <q-icon
            name="o_dashboard"
            class="settings q-mr-sm"
            color="primary"
            size="xs"
          ></q-icon>
          <span class="text-sm">{{ $t("main-menu-items.dashboard") }}</span>
        </q-item>
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
              class="sub-item q-mx-md"
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
        <q-item class="flex items-center cursor-pointer">
          <q-icon
            name="o_settings"
            class="settings q-mr-sm"
            color="orange"
            size="xs"
          ></q-icon>
          <span class="text-sm">{{ $t("main-menu-items.settings") }}</span>
        </q-item>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

<script setup>
import { ref, onMounted, computed } from "vue"
import { fetchWrapper } from "src/helpers"
import { useRouter } from "vue-router"
import { useI18n } from "vue-i18n"
import { helper } from "src/helpers"

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
    font-size: 20px;
  }
}
</style>
