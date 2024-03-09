<template>
  <q-page-sticky v-if="$q.screen.gt.xs" class="z-1 bg-main q-py-sm" style="padding-left: 38px; padding-right: 38px;" position="top" expand>
    <q-toolbar class="q-px-none row justify-between q-py-md">
      <div class="row items-center q-gutter-md">
        <q-avatar size="56px">
          <img class="avatar" src="https://cdn.quasar.dev/img/avatar4.jpg" />
        </q-avatar>
        <div class="column q-mt-md">
          <q-item-label class="text-body2 text-weight-700 no-letter-spacing">خشایار شمالی</q-item-label>
          <q-item-label class="caption-on-dark text-body2 no-letter-spacing">توسعه دهنده وب</q-item-label>
        </div>
      </div>
      <div class="row q-gutter-sm text-h6">
        <q-btn class="bg-primary text-white text-body2 no-letter-spacing" padding="6px 12px" rounded no-caps unelevated>
          <q-icon name="o_add" class="q-mr-xs" size="20px" />
          {{ $t("shared.labels.create") }}
        </q-btn>
        <q-btn class="bg-primary text-white text-body2 no-letter-spacing" padding="6px 12px" rounded no-caps unelevated
          @click="editProfile">
          <q-icon name="o_edit" class="q-mr-xs" size="20px" />
          {{ $t("shared.labels.edit") }}
        </q-btn>
        <q-btn class="bg-primary text-white text-body2 no-letter-spacing" padding="6px 12px" rounded no-caps unelevated>
          <q-icon name="o_delete" class="q-mr-xs" size="20px" />
          {{ $t("shared.labels.delete") }}
        </q-btn>
      </div>
    </q-toolbar>
  </q-page-sticky>

  <q-page-sticky v-else class="z-1 bg-main q-py-sm" style="padding-left: 20px; padding-right: 20px;" position="top" expand>
    <q-toolbar class="q-px-none row justify-between q-py-md">
      <div class="row items-center q-gutter-md">
        <q-avatar size="48px">
          <img class="avatar" src="https://cdn.quasar.dev/img/avatar4.jpg" />
        </q-avatar>
        <div class="column q-mt-md">
          <q-item-label class="text-body2 text-weight-700 no-letter-spacing">خشایار شمالی</q-item-label>
          <q-item-label class="caption-on-dark text-body2 no-letter-spacing">توسعه دهنده وب</q-item-label>
        </div>
      </div>
      <div class="row q-gutter-sm text-h6">
        <q-btn round class="bg-primary text-white text-caption" no-caps unelevated>
          <q-icon name="o_add" />
        </q-btn>
        <q-btn round class="bg-primary text-white text-caption" no-caps unelevated
          @click="editProfile">
          <q-icon name="o_edit" />
        </q-btn>
        <q-btn round class="bg-primary text-white text-caption" no-caps unelevated>
          <q-icon name="o_delete" />
        </q-btn>
      </div>
    </q-toolbar>
  </q-page-sticky>

  <div class="row q-col-gutter-md" :style="marginTop()">
    <div class="col-md col-sm col-xs-12">
      <sales-widget />
    </div>

    <div class="col-md-8 col-sm-8 col-xs-12">
      <sales-widget />
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

const marginTop = () => {
  return [
    $q.screen.xs ? 'margin-top:64px' : '',
    $q.screen.sm ? 'margin-top:64px' : '',
    $q.screen.gt.sm ? 'margin-top:56px' : ''
  ];
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
