<template>
  <div v-if="showToolbar" :style="toolbarMargin">
    <q-page-sticky
      class="bg-main z-1"
      :style="combinedStyle"
      position="top"
      expand
      :class="isAtTop || inside ? '' : 'toolbar-glass-effect_'"
    >
      <q-toolbar
        :style="[
          inside ? '' : 'margin-top: 6px; margin-bottom: 6px;',
          toolbarPadding,
        ]"
      >
        <div class="row items-center" style="gap: 8px">
          <template
            v-for="(item, index) in menuItems?.value"
            :key="index"
          >
            <template v-if="item.type === menuItemType.item">
              <menu-button
                v-if="item.visible"
                v-access="item.permission"
                :title="$t(`shared.labels.${item.label}`)"
                :icon="item.icon"
                :to="item.route"
                :class="item.class"
                :badge-count="item.badgeCount"
                @click="handleMenuItemClick(item)"
              />
            </template>
            <template v-else-if="item.type === menuItemType.moreItem">
              <menu-button
                v-if="item.visible"
                v-access="item.permission"
                :title="$t(`shared.labels.${item.label}`)"
                :icon="item.icon"
                :to="item.route"
                :class="item.class"
                :badge-count="item.badgeCount"
                @click="handleMenuItemClick(item)"
              >
                <q-menu class="border-radius-lg" cover>
                  <q-list dense padding style="width: 250px">
                    <template
                      v-for="(subItem, subIndex) in item.subItems"
                      :key="subIndex"
                    >
                      <template
                        v-if="
                          subItem.visible &&
                          subItem.type === menuItemType.item
                        "
                      >
                        <menu-item
                          v-access="subItem.permission"
                          :title="
                            $t(`shared.labels.${subItem.label}`)
                          "
                          :icon="subItem.icon"
                          :to="subItem.route"
                          :class="subItem.class"
                          :badge-count="subItem.badgeCount"
                          @click="handleMenuItemClick(subItem)"
                        />
                        <q-separator
                          v-access="subItem.permission"
                          v-if="subItem.addSeparator"
                          spaced
                        />
                      </template>
                    </template>
                  </q-list>
                </q-menu>
              </menu-button>
            </template>
          </template>
        </div>

        <template v-if="!inside">
          <q-space v-if="menuItems?.value?.length > 0" />
          <span
            v-if="title"
            :class="$q.screen.gt.sm ? 'text-h6' : 'text-body1'"
          >
            <slot name="header-title">
              <span class="text-weight-700">
                {{ title }}
              </span>
            </slot>
          </span>

          <q-space v-if="!menuItems?.value?.length" />

          <go-back-link
            v-if="!inside && backButton"
            class="q-ml-sm"
          />
        </template>
      </q-toolbar>
    </q-page-sticky>
  </div>
</template>

<script setup>
  import { ref, computed, onMounted, onUnmounted } from "vue";
  import { useQuasar } from "quasar";
  import { menuItemType } from "src/constants";

  import MenuButton from "src/components/shared/buttons/MenuButton.vue";
  import GoBackLink from "src/components/shared/buttons/GoBackLink.vue";
  import MenuItem from "src/components/shared/buttons/MenuItem.vue";

  const $q = useQuasar();
  const isAtTop = ref(true);

  const props = defineProps({
    title: String,
    inside: Boolean,
    menuItems: Array,
    backButton: Boolean,
  });

  const emits = defineEmits(["menu-item-click"]);

  const handleMenuItemClick = (item) => {
    item.handler?.();
    emits("menu-item-click", item);
  };

  const toolbarMargin = computed(() => {
    const base = $q.screen.lt.md
      ? "margin-bottom: 56px;"
      : "margin-bottom: 34px;";
    const small = $q.screen.lt.sm ? "margin-bottom: 34px;" : "";
    return props.inside ? small : base;
  });

  const toolbarPadding = computed(() => {
    if (props.inside) return "padding: 0 0 16px 0";
    return $q.screen.gt.sm
      ? "padding-left: 38px; padding-right: 38px;"
      : "padding-left: 20px; padding-right: 20px;";
  });

  const combinedStyle = computed(() => {
    const position = $q.lang.rtl ? "right: 0" : "left: 0";
    if (props.inside) {
      return `background: transparent; transform: 0px; z-index: 0; position: relative; ${position}`;
    }
  });

  const showToolbar = computed(() => {
    return !!props.title || props.menuItems?.value?.length > 0;
  });

  const handleScroll = () => {
    isAtTop.value =
      (window.scrollY || document.documentElement.scrollTop) === 0;
  };

  onMounted(() => window.addEventListener("scroll", handleScroll));
  onUnmounted(() =>
    window.removeEventListener("scroll", handleScroll)
  );
</script>
