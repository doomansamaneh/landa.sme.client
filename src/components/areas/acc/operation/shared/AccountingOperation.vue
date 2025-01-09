<template>
  <tool-bar margin title="عملیات حسابداری" />

  <div class="row q-col-gutter-md">
    <div
      v-if="
        !operationStore.operationStatusModel.value.hasCloseBook &&
        !operationStore.operationStatusModel.value.hasOpenBook
      "
      class="col-md-4 col-sm-6 col-xs-12"
    >
      <q-card class="fit bordered q-radius-lg">
        <q-card-section class="q-pa-lg">
          <q-avatar
            size="46px"
            class="text-white primary-gradient primary-shadow"
          >
            <q-icon name="o_article" size="36px" color="white" />
          </q-avatar>

          <div class="q-mt-md">
            <q-router-link
              @click="operationStore.openBook(reloadData)"
              class="cursor-pointer no-decoration decoration-on-hover text-subtitle1 text-weight-700 no-letter-spacing"
            >
              {{ $t("shared.labels.openBook") }}
            </q-router-link>
          </div>

          <div
            class="text-body2 no-letter-spacing line-height-xs q-mt-sm"
          >
            {{ $t("shared.labels.openBookMessage") }}
          </div>
        </q-card-section>
      </q-card>
    </div>

    <div
      v-if="!operationStore.operationStatusModel.value.hasCloseBook"
      class="col-md-4 col-sm-6 col-xs-12"
    >
      <q-card class="fit bordered q-radius-lg">
        <q-card-section class="q-pa-lg">
          <q-avatar
            size="46px"
            class="text-white primary-gradient primary-shadow"
          >
            <q-icon name="o_refresh" size="36px" color="white" />
          </q-avatar>

          <div class="q-mt-md">
            <q-router-link
              @click="operationStore.reorder(reloadData)"
              class="cursor-pointer no-decoration decoration-on-hover text-subtitle1 text-weight-700 no-letter-spacing"
            >
              {{ $t("shared.labels.reorder") }}
            </q-router-link>
          </div>

          <div
            class="text-body2 no-letter-spacing line-height-xs q-mt-sm"
          >
            {{ $t("shared.labels.reorderMessage") }}
          </div>
        </q-card-section>
      </q-card>
    </div>

    <div
      v-if="!operationStore.operationStatusModel.value.hasCloseBook"
      class="col-md-4 col-sm-6 col-xs-12"
    >
      <q-card class="fit bordered q-radius-lg">
        <q-card-section class="q-pa-lg">
          <q-avatar
            size="46px"
            class="text-white primary-gradient primary-shadow"
          >
            <q-icon name="swap_vert" size="36px" color="white" />
          </q-avatar>

          <div class="q-mt-md">
            <q-router-link
              @click="operationStore.calculateCogs(reloadData)"
              class="cursor-pointer no-decoration decoration-on-hover text-subtitle1 text-weight-700 no-letter-spacing"
            >
              {{ $t("shared.labels.calculateCogs") }}
            </q-router-link>
          </div>

          <div
            class="text-body2 no-letter-spacing line-height-xs q-mt-sm"
          >
            {{ $t("shared.labels.calculateCogsMessage") }}
          </div>
        </q-card-section>
      </q-card>
    </div>

    <div
      v-if="!operationStore.operationStatusModel.value.hasCloseBook"
      class="col-md-4 col-sm-6 col-xs-12"
    >
      <q-card class="fit bordered q-radius-lg">
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

          <div class="q-mt-md">
            <q-router-link
              @click="showCloseAccountForm"
              class="cursor-pointer no-decoration decoration-on-hover text-subtitle1 text-weight-700 no-letter-spacing"
            >
              {{ $t("shared.labels.closeAccount") }}
            </q-router-link>
          </div>

          <div
            class="text-body2 no-letter-spacing line-height-xs q-mt-sm"
          >
            {{ $t("shared.labels.closeAccountMessage") }}
          </div>
        </q-card-section>
      </q-card>
    </div>

    <div
      v-if="!operationStore.operationStatusModel.value.hasCloseBook"
      class="col-md-4 col-sm-6 col-xs-12"
    >
      <q-card class="fit bordered q-radius-lg">
        <q-card-section class="q-pa-lg">
          <q-avatar
            size="46px"
            class="text-white bg-green primary-shadow"
          >
            <q-icon name="o_done_all" size="36px" color="white" />
          </q-avatar>

          <div class="q-mt-md">
            <q-router-link
              @click="operationStore.closeBook(reloadData)"
              class="cursor-pointer no-decoration decoration-on-hover text-subtitle1 text-weight-700 no-letter-spacing"
            >
              {{ $t("shared.labels.closeBook") }}
            </q-router-link>
          </div>

          <div
            class="text-body2 no-letter-spacing line-height-xs q-mt-sm"
          >
            {{ $t("shared.labels.closeBookMessage") }}
          </div>
        </q-card-section>
      </q-card>
    </div>

    <div
      v-if="operationStore.operationStatusModel.value.hasCloseBook"
      class="col-md col-sm-6 col-xs-12"
    >
      <q-card class="bordered q-radius-lg">
        <q-card-section class="q-pa-lg">
          <q-avatar size="46px" class="text-white bg-red shadow">
            <q-icon name="o_delete" size="36px" color="white" />
          </q-avatar>

          <div class="q-mt-md">
            <q-router-link
              @click="operationStore.deleteClosingBook(reloadData)"
              class="cursor-pointer no-decoration decoration-on-hover text-subtitle1 text-weight-700 no-letter-spacing"
            >
              {{ $t("shared.labels.deleteClosingBook") }}
            </q-router-link>
          </div>

          <div
            class="text-body2 no-letter-spacing line-height-xs q-mt-sm"
          >
            {{ $t("shared.labels.deleteClosingBookMessage") }}
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>
<script setup>
  import { useDialog } from "src/composables/useDialog";
  import { useAccountingOperations } from "../../_composables/useAccountingOperations";

  import ToolBar from "src/components/shared/ToolBarDesktop.vue";
  import CloseAccountForm from "./CloseAccountForm.vue";

  const dialogStore = useDialog();
  const operationStore = useAccountingOperations();

  const showCloseAccountForm = async () => {
    dialogStore.openDialog({
      title: "shared.labels.closeAccount",
      component: CloseAccountForm,
      actions: true,
      okCallback: async () => {},
    });
  };
</script>
