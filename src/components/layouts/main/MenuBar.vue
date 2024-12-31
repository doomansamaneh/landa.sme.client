<template>
  <q-drawer
    class="menu-bar menu-bar-background q-mb-xl z-max"
    side="left"
    bordered
    :width="$q.screen.gt.xs ? 288 : deviceWidth"
    v-model="menuBarStore.state.visible.value"
    :breakpoint="400"
    :overlay="$q.screen.lt.md"
  >
    <div
      class="row items-center justify-center q-gutter-md q-px-md q-py-lg"
    >
      <div class="col">
        <q-input
          inputmode="search"
          color="grey-5"
          outlined
          v-model="menuBarStore.searchText.value"
          :placeholder="$t('main-menu-items.search')"
          dense
          rounded
          clearable
          clear-icon="o_close"
          class="full-width text-body2 no-letter-spacing"
        >
          <template v-slot:prepend>
            <q-icon name="o_search" color="primary" size="24px" />
          </template>
        </q-input>
      </div>

      <div v-if="$q.screen.lt.md" class="col-1">
        <div>
          <q-btn
            size="8px"
            round
            unelevated
            text-color="white"
            class="red-gradient red-shadow col-1"
            @click="menuBarStore.toggle()"
          >
            <q-icon size="16px" name="o_close" />
          </q-btn>
        </div>
      </div>
    </div>

    <q-scroll-area
      style="height: calc(100% - 120px)"
      :thumb-style="helper.thumbStyle"
      :bar-style="helper.barStyle"
    >
      <q-list class="menu-list q-px-md">
        <div
          v-if="$route.path == '/dashboard'"
          class="row items-center q-gutter-xs"
        >
          <div class="col">
            <q-item
              class="z-1 border-radius-xl first-item q-mb-xs flex text-body2 no-lette-spacing items-center cursor-pointer"
              :class="{ 'active-shine': isActiveItem('/dashboard') }"
              to="/dashboard"
            >
              <q-icon
                name="o_dashboard"
                class="settings q-mr-sm"
                size="20px"
              />
              <div class="z-1">
                {{ $t("main-menu-items.dashboard") }}
              </div>
            </q-item>
          </div>
          <div class="col-1 q-mr-md">
            <q-btn
              unelevated
              round
              dense
              size="11px"
              @click="reloadData"
            >
              <q-icon size="18px" name="o_refresh" />
            </q-btn>
          </div>
        </div>

        <div v-else>
          <q-item
            class="z-1 border-radius-xl first-item q-mb-xs flex text-body2 no-lette-spacing items-center cursor-pointer"
            :class="{ 'active-shine': isActiveItem('/dashboard') }"
            to="/dashboard"
          >
            <q-icon
              name="o_dashboard"
              class="settings q-mr-sm"
              size="20px"
            />
            <div class="z-1">
              {{ $t("main-menu-items.dashboard") }}
            </div>
          </q-item>
        </div>

        <q-inner-loading
          :showing="menuBarStore.showLoader.value"
          class="transparent z-max"
        >
          <q-spinner size="52px" color="primary" />
        </q-inner-loading>
        <div
          v-for="parentItem in menuBarStore.drawerMenuItems.value"
          :key="parentItem.name"
          class="q-my-sm"
        >
          <q-expansion-item
            ref="expansion"
            group="menu"
            :label="parentItem.title"
            :icon="`o_${parentItem.icon}`"
            class="parent text-body2 no-letter-spacing"
            :class="{
              highlighted: shouldHighlight(parentItem.subItems),
            }"
            :header-class="{
              'text-yellow text-bold':
                shouldHighlight(parentItem.subItems) &&
                $q.dark.isActive,
              'text-primary text-bold':
                shouldHighlight(parentItem.subItems) &&
                !$q.dark.isActive,
            }"
          >
            <div class="sub-item-container q-ml-lg">
              <q-item
                v-for="subItem in parentItem.subItems"
                :key="subItem.name"
                :to="subItem.url"
                clickable
                class="border-radius-xl sub-item q-ml-xs q-my-xs"
                :class="{
                  'active-shine': isActiveItem(subItem.url),
                }"
              >
                <q-item-section avatar>
                  <q-icon :name="`o_${subItem.icon}`" size="20px" />
                </q-item-section>
                <q-item-section>
                  <span class="z-1 text-body2 sub no-letter-spacing">
                    {{ subItem.title }}
                  </span>
                </q-item-section>
              </q-item>
            </div>
          </q-expansion-item>
        </div>
        <q-item
          to="/cmn/appConfig"
          class="last-item border-radius-xl flex text-body2 no-lette-spacing items-center cursor-pointer q-my-sm"
          :class="{ 'active-shine': isActiveItem('/cmn/appConfig') }"
        >
          <q-icon
            name="o_settings"
            class="settings q-mr-sm"
            size="21px"
          />
          <div class="z-1">
            {{ $t("main-menu-items.settings") }}
          </div>
        </q-item>
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

<script setup>
  import { onMounted } from "vue";
  import { useRouter } from "vue-router";
  import { helper, fetchWrapper, bus } from "src/helpers";
  import { useMenuBar } from "src/composables/useMenuBar";
  import { useComposables } from "src/stores/useComposables";

  const router = useRouter();
  const menuBarStore = useMenuBar();

  const props = defineProps({
    menuBar: Boolean,
  });

  const deviceWidth =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;

  const shouldHighlight = (subItems) => {
    const currentPath = router.currentRoute.value.path;
    return subItems.some((subItem) => subItem.url === currentPath);
  };

  const isActiveItem = (url) => {
    return router.currentRoute.value.path === url;
  };

  const reloadData = () => {
    const composablesStore = useComposables();
    composablesStore.reset();
    bus.emit("render-page");
  };

  onMounted(() => {
    menuBarStore.loadData();
  });
</script>
