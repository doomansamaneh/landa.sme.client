<template>
  <DesktopViewGuide v-model="showGuideDialog" />
  <q-card class="q-card-desktop q-my-xl gt-xs">
    <q-item class="card-header q-px-lg q-py-lg">
      <q-item-section>
        <q-item-label class="text-weight-bold text-grey-10 text-body1">{{
          $t("business-page.card-title")
        }}</q-item-label>
        <q-item-label class="text-body text-grey-7 q-pt-xs text-body2" caption>
          {{ $t("business-page.card-message") }}
        </q-item-label>
      </q-item-section>
      <div class="flex items-center q-gutter-x-md">
        <q-icon
          class="cursor-pointer"
          color="grey"
          size="md"
          name="o_help_outline"
          @click="showGuideDialog = true"
        >
          <q-tooltip>{{ $t("business-page.buttons.guide-tooltip") }}</q-tooltip>
        </q-icon>
        <q-btn unelevated round color="green-7" icon="add">
          <q-tooltip anchor="top left" self="top right">
            {{ $t("business-page.buttons.add-new-business-tooltip") }}
          </q-tooltip>
        </q-btn>
      </div>
    </q-item>
    <q-separator />
    <q-linear-progress
      indeterminate
      size="xs"
      color="primary"
      v-if="loadingData"
    />
    <q-card-section class="q-px-lg q-gutter-y-md">
      <div class="search-bar q-px-sm q-pt-sm" v-if="showSearchbar">
        <q-input
          outlined
          dense
          class="text-caption q-mb-sm"
          v-model="searchTerm"
          :placeholder="$t('business-page.card-searchbar')"
          @keydown.enter="reloadData"
        >
          <template v-slot:prepend>
            <q-icon
              name="search"
              class="cursor-pointer"
              size="sm"
              color="blue-5"
              @click="reloadData"
            />
          </template>
          <template v-slot:append>
            <q-icon
              name="cancel"
              class="cursor-pointer"
              size="sm"
              color="grey-5"
              @click="clearSearch"
              v-if="isSearchTermFull"
            />
          </template>
        </q-input>
      </div>
      <q-card
        class="row justify-between items-center no-shadow q-py-md q-px-md"
        v-for="(item, index) in pagedRows"
        :key="index"
      >
        <div class="flex items-center col-6 q-gutter-x-sm">
          <q-avatar
            color="blue-7"
            text-color="white"
            icon="o_person"
            size="lg"
            v-if="item.isOwner"
          />
          <q-avatar color="grey-4" icon="o_person" size="lg" v-else />

          <q-btn
            class="btn-fixed-width text-caption text-weight-bold"
            align="left"
            no-caps
            flat
            text-color="dark"
            :ripple="false"
            @click="gotoBusiness"
            :label="item.name"
            icon="o_login"
          >
            <q-tooltip>
              {{ $t("business-page.buttons.more-button.enter-business") }}
            </q-tooltip>
          </q-btn>
        </div>

        <div class="expire-date-container flex items-center q-gutter-x-xl">
          <label class="text-grey"
            ><q-icon
              class="expire-date-clock text-grey"
              name="history"
              size="sm"
            />
            {{ item.dateCreatedString }}
            <q-tooltip>{{
              $t("business-page.buttons.expire-date-tooltip")
            }}</q-tooltip>
          </label>
          <q-btn
            v-if="item.isOwner"
            class="service-extension q-pa-sm"
            round
            dense
            flat
            color="positive"
            icon="o_add_shopping_cart"
            size="md"
            :ripple="false"
          >
            <q-tooltip>{{
              $t("business-page.buttons.service-extension-tooltip")
            }}</q-tooltip>
          </q-btn>
          <q-btn
            v-else
            class="service-extension q-pa-sm"
            round
            dense
            flat
            color="grey"
            icon="o_add_shopping_cart"
            size="md"
            disable
            :ripple="false"
          >
          </q-btn>
        </div>
        <div class="more-options col-1 q-pl-md">
          <q-btn
            class="more-icon"
            style="color: grey"
            unelevated
            falt
            round
            :ripple="false"
            icon="more_vert"
            size="md"
            dense
          >
            <q-tooltip>{{
              $t("business-page.buttons.more-tooltip")
            }}</q-tooltip>
          </q-btn>
          <q-menu>
            <q-list>
              <q-item clickable v-close-popup>
                <q-item-section>
                  <div class="flex items-center q-gutter-x-sm">
                    <q-avatar
                      color="grey-4"
                      text-color="dark"
                      icon="login"
                      size="sm"
                    />
                    <div class="text-caption">
                      {{
                        $t("business-page.buttons.more-button.enter-business")
                      }}
                    </div>
                  </div>
                </q-item-section>
              </q-item>
              <div class="isNotOwner" v-if="item.isOwner">
                <q-item clickable v-close-popup>
                  <q-item-section>
                    <div class="flex items-center q-gutter-x-sm">
                      <q-avatar
                        color="grey-4"
                        text-color="dark"
                        icon="o_person_add"
                        size="sm"
                      />
                      <div class="text-caption">
                        {{
                          $t("business-page.buttons.more-button.invite-user")
                        }}
                      </div>
                    </div>
                  </q-item-section>
                </q-item>
                <q-separator />
                <q-item clickable v-close-popup>
                  <q-item-section>
                    <div class="flex items-center q-gutter-x-sm">
                      <q-avatar
                        color="grey-4"
                        text-color="dark"
                        icon="o_delete"
                        size="sm"
                      />
                      <div class="text-caption">
                        {{ $t("business-page.buttons.more-button.delete") }}
                      </div>
                    </div>
                  </q-item-section>
                </q-item>
                <q-separator />
                <q-item clickable v-close-popup>
                  <q-item-section>
                    <div class="flex items-center q-gutter-x-sm">
                      <q-avatar
                        color="grey-4"
                        text-color="dark"
                        icon="credit_card"
                        size="sm"
                      />
                      <div class="text-caption">
                        {{
                          $t(
                            "business-page.buttons.more-button.payment-history"
                          )
                        }}
                      </div>
                    </div>
                  </q-item-section>
                </q-item>
              </div>
            </q-list>
          </q-menu>
        </div>
      </q-card>
    </q-card-section>
    <div
      class="row q-pt-md justify-between bg-grey-3 q-px-lg q-py-md"
      v-if="showPagebar"
    >
      <div class="col-8 flex items-center">
        <q-pagination
          v-if="showPaging"
          v-model="pagination.currentPage"
          :min="1"
          :max="maxPage"
          direction-links
          boundary-links
          icon-first="keyboard_double_arrow_left"
          icon-last="keyboard_double_arrow_right"
          icon-prev="chevron_left"
          icon-next="chevron_right"
          @update:model-value="reloadData"
          class="q-gutter-x-xs"
          padding="2px 5px 2px 5px"
          rounded
          unelevated
          color="grey-8"
          active-color="blue-7"
        />
      </div>
      <div class="col-2">
        <q-select
          outlined
          borderd
          bg-color="white"
          dense
          v-model="pagination.pageSize"
          :options="[5, 10, 20]"
          @update:model-value="reloadData"
          transition-show="flip-up"
          transition-hide="flip-down"
          class="q-pl-lg"
        />
      </div>
    </div>
  </q-card>
