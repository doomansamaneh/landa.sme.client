<template>
  <div class="menu-page">
    <q-input
      inputmode="search"
      color="primary"
      outlined
      v-model="searchText"
      :placeholder="$t('main-menu-items.search')"
      dense
      rounded
      clearable
      clear-icon="o_close"
      class="search-input q-mb-lg"
    >
      <template v-slot:prepend>
        <q-icon name="o_search" color="primary" size="24px" />
      </template>
    </q-input>

    <div
      v-if="menuBarStore.showLoader.value"
      class="flex justify-center q-my-xl"
    >
      <q-spinner color="primary" size="52px" />
    </div>

    <template v-else>
      <div class="q-my-lg">
        <div class="row q-col-gutter-md items-center justify-center">
          <router-link
            v-if="shouldShowDashboard"
            to="/dashboard"
            class="col-md-3 col-sm-6 col-xs-12 no-decoration text-black"
          >
            <q-card
              bordered
              class="q-hoverable cursor-pointer border-radius-sm"
              @click="goToDashboard"
            >
              <span class="q-focus-helper" />
              <q-card-section class="q-pa-md">
                <div class="flex q-gutter-sm items-center">
                  <q-icon
                    name="o_dashboard"
                    size="24px"
                    color="primary"
                  />
                  <div class="text-weight-medium">
                    {{ $t("main-menu-items.dashboard") }}
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </router-link>
          <router-link
            v-if="shouldShowSettings"
            to="/cmn/appConfig"
            class="col-md-3 col-sm-6 col-xs-12 no-decoration text-black"
          >
            <q-card
              bordered
              class="q-hoverable cursor-pointer border-radius-sm"
              @click="goToSettings"
            >
              <span class="q-focus-helper" />
              <q-card-section class="q-pa-md">
                <div class="flex q-gutter-sm items-center">
                  <q-icon
                    name="o_settings"
                    size="24px"
                    color="primary"
                  />
                  <div class="text-weight-medium">
                    {{ $t("main-menu-items.settings") }}
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </router-link>
        </div>
      </div>

      <no-data-found v-if="filteredMenuItems.length === 0" />

      <div
        v-else
        v-for="parentItem in filteredMenuItems"
        :key="parentItem.name"
      >
        <div class="q-mb-lg">
          <div class="text-h6 text-weight-bold q-mb-md text-primary">
            {{ parentItem.title }}
          </div>
          <div class="row q-col-gutter-md">
            <div
              v-for="subItem in filteredSubItems(parentItem.subItems)"
              :key="subItem.name"
              class="col-md-3 col-sm-6 col-xs-12"
            >
              <router-link
                :to="subItem.url"
                class="no-decoration text-black"
              >
                <q-card
                  bordered
                  class="menu-card q-hoverable cursor-pointer border-radius-sm"
                >
                  <span class="q-focus-helper" />
                  <q-card-section class="q-pa-md">
                    <div class="flex items-center q-gutter-sm">
                      <q-icon
                        :name="`o_${subItem.icon}`"
                        size="24px"
                        color="primary"
                      />
                      <span class="text-body1 text-weight-medium">
                        {{ subItem.title }}
                      </span>
                    </div>
                  </q-card-section>
                </q-card>
              </router-link>
            </div>
          </div>
          <q-separator
            v-if="
              parentItem !==
              filteredMenuItems[filteredMenuItems.length - 1]
            "
            class="q-mt-lg"
          />
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
  import { useRouter } from "vue-router";
  import { useMenuBar } from "src/composables/useMenuBar";
  import { ref, computed } from "vue";
  import { useI18n } from "vue-i18n";

  import NoDataFound from "src/components/shared/dataTables/NoDataFound.vue";

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
    return subItems.filter(
      (subItem) =>
        subItem.title
          .toLowerCase()
          .includes(searchText.value.toLowerCase()) ||
        subItem.englishName
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
            .includes(searchText.value.toLowerCase()) ||
          parentItem.englishName
            .toLowerCase()
            .includes(searchText.value.toLowerCase())
        ) {
          return true;
        }

        // Check if any sub-item matches
        return parentItem.subItems.some(
          (subItem) =>
            subItem.title
              .toLowerCase()
              .includes(searchText.value.toLowerCase()) ||
            subItem.englishName
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

<style lang="scss" scoped>
  .menu-page {
    max-width: 1200px;
    margin: 0 auto;
  }
</style>
