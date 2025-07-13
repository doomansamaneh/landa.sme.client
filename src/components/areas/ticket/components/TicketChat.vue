<template>
  <q-card v-if="ticket" flat bordered class="full-height">
    <q-card-section class="flex items-center justify-between">
      <div>
        <div class="text-h6">
          {{ ticket.comment }}
        </div>
        <div class="text-subtitle2_">
          {{ ticket.dateString }}
        </div>
      </div>

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
    </q-card-section>

    <q-card-section
      class="chat-container q-pa-none"
      :class="{ 'chat-disabled': isChatDisabled }"
    >
      <q-scroll-area
        ref="chatScroll"
        :bar-style="helper.barStyle"
        :thumb-style="helper.thumbStyle"
        style="height: calc(100vh - 360px)"
      >
        <div class="chat-messages q-pa-md">
          <div
            v-for="(message, index) in messages"
            :key="index"
            class="row_ q-mb-md"
          >
            <div class="col-12_">
              <q-chat-message
                :name="message.senderName"
                :avatar="message.senderId"
                :text="[message.comment]"
                :sent="message.senderTypeId == 2"
              >
                <template #avatar>
                  <customer-avatar
                    size="48px"
                    text-color="white"
                    :item="message.senderId"
                    :text-holder="message.senderName"
                    text-holder-class="text-h5 text-bold"
                    :avatar="avatar"
                    class="q-ml-sm"
                  />
                </template>
              </q-chat-message>
            </div>
          </div>

          <div ref="scrollAnchor" class="scroll-anchor"></div>
        </div>
      </q-scroll-area>
    </q-card-section>

    <q-card-section
      class="q-pa-none"
      :class="{ 'chat-disabled': isChatDisabled }"
    >
      <q-form ref="form" @submit.prevent="sendMessage">
        <q-input
          v-model="model.comment"
          dense
          outlined
          :disable="isChatDisabled"
          :placeholder="
            isChatDisabled
              ? 'این تیکت بسته شده است'
              : 'پیام خود را بنویسید...'
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
      </q-form>
      <q-btn icon="refresh" @click="tableStore.reloadData()"></q-btn>
    </q-card-section>
  </q-card>

  <div v-else class="text-center q-pa-lg">
    <q-icon
      name="support_agent"
      size="64px"
      :color="$q.dark.isActive ? 'grey-3' : 'grey-7'"
      class="q-mb-md"
    />
    <div
      class="text-h6 q-mb-sm"
      :class="$q.dark.isActive ? 'text-grey-5' : 'text-grey-7'"
    >
      برای مشاهده جزئیات تیکت، لطفاً یک تیکت را از لیست انتخاب کنید
    </div>
    <div :class="$q.dark.isActive ? 'text-grey-6' : 'text-grey-7'">
      با انتخاب یک تیکت از لیست، می‌توانید جزئیات و تاریخچه مکالمات آن
      را مشاهده کنید
    </div>
  </div>
</template>

<script setup>
  import { ref, watch, nextTick, computed } from "vue";
  import { helper } from "src/helpers";
  import { feedbackStatus } from "src/constants";
  import { useFormActions } from "src/composables/useFormActions";
  import { useDataTable } from "src/composables/useDataTable";

  import CustomerAvatar from "src/components/shared/CustomerAvatar.vue";
  import { sortOrder } from "../../../../constants/enums";

  const ticket = ref(null);
  const chatScroll = ref(null);
  const scrollAnchor = ref(null);

  const form = ref(null);
  const model = ref({ comment: "", senderName: "user" });
  const formStore = useFormActions("business", model);

  const messages = computed(() => tableStore.rows?.value);

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

  // watch(
  //   () => ticket,
  //   () => {
  //     scrollToBottom();
  //   }
  // );

  // watch(
  //   () => messages,
  //   () => {
  //     scrollToBottom();
  //   },
  //   { deep: true }
  // );

  function setSelectedTicket(item) {
    if (item) {
      ticket.value = item;
      tableStore.setDataSource(`${baseDataSource}/${item.id}`);
      tableStore.reloadData();
    } else ticket.value = null;
  }

  defineExpose({ setSelectedTicket });
</script>

<style scoped>
  .chat-container {
    display: flex;
    flex-direction: column;
    height: calc(100vh - 360px);
  }

  .chat-disabled {
    opacity: 0.7;
    pointer-events: none;
    position: relative;
  }

  .chat-disabled::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.5);
    z-index: 1;
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
</style>
