<template>
  <q-btn round unelevated dense icon="o_notifications" class="text-on-dark">
    <q-badge v-if="notif" floating color="red" rounded>4</q-badge>
    <q-menu class="border-radius-lg z-max" transition-show="jump-down" transition-hide="jump-up" :offset="[100, 24]"
      max-width="350px" max-height="300px">
      <q-list dense padding class="user-profile">
        <q-item-label class="text-h6" header>
          <div class="column items-center justify-between q-mt-md">
            <div class="q-gutter-x-xl">
              <span class="text-on-dark">اعلانها</span>
              <q-btn @click="markAll" unelevated rounded class="text-on-dark text-caption">
                <q-icon name="o_done_all" size="xs" />
                <span class="q-ml-xs">همه خوانده‌شده</span>
              </q-btn>
            </div>
          </div>
        </q-item-label>
        <q-item clickable tabindex="0" class="q-py-sm">
          <div class="q-py-sm">
            <q-item-section avatar>
              <q-avatar class="bg-on-dark" size="md" icon="history">
                <q-badge v-if="notif" floating color="red" rounded>4</q-badge>
              </q-avatar>
            </q-item-section>
          </div>
          <q-item-section>
            <span class="text-caption">
              موعد پرداخت چک رسیده
            </span>
          </q-item-section>
          <q-icon-section class="row items-center">
            <q-btn icon="o_more_horiz" unelevated round size="xs" dense>
              <q-menu v-model="showing">
                <q-list dense padding>
                  <q-item clickable @click="showing = false">
                    <q-item-section>
                      <span class="text-caption">
                        تبدیل به خوانده‌نشده
                      </span>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </q-icon-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script setup>
import { ref } from "vue"

const notif = ref(true)
const showing = ref(false)

const markAll = () => {
  notif.value = false
}
</script>