</template>

<script setup>
import DesktopViewGuide from "../../components/business/DesktopViewGuide.vue"
import { fetchWrapper } from "../../helpers"
import { computed, onMounted, onBeforeUnmount, watch } from "vue"
import { ref } from "vue"

const rows = ref([])
const showGuideDialog = ref(false)
const loadingData = ref(false)
const searchTerm = ref("")
const pagination = ref({
  sortBy: "name",
  descending: false,
  currentPage: 1,
  pageSize: 5,
  totalItems: 0
})

const showPagebar = computed(() => {
  return pagination.value.totalItems > 5
})

const showPaging = computed(() => {
  return pagination.value.totalItems > pagination.value.pageSize
})

const showSearchbar = computed(() => {
  return pagination.value.totalItems > 5 || isSearchTermFull
})

function clearSearch() {
  searchTerm.value = ""
  reloadData()
}

const isSearchTermFull = computed(() => searchTerm.value !== "")

const maxPage = computed(() =>
  Math.ceil(pagination.value.totalItems / pagination.value.pageSize)
)

const pagedRows = computed(() => {
  return rows.value
})

onMounted(() => {
  reloadData()
})

async function reloadData() {
  loadData(pagination.value)
}

async function loadData(data) {
  loadingData.value = true

  let filterExpression = []

  if (searchTerm.value) {
    filterExpression.push({
      fieldName: "b.title",
      operator: 3,
      value: searchTerm.value
    })
  }

  const response = await fetchWrapper
    .post("business/getBusinessGridData", {
      pageSize: data.pageSize,
      sortColumn: data.sortBy,
      sortOrder: data.descending ? 1 : 2,
      currentPage: data.currentPage,
      filterExpression: filterExpression
    })

    .then((response) => {
      handleResponse(response, data)
    })
    .finally(() => {
      loadingData.value = false
    })
}

function handleResponse(response, pagination) {
  rows.value = response.data.items
  pagination.totalItems = response.data.page.totalItems
  pagination.pageSize = response.data.page.pageSize
  pagination.currentPage = response.data.page.currentPage
  pagination.sortBy = pagination.sortBy
  pagination.descending = pagination.descending
}
</script>

<style lang="scss">
.q-card-desktop {
  width: 620px !important;
}

.q-btn .q-focus-helper {
  display: none;
}

.card-header {
  padding-left: 32px;
  padding-right: 32px;
}

.expire-date-clock {
  animation: rotate-animation 3s linear infinite;
  transition: transform 0.3s ease-in-out;
}

@keyframes rotate-animation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-360deg);
  }
}
</style>
