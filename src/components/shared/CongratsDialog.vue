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
          لطفاً اطلاعات زیر رو تکمیل کنید. پر کردنش باعث می‌شه بتونیم
          خدمات حسابداری لاندا رو دقیقتر و مناسبتر برای شما فراهم
          کنیم.
        </div>
      </q-card-section>

      <q-form
        @submit.prevent="onSubmit"
        ref="formRef"
        class="q-card-section q-pa-none"
      >
        <!-- <div class="q-mb-md">
          <custom-select
            v-model="model.countryId"
            :label="$t('shared.labels.country')"
            :options="helper.getEnumOptions(country, 'country')"
            :placeholder="$t('shared.labels.selectCountry')"
            required
          />
        </div> -->

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
              helper.getEnumOptions(leadSourceType, 'leadSourceType')
            "
            :placeholder="$t('shared.labels.selectLeadSource')"
            required
          />
        </div>

        <div
          class="q-mb-md"
          v-if="model.leadSourceId === leadSourceType.None"
        >
          <custom-input
            v-model="model.leadSource"
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
        model.value
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
