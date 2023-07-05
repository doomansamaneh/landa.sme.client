<template>
  <DesktopViewGuide v-model="showGuideDialog" />
  <q-item class="card-header q-px-lg q-py-lg">
    <q-item-section>
      <q-item-label class="text-weight-bold text-body1">{{
        $t("business-page.card-title")
      }}</q-item-label>
      <q-item-label class="q-pt-xs text-body2" caption>
        {{ $t("business-page.card-message") }}
      </q-item-label>
    </q-item-section>
    <div class="flex items-center q-gutter-x-md">
      <q-icon
        class="dark-3 cursor-pointer"
        size="md"
        name="o_help_outline"
        @click="showGuideDialog = true"
      >
        <q-tooltip>{{ $t("business-page.buttons.guide-tooltip") }}</q-tooltip>
      </q-icon>
      <q-btn unelevated round icon="add" class="add-new-business">
        <q-tooltip anchor="top left" self="top right">
          {{ $t("business-page.buttons.add-new-business-tooltip") }}
        </q-tooltip>
      </q-btn>
    </div>
  </q-item>
  <q-separator />
  <q-linear-progress
    class="business-progress"
    indeterminate
    size="xs"
    v-if="loadingData"
  />
  <q-card-section class="q-px-lg q-gutter-y-md">
    <div class="search-bar q-pt-sm" v-if="showSearchbar">
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
            class="search-icon cursor-pointer"
            size="sm"
            color="primary"
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
            v-if="!isSearchEmpty"
          />
        </template>
      </q-input>
    </div>
    <q-card
      class="row justify-between items-center no-shadow q-py-md q-px-md cursor-pointer"
      v-for="(item, index) in pagedRows"
      :key="index"
      @click="selectCard(index)"
      :class="{ selected: isSelected(index) }"
    >
      <div class="col-6 q-gutter-x-sm">
        <q-avatar
          class="business-isowner"
          icon="o_person"
          size="lg"
          v-if="item.isOwner"
        />
        <q-avatar
          class="business-isnotowner"
          icon="o_person"
          size="lg"
          v-else
        />
        <q-btn
          class="business-name-btn text-caption text-weight-bold"
          no-caps
          flat
          text-color="dark"
          :ripple="false"
          @click="gotoBusiness"
        >
          <div class="flex no-wrap q-gutter-sm">
            <div class="business-name-icon">
              <q-icon name="o_login" />
            </div>
            <div class="business-name flex">
              <span class="ellipsis">{{ item.title }}</span>
            </div>
          </div>
          <q-tooltip>
            {{ $t("business-page.buttons.more-button.enter-business") }}
          </q-tooltip>
        </q-btn>
      </div>

      <div class="expire-date-container flex items-center q-gutter-x-xl">
        <label class="dark-2"
          ><q-icon
            class="expire-date-clock dark-icon2"
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
        >
          <q-tooltip>{{
            $t("business-page.buttons.service-extension-tooltip")
          }}</q-tooltip>
        </q-btn>
        <q-btn
          v-else
          class="service-extension dark-2 q-pa-sm"
          round
          dense
          flat
          icon="o_add_shopping_cart"
          size="md"
          disable
        >
        </q-btn>
      </div>
      <div class="more-options col-1 q-pl-md">
        <q-btn
          class="more-icon dark-2"
          unelevated
          falt
          round
          icon="more_vert"
          size="md"
          dense
        >
          <q-tooltip>{{ $t("business-page.buttons.more-tooltip") }}</q-tooltip>
        </q-btn>
        <q-menu transition-show="jump-down" transition-hide="jump-up">
          <q-list padding>
            <q-item clickable v-close-popup>
              <q-item-section>
                <div class="flex items-center q-gutter-x-sm">
                  <q-avatar icon="login" size="sm" class="dark-1" />
                  <div class="text-caption">
                    {{ $t("business-page.buttons.more-button.enter-business") }}
                  </div>
                </div>
              </q-item-section>
            </q-item>
            <div class="isNotOwner" v-if="item.isOwner">
              <q-item clickable v-close-popup>
                <q-item-section>
                  <div class="flex items-center q-gutter-x-sm">
                    <q-avatar icon="o_person_add" size="sm" class="dark-1" />
                    <div class="text-caption">
                      {{ $t("business-page.buttons.more-button.invite-user") }}
                    </div>
                  </div>
                </q-item-section>
              </q-item>
              <q-separator spaced />
              <q-item clickable v-close-popup>
                <q-item-section>
                  <div class="flex items-center q-gutter-x-sm">
                    <q-avatar icon="o_delete" size="sm" class="dark-1" />
                    <div class="text-caption">
                      {{ $t("business-page.buttons.more-button.delete") }}
                    </div>
                  </div>
                </q-item-section>
              </q-item>
              <q-separator spaced />
              <q-item clickable v-close-popup>
                <q-item-section>
                  <div
                    class="flex items-center q-gutter-x-sm"
                    @click="goToPaymentHistory"
                  >
                    <q-avatar icon="credit_card" size="sm" class="dark-1" />
                    <div class="text-caption">
                      {{
                        $t("business-page.buttons.more-button.payment-history")
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
    <div
      class="no-results flex justify-center q-my-xl items-center q-gutter-x-sm"
      v-if="showSearchbar && pagedRows.length === 0 && !loadingData"
    >
      <div class="">
        <q-icon
          name="o_sentiment_dissatisfied"
          size="sm"
          class="no-results-icon"
        />
      </div>
      <div class="">چیزی یافت نشد!</div>
    </div>
  </q-card-section>
  <div
    class="row q-pt-md justify-between dark-1 q-px-lg q-py-md"
    v-if="showPagebar"
  >
    <div class="pagination col-8 flex items-center">
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
        gutter="xs"
        padding="2px 4px 2px 4px"
        round
        color="grey-8"
        active-color="primary"
      />
    </div>
    <div class="col-2">
      <q-select
        dense
        outlined
        v-model="pagination.pageSize"
        :options="[5, 10, 20]"
        @update:model-value="reloadData"
        transition-show="flip-up"
        transition-hide="flip-down"
        class="q-pl-lg dark-2 text-weight-bolder"
      />
    </div>
  </div>
</template>

<script setup>
import { fetchWrapper } from "../../helpers"
import DesktopViewGuide from "../business/DesktopViewGuide.vue"
import { computed, onMounted, onBeforeUnmount, watch, defineProps } from "vue"
import { ref } from "vue"
import { useQuasar } from "quasar"
import { useRouter } from "vue-router"

const router = useRouter()
const showGuideDialog = ref(false)
const rows = ref([])
const loadingData = ref(false)
const searchTerm = ref("")
const defaultPageSize = 5
const selectedCard = ref(false)

const thisProps = defineProps({
  title: String,
  dataSource: String,
  color: String
})

const pagination = ref({
  sortBy: "title",
  descending: false,
  currentPage: 1,
  pageSize: defaultPageSize,
  totalItems: 0
})

const showPagebar = computed(() => {
  return pagination.value.totalItems > defaultPageSize
})

const showPaging = computed(() => {
  return pagination.value.totalItems > pagination.value.pageSize
})

const showSearchbar = computed(() => {
  return true
  return pagination.value.totalItems > defaultPageSize || !isSearchEmpty.value
})

function clearSearch() {
  searchTerm.value = ""
  reloadData()
}

const isSearchEmpty = computed(
  () => !searchTerm.value || searchTerm.value.trim().length === 0
)

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
  selectedCard.value = false

  let filterExpression = []

  if (searchTerm.value) {
    filterExpression.push({
      fieldName: "b.title",
      operator: 3,
      value: searchTerm.value
    })
  }

  const response = await fetchWrapper
    .post(thisProps.dataSource, {
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
  //pagination.value = response.data.page
  pagination.totalItems = response.data.page.totalItems
  pagination.pageSize = response.data.page.pageSize
  pagination.currentPage = response.data.page.currentPage
  pagination.sortBy = pagination.sortBy
  pagination.descending = pagination.descending
}

async function gotoBusiness() {}

async function goToPaymentHistory() {
  router.push("/business/Payments")
}

function selectCard(index) {
  selectedCard.value = index
}

function isSelected(index) {
  return selectedCard.value === index
}
</script>

<style></style>
