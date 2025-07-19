<template>
  <div class="row q-col-gutter-md">
    <div class="col-12 col-md-3">
      <q-card :class="$q.screen.lt.md ? 'no-shadow' : 'bordered'">
        <q-card-section
          :class="$q.screen.lt.md ? 'no-padding' : 'q-pr-none'"
        >
          <div
            class="row items-center justify-between"
            v-if="$q.screen.gt.sm"
          >
            <widget-title label="تیکتهای من" icon="o_message" />

            <q-btn
              no-caps
              round
              size="10px"
              unelevated
              @click="loadableDataGrid.loadData()"
              class="q-mr-md"
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
              data-source="business/getFeedbackGridData"
              :scrollBarStyle="
                $q.screen.xs
                  ? 'height: calc(100vh - 150px);'
                  : 'height: calc(100vh - 215px);'
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
                  @keydown.enter="loadableDataGrid.loadData()"
                  class="text-body2"
                  style="margin: auto -8px"
                >
                  <template #prepend>
                    <q-icon name="o_search" color="primary" />
                  </template>
                </q-input>
              </template>

              <template #item="{ item }">
                <q-item
                  clickable
                  v-ripple
                  @click="selectTicket(item)"
                  :class="[
                    'no-decoration q-pl-xs q-pb-md q-pr-xs border-radius-sm text-on-dark',
                    selectedTicket === item.id
                      ? 'row-active active-shine'
                      : '',
                    $q.screen.gt.sm ? 'q-mr-md' : '',
                  ]"
                >
                  <q-item-section>
                    <q-item-label>
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
                      <div v-html="item.comment"></div>
                    </q-item-label>
                    <q-item-label caption>
                      {{ item.dateString }}
                    </q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-chip
                      :color="getStatusColor(item.statusId)"
                      text-color="white"
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
  import { ref, computed, onMounted } from "vue";
  import { useQuasar } from "quasar";
  import { helper } from "src/helpers";
  import { feedbackType, feedbackStatus } from "src/constants";
  import { useDataTable } from "src/composables/useDataTable";
  import { nextTick } from "vue";

  import TicketChat from "./TicketChat.vue";
  import LoadableDataGrid from "src/components/shared/dataTables/LoadableDataGrid.vue";
  import WidgetTitle from "src/components/areas/dashboard/widgets/WidgetTitle.vue";

  const tableStore = useDataTable({
    dataSource: "business/getFeedbackGridData",
  });

  const $q = useQuasar();
  const chatContainerDesktop = ref(null);
  const chatContainerMobile = ref(null);
  const showChat = ref(false);
  const selectedTicket = ref(null);

  const selectTicket = async (item) => {
    selectedTicket.value = item.id; // or any unique identifier

    if ($q.screen.gt.md) {
      chatContainerDesktop.value?.setSelectedTicket(item);
    } else {
      showChat.value = true;
      await nextTick();
      chatContainerMobile.value?.setSelectedTicket(item);
    }
  };

  const loadableDataGrid = ref(null);

  const statusColors = {
    1: "orange",
    2: "blue",
    3: "red",
    4: "green",
  };

  function getStatusColor(value) {
    return statusColors[value] || "grey";
  }

  // const tickets = computed(() => tableStore.rows.value);

  onMounted(() => {
    tableStore.loadData();
  });
</script>
