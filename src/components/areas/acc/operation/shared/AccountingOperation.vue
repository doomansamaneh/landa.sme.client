<template>
  <tool-bar margin title="عملیات حسابداری" />

  <div class="row q-col-gutter-md">
    <div class="col-md col-sm-6 col-xs-12">
      <q-card class="bordered q-radius-lg">
        <q-card-section class="q-pa-lg">
          <q-avatar
            size="46px"
            color="primary"
            class="primary-shadow"
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
            این یک متن تستی است و نباید بیش از 3 خط باشد زیرا باعث عدم
            تعادل در طراحی خواهد شد.
          </div>
        </q-card-section>
      </q-card>
    </div>

    <div class="col-md col-sm-6 col-xs-12">
      <q-card class="bordered q-radius-lg">
        <q-card-section class="q-pa-lg">
          <q-avatar
            size="46px"
            color="primary"
            class="primary-shadow"
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
            این یک متن تستی است و نباید بیش از 3 خط باشد زیرا باعث عدم
            تعادل در طراحی خواهد شد.
          </div>
        </q-card-section>
      </q-card>
    </div>

    <div class="col-md col-sm-6 col-xs-12">
      <q-card class="bordered q-radius-lg">
        <q-card-section class="q-pa-lg">
          <q-avatar
            size="46px"
            color="primary"
            class="primary-shadow"
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
            این یک متن تستی است و نباید بیش از 3 خط باشد زیرا باعث عدم
            تعادل در طراحی خواهد شد.
          </div>
        </q-card-section>
      </q-card>
    </div>

    <div class="col-md col-sm-6 col-xs-12">
      <q-card class="bordered q-radius-lg">
        <q-card-section class="q-pa-lg">
          <q-avatar
            size="46px"
            color="primary"
            class="primary-shadow"
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
            این یک متن تستی است و نباید بیش از 3 خط باشد زیرا باعث عدم
            تعادل در طراحی خواهد شد.
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>

  <div class="row q-col-gutter-md q-pt-md">
    <div class="col-md col-sm-6 col-xs-12">
      <q-card class="bordered q-radius-lg">
        <q-card-section class="q-pa-lg">
          <q-avatar
            size="46px"
            color="primary"
            class="primary-shadow"
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
            این یک متن تستی است و نباید بیش از 3 خط باشد زیرا باعث عدم
            تعادل در طراحی خواهد شد.
          </div>
        </q-card-section>
      </q-card>
    </div>

    <div class="col-md col-sm-6 col-xs-12">
      <q-card class="bordered q-radius-lg">
        <q-card-section class="q-pa-lg">
          <q-avatar
            size="46px"
            color="primary"
            class="primary-shadow"
          >
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
            این یک متن تستی است و نباید بیش از 3 خط باشد زیرا باعث عدم
            تعادل در طراحی خواهد شد.
          </div>
        </q-card-section>
      </q-card>
    </div>

    <div class="col-md col-sm-6 col-xs-12">
    </div>
    <div class="col-md col-sm-6 col-xs-12">
    </div>
  </div>
</template>
<script setup>
  import { useQuasar } from "quasar";
  import { useAccountingOperations } from "../../_composables/useAccountingOperations";

  import ToolBar from "src/components/shared/ToolBarDesktop.vue";
  import CloseAccountDialog from "./CloseAccountDialog.vue";

  const operationStore = useAccountingOperations();
  const $q = useQuasar();

  const showCloseAccountForm = async () => {
    $q.dialog({
      component: CloseAccountDialog,
    }).onOk(async () => {
      await reloadData();
    });
  };

  const reloadData = async () => {
    alert("operation finished");
  };
</script>
