<template>
  <q-drawer class="menu-bar q-mb-xl z-max" :class="$q.dark.isActive ? 'bg-dark' : 'bg-light'" side="left" bordered
    :width="285.50" v-model="menuBarStore.state.visible.value" :breakpoint="400" :overlay="$q.screen.lt.md">
    <div class="flex justify-center q-px-md q-py-lg">
      <q-input inputmode="search" color="grey-5" outlined v-model="menuBarStore.searchText.value"
        :placeholder="$t('main-menu-items.search')" dense rounded clearable clear-icon="o_close"
        class="full-width text-body2 no-letter-spacing">
        <template v-slot:prepend>
          <q-icon name="o_search" color="primary" size="18px" />
        </template>
      </q-input>
    </div>

    <q-scroll-area style="height: calc(100% - 120px);" :thumb-style="helper.thumbStyle" :bar-style="helper.barStyle">
      <q-list class="menu-list q-px-md">
        <q-item class="border-radius-xl first-item q-mb-xs flex text-body2 no-lette-spacing items-center cursor-pointer"
          to="/dashboard">
          <q-icon name="o_dashboard" class="settings q-mr-sm" size="xs"></q-icon>
          {{ $t("main-menu-items.dashboard") }}
        </q-item>
        <div v-for="parentItem in menuBarStore.drawerMenuItems.value" :key="parentItem.name">
          <q-expansion-item ref="expansion" group="menu" :label="parentItem.title" :icon="`o_${parentItem.icon}`"
            class="parent text-body2 no-letter-spacing" :class="{ highlighted: shouldHighlight(parentItem.subItems) }"
            :header-class="{
              'text-yellow text-bold': shouldHighlight(parentItem.subItems) && $q.dark.isActive,
              'text-primary text-bold': shouldHighlight(parentItem.subItems) && !$q.dark.isActive
            }">

            <div class="sub-item-container q-ml-lg">
              <q-item v-for="subItem in parentItem.subItems" :key="subItem.name" :to="subItem.url" clickable
                class="border-radius-xl sub-item q-ml-xs q-my-sm">
                <q-item-section avatar class="">
                  <q-icon :name="`o_${subItem.icon}`" size="xs" />
                </q-item-section>
                <q-item-section>
                  <span class="text-body2 sub no-letter-spacing"> {{ subItem.title }} </span>
                </q-item-section>
              </q-item>
            </div>
          </q-expansion-item>
        </div>
        <q-item to="/cmn/appConfig"
          class="last-item border-radius-xl flex text-body2 no-lette-spacing items-center cursor-pointer q-my-sm">
          <q-icon name="o_settings" class="settings q-mr-sm" size="xs"></q-icon>
          {{ $t("main-menu-items.settings") }}
        </q-item>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

<script setup>
import { onMounted } from "vue"
import { useRouter } from "vue-router"
import { helper } from "src/helpers"
import { useMenuBar } from "src/composables/useMenuBar"

const router = useRouter()
const menuBarStore = useMenuBar()

const props = defineProps({
  menuBar: Boolean
})

const shouldHighlight = (subItems) => {
  const currentPath = router.currentRoute.value.path
  return subItems.some(subItem => subItem.url === currentPath)
}

onMounted(() => {
  menuBarStore.loadData()
})

</script>

<style lang="scss">
.text-sm {
  font-size: 13px;
}

.q-item__section--side {
  // padding-right: 8px;

  .q-icon {
    font-size: 20px;
  }
}
</style>
