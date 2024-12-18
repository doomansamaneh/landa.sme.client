<template>
  <form-toolbar-container
    buttons
    :title="title"
    @submit-call-back="formStore.submitForm(form, action)"
  />

  <q-card class="form-container">
    <q-card-section>
      <q-form ref="form" autofocus>
        <div class="row q-gutter-md q-mb-md">
          <div class="col-md-6 col-sm-12 col-xs-12">
            <q-item-label
              class="caption-on-dark no-letter-spacing text-body2 q-mb-sm"
            >
              سازمان
            </q-item-label>
            <org-lookup
              hide-bottom-space
              v-model:selectedId="formStore.model.value.orgId"
              v-model:selectedText="formStore.model.value.orgTitle"
              :rules="[(val) => val !== null && val !== '']"
            />
          </div>
        </div>

        <div class="row q-gutter-md q-mb-md">
          <div class="col-md-3 col-sm-6 col-xs-12">
            <q-item-label
              class="caption-on-dark no-letter-spacing text-body2 q-mb-sm"
            >
              کد
            </q-item-label>
            <custom-input
              hide-bottom-space
              v-model="formStore.model.value.code"
              :rules="[(val) => val !== null && val !== '']"
            />
          </div>
        </div>

        <div class="row q-gutter-md q-mb-md">
          <div class="col-md-6 col-sm-12 col-xs-12">
            <q-item-label
              class="caption-on-dark no-letter-spacing text-body2 q-mb-sm"
            >
              نوع واحد
            </q-item-label>
            <unit-type-lookup
              hide-bottom-space
              v-model:selectedId="formStore.model.value.unitTypeId"
              v-model:selectedText="
                formStore.model.value.unitTypeTitle
              "
              :rules="[(val) => val !== null && val !== '']"
            />
          </div>
        </div>

        <div class="row q-gutter-md q-mb-md">
          <div class="col-md-6 col-sm-12 col-xs-12">
            <q-item-label
              class="caption-on-dark no-letter-spacing text-body2 q-mb-sm"
            >
              عنوان
            </q-item-label>
            <custom-input
              hide-bottom-space
              v-model="formStore.model.value.title"
              :rules="[(val) => val !== null && val !== '']"
            />
          </div>
        </div>

        <div class="row q-gutter-md q-mb-md">
          <div class="col-md-6 col-sm-12 col-xs-12">
            <q-item-label
              class="caption-on-dark no-letter-spacing text-body2 q-mb-sm"
            >
              محل جغرافیایی
            </q-item-label>
            <location-lookup
              hide-bottom-space
              v-model:selectedId="formStore.model.value.locationId"
              v-model:selectedText="
                formStore.model.value.locationTitle
              "
              :rules="[(val) => val !== null && val !== '']"
            />
          </div>
        </div>

        <div class="row q-gutter-md q-mb-md">
          <div class="col-md-6 col-sm-12 col-xs-12">
            <q-item-label
              class="caption-on-dark no-letter-spacing text-body2 q-mb-sm"
            >
              واحد بالادستی
            </q-item-label>
            <unit-lookup
              hide-bottom-space
              v-model:selectedId="formStore.model.value.parentId"
              v-model:selectedText="formStore.model.value.parentTitle"
            />
          </div>
        </div>

        <div class="row q-gutter-md q-mb-md">
          <q-checkbox
            dense
            size="48px"
            v-model="formStore.model.value.isActive"
            label="فعال"
          />
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script setup>
  import { ref } from "vue";
  import { useBaseInfoModel } from "src/components/areas/_shared/_composables/useBaseInfoModel";

  import FormToolbarContainer from "src/components/shared/FormToolbarContainer.vue";
  import CustomInput from "src/components/shared/forms/CustomInput.vue";
  import OrgLookup from "src/components/shared/lookups/OrgLookup.vue";
  import UnitTypeLookup from "src/components/shared/lookups/UnitTypeLookup.vue";
  import UnitLookup from "src/components/shared/lookups/UnitLookup.vue";
  import LocationLookup from "src/components/shared/lookups/LocationLookup.vue";

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
