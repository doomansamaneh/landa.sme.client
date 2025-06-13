<template>
  <div :style="toolbarMargin">
    <q-page-sticky
      class="bg-main z-1"
      :style="insideStyle"
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
        <div class="row items-center q-gutter-sm">
          <template v-for="(item, index) in menuItems" :key="index">
            <template v-if="item.type === menuItemType.item">
              <menu-button
                v-if="item.visible"
                v-access_="item.permission"
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
                v-access_="item.permission"
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
                          v-access_="subItem.permission"
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

        <template v-if="title">
          <div class="q-space" />
          <span :class="$q.screen.gt.sm ? 'text-h6' : 'text-body1'">
            <slot name="header-title">
              <span class="text-weight-700">
                {{ title }}
              </span>
            </slot>
          </span>
          <go-back-link v-if="backButton" class="q-ml-md" />
        </template>
      </q-toolbar>
    </q-page-sticky>
  </div>
</template>

<script setup>
  import { ref, computed, onMounted, onUnmounted } from "vue";
  import { useQuasar } from "quasar";
  import { menuItemType } from "src/constants";

  import GoBackLink from "./buttons/GoBackLink.vue";
  import MenuButton from "src/components/shared/buttons/MenuButton.vue";
  import MenuItem from "src/components/shared/Buttons/MenuItem.vue";

  const $q = useQuasar();
  const isAtTop = ref(true);

  const props = defineProps({
    title: String,
    backButton: Boolean,
    inside: Boolean,
    margin: Boolean,
    menuItems: Array,
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
    return props.margin ? base : small;
  });

  const toolbarPadding = computed(() => {
    if (props.inside) return "padding: 0 0 16px 0";
    return $q.screen.gt.sm
      ? "padding-left: 38px; padding-right: 38px;"
      : "padding-left: 20px; padding-right: 20px;";
  });

  const insideStyle = computed(() => {
    return props.inside
      ? "background: transparent; transform: 0px; z-index: 0; right: 0; position: relative;"
      : "";
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
