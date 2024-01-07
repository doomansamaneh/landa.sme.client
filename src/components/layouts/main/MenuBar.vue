<template>
  <q-drawer
    class="menu-bar no-scroll q-mb-xl"
    :class="$q.dark.isActive ? 'bg-dark' : 'bg-light'"
    side="left"
    bordered
    :width="249"
    v-model="menuBarStore.state.visible.value"
    :breakpoint="400"
    :overlay="$q.screen.lt.md"
  >
    <div class="flex justify-center q-px-md q-py-lg">
      <q-input
        color="grey-5"
        outlined
        v-model="menuBarStore.searchText.value"
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
      style="height: calc(100% - 120px);"
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
          v-for="parentItem in menuBarStore.drawerMenuItems.value"
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
              class="sub-item q-mr-lg"
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
import { onMounted } from "vue"
import { useRouter } from "vue-router"
import { useI18n } from "vue-i18n"
import { helper } from "src/helpers"
import { useMenuBar } from "src/composables/useMenuBar"

const { t } = useI18n()

const router = useRouter()
const menuBarStore = useMenuBar()

const props = defineProps({
  menuBar: Boolean
})

onMounted(() => {
  menuBarStore.loadData()
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
