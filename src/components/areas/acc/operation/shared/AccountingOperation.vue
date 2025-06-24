<template>
  <!-- <tool-bar margin title="عملیات حسابداری" /> -->

  <div class="row q-col-gutter-md">
    <div
      v-if="
        !operationStore.operationStatusModel.value.hasCloseBook &&
        !operationStore.operationStatusModel.value.hasOpenBook
      "
      class="col-md-4 col-sm-6 col-xs-12"
    >
      <q-card
        v-ripple
        class="fit bordered q-radius-lg q-hoverable cursor-pointer"
        @click="operationStore.openBook(openBookCallback)"
      >
        <span class="q-focus-helper" />

        <q-card-section class="q-pa-lg">
          <q-avatar
            size="46px"
            class="text-white primary-gradient primary-shadow"
          >
            <q-icon name="o_article" size="36px" color="white" />
          </q-avatar>

          <div class="q-mt-md text-subtitle1 text-weight-700">
            {{ $t("shared.labels.openBook") }}
          </div>

          <div class="text-body2 line-height-xs q-mt-sm">
            {{ $t("shared.labels.openBookMessage") }}
          </div>
        </q-card-section>
      </q-card>
    </div>

    <div
      v-if="!operationStore.operationStatusModel.value.hasCloseBook"
      class="col-md-4 col-sm-6 col-xs-12"
    >
      <q-card
        v-ripple
        class="fit bordered q-radius-lg q-hoverable cursor-pointer"
        @click="reorder()"
      >
        <span class="q-focus-helper" />
        <q-card-section class="q-pa-lg">
          <q-avatar
            size="46px"
            class="text-white primary-gradient primary-shadow"
          >
            <q-icon name="o_refresh" size="36px" color="white" />
          </q-avatar>

          <div class="q-mt-md text-subtitle1 text-weight-700">
            {{ $t("shared.labels.reorder") }}
          </div>

          <div class="text-body2 line-height-xs q-mt-sm">
            {{ $t("shared.labels.reorderMessage") }}
          </div>
        </q-card-section>
      </q-card>
    </div>

    <div
      v-if="!operationStore.operationStatusModel.value.hasCloseBook"
      class="col-md-4 col-sm-6 col-xs-12"
    >
      <q-card
        v-ripple
        class="fit bordered q-radius-lg q-hoverable cursor-pointer"
        @click="operationStore.calculateCogs()"
      >
        <span class="q-focus-helper" />

        <q-card-section class="q-pa-lg">
          <q-avatar
            size="46px"
            class="text-white primary-gradient primary-shadow"
          >
            <q-icon name="swap_vert" size="36px" color="white" />
          </q-avatar>

          <div class="q-mt-md text-subtitle1 text-weight-700">
            {{ $t("shared.labels.calculateCogs") }}
          </div>

          <div class="text-body2 line-height-xs q-mt-sm">
            {{ $t("shared.labels.calculateCogsMessage") }}
          </div>
        </q-card-section>
      </q-card>
    </div>

    <div
      v-if="!operationStore.operationStatusModel.value.hasCloseBook"
      class="col-md-4 col-sm-6 col-xs-12"
    >
      <q-card
        v-ripple
        class="fit bordered q-radius-lg q-hoverable cursor-pointer"
        @click="showCloseAccountForm"
      >
        <span class="q-focus-helper" />

        <q-card-section class="q-pa-lg">
          <q-avatar
            size="46px"
            class="text-white primary-gradient primary-shadow"
          >
            <q-icon
              name="o_playlist_add_check"
              size="36px"
              color="white"
            />
          </q-avatar>

          <div class="q-mt-md text-subtitle1 text-weight-700">
            {{ $t("shared.labels.closeAccount") }}
          </div>

          <div class="text-body2 line-height-xs q-mt-sm">
            {{ $t("shared.labels.closeAccountMessage") }}
          </div>
        </q-card-section>
      </q-card>
    </div>

    <div
      v-if="!operationStore.operationStatusModel.value.hasCloseBook"
      class="col-md-4 col-sm-6 col-xs-12"
    >
      <q-card
        v-ripple
        class="fit bordered q-radius-lg q-hoverable cursor-pointer"
        @click="operationStore.closeBook()"
      >
        <span class="q-focus-helper" />

        <q-card-section class="q-pa-lg">
          <q-avatar
            size="46px"
            class="text-white bg-green primary-shadow"
          >
            <q-icon name="o_done_all" size="36px" color="white" />
          </q-avatar>

          <div class="q-mt-md text-subtitle1 text-weight-700">
            {{ $t("shared.labels.closeBook") }}
          </div>

          <div class="text-body2 line-height-xs q-mt-sm">
            {{ $t("shared.labels.closeBookMessage") }}
          </div>
        </q-card-section>
      </q-card>
    </div>

    <div
      v-if="operationStore.operationStatusModel.value.hasCloseBook"
      class="col-md col-sm-6 col-xs-12"
    >
      <q-card
        v-ripple
        class="fit bordered q-radius-lg q-hoverable cursor-pointer"
        @click="operationStore.deleteClosingBook()"
      >
        <span class="q-focus-helper" />

        <q-card-section class="q-pa-lg">
          <q-avatar size="46px" class="text-white bg-red shadow">
            <q-icon name="o_delete" size="36px" color="white" />
          </q-avatar>

          <div class="q-mt-md text-subtitle1 text-weight-700">
            {{ $t("shared.labels.deleteClosingBook") }}
          </div>

          <div class="text-body2 line-height-xs q-mt-sm">
            {{ $t("shared.labels.deleteClosingBookMessage") }}
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
<script setup>
  import { useRouter } from "vue-router";
  import { useDialog } from "src/composables/useDialog";
  import { useAccountingOperations } from "../../_composables/useAccountingOperations";
  import { useVoucherState } from "../../_composables/useVoucherState";

  import ReorderForm from "../../voucher/shared/forms/ReorderForm.vue";
  // import ToolBar from "src/components/shared/toolbars/DynamicToolBarDesktop.vue";
  import CloseAccountForm from "./CloseAccountForm.vue";

  const router = useRouter();
  const dialogStore = useDialog();
  const operationStore = useAccountingOperations();
  const voucherStore = useVoucherState();

  function reorder() {
    dialogStore.openDialog({
      title: `shared.labels.reorder`,
      component: ReorderForm,
      actionBar: true,
      okCallback: async (response) => {
        voucherStore.reset();
      },
    });
  }

  const openBookCallback = (response) => {
    if (!response?.data) {
      router.push(`/acc/voucher/openingVoucher`);
    }
  };

  const showCloseAccountForm = async () => {
    dialogStore.openDialog({
      title: "shared.labels.closeAccount",
      component: CloseAccountForm,
      actionBar: true,
      okCallback: async () => {},
    });
  };
</script>
