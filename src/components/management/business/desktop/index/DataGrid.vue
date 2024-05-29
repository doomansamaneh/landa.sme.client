<template>
  <data-view
    ref="businessDataView"
    dataSource="business/getBusinessGridData"
    :grid-store="gridStore"
    class="q-my-xl"
  >
    <template #header>
      <DesktopViewGuide v-model="showGuideDialog" />
      <q-item class="card-header q-px-lg q-py-lg">
        <q-item-section>
          <q-item-label class="text-h6 text-weight-700">
            {{ $t("pages.business") }}
          </q-item-label>
          <q-item-label caption>
            {{ $t("page.card-message") }}
          </q-item-label>
        </q-item-section>
        <q-card-actions>
          <div class="flex items-center q-mr-xs">
            <q-btn
              round
              unelevated
              class="text-on-dark"
              dense
              icon="o_refresh"
              clickable
              @click="reloadData"
            >
              <q-tooltip
                class="text-body2 no-letter-spacing custom-tooltip"
                :delay="600"
              >
                {{ $t("shared.labels.refresh") }}
              </q-tooltip>
            </q-btn>
          </div>
          <div class="flex items-center q-gutter-x-md">
            <q-btn
              round
              unelevated
              dense
              class="text-on-dark"
              icon="o_help_outline"
              @click="showGuideDialog = true"
            >
              <q-tooltip
                class="text-body2 no-letter-spacing custom-tooltip"
                :delay="600"
              >
                {{ $t("page.buttons.guide-tooltip") }}
              </q-tooltip>
            </q-btn>
            <add-business />
          </div>
        </q-card-actions>
      </q-item>
    </template>

    <template #body="{ item }">
      <div class="col-5">
        <q-avatar
          :class="{
            'primary-gradient primary-shadow text-white':
              item.isOwner,
            'business-isnotowner': !item.isOwner,
          }"
          icon="o_person"
          size="lg"
        />
        <q-btn
          class="business-name-btn"
          no-caps
          flat
          text-color="dark"
          :ripple="false"
          @click="gridStore.gotoBusiness(item)"
        >
          <div class="flex no-wrap q-gutter-sm">
            <div
              class="business-name text-on-dark flex text-weight-regular"
            >
              <span class="ellipsis">{{ item.title }}</span>
            </div>
          </div>
          <q-tooltip
            class="custom-tooltip text-body2"
            transition-show="scale"
            transition-hide="scale"
            :delay="600"
            anchor="top left"
            self="top right"
            :offset="[-5, -2]"
          >
            {{ item.title }}
          </q-tooltip>
        </q-btn>
      </div>

      <div class="expire-date-container flex col-2 items-center">
        <q-item-label
          class="caption-on-dark text-body2 no-letter-spacing"
        >
          <q-icon
            class="expire-date-clock bg-on-dark2"
            name="history"
            size="xs"
            v-if="!item.expired"
          />
          <q-icon
            class="expire-date-clock bg-on-dark2"
            color="warning"
            name="warning"
            size="xs"
            v-if="item.expired"
          />
          {{ item.toDateString }}
          <q-tooltip class="custom-tooltip" :delay="600">
            {{ $t("page.buttons.expire-date-tooltip") }}
          </q-tooltip>
        </q-item-label>
      </div>

      <div class="col-3 flex justify-center items-center q-ml-md">
        <renew-subscribtion :business="item" />
      </div>

      <div class="more-options col-1 q-pl-md">
        <q-btn
          class="more-icon text-on-dark"
          unelevated
          flat
          round
          icon="more_horiz"
          size="md"
          dense
        >
          <q-tooltip
            class="text-body2 no-letter-spacing custom-tooltip"
            :delay="600"
            :offset="[-60, -70]"
          >
            {{ $t("page.buttons.more-tooltip") }}
          </q-tooltip>
        </q-btn>
        <q-menu
          class="border-radius-lg"
          transition-show="jump-down"
          transition-hide="jump-up"
        >
          <q-list padding>
            <q-item
              clickable
              v-close-popup
              @click="gridStore.gotoBusiness(item)"
            >
              <q-item-section>
                <div class="flex items-center q-gutter-x-sm">
                  <q-avatar icon="o_login" size="md" />
                  <div class="text-body2">
                    {{
                      $t("page.buttons.more-button.enter-business")
                    }}
                  </div>
                </div>
              </q-item-section>
            </q-item>
            <div class="isNotOwner" v-if="item.isOwner">
              <q-item clickable v-close-popup @click="showInviteUser">
                <q-item-section>
                  <div class="flex items-center q-gutter-x-sm">
                    <q-avatar icon="o_person_add" size="md" />
                    <div class="text-body2">
                      {{ $t("page.buttons.more-button.invite-user") }}
                    </div>
                  </div>
                </q-item-section>
              </q-item>
              <q-item
                :to="`/business/payments/${item.id}`"
                clickable
                v-close-popup
              >
                <q-item-section>
                  <div class="flex items-center q-gutter-x-sm">
                    <q-avatar icon="o_credit_card" size="md" />
                    <div class="text-body2">
                      {{
                        $t("page.buttons.more-button.payment-history")
                      }}
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
                      size="md"
                      class="delete-avatar red-shadow"
                    />
                    <div class="text-body2">
                      {{ $t("page.buttons.more-button.delete") }}
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
  import { ref } from "vue";
  import { useQuasar } from "quasar";

  import DataView from "src/components/shared/dataTables/desktop/DataView.vue";
  import RenewSubscribtion from "src/components/management/shared/RenewSubscribtionLink.vue";
  import AddBusiness from "src/components/management/shared/AddBusinessLink.vue";
  import DesktopViewGuide from "components/management/business/desktop/index/GuideView.vue";
  import InviteUserDialog from "src/components/management/users/InviteUserDialog.vue";
  import DeleteBusinessDialog from "src/components/management/business/DeleteBusinessDialog.vue";

  const props = defineProps({
    gridStore: Object,
  });

  const $q = useQuasar();
  const businessDataView = ref(null);
  const showGuideDialog = ref(false);

  async function reloadData() {
    businessDataView.value.reloadData();
  }

  function showInviteUser() {
    $q.dialog({
      component: InviteUserDialog,
    });
  }

  function showDeleteBusiness() {
    $q.dialog({
      component: DeleteBusinessDialog,
    });
  }
</script>

<style lang="scss">
  .business-name {
    max-width: 160px;
  }

  .q-item__label--caption {
    font-size: 14px;
    letter-spacing: 0;
    color: #2d2d2d;
  }

  /* //todo: add class for this kind of a */
  a {
    text-decoration: none;
    color: inherit;
  }

  .business-name-btn {
    .q-focus-helper {
      display: none;
    }
  }
</style>
