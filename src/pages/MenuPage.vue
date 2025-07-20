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
      <no-data-found
        v-if="filteredMenuItems.length === 0 && !showSettingsItem"
      />

      <div
        v-else
        v-for="parentItem in filteredMenuItems"
        :key="parentItem.name"
      >
        <div class="q-mb-lg menu-bar">
          <div
            class="text-body2 text-weight-700 q-mb-md"
            :class="$q.dark.isActive ? 'text-yellow' : 'text-primary'"
          >
            <div class="flex items-center q-gutter-sm">
              <q-icon
                :name="`o_${parentItem.icon}`"
                size="24px"
                :color="$q.dark.isActive ? 'yellow' : 'primary'"
              />
              <span class="text-weight-medium">
                {{ parentItem.title }}
              </span>
            </div>
          </div>
          <div
            class="sub-item-container q-pl-sm"
            style="margin-right: 10px"
          >
            <div class="row q-col-gutter-sm">
              <div
                v-for="subItem in filteredSubItems(
                  parentItem.subItems
                )"
                :key="subItem.name"
                class="col-md-3 col-sm-6 col-xs-12"
              >
                <router-link
                  :to="subItem.url"
                  class="no-decoration text-black"
                >
                  <q-card
                    bordered
                    class="no-shadow q-hoverable cursor-pointer"
                    style="border-radius: 50px"
                  >
                    <span class="q-focus-helper" />
                    <q-card-section class="q-pa-sm q-ma-xs">
                      <div class="flex items-center q-gutter-sm">
                        <q-icon
                          :name="`o_${subItem.icon}`"
                          size="24px"
                          :color="
                            $q.dark.isActive ? 'yellow' : 'primary'
                          "
                        />
                        <span class="text-weight-medium">
                          {{ subItem.title }}
                        </span>
                      </div>
                    </q-card-section>
                  </q-card>
                </router-link>
              </div>
            </div>
          </div>
          <!-- <q-separator
            v-if="
              parentItem !==
              filteredMenuItems[filteredMenuItems.length - 1]
            "
            class="q-mt-lg"
          /> -->
        </div>
      </div>

      <!-- System Configuration Item -->
      <div v-if="showSettingsItem" class="q-mb-lg">
        <div class="row q-col-gutter-sm">
          <div class="col-md-3 col-sm-6 col-xs-12">
            <router-link
              to="/cmn/appConfig"
              class="no-decoration text-black"
            >
              <q-card
                bordered
                class="no-shadow q-hoverable cursor-pointer"
                style="border-radius: 50px"
              >
                <span class="q-focus-helper" />
                <q-card-section class="q-pa-sm q-ma-xs">
                  <div class="flex items-center q-gutter-sm">
                    <q-icon
                      name="o_settings"
                      size="24px"
                      :color="$q.dark.isActive ? 'yellow' : 'primary'"
                    />
                    <span class="text-weight-medium">
                      {{ $t("main-menu-items.settings") }}
                    </span>
                  </div>
                </q-card-section>
              </q-card>
            </router-link>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
  import { useMenuBar } from "src/composables/useMenuBar";
  import { ref, computed } from "vue";
  import { useI18n } from "vue-i18n";

  import NoDataFound from "src/components/shared/dataTables/NoDataFound.vue";

  const menuBarStore = useMenuBar();
  const searchText = ref("");
  const { t } = useI18n();

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

  const showSettingsItem = computed(() => {
    if (!searchText.value) return true;

    const settingsText = t("main-menu-items.settings").toLowerCase();
    return settingsText.includes(searchText.value.toLowerCase());
  });
</script>

<style lang="scss" scoped>
  .menu-page {
    max-width: 1200px;
    margin: 0 auto;
  }
</style>
