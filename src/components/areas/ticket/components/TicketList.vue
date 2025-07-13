<template>
  <div class="row q-col-gutter-md full-height">
    <div class="col-12 col-md-4">
      <q-scroll-area
        :bar-style="helper.barStyle"
        :thumb-style="helper.thumbStyle"
        style="height: calc(100vh - 200px)"
      >
        <q-btn
          icon="refresh"
          @click="tableStore.reloadData()"
        ></q-btn>
        <q-list bordered separator>
          <pre>{{ tickets }}</pre>
          <q-item
            v-for="item in tickets"
            :key="item.id"
            clickable
            v-ripple
            :active="tableStore.activeRow?.id === item.id"
            @click="selectTicket(item)"
          >
            <q-item-section>
              <q-item-label>
                {{ item.comment }}
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
        </q-list>
      </q-scroll-area>
    </div>

    <div class="col-12 col-md-8">
      <ticket-chat ref="chatContainer" />
    </div>
  </div>
</template>

<script setup>
  import { ref, computed } from "vue";
  import { helper } from "src/helpers";
  import { feedbackType, feedbackStatus } from "src/constants";
  import { useDataTable } from "src/composables/useDataTable";

  import TicketChat from "./TicketChat.vue";

  const tableStore = useDataTable({
    dataSource: "business/getFeedbackGridData",
  });

  const chatContainer = ref(null);
  const statusColors = {
    1: "orange",
    2: "blue",
    3: "red",
    4: "green",
  };

  function getStatusColor(value) {
    return statusColors[value] || "grey";
  }

  const selectTicket = (item) => {
    chatContainer.value.setSelectedTicket(item);
  };

  const tickets = computed(() => tableStore.rows.value);
</script>
