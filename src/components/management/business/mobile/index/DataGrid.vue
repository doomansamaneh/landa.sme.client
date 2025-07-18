<template>
  <div class="row q-py-md items-center justify-between">
    <div class="ellipsis-2-lines text-body1 text-weight-700">
      {{ $t("pages.business") }}
    </div>
  </div>

  <data-grid
    ref="businessDataView"
    data-source="business/getBusinessGridData"
    create-url="/business/addBusiness"
    :grid-store="gridStore"
    no-active-row
    no-select-row
    class="q-my-xl"
  >
    <template #header-guide>
      <q-btn
        no-caps
        rounded
        unelevated
        dense
        text-color="white"
        padding="2px 12px"
        class="text-on-dark q-ml-xs text-body3 primary-gradient primary-shadow"
        @click="showGuideDialog = true"
      >
        {{ $t("shared.labels.userGuide") }}
      </q-btn>
    </template>

    <template #row-body="{ item }">
      <q-card class="bordered bg-dark rounded-borders">
        <q-card-section class="row">
          <div class="col-2 q-mr-xs">
            <q-avatar
              size="36px"
              text-color="white"
              class="primary-gradient primary-shadow"
              v-if="item.isOwner"
            >
              <q-icon name="o_person" size="20px" />
            </q-avatar>

            <q-avatar
              size="36px"
              class="text-on-dark bg-on-dark"
              v-else
            >
              <q-icon name="o_person" size="20px" />
            </q-avatar>
          </div>

          <div class="col">
            <div class="q-gutter-sm">
              <div
                @click="gridStore.gotoBusiness(item)"
                class="text-body3 ellipsis-2-lines"
              >
                {{ item.title }}
              </div>

              <div class="row">
                <q-item-label class="caption-on-dark text-body3">
                  <q-icon
                    class="expire-date-clock bg-on-dark2"
                    name="history"
                    size="16px"
                    v-if="!item.expired"
                  />
                  <q-icon
                    class="expire-date-clock bg-on-dark2"
                    color="warning"
                    name="warning"
                    size="16px"
                    v-if="item.expired"
                  />
                  {{ item.toDateString }}
                  <q-tooltip class="custom-tooltip" :delay="600">
                    {{ $t("page.buttons.expire-date-tooltip") }}
                  </q-tooltip>
                </q-item-label>
              </div>
            </div>
          </div>

          <div class="col-4">
            <div class="row justify-end items-center q-gutter-sm">
              <renew-subscribtion :business="item" />
              <q-btn
                no-caps
                size="13px"
                unelevated
                round
                dense
                icon="o_more_vert"
                @click="onBottomSheetShow(item)"
              />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </template>

    <template #create-label>
      <q-btn
        no-caps
        v-if="showCreate"
        rounded
        unelevated
        padding="10px 20px"
        to="/business/addBusiness"
        dense
        color="primary"
        class="text-body1 primary-shadow"
      >
        <div class="row items-center q-gutter-x-xs">
          <q-icon name="o_add" size="sm" />
          <span>
            {{ $t("shared.labels.create") }}
          </span>
        </div>
      </q-btn>
    </template>
  </data-grid>

  <user-guide v-model="showGuideDialog" />

  <bottom-sheet
    v-if="bottomSheetStatus"
    header
    :status="bottomSheetStatus"
    @hide="onBottomSheetHide"
  >
    <template #header-title>
      {{ selectedRow.title }}
    </template>

    <template #body>
      <q-list padding>
        <q-item
          clickable
          v-ripple
          @click="gridStore.gotoBusiness(selectedRow)"
        >
          <q-item-section avatar>
            <q-avatar class="bg-on-dark text-on-dark" size="36px">
              <q-icon size="xs" name="o_login" />
            </q-avatar>
          </q-item-section>

          <q-item-section class="text-body2">
            {{ $t("page.buttons.more-button.enter-business") }}
          </q-item-section>
        </q-item>

        <template v-if="selectedRow.isOwner">
          <q-item
            clickable
            v-ripple
            :to="`/business/payments/${selectedRow.id}`"
          >
            <q-item-section avatar>
              <q-avatar class="bg-on-dark text-on-dark" size="36px">
                <q-icon size="xs" name="o_credit_card" />
              </q-avatar>
            </q-item-section>

            <q-item-section class="text-body2">
              {{ $t("page.buttons.more-button.payment-history") }}
            </q-item-section>
          </q-item>

          <q-separator class="q-my-sm" size="0.5px" />

          <q-item
            clickable
            v-ripple
            @click="showDeleteBusiness(selectedRow)"
          >
            <q-item-section avatar>
              <q-avatar
                class="text-white red-shadow red-gradient"
                size="36px"
              >
                <q-icon size="xs" name="o_delete" />
              </q-avatar>
            </q-item-section>

            <q-item-section class="text-body2">
              {{ $t("page.buttons.more-button.delete") }}
            </q-item-section>
          </q-item>
        </template>
      </q-list>
    </template>
  </bottom-sheet>
</template>

<script setup>
  import { ref } from "vue";
  import { useQuasar } from "quasar";

  import DataGrid from "src/components/shared/dataTables/mobile/DataGrid.vue";

  import RenewSubscribtion from "src/components/management/shared/RenewSubscribtionLink.vue";
  import BottomSheet from "src/components/shared/BottomSheet.vue";
  import DeleteBusinessDialog from "src/components/management/business/DeleteBusinessDialog.vue";
  import UserGuide from "src/components/management/business/mobile/index/GuideView.vue";

  const props = defineProps({
    gridStore: Object,
  });

  const $q = useQuasar();

  const showGuideDialog = ref(false);
  const bottomSheetStatus = ref(false);
  const selectedRow = ref(null);

  const onBottomSheetShow = (row) => {
    selectedRow.value = row;
    bottomSheetStatus.value = true;
  };

  const onBottomSheetHide = () => {
    bottomSheetStatus.value = false;
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

<style lang="scss" scoped>
  .q-item__label--caption {
    font-size: 13px;
    letter-spacing: 0;
    color: #2d2d2d;
  }

  .q-item__section--side {
    padding-right: 12px;
  }
</style>
