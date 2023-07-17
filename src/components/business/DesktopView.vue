<template>
  <data-view
    ref="businessDataView"
    dataSource="business/getBusinessGridData"
    orderByField="title"
    searchField="b.title"
    @reload-data="reloadData"
  >
    <template #header>
      <DesktopViewGuide v-model="showGuideDialog" />
      <q-item class="card-header q-px-lg q-py-lg">
        <q-item-section>
          <q-item-label class="text-bold">{{
            $t("page.card-title")
          }}</q-item-label>
          <q-item-label class="q-pt-xs text-subtitle2" caption>{{
            $t("page.card-message")
          }}</q-item-label>
        </q-item-section>
        <q-card-actions>
          <div class="flex items-center q-mr-xs">
            <q-icon
              class="icon-hover dark-3 cursor-pointer"
              size="xs"
              name="o_refresh"
              @click="reloadData"
              clickable
            >
              <q-tooltip>{{ $t("page.buttons.reload-data") }}</q-tooltip>
            </q-icon>
          </div>
          <div class="flex items-center q-gutter-x-md">
            <q-icon
              class="icon-hover dark-3 cursor-pointer"
              size="xs"
              name="o_help_outline"
              @click="showGuideDialog = true"
            >
              <q-tooltip>{{ $t("page.buttons.guide-tooltip") }}</q-tooltip>
            </q-icon>
            <q-btn
              unelevated
              round
              icon="add"
              class="add-new-business"
              size="12px"
            >
              <q-tooltip anchor="top left" self="top right">
                {{ $t("page.buttons.add-new-business-tooltip") }}
              </q-tooltip>
            </q-btn>
          </div>
        </q-card-actions>
      </q-item>
    </template>

    <template #item="{ item }">
      <div class="col-6">
        <q-avatar
          :class="{
            'business-isowner': item.isOwner,
            'business-isnotowner': !item.isOwner
          }"
          icon="o_person"
          size="md"
        />
        <q-btn
          class="business-name-btn text-caption"
          no-caps
          flat
          text-color="dark"
          :ripple="false"
          @click="gotoBusiness"
        >
          <div class="flex no-wrap q-gutter-sm">
            <div class="business-name-icon">
              <q-icon name="o_login" size="xs" />
            </div>
            <div class="business-name flex text-weight-regular">
              <span class="ellipsis">{{ item.title }}</span>
            </div>
          </div>
          <q-tooltip>
            {{ $t("page.buttons.more-button.enter-business") }}
          </q-tooltip>
        </q-btn>
      </div>

      <div class="expire-date-container flex col-2 items-center">
        <label class="dark-2 text-caption">
          <q-icon
            class="expire-date-clock dark-icon2"
            name="history"
            size="xs"
          />
          {{ item.dateCreatedString }}
          <q-tooltip>{{ $t("page.buttons.expire-date-tooltip") }}</q-tooltip>
        </label>
      </div>
      <div class="col-3 flex justify-center items-center">
        <q-btn
          v-if="item.isOwner"
          rounded
          class="service-extension text-caption q-px-sm q-py-xs"
          outline
          size="11px"
          no-caps
        >
          <q-icon name="add" class="q-pr-xs" size="14px" />
          {{ $t("page.buttons.service-extension-tooltip") }}
          <q-tooltip>{{
            $t("page.buttons.service-extension-tooltip")
          }}</q-tooltip>
        </q-btn>
        <q-btn
          outline
          no-caps
          rounded
          v-else
          disable
          class="service-extension-not-owner text-caption q-px-lg q-py-xs"
          size="11px"
        >
          {{ $t("page.buttons.guest-user") }}
          <q-tooltip>{{
            $t("page.buttons.service-extension-tooltip")
          }}</q-tooltip></q-btn
        >
      </div>
      <div class="more-options col-1 q-pl-md">
        <q-btn
          class="more-icon dark-2"
          unelevated
          flat
          round
          icon="more_horiz"
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
              <q-item clickable v-close-popup @click="goToPaymentHistory(item)">
                <q-item-section>
                  <div class="flex items-center q-gutter-x-sm">
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
import businessRoutes from "src/router/business-routes"
import { ref, onMounted, computed } from "vue"
import { useRouter } from "vue-router"

import DataView from "../../components/shared/DataView.vue"
import DesktopViewGuide from "./DesktopViewGuide.vue"

const router = useRouter()
const businessDataView = ref(null)
const showGuideDialog = ref(false)

async function gotoBusiness() {}

async function goToPaymentHistory(item) {
  router.push(`business/payments/${item.id}/${item.title}`)
}

async function reloadData() {
  // alert("Reload btn Clicked!")
  businessDataView.value.reloadData()
}
</script>

<style>
.business-name {
  max-width: 150px;
}
</style>
