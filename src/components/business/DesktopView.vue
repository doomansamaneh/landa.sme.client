<template>
  <div class="row">
    <div class="q-pa-md q-mt-md q-mb-xl row items-start q-gutter-md">
      <q-card class="select-business-card q-card-desktop" bordered>
        <q-item class="q-px-lg q-py-lg">
          <q-item-section>
            <q-item-label
              class="text-weight-bold text-grey-10"
              style="font-size: 18px"
              >{{ $t("business-page.card-title") }}</q-item-label
            >
            <q-item-label
              class="text-body text-grey-7"
              caption
              style="font-size: 13px"
            >
              {{ $t("business-page.card-message") }}
            </q-item-label>
          </q-item-section>
          <div class="flex items-center q-gutter-md">
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
        <q-card-section class="q-pa-lg q-gutter-md">
          <div class="Search-bar" v-if="pagination.rowsPerPage >= 5">
            <q-input
              outlined
              dense
              v-model="searchTerm"
              :placeholder="$t('business-page.card-searchbar')"
              @keydown.enter="reloadData"
              clearable
              v-if="shouldShowPaginationAndSearchBar"
            >
              <template v-slot:prepend>
                <q-icon
                  name="search"
                  size="sm"
                  color="grey-5"
                  @click="reloadData"
                />
              </template>
            </q-input>
          </div>
          <q-card
            class="selectable my-inner-card row justify-around items-center no-shadow q-pl-sm"
            bordered
            v-for="(item, index) in pagedRows"
            :key="index"
          >
            <div class="icon flex items-center q-gutter-md col-6">
              <q-avatar
                color="blue-7"
                text-color="white"
                icon="o_person"
                size="lg"
                v-if="item.isOwner"
              />
              <q-avatar
                color="grey-4"
                text-color="dark"
                icon="o_person"
                size="lg"
                v-else
              />

              <q-btn
                class="business-name-btn"
                flat
                no-caps
                text-color="dark"
                :ripple="{ color: 'grey-5' }"
              >
                <div
                  class="text-weight-bold business-name-desktop ellipsis-2-lines"
                  style="font-size: 12px"
                  @click="gotoBusiness"
                >
                  <span>{{ item.name }}</span>
                </div>
                <q-icon right size="xs" name="o_login" />
              </q-btn>
            </div>

            <div class="flex items-center q-gutter-xs col-4 q-pl-md">
              <div class="">
                <q-chip
                  class="chips expire-date flex items-center"
                  square
                  icon="o_history"
                  :ripple="false"
                  style="font-size: 12px; background-color: #ffe1b4"
                  ><span>{{ item.dateCreatedString }}</span></q-chip
                >
              </div>
              <div class="" v-if="item.isOwner">
                <q-btn
                  class="service-extension"
                  unelevated
                  color="orange"
                  icon="o_shopping_bag"
                  size="sm"
                />
              </div>
              <div class="" v-else>
                <q-btn
                  class="service-extension"
                  unelevated
                  color="grey"
                  icon="o_shopping_bag"
                  size="sm"
                />
              </div>
            </div>
            <div class="more-options col-1 q-pl-xs">
              <q-btn
                class="more-icon"
                style="color: grey"
                unelevated
                falt
                round
                :ripple="false"
                icon="more_vert"
                size="md"
              />
              <q-menu>
                <q-list style="min-width: 100px">
                  <q-item clickable v-close-popup>
                    <q-item-section>
                      <div class="flex items-center q-gutter-sm">
                        <q-avatar
                          color="grey-4"
                          text-color="dark"
                          icon="login"
                          size="sm"
                        />
                        <div class="text-body" style="font-size: 12px">
                          {{
                            $t(
                              "business-page.buttons.more-button.enter-business"
                            )
                          }}
                        </div>
                      </div>
                    </q-item-section>
                  </q-item>
                  <div class="isNotOwner" v-if="item.isOwner">
                    <q-item clickable v-close-popup>
                      <q-item-section>
                        <div class="flex items-center q-gutter-sm">
                          <q-avatar
                            color="grey-4"
                            text-color="dark"
                            icon="o_person_add"
                            size="sm"
                          />
                          <div class="text-body" style="font-size: 12px">
                            {{
                              $t(
                                "business-page.buttons.more-button.invite-user"
                              )
                            }}
                          </div>
                        </div>
                      </q-item-section>
                    </q-item>
                    <q-separator />
                    <q-item clickable v-close-popup>
                      <q-item-section>
                        <div class="flex items-center q-gutter-sm">
                          <q-avatar
                            color="grey-4"
                            text-color="dark"
                            icon="o_delete"
                            size="sm"
                          />
                          <div class="text-body" style="font-size: 12px">
                            {{ $t("business-page.buttons.more-button.delete") }}
                          </div>
                        </div>
                      </q-item-section>
                    </q-item>
                    <q-separator />
                    <q-item clickable v-close-popup>
                      <q-item-section>
                        <div class="flex items-center q-gutter-sm">
                          <q-avatar
                            color="grey-4"
                            text-color="dark"
                            icon="credit_card"
                            size="sm"
                          />
                          <div class="text-body" style="font-size: 12px">
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
          <div
            class="row q-pt-md justify-between items-center"
            v-if="shouldShowPaginationAndSearchBar"
          >
            <div class="col-8">
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
                class="q-gutter-xs"
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
                dense
                v-model="pagination.rowsPerPage"
                :options="[5, 10, 20]"
                @update:model-value="reloadData"
                transition-show="flip-up"
                transition-hide="flip-down"
                class="q-px-md"
              />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
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
  return pagination.value.rowsPerPage <= 11
})

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

<style>
.q-card-desktop {
  width: 620px;
}

.select-business-card {
  border-radius: 10px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.2);
}

.my-inner-card {
  width: auto;
  height: 90px;
  border-radius: 5px;
}

.business-name-btn {
  border-radius: 5px;
  padding: 8px 12px;
  border: 1px solid rgb(230, 230, 230);
}

.chips {
  padding: 21px 15px;
}

.service-extension {
  padding: 12px 12px;
  border-radius: 5px;
}

.q-btn .q-focus-helper {
  display: none;
}

.selectable {
  cursor: pointer;
}

.card-selection {
  border: 1.5px solid #2196f3;
}

.more-icon {
  margin-left: 2px;
}

.business-name-desktop {
  width: 130px;
}

.q-btn:hover {
  background-color: rgb(241, 241, 241);
}
</style>
