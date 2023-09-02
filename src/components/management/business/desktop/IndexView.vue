<template>
  <data-view
    ref="businessDataView"
    dataSource="business/getBusinessGridData"
    orderByField="title"
    searchField="b.title"
    storeName="business"
    @reload-data="reloadData"
    class="q-my-xl"
  >
    <template #header>
      <DesktopViewGuide v-model="showGuideDialog" />
      <q-item class="card-header q-px-lg q-py-lg">
        <q-item-section>
          <q-item-label class="text-h6">
            {{ $t("pages.business") }}
          </q-item-label>
          <q-item-label
            class="dark-2 q-pt-xs_ text-subtitle2"
            caption
          >
            {{ $t("page.card-message") }}
          </q-item-label>
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
              <q-tooltip
                class="custom-tooltip"
                :delay="600"
              >
                {{ $t("page.buttons.reload-data") }}
              </q-tooltip>
            </q-icon>
          </div>
          <div class="flex items-center q-gutter-x-md">
            <q-icon
              class="icon-hover dark-3 cursor-pointer"
              size="sm"
              name="o_help_outline"
              @click="showGuideDialog = true"
            >
              <q-tooltip
                class="custom-tooltip"
                :delay="600"
              >
                {{ $t("page.buttons.guide-tooltip") }}
              </q-tooltip>
            </q-icon>
            <add-business />
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
          <q-tooltip
            class="custom-tooltip"
            :delay="600"
          >{{
            $t("page.buttons.expire-date-tooltip")
          }}</q-tooltip>
        </label>
      </div>

      <div class="col-3 flex justify-center items-center q-ml-md">
        <renew-subscribtion
          class="bg-green text-white"
          :business="item"
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
          <q-tooltip
            class="custom-tooltip"
            :delay="600"
            :offset="[-60, -70]"
          >{{
            $t("page.buttons.more-tooltip")
          }}</q-tooltip>
        </q-btn>
        <q-menu
          transition-show="jump-down"
          transition-hide="jump-up"
        >
          <q-list padding>
            <q-item
              clickable
              v-close-popup
              @click="gotoBusiness(item)"
            >
              <q-item-section>
                <div class="flex items-center q-gutter-x-sm">
                  <q-avatar
                    icon="login"
                    size="sm"
                    class="dark-1"
                  />
                  <div class="text-caption_">
                    {{ $t("page.buttons.more-button.enter-business") }}
                  </div>
                </div>
              </q-item-section>
            </q-item>
            <div
              class="isNotOwner"
              v-if="item.isOwner"
            >
              <q-item
                clickable
                v-close-popup
                @click="showInviteUser"
              >
                <q-item-section>
                  <div class="flex items-center q-gutter-x-sm">
                    <q-avatar
                      icon="o_person_add"
                      size="sm"
                      class="dark-1"
                    />
                    <div class="text-caption_">
                      {{ $t("page.buttons.more-button.invite-user") }}
                    </div>
                  </div>
                </q-item-section>
              </q-item>
              <q-separator spaced />
              <q-item
                clickable
                v-close-popup
                @click="showDeleteBusiness"
              >
                <q-item-section>
                  <div class="flex items-center q-gutter-x-sm">
                    <q-avatar
                      icon="o_delete"
                      size="sm"
                      class="dark-1"
                    />
                    <div class="text-caption_">
                      {{ $t("page.buttons.more-button.delete") }}
                    </div>
                  </div>
                </q-item-section>
              </q-item>
              <q-separator spaced />
              <q-item
                clickable
                v-close-popup
              >
                <q-item-section>
                  <router-link :to="getPaymentLogUrl(item)">
                    <div class="flex items-center q-gutter-x-sm">
                      <q-avatar
                        icon="credit_card"
                        size="sm"
                        class="dark-1"
                      />
                      <div class="text-caption_">
                        {{ $t("page.buttons.more-button.payment-history") }}
                      </div>
                    </div>
                  </router-link>
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
import { ref, onMounted, computed } from "vue"
import { useRouter } from "vue-router"
import { useQuasar } from "quasar"
import InviteUser from "src/components/users/InviteUser.vue"
import DeleteBusiness from "src/components/management/business/DeleteBusiness.vue"
import DataView from "src/components/shared/DataTables/DataView.vue"
import RenewSubscribtion from "src/components/management/shared/RenewSubscribtionLink.vue"
import AddBusiness from "src/components/management/shared/AddBusinessLink.vue"
import DesktopViewGuide from "./GuideView.vue"
import InviteUserDialog from "src/components/users/InviteUserDialog.vue"
import DeleteBusinessDialog from "src/components/management/business/DeleteBusinessDialog.vue"
import { fetchWrapper } from "src/helpers"

const router = useRouter()
const $q = useQuasar()
const businessDataView = ref(null)
const showGuideDialog = ref(false)
const inviteUserPopup = ref(false)
const DeleteBusienssPopup = ref(false)

async function gotoBusiness(item) {
  await fetchWrapper
    .post(`business/gotoBusiness/${item.id}`)
    .then((response) => {
      //alert(`goto business: ${response.data.data.culture}`)
      // console.log(`goto business: ${response.data.data}`);
      // router.push(`/${response.data.data.url}`)
      //todo: resolve main-route for gotoBusiness
      router.push(`/${item.id}`)
    })
}

function getPaymentLogUrl(item) {
  return `/business/payments/${item.id}`
}

async function reloadData() {
  businessDataView.value.reloadData()
}

function showInviteUser() {
  $q.dialog({
    component: InviteUserDialog
  })
}

function showDeleteBusiness() {
  $q.dialog({
    component: DeleteBusinessDialog
  })
}
</script>

<style>.business-name {
  max-width: 160px;
}

a {
  text-decoration: none;
  color: inherit;
}</style>
