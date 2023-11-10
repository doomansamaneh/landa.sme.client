<template>
  <q-drawer
    class="menu-bar q-mb-xl no-scroll"
    side="left"
    :width="255"
    :model-value="menuBar"
    :breakpoint="400"
    bordered
  >

    <q-tabs
      v-model="tab"
      dense
      inline-label
      outside-arrows
      mobile-arrows
      class="text-white bg-primary"
    >
      <q-tab name="menu">
        <template #default>
          <q-icon
            name="o_menu"
            size="xs"
            class="q-mr-sm"
          />
          <div class="text-caption">
            منو
          </div>
        </template>
      </q-tab>
      <q-tab
        name="my-products"
        class="q-py-sm"
      >

        <template #default>
          <q-badge
            transparent
            rounded
            floating
            text-color="white"
            color="red"
          >6</q-badge>

          <q-icon
            name="o_inventory_2"
            size="xs"
            class="q-mr-sm"
          />
          <div class="text-caption">
            کالاهای من
          </div>
        </template>
      </q-tab>
      <q-tab
        name="test-1"
        class="q-py-sm"
      >
        <template #default>
          <q-icon
            name="o_question_mark"
            size="xs"
            class="q-mr-sm"
          />
          <div class="text-caption">
            تست 1
          </div>
        </template>
      </q-tab>
      <q-tab
        name="test-2"
        class="q-py-sm"
      >
        <template #default>
          <q-icon
            name="o_question_mark"
            size="xs"
            class="q-mr-sm"
          />
          <div class="text-caption">
            تست 2
          </div>
        </template>
      </q-tab>
    </q-tabs>
    <q-tab-panels
      v-model="tab"
      animated
      keep-alive
      class="transparent"
    >
      <q-tab-panel
        name="menu"
        class="no-padding"
      >
        <div class="flex justify-center q-pa-md">
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
              />
            </template>
          </q-input>
        </div>

        <q-scroll-area
          style="height: 75vh"
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
                  class="sub-item q-ml-md q-mr-lg q-my-xs"
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
      </q-tab-panel>

      <q-tab-panel
        name="my-products"
        class="no-padding"
      >
        <div class="flex justify-center q-pa-md">
          <q-input
            color="grey-5"
            outlined
            v-model="searchText"
            placeholder="جستجو در کالا"
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
              />
            </template>
          </q-input>
        </div>

        <q-scroll-area
          style="height: 75vh;"
          class="q-pb-sm"
          :thumb-style="helper.thumbStyle"
          :bar-style="helper.barStyle"
        >
          <div class="column q-gutter-y-md q-px-md">
            <q-card
              v-for="product in products"
              :key="product.id"
              class="cursor-pointer no-shadow bordered-1 border-radius-lg"
            >
              <q-card-section class="q-gutter-md">
                <div>
                  <q-badge
                    rounded
                    class="q-px-sm q-mr-sm text-on-dark bg-on-dark"
                  ><span class="text-bold text-caption">{{ product.openingQuantity
                  }}</span></q-badge><span class="text-bold text-caption text-on-dark-1">موجودی</span>
                </div>
                <div class="text-body3 text-bold text-on-dark q-gutter-xs">{{ product.title }}</div>
              </q-card-section>
            </q-card>
          </div>
        </q-scroll-area>
      </q-tab-panel>
    </q-tab-panels>
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
const products = ref([])
const searchText = ref("")
const tab = ref('my-products')

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

function getProducts() {
  fetchWrapper
    .post("cmn/product/getlookupData", {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      handleResponse(response.data.data.items);
    });
}

function handleResponse(data) {
  console.log(data);
  products.value = data;
}

onMounted(() => {
  getMenuItems(),
    getProducts()
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
    font-size: 18px;
  }
}

.products-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-content: end;
  gap: 0 16px;
}
</style>
