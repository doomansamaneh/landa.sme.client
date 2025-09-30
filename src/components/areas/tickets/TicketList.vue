<template>
  <div class="row q-col-gutter-md chat-list">
    <div class="col-12 col-md-4">
      <q-card :class="$q.screen.lt.md ? 'no-shadow' : 'bordered'">
        <q-card-section
          :class="$q.screen.lt.md ? 'no-padding' : 'q-pr-none'"
        >
          <div
            class="row items-center justify-between"
            v-if="$q.screen.gt.sm"
          >
            <widget-title
              :label="$t('shared.labels.myTickets')"
              icon="o_message"
            />

            <q-btn
              no-caps
              round
              size="10px"
              unelevated
              class="q-mr-md"
              @click="loadableDataGrid?.loadData()"
            >
              <q-icon name="refresh" size="24px" />
            </q-btn>
          </div>

          <q-card-section
            :class="$q.screen.lt.md ? 'no-padding' : 'q-px-none'"
            style="min-height: 300px"
          >
            <loadable-data-grid
              ref="loadableDataGrid"
              first-load
              :scrollArea="false"
              :show-search="false"
              sort-column="dateCreated"
              :sort-column-order="sortOrder.descending"
              data-source="business/getFeedbackGridData"
              :scrollBarStyle="
                $q.screen.xs
                  ? 'height: calc(100vh - 150px);'
                  : 'height: calc(100vh - 265px);'
              "
            >
              <template #search>
                <q-input
                  ref="searchInput"
                  inputmode="search"
                  color="grey-5"
                  outlined
                  v-model="tableStore.pagination.value.searchTerm"
                  :placeholder="$t('shared.labels.search')"
                  dense
                  clearable
                  clear-icon="o_clear"
                  rounded
                  class="text-body2"
                  style="margin: auto -8px"
                >
                  <!-- @keydown.enter="loadableDataGrid.loadData()" -->
                  <template #prepend>
                    <q-icon name="o_search" color="primary" />
                  </template>
                </q-input>
              </template>

              <template #item="{ item }">
                <q-item
                  clickable
                  v-ripple
                  :active="selectedTicket === item.id"
                  active-class="active-shine"
                  @click="handleSelectTicket(item)"
                  class="no-decoration q-pl-xs q-pb-md q-pr-xs border-radius-sm text-on-dark"
                  :class="$q.screen.gt.sm ? 'q-mr-md' : ''"
                >
                  <q-item-section>
                    <q-item-label
                      class="text-body3 text-bold text-grey"
                    >
                      {{
                        $t(
                          `shared.feedbackStatus.${helper.getEnumType(
                            item.typeId,
                            feedbackType
                          )}`
                        )
                      }}
                    </q-item-label>
                    <q-item-label>
                      <div
                        class="ellipsis text-body2"
                        v-html="item.comment"
                      ></div>
                    </q-item-label>
                    <q-item-label caption>
                      {{ item.dateString }}
                    </q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-chip
                      :color="getStatusColor(item.statusId)"
                      :text-color="
                        item?.statusId === 1 ? 'dark' : 'white'
                      "
                      size="sm"
                    >
                      {{
                        $t(
                          `shared.feedbackStatus.${helper.getEnumType(
                            item.statusId,
                            feedbackStatus
                          )}`
                        )
                      }}
                    </q-chip>
                  </q-item-section>

                  <q-item-section side top>
                    <q-badge
                      v-if="item.unreadCount > 0"
                      floating
                      class="q-mt-sm q-mx-sm"
                      color="red"
                      text-color="white"
                      :label="item.unreadCount"
                    />
                  </q-item-section>
                </q-item>
                <q-separator
                  spaced
                  :class="$q.screen.gt.sm ? 'q-mr-md' : ''"
                />
              </template>
            </loadable-data-grid>
          </q-card-section>
        </q-card-section>
      </q-card>
    </div>

    <div v-if="$q.screen.gt.md" class="col-12 col-md">
      <ticket-chat ref="chatContainerDesktop" />
    </div>

    <q-dialog
      v-model="showChat"
      maximized
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card flat class="hide-scrollbar no-scroll">
        <q-card-section class="no-padding">
          <ticket-chat ref="chatContainerMobile" />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
  import { onMounted, onUnmounted } from "vue";
  import { useQuasar } from "quasar";
  import { helper } from "src/helpers";
  import {
    feedbackType,
    feedbackStatus,
    sortOrder,
  } from "src/constants";
  import { nextTick } from "vue";
  import { useTickets } from "src/composables/useTickets";

  import TicketChat from "./TicketChat.vue";
  import LoadableDataGrid from "src/components/shared/dataTables/LoadableDataGrid.vue";
  import WidgetTitle from "src/components/areas/dashboard/widgets/WidgetTitle.vue";

  const $q = useQuasar();
  const {
    loadableDataGrid,
    selectedTicket,
    showChat,
    chatContainerDesktop,
    chatContainerMobile,
    selectTicket,
    getStatusColor,
    initializeTicketList,
    cleanupTicketList,
  } = useTickets();

  const handleSelectTicket = async (item) => {
    selectTicket(item);

    if ($q.screen.gt.md) {
      chatContainerDesktop.value?.setSelectedTicket(item);
    } else {
      showChat.value = true;
      await nextTick();
      chatContainerMobile.value?.setSelectedTicket(item);
    }
  };

  onMounted(() => {
    initializeTicketList();
  });

  onUnmounted(() => {
    cleanupTicketList();
  });
</script>
