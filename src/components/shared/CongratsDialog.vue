<template>
  <q-dialog
    persistent
    :transition-duration="$q.screen.gt.xs ? 600 : 300"
    transition-show="slide-up"
    transition-hide="slide-down"
    :maximized="$q.screen.xs"
    v-model="visible"
  >
    <q-card
      class="congrats-card q-rounded-xl shadow-4 hide-scrollbar"
      :style="$q.screen.lt.sm ? '' : 'width: 650px; max-width: 95vw;'"
    >
      <q-card-section class="text-center q-py-lg q-px-xl">
        <div class="text-h3 text-weight-bold">
          {{ $t("messages.welcome") }}
        </div>
        <div class="text-body1 q-mt-sm">
         {{ $t("messages.welcomeDescription") }}
        </div>
      </q-card-section>

      <q-form @submit.prevent="onSubmit" ref="formRef">
        <q-card-section
          class="q-px-lg q-py-none scroll"
          :style="$q.screen.gt.xs ? 'height: 50vh;' : ''"
        >
          <div class="q-mb-md">
            <custom-select
              v-model="model.cityId"
              :label="$t('shared.labels.city')"
              :options="helper.getEnumOptions(city, 'city')"
              :placeholder="$t('shared.labels.selectCity')"
              required
            />
          </div>

          <div class="q-mb-md">
            <custom-select
              v-model="model.activityFieldId"
              :label="$t('shared.labels.activityField')"
              :options="
                helper.getEnumOptions(
                  businessActivityField,
                  'businessActivityField'
                )
              "
              :placeholder="$t('shared.labels.selectActivityField')"
              required
            />
          </div>

          <div class="q-mb-md">
            <custom-select
              v-model="model.leadSourceId"
              :label="$t('shared.labels.leadSource')"
              :options="
                helper.getEnumOptions(
                  leadSourceType,
                  'leadSourceType'
                )
              "
              :placeholder="$t('shared.labels.selectLeadSource')"
              required
            />
          </div>

          <div
            class="q-mb-md"
            v-if="model.leadSourceId === leadSourceType.none"
          >
            <custom-input
              v-model="model.leadSource"
              :label="$t('shared.labels.leadSourceDescription')"
              :placeholder="$t('shared.labels.enterLeadSource')"
              type="textarea"
              :maxlength="240"
              required
            />
          </div>
        </q-card-section>

        <q-card-actions
          align="right"
          class="q-pa-md bg-on-dark"
          :class="$q.screen.gt.xs ? '' : 'fixed-bottom'"
        >
          <q-btn
            type="submit"
            unelevated
            rounded
            padding="8px 16px"
            class="primary-gradient primary-shadow text-white text-weight-medium"
            color="primary"
            :label="$t('shared.labels.save')"
            :loading="isLoading"
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup>
  import { ref, computed, watch } from "vue";
  import { useQuasar } from "quasar";
  import { useFirstLogin } from "src/composables/useFirstLogin";
  import {
    city,
    country,
    leadSourceType,
    businessActivityField,
  } from "src/constants";
  import { fetchWrapper, helper } from "src/helpers";

  import CustomInput from "src/components/shared/forms/CustomInput.vue";
  import CustomSelect from "src/components/shared/forms/CustomSelect.vue";

  const store = useFirstLogin();
  const $q = useQuasar();

  const visible = computed(() => store.firstLogin.value);
  const formRef = ref(null);
  const isLoading = ref(false);

  const model = ref({
    countryId: 98,
    cityId: null,
    activityFieldId: null,
    leadSourceId: null,
    leadSource: "",
  });

  async function onSubmit() {
    if (!formRef.value) return;

    const isValid = await formRef.value.validate();
    if (!isValid) return;

    isLoading.value = true;

    try {
      await fetchWrapper.post("business/SaveProfile", model.value);
      store.completeFirstLogin();
    } catch (error) {
      console.error("Error saving profile:", error);
    } finally {
      isLoading.value = false;
    }
  }

  watch(visible, (newValue) => {
    if (!newValue) {
      store.showTutorialAfterDialogClose();
    }
  });
</script>
