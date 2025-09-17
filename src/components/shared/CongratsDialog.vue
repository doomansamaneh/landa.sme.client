<template>
  <q-dialog
    persistent
    transition-duration="600"
    transition-show="slide-down"
    transition-hide="slide-up"
    v-model="visible"
  >
    <q-card class="congrats-card q-pa-lg q-rounded-xl shadow-4">
      <q-card-section class="text-center q-py-lg q-pb-md">
        <q-img
          spinner-color="primary"
          width="100px"
          src="celebration.svg"
          class="sunshine-animation"
          :style="
            $q.dark.isActive
              ? 'filter: drop-shadow(0 0 15px #FFFF0090);'
              : 'filter: drop-shadow(0 0 15px #FFFF00);'
          "
        />
        <div class="text-h6 q-mt-lg text-weight-bold">
          به لاندا خوش آمدید
        </div>
        <div class="text-body1 q-mt-sm text-grey-7">
          لطفاً اطلاعات کسب‌وکار خود را تکمیل کنید
        </div>
      </q-card-section>

      <q-form
        @submit.prevent="onSubmit"
        ref="formRef"
        class="q-card-section q-pa-none"
      >
        <!-- Profile Form Fields -->
        <div class="q-mb-md">
          <custom-select
            v-model="profileData.countryId"
            :label="$t('shared.labels.country')"
            :options="countryOptions"
            :placeholder="$t('shared.labels.selectCountry')"
            required
          />
        </div>

        <div class="q-mb-md">
          <custom-select
            v-model="profileData.cityId"
            :label="$t('shared.labels.city')"
            :options="cityOptions"
            :placeholder="$t('shared.labels.selectCity')"
            required
          />
        </div>

        <div class="q-mb-md">
          <custom-select
            v-model="profileData.activityFieldId"
            :label="$t('shared.labels.activityField')"
            :options="activityFieldOptions"
            :placeholder="$t('shared.labels.selectActivityField')"
            required
          />
        </div>

        <div class="q-mb-md">
          <custom-select
            v-model="profileData.leadSourceId"
            :label="$t('shared.labels.leadSource')"
            :options="leadSourceOptions"
            :placeholder="$t('shared.labels.selectLeadSource')"
            required
          />
        </div>

        <div
          class="q-mb-md"
          v-if="profileData.leadSourceId === leadSourceType.None"
        >
          <custom-input
            v-model="profileData.leadSource"
            :label="$t('shared.labels.leadSourceDescription')"
            :placeholder="$t('shared.labels.enterLeadSource')"
            type="textarea"
            :maxlength="240"
          />
        </div>

        <q-card-actions align="right" class="q-mt-md">
          <q-btn
            type="submit"
            unelevated
            rounded
            padding="10px 24px"
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
  import { useI18n } from "vue-i18n";
  import { useQuasar } from "quasar";
  import { useFirstUsageWizard } from "src/composables/useFirstUsageWizard";
  import { fetchWrapper } from "src/helpers";
  import CustomInput from "src/components/shared/forms/CustomInput.vue";
  import CustomSelect from "src/components/shared/forms/CustomSelect.vue";
  import {
    leadSourceType,
    country,
    city,
    businessActivityField,
  } from "src/constants";

  const store = useFirstUsageWizard();
  const { t } = useI18n();
  const $q = useQuasar();

  const visible = computed(() => store.firstLogin.value);
  const formRef = ref(null);
  const isLoading = ref(false);

  const profileData = ref({
    countryId: null,
    cityId: null,
    activityFieldId: null,
    leadSourceId: null,
    leadSource: "",
  });

  // Country options
  const countryOptions = computed(() => [
    { label: t("shared.labels.iran"), value: country.Iran },
    {
      label: t("shared.labels.unitedStates"),
      value: country.UnitedState,
    },
  ]);

  // City options
  const cityOptions = computed(() => [
    { label: t("shared.labels.tehran"), value: city.Tehran },
    { label: t("shared.labels.karaj"), value: city.Karaj },
    { label: t("shared.labels.qazvin"), value: city.Qazvin },
    { label: t("shared.labels.qom"), value: city.Qom },
    { label: t("shared.labels.isfahan"), value: city.Isfahan },
    { label: t("shared.labels.shiraz"), value: city.Shiraz },
    { label: t("shared.labels.tabriz"), value: city.Tabriz },
    { label: t("shared.labels.urmia"), value: city.Urmia },
    { label: t("shared.labels.rasht"), value: city.Rasht },
    { label: t("shared.labels.sari"), value: city.Sari },
    { label: t("shared.labels.gorgan"), value: city.Gorgan },
    { label: t("shared.labels.ardabil"), value: city.Ardabil },
    { label: t("shared.labels.zanjan"), value: city.Zanjan },
    { label: t("shared.labels.hamedan"), value: city.Hamedan },
    { label: t("shared.labels.kermanshah"), value: city.Kermanshah },
    { label: t("shared.labels.sanandaj"), value: city.Sanandaj },
    { label: t("shared.labels.ilam"), value: city.Ilam },
    {
      label: t("shared.labels.khorramabad"),
      value: city.Khorramabad,
    },
    { label: t("shared.labels.ahvaz"), value: city.Ahvaz },
    { label: t("shared.labels.bushehr"), value: city.Bushehr },
    { label: t("shared.labels.yasuj"), value: city.Yasuj },
    {
      label: t("shared.labels.bandarAbbas"),
      value: city.BandarAbbas,
    },
    { label: t("shared.labels.zahedan"), value: city.Zahedan },
    { label: t("shared.labels.kerman"), value: city.Kerman },
    { label: t("shared.labels.yazd"), value: city.Yazd },
    { label: t("shared.labels.mashhad"), value: city.Mashhad },
    { label: t("shared.labels.bojnord"), value: city.Bojnord },
    { label: t("shared.labels.birjand"), value: city.Birjand },
  ]);

  // Activity field options
  const activityFieldOptions = computed(() => [
    {
      label: t("shared.labels.trade"),
      value: businessActivityField.Trade,
    },
    { label: t("shared.labels.it"), value: businessActivityField.IT },
    {
      label: t("shared.labels.accounting"),
      value: businessActivityField.Accounting,
    },
    {
      label: t("shared.labels.services"),
      value: businessActivityField.Services,
    },
    {
      label: t("shared.labels.foodServices"),
      value: businessActivityField.FoodServices,
    },
    {
      label: t("shared.labels.other"),
      value: businessActivityField.Other,
    },
  ]);

  // Lead source options
  const leadSourceOptions = computed(() => [
    {
      label: t("shared.labels.google"),
      value: leadSourceType.Google,
    },
    {
      label: t("shared.labels.socialNetwork"),
      value: leadSourceType.SocialNetwork,
    },
    {
      label: t("shared.labels.customerReferal"),
      value: leadSourceType.CustomerReferal,
    },
    {
      label: t("shared.labels.advertisement"),
      value: leadSourceType.Advertisement,
    },
    { label: t("shared.labels.event"), value: leadSourceType.Event },
    {
      label: t("shared.labels.website"),
      value: leadSourceType.Website,
    },
    {
      label: t("shared.labels.emailCampaign"),
      value: leadSourceType.EmailCampaign,
    },
    { label: t("shared.labels.none"), value: leadSourceType.None },
  ]);

  const notifyResponse = (data) => {
    if (data.message) {
      $q.notify({
        type: "positive",
        message: data.message,
      });
    }
  };

  async function onSubmit() {
    if (!formRef.value) return;

    const isValid = await formRef.value.validate();
    if (!isValid) return;

    isLoading.value = true;

    try {
      const response = await fetchWrapper.post(
        "business/SaveProfile",
        profileData.value
      );

      // Show success message
      notifyResponse(response.data);

      // Complete the first login (this sets the flag to show tutorial after dialog closes)
      store.completeFirstLogin();
    } catch (error) {
      console.error("Error saving profile:", error);
    } finally {
      isLoading.value = false;
    }
  }

  // Watch for dialog close and show tutorial if needed
  watch(visible, (newValue) => {
    if (!newValue) {
      // Dialog is closing, check if we should show tutorial
      store.showTutorialAfterDialogClose();
    }
  });
</script>

<style scoped lang="scss">
  .congrats-card {
    width: 650px;
    max-width: 95vw;
  }

  .sunshine-animation {
    animation: sunshine 3s infinite;
  }

  @keyframes sunshine {
    0%,
    100% {
      filter: drop-shadow(0 0 15px #ffff00e6);
    }
    50% {
      filter: drop-shadow(0 0 30px #ffff0090);
    }
  }
</style>
