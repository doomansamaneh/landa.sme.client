<template>
  <data-view
    dataSource="business/getBusinessGridData"
    orderByField="title"
    searchField="b.title"
  >
    <template #header>
      <DesktopViewGuide v-model="showGuideDialog" />
      <q-item class="card-header q-px-lg q-py-lg">
        <q-item-section>
          <q-item-label class="text-weight-bold text-body1">{{
            $t("page.card-title")
          }}</q-item-label>
          <q-item-label class="q-pt-xs text-body2" caption>
            {{ $t("page.card-message") }}
          </q-item-label>
        </q-item-section>
        <div class="flex items-center q-gutter-x-md">
          <q-icon
            class="dark-3 cursor-pointer"
            size="md"
            name="o_help_outline"
            @click="showGuideDialog = true"
          >
            <q-tooltip>{{ $t("page.buttons.guide-tooltip") }}</q-tooltip>
          </q-icon>
          <q-btn unelevated round icon="add" class="add-new-business">
            <q-tooltip anchor="top left" self="top right">
              {{ $t("page.buttons.add-new-business-tooltip") }}
            </q-tooltip>
          </q-btn>
        </div>
      </q-item>
    </template>

    <template #item="{ item }">
      <div class="col-6 q-gutter-x-sm">
        <q-avatar
          class="business-isowner"
          icon="o_person"
          size="lg"
          v-if="item.isOwner"
        />
        <q-avatar
          class="business-isnotowner"
          icon="o_person"
          size="lg"
          v-else
        />
        <q-btn
          class="business-name-btn text-caption text-weight-bold"
          no-caps
          flat
          text-color="dark"
          :ripple="false"
          @click="gotoBusiness"
        >
          <div class="flex no-wrap q-gutter-sm">
            <div class="business-name-icon">
              <q-icon name="o_login" />
            </div>
            <div class="business-name flex">
              <span class="ellipsis">{{ item.title }}</span>
            </div>
          </div>
          <q-tooltip>
            {{ $t("page.buttons.more-button.enter-business") }}
          </q-tooltip>
        </q-btn>
      </div>

      <div class="expire-date-container flex items-center q-gutter-x-xl">
        <label class="dark-2"
          ><q-icon
            class="expire-date-clock dark-icon2"
            name="history"
            size="sm"
          />
          {{ item.dateCreatedString }}
          <q-tooltip>{{ $t("page.buttons.expire-date-tooltip") }}</q-tooltip>
        </label>
        <q-btn
          v-if="item.isOwner"
          class="service-extension q-pa-sm"
          round
          dense
          flat
          color="positive"
          icon="o_add_shopping_cart"
          size="md"
        >
          <q-tooltip>{{
            $t("page.buttons.service-extension-tooltip")
          }}</q-tooltip>
        </q-btn>
        <q-btn
          v-else
          class="service-extension dark-2 q-pa-sm"
          round
          dense
          flat
          icon="o_add_shopping_cart"
          size="md"
          disable
        >
        </q-btn>
      </div>
      <div class="more-options col-1 q-pl-md">
        <q-btn
          class="more-icon dark-2"
          unelevated
          falt
          round
          icon="more_vert"
          size="md"
          dense
        >
          <q-tooltip>{{ $t("page.buttons.more-tooltip") }}</q-tooltip>
        </q-btn>
        <q-menu transition-show="jump-down" transition-hide="jump-up">
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
                  <div
                    class="flex items-center q-gutter-x-sm"
                    @click="goToPaymentHistory"
                  >
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
      </div>
    </template>
  </data-view>
</template>

<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()

import DataView from "../../components/shared/DataView.vue"
import DesktopViewGuide from "./DesktopViewGuide.vue"

async function gotoBusiness() {}

async function goToPaymentHistory() {
  router.push("/business/Payments")
}

const showGuideDialog = ref(false)
</script>

<style>
.card-desktop {
  width: 620px !important;
}

.business-name {
  max-width: 150px;
}
</style>
