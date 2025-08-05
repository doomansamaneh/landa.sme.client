<template>
  <q-card
    :square="$q.screen.lt.md"
    :flat="$q.screen.lt.md"
    v-if="ticket"
    :bordered="$q.screen.gt.md"
  >
    <q-card-section
      class="bg-dark"
      :class="
        $q.screen.lt.md
          ? 'q-pa-sm flex items-center justify-between'
          : 'q-py-sm flex items-center justify-between'
      "
    >
      <div class="row items-center justify-between full-width">
        <div class="col">
          <div :class="$q.screen.lt.md ? 'text-body2' : 'text-body1'">
            <div
              :style="$q.screen.lt.md ? '' : 'width: 40%'"
              class="ellipsis"
              v-html="ticket.comment"
            ></div>
          </div>
          <div class="text-subtitle2_">
            {{ ticket.dateString }}
          </div>
        </div>

        <div class="row items-center q-ml-md">
          <q-chip
            :color="getStatusColor(ticket.statusId)"
            text-color="white"
            size="md"
          >
            {{
              $t(
                `shared.feedbackStatus.${helper.getEnumType(
                  ticket?.statusId,
                  feedbackStatus
                )}`
              )
            }}
          </q-chip>

          <q-btn
            unelevated
            round
            dense
            icon="refresh"
            @click="tableStore.reloadData()"
            class="q-ml-sm"
          />
          <q-btn
            v-if="$q.screen.lt.md"
            unelevated
            round
            dense
            icon="close"
            v-close-popup
            class="q-ml-sm"
          />
        </div>
      </div>
    </q-card-section>

    <q-card-section
      class="chat-container q-pa-none"
      :style="
        $q.screen.lt.md
          ? 'height: calc(100vh - 126px);'
          : 'height: calc(100vh - 300px);'
      "
      :class="{ 'chat-disabled': isChatDisabled }"
    >
      <q-scroll-area
        ref="chatScroll"
        :bar-style="$q.screen.xs ? { opacity: 0 } : helper.barStyle"
        :thumb-style="
          $q.screen.xs ? { opacity: 0 } : helper.thumbStyle
        "
        style="height: calc(100vh)"
        @scroll="handleScroll"
      >
        <div class="chat-messages q-pt-md q-px-md">
          <div v-for="group in groupedMessages" :key="group.date">
            <div class="flex item-center justify-center q-mb-sm">
              <q-badge
                :class="{
                  'glass-badge-dark': $q.dark.isActive,
                  'glass-badge-light': !$q.dark.isActive,
                }"
                rounded
                class="text-body3 q-py-xs q-px-sm"
              >
                {{ group.date }}
              </q-badge>
            </div>
            <div
              v-for="(message, index) in group.msgs"
              :key="index"
              class="row_ q-mb-md"
            >
              <div class="col-12_">
                <q-chat-message
                  :name="message.senderName"
                  :avatar="message.senderId"
                  :sent="message.senderTypeId == 2"
                  :bg-color="
                    message.senderTypeId == 1 ? 'primary' : 'white'
                  "
                  :text-color="
                    message.senderTypeId == 1 ? 'white' : 'black'
                  "
                  :stamp="null"
                >
                  <template #default>
                    <div v-html="message.comment"></div>
                  </template>
                  <template #avatar>
                    <customer-avatar
                      size="48px"
                      text-color="white"
                      :item="message.senderId"
                      :text-holder="message.senderName"
                      text-holder-class="text-h6 text-bold"
                      :avatar="avatar"
                      class="q-px-sm"
                    />
                  </template>
                  <template #stamp>
                    <span>
                      <q-icon
                        v-if="message.senderTypeId == 1"
                        :name="message.isRead ? 'done_all' : 'done'"
                        size="18px"
                        class="q-ml-xs"
                      />

                      {{
                        new Date(
                          message.dateString
                        ).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false,
                        })
                      }}
                    </span>
                  </template>
                </q-chat-message>
              </div>
            </div>
          </div>
          <div ref="scrollAnchor" class="scroll-anchor"></div>

          <div v-if="isLoadingMore" class="text-center q-pa-sm">
            <q-spinner size="30px" color="primary" />
          </div>
        </div>
      </q-scroll-area>
    </q-card-section>

    <q-card-section
      class="q-pa-none bg-dark"
      :class="{
        'chat-disabled': isChatDisabled,
      }"
    >
      <q-form ref="form" @submit.prevent="sendMessage">
        <div>
          <q-input
            dense
            autogrow
            v-model="model.comment"
            outlined
            :disable="isChatDisabled"
            :placeholder="
              isChatDisabled
                ? $t('shared.labels.ticketClosed')
                : $t('shared.labels.writeYourMessage')
            "
            class="q-pa-md"
            @keyup.enter="sendMessage"
          >
            <template v-slot:before>
              <q-btn
                no-caps
                round
                dense
                flat
                icon="send"
                color="primary"
                @click="sendMessage"
              />
            </template>
          </q-input>
        </div>
      </q-form>
    </q-card-section>
  </q-card>

  <q-card
    v-else
    class="text-center q-pa-lg"
    :class="$q.screen.lt.md ? 'no-shadow' : 'bordered'"
  >
    <q-card-section>
      <q-icon
        name="support_agent"
        size="64px"
        :color="$q.dark.isActive ? 'grey-3' : 'grey-7'"
        class="q-mb-md"
      />
      <div
        class="text-h6 q-mb-sm"
        :class="$q.dark.isActive ? 'text-white' : ''"
      >
        {{ $t("shared.labels.selectTicketToViewDetails") }}
      </div>
      <div :class="$q.dark.isActive ? 'text-grey-5' : 'text-grey-7'">
        {{ $t("shared.labels.selectTicketToViewHistory") }}
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
  import { ref, computed, nextTick } from "vue";
  import { helper } from "src/helpers";
  import { feedbackStatus } from "src/constants";
  import { useFormActions } from "src/composables/useFormActions";
  import { useDataTable } from "src/composables/useDataTable";

  import CustomerAvatar from "src/components/shared/CustomerAvatar.vue";
  import { sortOrder } from "../../../constants/enums";

  const ticket = ref(null);
  const chatScroll = ref(null);
  const scrollAnchor = ref(null);

  const form = ref(null);
  const model = ref({ comment: "", senderName: "user" });
  const formStore = useFormActions("business", model);

  const messages = computed(() => tableStore.rows?.value || []);

  const groupedMessages = computed(() => {
    if (!messages.value) return [];
    const groups = [];
    let lastDate = null;
    messages.value.forEach((msg) => {
      const dateObj = new Date(msg.dateString);
      // Format as yyyy-mm-dd for grouping
      const dateKey =
        dateObj.getFullYear() +
        "-" +
        (dateObj.getMonth() + 1).toString().padStart(2, "0") +
        "-" +
        dateObj.getDate().toString().padStart(2, "0");
      if (!lastDate || lastDate !== dateKey) {
        groups.push({ date: dateKey, msgs: [msg] });
        lastDate = dateKey;
      } else {
        groups[groups.length - 1].msgs.push(msg);
      }
    });
    return groups;
  });

  const isChatDisabled = computed(
    () =>
      ticket?.value?.statusId === feedbackStatus.done ||
      ticket?.value?.statusId === feedbackStatus.unDone
  );

  const statusColors = {
    1: "orange",
    2: "blue",
    3: "red",
    4: "green",
  };

  function getStatusColor(value) {
    return statusColors[value] || "grey";
  }

  function scrollToBottom() {
    nextTick(() => {
      if (scrollAnchor.value) {
        scrollAnchor.value.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }
    });
  }

  async function sendMessage() {
    if (!model.value.comment?.trim() || !ticket?.value) return;

    model.value.feedbackId = ticket.value.id;
    const responseData = await formStore.submitForm(
      form.value,
      "AddFeedbackMessage"
    );

    if (responseData) {
      model.value.comment = "";
      scrollToBottom();
    }
  }

  const baseDataSource = "business/getFeedbackMessageGridData";
  const configStore = {
    pagination: ref({
      currentPage: 1,
      pageSize: 10,
      sortOrder: sortOrder.ascending,
      sortColumn: "dateCreated",
    }),
  };
  const tableStore = useDataTable({
    dataSource: baseDataSource,
    store: configStore,
  });

  function setSelectedTicket(item) {
    if (item) {
      ticket.value = item;
      tableStore.setDataSource(`${baseDataSource}/${item.id}`);
      tableStore.pagination.value.currentPage = 1;
      tableStore.reloadData();
    } else ticket.value = null;
  }

  const isLoadingMore = ref(false);

  const hasMoreMessages = computed(() => {
    return (
      tableStore.pagination.value.currentPage <
      tableStore.pagination.value.totalPages
    );
  });

  async function loadMoreMessages() {
    if (isLoadingMore.value || !hasMoreMessages.value) return;

    isLoadingMore.value = true;

    // Save current messages
    const previousMessages = tableStore.rows.value || [];

    // Increment page and reload data
    tableStore.pagination.value.currentPage += 1;
    await tableStore.reloadData();

    // Append new messages to existing ones
    tableStore.rows.value = [
      ...previousMessages,
      ...tableStore.rows.value,
    ];

    isLoadingMore.value = false;
  }

  function handleScroll({
    verticalPosition,
    verticalSize,
    verticalContainerSize,
  }) {
    const atBottom =
      verticalPosition + verticalContainerSize >= verticalSize - 1;

    if (atBottom) {
      loadMoreMessages();
    }
  }

  defineExpose({ setSelectedTicket });
</script>

<style lang="scss" scoped>
  .chat-container {
    display: flex;
    flex-direction: column;
  }

  .chat-disabled {
    opacity: 0.7;
    pointer-events: none;
    position: relative;
  }

  .chat-scroll-area {
    flex: 1;
    min-height: 0;
  }

  .chat-messages {
    display: flex;
    flex-direction: column;
    min-height: 100%;
  }

  .scroll-anchor {
    height: 1px;
    width: 100%;
  }

  .glass-badge-light {
    background: rgba(255, 255, 255, 0.45);
    color: #222;
    border: 1px solid rgba(0, 0, 0, 0.12);
  }

  .glass-badge-dark {
    background: rgba(40, 40, 40, 0.35);
    color: #fff;
    border: 1px solid rgba(255, 255, 255, 0.12);
  }
</style>
