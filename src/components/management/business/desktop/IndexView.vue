<template>
  <data-view
    ref="businessDataView"
    dataSource="business/getBusinessGridData"
    orderByField="title"
    searchField="b.title"
    @reload-data="reloadData"
    class="q-my-xl"
  >
    <template #header>
      <DesktopViewGuide v-model="showGuideDialog" />
      <q-item class="card-header q-px-lg q-py-lg">
        <q-item-section>
          <q-item-label class="text-h6">{{
            $t("page.card-title")
          }}</q-item-label>
          <q-item-label class="dark-2 q-pt-xs_ text-subtitle2" caption>{{
            $t("page.card-message")
          }}</q-item-label>
        </q-item-section>
        <q-card-actions>
          <div class="flex items-center q-mr-sm">
            <q-icon
              class="icon-hover dark-3 cursor-pointer"
              size="sm"
              name="o_refresh"
              @click="reloadData"
              clickable
            >
              <q-tooltip class="custom-tooltip" :delay="600">{{
                $t("page.buttons.reload-data")
              }}</q-tooltip>
            </q-icon>
          </div>
          <div class="flex items-center q-gutter-x-md">
            <q-icon
              class="icon-hover dark-3 cursor-pointer"
              size="sm"
              name="o_help_outline"
              @click="showGuideDialog = true"
            >
              <q-tooltip class="custom-tooltip" :delay="600">{{
                $t("page.buttons.guide-tooltip")
              }}</q-tooltip>
            </q-icon>
            <q-btn
              rounded
              class="service-extension text-caption"
              size="12px"
              no-caps
              outline
              unelevated
              padding="6px 12px"
              @click="goToAddBusiness"
            >
              <q-icon name="add" class="q-pr-xs" size="14px" />
              {{ $t("page.buttons.add-new-business-tooltip") }}
            </q-btn>
          </div>
        </q-card-actions>
      </q-item>
    </template>

    <template #item="{ item }">
      <div class="col-5">
        <q-avatar
          :class="{
            'business-isowner': item.isOwner,
            'business-isnotowner': !item.isOwner
          }"
          icon="o_person"
          size="md"
        />
        <q-btn
          class="business-name-btn"
          no-caps
          flat
          text-color="dark"
          :ripple="false"
          @click="gotoBusiness(item)"
        >
          <div class="flex no-wrap q-gutter-sm">
            <div class="business-name flex text-weight-regular">
              <span class="ellipsis">{{ item.title }}</span>
            </div>
          </div>
          <q-tooltip
            class="custom-tooltip text-body2"
            transition-show="scale"
            transition-hide="scale"
            delay="600"
            anchor="top left"
            self="top right"
            :offset="[-5, -2]"
          >
            {{ item.title }}
          </q-tooltip>
        </q-btn>
      </div>

      <div class="expire-date-container flex col-2 items-center">
        <label class="dark-2 text-caption">
          <q-icon
            class="expire-date-clock dark-icon2"
            name="history"
            size="xs"
            v-if="!item.expired"
          />
          <q-icon
            class="expire-date-clock dark-icon2"
            color="warning "
            name="warning"
            size="xs"
            v-if="item.expired"
          />
          {{ item.toDateString }}
          <q-tooltip class="custom-tooltip" :delay="600">{{
            $t("page.buttons.expire-date-tooltip")
          }}</q-tooltip>
        </label>
      </div>
      <div class="col-3 flex justify-center items-center q-ml-md">
        <renew-subscribtion
          class="bg-green text-white"
          :businessId="item.id"
          :title="item.title"
          :planTitle="item.planTitle"
          v-if="item.isOwner && item.daysToExpire < 350"
        />
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
          <q-tooltip class="custom-tooltip" :delay="600" :offset="[-60, -70]">{{
            $t("page.buttons.more-tooltip")
          }}</q-tooltip>
        </q-btn>
        <q-menu transition-show="jump-down" transition-hide="jump-up">
          <q-list padding>
            <q-item clickable v-close-popup @click="gotoBusiness(item)">
              <q-item-section>
                <div class="flex items-center q-gutter-x-sm">
                  <q-avatar icon="login" size="sm" class="dark-1" />
                  <div class="text-caption_">
                    {{ $t("page.buttons.more-button.enter-business") }}
                  </div>
                </div>
              </q-item-section>
            </q-item>
            <div class="isNotOwner" v-if="item.isOwner">
              <q-item clickable v-close-popup @click="showInviteUser">
                <q-item-section>
                  <div class="flex items-center q-gutter-x-sm">
                    <q-avatar icon="o_person_add" size="sm" class="dark-1" />
                    <div class="text-caption_">
                      {{ $t("page.buttons.more-button.invite-user") }}
                    </div>
                  </div>
                </q-item-section>
              </q-item>
              <q-separator spaced />
              <q-item clickable v-close-popup @click="showDeleteBusiness">
                <q-item-section>
                  <div class="flex items-center q-gutter-x-sm">
                    <q-avatar icon="o_delete" size="sm" class="dark-1" />
                    <div class="text-caption_">
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
                    <div class="text-caption_">
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

  <q-dialog
    v-model="inviteUserPopup"
    transition-show="slide-down"
    transition-hide="fade"
    transition-duration="600"
    no-backdrop-dismiss
  >
    <invite-user>
      <template #header>
        <q-item-section>
          <q-item-label class="text-h6">{{
            $t("invite-user-page.title")
          }}</q-item-label>
        </q-item-section>
        <q-card-actions>
          <q-space />
          <q-btn
            icon="close"
            class="icon-hover dark-3"
            flat
            round
            dense
            v-close-popup
          />
        </q-card-actions>
      </template>
    </invite-user>
  </q-dialog>
  <q-dialog
    v-model="DeleteBusienssPopup"
    transition-show="slide-down"
    transition-hide="fade"
    transition-duration="600"
    no-backdrop-dismiss
  >
    <delete-business>
      <template #header>
        <q-item-section>
          <q-item-label class="text-h6">{{
            $t("delete-business-page.title")
          }}</q-item-label>
        </q-item-section>
        <q-card-actions>
          <q-space />
          <q-btn
            icon="close"
            class="icon-hover dark-3"
            flat
            round
            dense
            v-close-popup
          />
        </q-card-actions>
      </template>
    </delete-business>
  </q-dialog>
</template>

<script setup>
import { ref, onMounted, computed } from "vue"
import { useRouter } from "vue-router"
import InviteUser from "src/components/users/InviteUser.vue"
import DeleteBusiness from "src/components/management/business/DeleteBusiness.vue"
import DataView from "src/components/shared/DataView.vue"
import RenewSubscribtion from "src/components/management/shared/RenewSubscribtion.vue"
import DesktopViewGuide from "./GuideView.vue"

const router = useRouter()
const businessDataView = ref(null)
const showGuideDialog = ref(false)
const inviteUserPopup = ref(false)
const DeleteBusienssPopup = ref(false)

async function gotoBusiness(item) {
  router.push(`home/${item.id}`)
}

async function goToPaymentHistory(item) {
  router.push(`business/payments/${item.id}/${item.title}`)
}

function goToAddBusiness() {
  router.push("business/addBusiness")
}

async function reloadData() {
  businessDataView.value.reloadData()
}

function showInviteUser() {
  inviteUserPopup.value = true
}

function showDeleteBusiness() {
  DeleteBusienssPopup.value = true
}
</script>

<style>
.business-name {
  max-width: 160px;
}
</style>
