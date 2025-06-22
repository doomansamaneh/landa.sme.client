<template>
  <bottom-sheet
    v-if="bottomSheetStatus"
    header
    :status="bottomSheetStatus"
    @hide="onBottomSheetHide"
  >
    <template #header-title>
      {{ $t("shared.labels.more") }}
    </template>

    <template #body>
      <q-list padding>
        <template v-for="(item, index) in menuItems" :key="index">
          <template v-if="item.type === menuItemType.item">
            <template v-if="item.visible">
              <menu-item
                v-access="item.permission"
                :title="$t(`shared.labels.${item.label}`)"
                :icon="item.icon"
                :to="item.route"
                :badge-count="item.badgeCount"
                @click="handleMenuItemClick(item)"
              />
              <q-separator
                v-if="item.addSeparator"
                size="0.5px"
                class="q-my-sm"
              />
            </template>
          </template>

          <template v-else-if="item.type === menuItemType.moreItem">
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
                  :title="$t(`shared.labels.${subItem.label}`)"
                  :icon="subItem.icon"
                  :to="subItem.route"
                  :badge-count="subItem.badgeCount"
                  @click="handleMenuItemClick(subItem)"
                />
                <q-separator
                  v-if="subItem.addSeparator"
                  size="0.5px"
                  class="q-my-sm"
                />
              </template>
            </template>
          </template>
        </template>
      </q-list>
    </template>
  </bottom-sheet>
</template>

<script setup>
  import { menuItemType } from "src/constants";
  import BottomSheet from "src/components/shared/BottomSheet.vue";

  const props = defineProps({
    menuItems: Array,
  });
</script>
