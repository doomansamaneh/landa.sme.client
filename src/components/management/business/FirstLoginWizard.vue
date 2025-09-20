<template>
  <div :class="headerMargin()">
    <tip-banner
      :title="$t('pages.first-login-wizard')"
      :tip="$t('shared.labels.firstLoginWizardTip')"
      :class="$q.screen.gt.sm ? 'q-mb-md' : 'q-mb-md q-mx-md'"
      class="z-1"
    />
    <q-stepper
      :class="styles()"
      v-model="step"
      ref="stepper"
      :active-color="$q.dark.isActive ? 'yellow' : 'primary'"
      :done-color="$q.dark.isActive ? 'yellow' : 'primary'"
      animated
      header-class="text-weight-bold"
      class="z-1"
    >
      <q-step
        prefix="1"
        :name="1"
        :title="$t('shared.labels.basicInfo')"
        icon="info"
        :done="step > 1"
        class="hide-scrollbar overflow-hidden-y"
      >
        <basic-info />
      </q-step>

      <q-step
        prefix="2"
        :name="2"
        :title="$t('shared.labels.contact')"
        icon="phone"
        :done="step > 2"
        class="hide-scrollbar overflow-hidden-y"
      >
        <contact-info />
      </q-step>

      <q-step
        prefix="3"
        :name="3"
        :title="$t('shared.labels.tax')"
        icon="paid"
        :done="step > 3"
        class="hide-scrollbar overflow-hidden-y"
      >
        <vat-info />
      </q-step>

      <q-step
        prefix="4"
        :name="4"
        :title="$t('shared.labels.salaryAndWages')"
        icon="payments"
        :done="step > 4"
        class="hide-scrollbar overflow-hidden-y"
      >
        <salary-info />
      </q-step>

      <q-step
        prefix="5"
        :name="5"
        :title="$t('shared.labels.commercePurchaseSale')"
        icon="storefront"
        :done="step > 5"
        class="hide-scrollbar overflow-hidden-y"
      >
        <sales-info />
      </q-step>

      <q-step
        prefix="6"
        :name="6"
        :title="$t('shared.labels.logo')"
        icon="diamond"
        :done="step > 6"
        class="hide-scrollbar overflow-hidden-y"
      >
        <logo-info />
      </q-step>

      <template #navigation>
        <q-stepper-navigation>
          <q-btn
            padding="8px 16px"
            no-caps
            v-if="step === 6"
            class="primary-shadow primary-gradient text-body1"
            unelevated
            rounded
            @click="save"
            color="primary"
            :label="$t('shared.labels.save')"
          />

          <q-btn
            padding="8px 16px"
            no-caps
            v-else
            class="primary-shadow primary-gradient text-body1"
            unelevated
            rounded
            @click="$refs.stepper.next()"
            color="primary"
            :label="$t('shared.labels.next')"
          />

          <q-btn
            padding="8px 16px"
            no-caps
            rounded
            v-if="step > 1"
            flat
            class="primary q-ml-sm text-body1"
            @click="$refs.stepper.previous()"
            :label="$t('shared.labels.previous')"
          />
        </q-stepper-navigation>
      </template>
    </q-stepper>
  </div>
</template>

<script setup>
  import { ref } from "vue";
  import { useQuasar } from "quasar";
  import { useRouter } from "vue-router";
  import { useAppConfigModel } from "src/components/areas/cmn/_composables/useAppConfigModel";

  import BasicInfo from "src/components/areas/cmn/appConfig/BasicInfoForm.vue";
  import ContactInfo from "src/components/areas/cmn/appConfig/ContactInfoForm.vue";
  import VatInfo from "src/components/areas/cmn/appConfig/VATInfoForm.vue";
  import SalaryInfo from "src/components/areas/cmn/appConfig/SalaryInfoForm.vue";
  import SalesInfo from "src/components/areas/cmn/appConfig/SalesInfoForm.vue";
  import LogoInfo from "src/components/areas/cmn/appConfig/LogoInfoForm.vue";
  import TipBanner from "src/components/shared/TipBanner.vue";

  const $q = useQuasar();
  const router = useRouter();
  const step = ref(1);
  const configStore = useAppConfigModel();

  const save = async () => {
    await configStore.saveAppConfig();

    router.push("/dashboard");
  };

  const styles = () => {
    return $q.screen.gt.sm
      ? "q-card bordered"
      : "no-border no-shadow bg-main";
  };

  const headerMargin = () => {
    return $q.screen.gt.xs
      ? "q-mt-lg q-pt-md q-pb-md q-mb-xl"
      : "q-my-lg";
  };
</script>

<style lang="scss">
  .q-stepper--horizontal .q-stepper__line:before,
  .q-stepper--horizontal .q-stepper__line:after {
    height: 2px;
  }
</style>
