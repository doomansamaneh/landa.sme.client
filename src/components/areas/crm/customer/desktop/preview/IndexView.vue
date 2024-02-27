<template>
  <q-page-sticky
    class="z-1 bg-main q-py-sm"
    style="padding-left: 38px; padding-right: 38px"
    position="top"
    expand
  >
    <q-toolbar class="q-px-none row justify-between q-py-md">
      <div class="row items-center q-gutter-md">
        <q-avatar size="48px">
          <img class="avatar" src="https://cdn.quasar.dev/img/avatar4.jpg" />
        </q-avatar>
        <div class="column q-mt-md">
          <q-item-label>
            <span class="text-body2">خشایار شمالی</span>
          </q-item-label>
          <q-item-label caption>
            <span class="text-body2">توسعه دهنده وب</span>
          </q-item-label>
        </div>
      </div>
      <div class="row q-gutter-sm text-h6">
        <q-btn
          class="bg-primary text-white text-caption"
          padding="6px 12px"
          rounded
          no-caps
          unelevated
        >
          <q-icon name="o_add" class="q-mr-xs" />
          {{ $t("shared.labels.create") }}
        </q-btn>
        <q-btn
          class="bg-primary text-white text-caption"
          padding="6px 12px"
          rounded
          no-caps
          unelevated
          @click="editProfile"
        >
          <q-icon name="o_edit" class="q-mr-xs" />
          {{ $t("shared.labels.edit") }}
        </q-btn>
        <q-btn
          class="bg-primary text-white text-caption"
          padding="6px 12px"
          rounded
          no-caps
          unelevated
        >
          <q-icon name="o_delete" class="q-mr-xs" />
          {{ $t("shared.labels.delete") }}
        </q-btn>
      </div>
    </q-toolbar>
  </q-page-sticky>

  <div class="row q-gutter-md q-mt-xl">
    <div class="col">
      <sales-widget />
    </div>

    <div class="col">
      <sales-widget />
    </div>

    <div class="col">
      <sales-widget />
    </div>

    <div class="col">
      <sales-widget />
    </div>
  </div>

  <div class="row q-mt-lg q-gutter-x-md">
    <div class="col">
      <q-card class="info-box bordered">
        <q-card-section class="q-gutter-md">
          <div class="">
            <q-badge rounded class="q-px-sm q-mr-sm text-on-dark bg-on-dark"
              ><span class="text-bold text-caption">18</span></q-badge
            ><span class="text-bold text-caption text-on-dark-1">فاکتورها</span>
          </div>
          <div class="text-h6 text-bold text-on-dark q-gutter-xs">
            240,000,000<span class="text-body1 text-bold text-on-dark-1"
              >ریال</span
            >
          </div>
        </q-card-section>
      </q-card>
    </div>

    <div class="col">
      <q-card class="info-box bordered">
        <q-card-section class="q-gutter-md">
          <div class="">
            <q-badge rounded class="q-px-sm q-mr-sm text-on-dark bg-on-dark">
              <span class="text-bold text-caption"> 0 </span>
            </q-badge>
            <span class="text-bold text-caption text-on-dark-1">
              مانده حساب
            </span>
          </div>
          <div class="text-h6 text-bold text-on-dark q-gutter-xs">
            0
            <span class="text-body1 text-bold text-on-dark-1">ریال</span>
          </div>
        </q-card-section>
      </q-card>
    </div>

    <div class="col">
      <q-card class="info-box bordered">
        <q-card-section class="q-gutter-md">
          <div class="">
            <q-badge rounded class="q-px-sm q-mr-sm text-on-dark bg-on-dark">
              <span class="text-bold text-caption">4</span>
            </q-badge>
            <span class="text-bold text-caption text-on-dark-1">بدهکار</span>
          </div>
          <div class="text-h6 text-bold text-on-dark q-gutter-xs">
            2,000,000
            <span class="text-body1 text-bold text-on-dark-1 q-gutter-xs">
              ریال
            </span>
          </div>
        </q-card-section>
      </q-card>
    </div>

    <div class="col">
      <q-card class="info-box bordered">
        <q-card-section class="q-gutter-md">
          <div class="">
            <q-badge rounded class="q-px-sm q-mr-sm text-on-dark bg-on-dark">
              <span class="text-bold text-caption">9</span>
            </q-badge>
            <span class="text-bold text-caption text-on-dark-1">بستانکار</span>
          </div>
          <div class="text-h6 text-bold text-on-dark q-gutter-xs">
            158,300,020
            <span class="text-body1 text-bold text-on-dark-1"> ریال </span>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>

  <tabs />
</template>

<script setup>
import { useQuasar } from "quasar";

import EditProfile from "components/areas/crm/customer/desktop/preview/EditProfileDialog.vue";
import SalesWidget from "components/areas/dashboard/widgets/SalesWidget.vue";
import Tabs from "./_PreviewTabs.vue";

const $q = useQuasar();

const editProfile = () => {
  $q.dialog({
    component: EditProfile,
  });
};
</script>

<style lang="scss">
.profile-section {
  width: 400px;
}

.info-box:hover {
  border: 1px solid var(--q-primary) !important;
  cursor: pointer;
}
</style>
