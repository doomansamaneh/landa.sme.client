<template>
  <data-view
    ref="businessDataView"
    dataSource="business/getBusinessGridData"
    :grid-store="gridStore"
    class="q-my-xl"
  >
    <template #header>
      <dekstop-view-guide v-model="showGuideDialog" />
      <q-item class="card-header q-px-lg q-py-lg">
        <q-item-section>
          <q-item-label class="text-h6 text-weight-700">
            {{ $t("pages.business") }}
          </q-item-label>
          <q-item-label caption>
            {{ $t("page.card-message") }}
          </q-item-label>
        </q-item-section>
        <div class="flex items-center q-mr-xs">
          <q-btn
            no-caps
            round
            unelevated
            class="text-on-dark"
            dense
            icon="o_refresh"
            clickable
            @click="reloadData"
          >
            <q-tooltip class="text-body2 custom-tooltip" :delay="600">
              {{ $t("shared.labels.refresh") }}
            </q-tooltip>
          </q-btn>
        </div>
        <div class="flex items-center q-gutter-x-md">
          <q-btn
            no-caps
            round
            unelevated
            dense
            class="text-on-dark"
            icon="o_help_outline"
            @click="showGuideDialog"
          >
            <q-tooltip class="text-body2 custom-tooltip" :delay="600">
              {{ $t("page.buttons.guide-tooltip") }}
            </q-tooltip>
          </q-btn>
          <add-business />
        </div>
      </q-item>
    </template>

    <template #body="{ item }">
      <div
        class="col-5 flex no-wrap items-center q-gutter-md text-weight-medium"
      >
        <q-avatar
          :class="{
            'primary-gradient primary-shadow text-white':
              item.isOwner,
            'business-isnotowner': !item.isOwner,
          }"
          icon="o_person"
          size="42px"
        />
        <div @click="gridStore.gotoBusiness(item)">
          {{ item.title }}
        </div>
      </div>

      <div class="expire-date-container flex col-2 items-center">
        <q-item-label class="caption-on-dark text-body2">
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
          no-caps
          class="more-icon text-on-dark"
          unelevated
          flat
          round
          icon="more_horiz"
          size="md"
          dense
        >
          <q-tooltip
            class="text-body2 custom-tooltip"
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
          <q-list style="min-width: 200px" padding>
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
                @click="showDeleteBusiness(item)"
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
  import DeleteBusinessDialog from "src/components/management/business/DeleteBusinessDialog.vue";

  const props = defineProps({
    gridStore: Object,
  });

  const $q = useQuasar();
  const businessDataView = ref(null);

  async function reloadData() {
    businessDataView.value.reloadData();
  }

  const showGuideDialog = () => {
    $q.dialog({
      component: DesktopViewGuide,
    });
  };

  function showDeleteBusiness(item) {
    $q.dialog({
      component: DeleteBusinessDialog,
      componentProps: {
        id: item.id,
      },
    });
  }
</script>
