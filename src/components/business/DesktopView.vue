<template>
  <q-card class="q-card-desktop q-my-xl">
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
        <q-icon color="grey" size="md" name="o_help_outline" />
        <q-btn unelevated round color="green-7" icon="add">
          <q-tooltip anchor="top left" self="top right">
            {{ $t("business-page.buttons.add-new-business-tooltip") }}
          </q-tooltip>
        </q-btn>
      </div>
    </q-item>
    <q-linear-progress indeterminate color="primary" v-if="loadingData" />
    <q-separator />
    <q-card-section class="q-px-lg q-gutter-y-md">
      <div
        class="Search-bar q-px-sm q-pt-sm"
        v-if="pagination.rowsPerPage >= 5"
      >
        <q-input
          outlined
          dense
          class="text-caption"
          v-model="searchTerm"
          :placeholder="$t('business-page.card-searchbar')"
          @keydown.enter="reloadData"
          v-if="shouldShowPaginationAndSearchBar"
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
              v-if="isSearchTermNotEmpty"
            />
          </template>
        </q-input>
      </div>
      <q-card
        class="row justify-around items-center no-shadow q-py-md"
        v-for="(item, index) in pagedRows"
        :key="index"
      >
        <div class="icon flex items-center q-gutter-x-lg col-6 q-pl-xs">
          <q-avatar
            color="blue-7"
            text-color="white"
            icon="o_person"
            size="lg"
            v-if="item.isOwner"
          />
          <q-avatar color="grey-4" icon="o_person" size="lg" v-else />

          <q-btn
            class="business-name-btn q-px-sm q-py-sm"
            flat
            no-caps
            text-color="dark"
            :ripple="{ color: 'grey-5' }"
            @click="gotoBusiness"
          >
            <span
              class="business-name-desktop ellipsis text-caption text-caption text-weight-bold"
              >{{ item.name }}</span
            >
            <q-icon right size="xs" name="o_login" color="blue-7" />
          </q-btn>
        </div>

        <div class="flex items-center q-gutter-x-md">
          <q-badge color="negative" class="expire-date q-py-md q-px-md" outline
            ><q-icon name="o_history" class="q-mr-sm" size="xs" />
            {{ item.dateCreatedString }}
          </q-badge>
          <q-btn
            v-if="item.isOwner"
            class="service-extension q-pa-sm"
            unelevated
            color="orange"
            icon="o_shopping_bag"
            size="sm"
          />
          <q-btn
            v-else
            class="service-extension q-pa-sm"
            unelevated
            color="grey"
            icon="o_shopping_bag"
            size="sm"
            disable
          />
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
          />
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
                    <div class="flex items-center">
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
                    <div class="flex items-center">
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
                    <div class="flex items-center">
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
      v-if="isSearching"
    >
      <div class="col-8 flex items-center">
        <q-pagination
          v-if="hidePaginationWhenAllItemsLoaded"
          v-model="pagination.page"
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
          v-model="pagination.rowsPerPage"
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
import { fetchWrapper } from "../../helpers"
import { computed, onMounted, onBeforeUnmount, watch } from "vue"
import { ref } from "vue"
import { useQuasar, QSpinnerPie, Loading } from "quasar"

const rows = ref([])
const loadingData = ref(false)
const searchTerm = ref("")
const pagination = ref({
  sortBy: "name",
  descending: false,
  page: 1,
  rowsPerPage: 5,
  rowsNumber: 0
})

const shouldShowPaginationAndSearchBar = computed(() => {
  return pagination.value.rowsPerPage >= 5
})

const hidePaginationWhenAllItemsLoaded = computed(() => {
  return pagination.value.rowsNumber >= pagination.value.rowsPerPage
})

const isSearching = computed(() => {
  return pagination.value.rowsNumber >= pagination.value.rowsPerPage
})

function clearSearch() {
  searchTerm.value = ""
  pagination.value.filterExpression = []
  reloadData()
}

const isSearchTermNotEmpty = computed(() => searchTerm.value !== "")

const maxPage = computed(() =>
  Math.ceil(pagination.value.rowsNumber / pagination.value.rowsPerPage)
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
      pageSize: data.rowsPerPage,
      sortColumn: data.sortBy,
      sortOrder: data.descending ? 1 : 2,
      currentPage: data.page,
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
  pagination.rowsNumber = response.data.page.totalItems
  pagination.rowsPerPage = response.data.page.pageSize
  pagination.page = response.data.page.currentPage
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

.business-name-desktop {
  width: 130px;
}

.q-btn:hover {
  background-color: rgb(241, 241, 241);
}

.card-header {
  padding-left: 32px;
  padding-right: 32px;
}

.business-name-btn {
  border: 1px solid rgb(218, 218, 218);
}

.expire-date {
  padding: 8px 24px 8px 24px;
}

.service-extension {
  padding: 9px;
}
</style>
