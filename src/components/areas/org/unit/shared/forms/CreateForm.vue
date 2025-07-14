<template>
  <form-toolbar-container
    buttons
    :title="title"
    @submit-call-back="formStore.submitForm(form, action)"
  />

  <q-card class="form-container">
    <q-card-section>
      <q-form ref="form" autofocus>
        <div class="row q-col-gutter-md q-mb-md">
          <div class="col-md-6 col-sm-12 col-xs-12">
            <q-item-label class="caption-on-dark text-body2 q-mb-sm">
              {{ $t("shared.columns.orgTitle") }}
            </q-item-label>
            <org-lookup
              hide-bottom-space
              v-model:selectedId="formStore.model.value.orgId"
              v-model:selectedText="formStore.model.value.orgTitle"
              required
            />
          </div>
        </div>

        <div class="row q-col-gutter-md q-mb-md">
          <div class="col-md-6 col-sm-6 col-xs-12">
            <q-item-label class="caption-on-dark text-body2 q-mb-sm">
              {{ $t("shared.columns.code") }}
            </q-item-label>
            <custom-input
              hide-bottom-space
              v-model="formStore.model.value.code"
              required
            />
          </div>
        </div>

        <div class="row q-col-gutter-md q-mb-md">
          <div class="col-md-6 col-sm-12 col-xs-12">
            <q-item-label class="caption-on-dark text-body2 q-mb-sm">
              {{ $t("shared.columns.unitTypeTitle") }}
            </q-item-label>
            <unit-type-lookup
              hide-bottom-space
              v-model:selectedId="formStore.model.value.unitTypeId"
              v-model:selectedText="
                formStore.model.value.unitTypeTitle
              "
              required
            />
          </div>
        </div>

        <div class="row q-col-gutter-md q-mb-md">
          <div class="col-md-6 col-sm-12 col-xs-12">
            <q-item-label class="caption-on-dark text-body2 q-mb-sm">
              {{ $t("shared.columns.title") }}
            </q-item-label>
            <custom-input
              hide-bottom-space
              v-model="formStore.model.value.title"
              required
            />
          </div>
        </div>

        <div class="row q-col-gutter-md q-mb-md">
          <div class="col-md-6 col-sm-12 col-xs-12">
            <q-item-label class="caption-on-dark text-body2 q-mb-sm">
              {{ $t("shared.columns.locationTitle") }}
            </q-item-label>
            <location-lookup
              hide-bottom-space
              v-model:selectedId="formStore.model.value.locationId"
              v-model:selectedText="
                formStore.model.value.locationTitle
              "
              required
            />
          </div>
        </div>

        <div class="row q-col-gutter-md q-mb-md">
          <div class="col-md-6 col-sm-12 col-xs-12">
            <q-item-label class="caption-on-dark text-body2 q-mb-sm">
              {{ $t("shared.columns.parentTitle") }}
            </q-item-label>
            <unit-lookup
              hide-bottom-space
              v-model:selectedId="formStore.model.value.parentId"
              v-model:selectedText="formStore.model.value.parentTitle"
            />
          </div>
        </div>

        <div class="row q-col-gutter-md q-mb-md">
          <q-checkbox
            dense
            size="48px"
            v-model="formStore.model.value.isActive"
            :label="$t('shared.labels.isActive')"
          />
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script setup>
  import { ref } from "vue";
  import { useI18n } from "vue-i18n";
  import { useBaseInfoModel } from "src/components/areas/_shared/_composables/useBaseInfoModel";

  import FormToolbarContainer from "src/components/shared/toolbars/FormToolbarContainer.vue";
  import CustomInput from "src/components/shared/forms/CustomInput.vue";
  import OrgLookup from "src/components/shared/lookups/OrgLookup.vue";
  import UnitTypeLookup from "src/components/shared/lookups/UnitTypeLookup.vue";
  import UnitLookup from "src/components/shared/lookups/UnitLookup.vue";
  import LocationLookup from "src/components/shared/lookups/LocationLookup.vue";

  const { t } = useI18n();

  const props = defineProps({
    action: String,
    title: String,
  });

  const form = ref(null);
  const formStore = useBaseInfoModel({
    baseRoute: "org/unit",
    getCreateModel: true,
  });
</script>
