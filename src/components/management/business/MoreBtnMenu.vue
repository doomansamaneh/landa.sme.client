<template>
  <q-menu class="border-radius-lg" transition-show="jump-down" transition-hide="jump-up">
    <q-list padding>
      <q-item clickable v-close-popup>
        <q-item-section>
          <div class="flex items-center q-gutter-x-sm">
            <q-avatar icon="login" size="sm" class="dark-1" />
            <div class="text-caption">
              {{ $t("page.buttons.more-button.enter-business") }}
            </div>
          </div>
        </q-item-section>
      </q-item>
      <div class="isNotOwner" v-if="item.isOwner">
        <q-item clickable v-close-popup>
          <q-item-section>
            <div class="flex items-center q-gutter-x-sm">
              <q-avatar icon="o_person_add" size="sm" class="dark-1" />
              <div class="text-caption">
                {{ $t("page.buttons.more-button.invite-user") }}
              </div>
            </div>
          </q-item-section>
        </q-item>
        <q-separator spaced />
        <q-item clickable v-close-popup>
          <q-item-section>
            <div class="flex items-center q-gutter-x-sm">
              <q-avatar icon="o_delete" size="sm" class="dark-1" />
              <div class="text-caption">
                {{ $t("page.buttons.more-button.delete") }}
              </div>
            </div>
          </q-item-section>
        </q-item>
        <q-separator spaced />
        <q-item clickable v-close-popup>
          <q-item-section>
            <div class="flex items-center q-gutter-x-sm" @click="goToPaymentHistory">
              <q-avatar icon="credit_card" size="sm" class="dark-1" />
              <div class="text-caption">
                {{ $t("page.buttons.more-button.payment-history") }}
              </div>
            </div>
          </q-item-section>
        </q-item>
      </div>
    </q-list>
  </q-menu>
</template>

<script setup></script>
