<template>
  <q-input
    inputmode="search"
    color="grey-5"
    outlined
    v-model="searchText"
    :placeholder="$t('main-menu-items.search')"
    dense
    rounded
    clearable
    clear-icon="o_close"
    class="full-width text-body2 q-mb-md"
  >
    <template v-slot:prepend>
      <q-icon name="o_search" color="primary" size="24px" />
    </template>
  </q-input>

  <div class="flex q-gutter-md q-mb-lg">
    <q-card
      class="q-hoverable cursor-pointer border-radius-sm"
      @click="goToDashboard"
      v-if="shouldShowDashboard"
    >
      <span class="q-focus-helper" />
      <q-card-section>
        <div class="flex q-gutter-sm items-center">
          <q-icon name="o_dashboard" size="20px" />
          <div class="text-body1">
            {{ $t("main-menu-items.dashboard") }}
          </div>
        </div>
      </q-card-section>
    </q-card>
    <q-card
      class="q-hoverable cursor-pointer border-radius-sm"
      @click="goToSettings"
      v-if="shouldShowSettings"
    >
      <q-card-section>
        <div class="flex q-gutter-sm items-center">
          <q-icon name="o_settings" size="20px" />
          <div class="text-body1">
            {{ $t("main-menu-items.settings") }}
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>

  <div v-for="parentItem in filteredMenuItems" :key="parentItem.name">
    <div class="q-mb-lg">
      <div class="text-body1 text-weight-700 q-mb-md">
        {{ parentItem.title }}
      </div>
      <div class="flex q-gutter-md">
        <q-card
          bordered
          v-for="subItem in filteredSubItems(parentItem.subItems)"
          :key="subItem.name"
          class="border-radius-sm col-md-2 col-sm-3 col-xs-12 q-hoverable cursor-pointer"
        >
          <span class="q-focus-helper" />
          <q-card-section class="flex items-center q-gutter-sm">
            <q-icon :name="`o_${subItem.icon}`" size="20px" />
            <span class="text-body2">{{ subItem.title }}</span>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { useRouter } from "vue-router";
  import { useMenuBar } from "src/composables/useMenuBar";
  import { ref, computed } from "vue";
  import { useI18n } from "vue-i18n";

  const router = useRouter();
  const menuBarStore = useMenuBar();
  const searchText = ref("");
  const { t } = useI18n();

  const goToDashboard = () => router.push("/dashboard");
  const goToSettings = () => router.push("/cmn/appConfig");

  const shouldShowDashboard = computed(() => {
    if (!searchText.value) return true;
    return t("main-menu-items.dashboard")
      .toLowerCase()
      .includes(searchText.value.toLowerCase());
  });

  const shouldShowSettings = computed(() => {
    if (!searchText.value) return true;
    return t("main-menu-items.settings")
      .toLowerCase()
      .includes(searchText.value.toLowerCase());
  });

  const filteredSubItems = (subItems) => {
    if (!searchText.value) return subItems;
    return subItems.filter((subItem) =>
      subItem.title
        .toLowerCase()
        .includes(searchText.value.toLowerCase())
    );
  };

  const filteredMenuItems = computed(() => {
    if (!searchText.value) return menuBarStore.drawerMenuItems.value;

    return menuBarStore.drawerMenuItems.value
      .filter((parentItem) => {
        // Check if parent title matches
        if (
          parentItem.title
            .toLowerCase()
            .includes(searchText.value.toLowerCase())
        ) {
          return true;
        }

        // Check if any sub-item matches
        return parentItem.subItems.some((subItem) =>
          subItem.title
            .toLowerCase()
            .includes(searchText.value.toLowerCase())
        );
      })
      .map((parentItem) => ({
        ...parentItem,
        subItems: filteredSubItems(parentItem.subItems),
      }));
  });
</script>
