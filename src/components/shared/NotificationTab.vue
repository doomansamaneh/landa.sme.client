<template>
  <div class="notification-tab">
    <v-menu
      v-model="isOpen"
      :close-on-content-click="false"
      location="bottom end"
      transition="scale-transition"
      offset="10"
    >
      <template v-slot:activator="{ props }">
        <v-btn
          icon
          v-bind="props"
          class="notification-btn"
          :class="{ 'has-notifications': unreadCount > 0 }"
        >
          <v-badge
            :content="unreadCount"
            :model-value="unreadCount > 0"
            color="error"
          >
            <v-icon>mdi-bell</v-icon>
          </v-badge>
        </v-btn>
      </template>

      <v-card min-width="300" max-width="400">
        <v-card-title
          class="d-flex justify-space-between align-center pa-4"
        >
          <span>Notifications</span>
          <v-btn
            v-if="notifications.length > 0"
            variant="text"
            size="small"
            @click="markAllAsRead"
          >
            Mark all as read
          </v-btn>
        </v-card-title>

        <v-divider></v-divider>

        <v-list
          v-if="notifications.length > 0"
          class="notification-list"
        >
          <v-list-item
            v-for="notification in notifications"
            :key="notification.id"
            :class="{ unread: !notification.read }"
            @click="handleNotificationClick(notification)"
          >
            <template v-slot:prepend>
              <v-icon
                :color="
                  notification.type === 'error' ? 'error' : 'primary'
                "
              >
                {{ getNotificationIcon(notification.type) }}
              </v-icon>
            </template>

            <v-list-item-title>
              {{ notification.title }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ notification.message }}
            </v-list-item-subtitle>
            <template v-slot:append>
              <span class="text-caption text-grey">
                {{ formatTime(notification.timestamp) }}
              </span>
            </template>
          </v-list-item>
        </v-list>

        <v-card-text v-else class="text-center py-4">
          No notifications
        </v-card-text>
      </v-card>
    </v-menu>
  </div>
</template>

<script setup>
  import { ref, computed } from "vue";

  const isOpen = ref(false);
  const notifications = ref([
    {
      id: 1,
      title: "New Message",
      message: "You have received a new message",
      type: "info",
      timestamp: new Date(),
      read: false,
    },
    {
      id: 2,
      title: "System Update",
      message: "System maintenance completed successfully",
      type: "success",
      timestamp: new Date(Date.now() - 3600000),
      read: true,
    },
  ]);

  const unreadCount = computed(() => {
    return notifications.value.filter((n) => !n.read).length;
  });

  const getNotificationIcon = (type) => {
    const icons = {
      info: "mdi-information",
      success: "mdi-check-circle",
      warning: "mdi-alert",
      error: "mdi-alert-circle",
    };
    return icons[type] || icons.info;
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return "Just now";
  };

  const handleNotificationClick = (notification) => {
    notification.read = true;
    // Add your notification click handling logic here
  };

  const markAllAsRead = () => {
    notifications.value.forEach((notification) => {
      notification.read = true;
    });
  };
</script>

<style scoped>
  .notification-tab {
    position: relative;
  }

  .notification-btn {
    margin-right: 8px;
  }

  .notification-list {
    max-height: 400px;
    overflow-y: auto;
  }

  .unread {
    background-color: var(--v-surface-variant);
  }

  .v-list-item {
    cursor: pointer;
  }

  .v-list-item:hover {
    background-color: var(--v-surface-variant);
  }
</style>
