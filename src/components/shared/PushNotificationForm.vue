<template>
  <q-card class="push-notification-form">
    <q-card-section>
      <div class="text-h6 q-mb-md">Send Push Notification</div>

      <q-form ref="form" @submit="sendNotification">
        <div class="row q-col-gutter-md">
          <div class="col-12">
            <q-input
              v-model="notificationData.title"
              label="Notification Title"
              outlined
              dense
              :rules="[(val) => !!val || 'Title is required']"
              required
            />
          </div>

          <div class="col-12">
            <q-input
              v-model="notificationData.message"
              label="Notification Message"
              type="textarea"
              outlined
              dense
              :rules="[(val) => !!val || 'Message is required']"
              required
              rows="3"
            />
          </div>
        </div>

        <div class="row q-mt-md">
          <div class="col-12">
            <q-btn
              type="submit"
              color="primary"
              label="Send Notification"
              :loading="loading"
              :disable="loading"
              class="full-width"
            />
          </div>
        </div>

        <div class="row q-mt-md">
          <div class="col-12">
            <q-btn
              color="secondary"
              label="Test Simple Notification"
              @click="testSimpleNotification"
              class="full-width"
            />
          </div>
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script setup>
  import { ref, reactive } from "vue";
  import { useQuasar } from "quasar";

  const $q = useQuasar();
  const form = ref(null);
  const loading = ref(false);

  const notificationData = reactive({
    title: "",
    message: "",
  });

  async function sendNotification() {
    try {
      const isValid = await form.value.validate();
      if (!isValid) return;

      loading.value = true;

      // Check if notifications are supported
      if (!("Notification" in window)) {
        $q.notify({
          type: "negative",
          message:
            "Push notifications are not supported in this browser",
        });
        return;
      }

      // Check and request notification permission
      let permission = Notification.permission;

      if (permission === "default") {
        permission = await Notification.requestPermission();
      }

      if (permission !== "granted") {
        $q.notify({
          type: "negative",
          message:
            permission === "denied"
              ? "Notification permission was denied. Please enable it in your browser settings."
              : "Notification permission not granted",
        });
        return;
      }

      // Send the notification
      const notification = new Notification(notificationData.title, {
        body: notificationData.message,
        icon: "/icons/icon-128x128.png",
      });

      notification.onclick = () => {
        window.focus();
        alert("this is onclick test")
        notification.close();
      };

      notification.onshow = () => {
        console.log("Notification shown successfully");
      };

      notification.onerror = (error) => {
        console.error("Notification error:", error);
      };

      $q.notify({
        type: "positive",
        message: "Push notification sent successfully!",
      });

      // Reset form
      notificationData.title = "";
      notificationData.message = "";
      form.value.reset();
    } catch (error) {
      console.error("Error sending notification:", error);
      $q.notify({
        type: "negative",
        message: "Failed to send notification: " + error.message,
      });
    } finally {
      loading.value = false;
    }
  }

  // Test function for simple notification
  function testSimpleNotification() {
    if (Notification.permission === "granted") {
      const testNotification = new Notification("Test Notification", {
        body: "This is a test notification",
        icon: "/icons/icon-128x128.png",
      });

      testNotification.onshow = function () {
        console.log("Test notification shown");
      };

      testNotification.onerror = function (error) {
        console.error("Test notification error:", error);
      };
    } else {
      $q.notify({
        type: "negative",
        message: "Notification permission not granted",
      });
    }
  }
</script>

<style scoped>
  .push-notification-form {
    max-width: 500px;
    margin: 0 auto;
  }
</style>
