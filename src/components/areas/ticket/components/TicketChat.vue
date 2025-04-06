<template>
  <q-card v-if="ticket" flat bordered class="full-height">
    <q-card-section class="flex items-center justify-between">
      <div>
        <div class="text-h6">
          {{ ticket.title }}
        </div>
        <div class="text-subtitle2">
          {{ ticket.category }} -
          {{ getPriorityLabel(ticket.priority) }}
        </div>
      </div>
      <q-chip
        :color="getStatusColor(ticket.status)"
        text-color="white"
        size="md"
      >
        {{ getStatusLabel(ticket.status) }}
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
          <div class="row q-mb-md">
            <div class="col-12">
              <q-chat-message
                :name="authStore.user?.fullName"
                :text="[ticket.description]"
                sent
              >
                <template #avatar>
                  <customer-avatar
                    size="48px"
                    text-color="white"
                    :item="authStore.user?.id"
                    :text-holder="authStore.user?.fullName"
                    text-holder-class="text-h5 text-bold "
                    :avatar="avatar"
                    class="q-ml-sm"
                  />
                </template>
              </q-chat-message>
            </div>
          </div>

          <div v-if="ticket.response" class="row q-mb-md">
            <div class="col-12">
              <q-chat-message
                name="پشتیبانی"
                avatar="/favicon.png"
                :text="[ticket.response]"
              />
            </div>
          </div>

          <div
            v-for="(message, index) in messages"
            :key="index"
            class="row q-mb-md"
          >
            <div class="col-12">
              <q-chat-message
                :name="message.sender"
                :avatar="message.avatar"
                :text="[message.text]"
                :sent="message.sent"
              >
                <template #avatar v-if="message.sent">
                  <customer-avatar
                    size="48px"
                    text-color="white"
                    :item="authStore.user?.id"
                    :text-holder="authStore.user?.fullName"
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
      <q-input
        v-model="newMessage"
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
            round
            dense
            flat
            icon="send"
            color="primary"
            @click="sendMessage"
          />
        </template>
      </q-input>
    </q-card-section>
  </q-card>
  <div v-else class="text-center text-grey q-pa-md">
    برای مشاهده جزئیات تیکت، لطفاً یک تیکت را از لیست انتخاب کنید
  </div>
</template>

<script setup>
  import { ref, watch, nextTick, computed } from "vue";
  import { helper } from "src/helpers";
  import { useAuthStore } from "src/stores";

  import CustomerAvatar from "src/components/shared/CustomerAvatar.vue";

  const props = defineProps({
    ticket: {
      type: Object,
      default: null,
    },
    messages: {
      type: Array,
      default: () => [],
    },
  });

  const authStore = useAuthStore();
  const emit = defineEmits(["send-message"]);

  const newMessage = ref("");
  const chatScroll = ref(null);
  const scrollAnchor = ref(null);

  const isChatDisabled = computed(
    () => props.ticket?.status === "closed"
  );

  const priorities = [
    { label: "کم", value: "low" },
    { label: "متوسط", value: "medium" },
    { label: "زیاد", value: "high" },
  ];

  const statusLabels = {
    open: "باز",
    "in-progress": "در حال بررسی",
    closed: "بسته",
  };

  const statusColors = {
    open: "orange",
    "in-progress": "blue",
    closed: "green",
  };

  function getPriorityLabel(value) {
    return priorities.find((p) => p.value === value)?.label || value;
  }

  function getStatusLabel(value) {
    return statusLabels[value] || value;
  }

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

  function sendMessage() {
    if (!newMessage.value.trim() || !props.ticket) return;

    emit("send-message", {
      text: newMessage.value,
      sender: authStore.user?.fullName,
      avatar: null,
      sent: true,
    });

    newMessage.value = "";
    scrollToBottom();
  }

  watch(
    () => props.ticket,
    () => {
      scrollToBottom();
    }
  );

  watch(
    () => props.messages,
    () => {
      scrollToBottom();
    },
    { deep: true }
  );
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
