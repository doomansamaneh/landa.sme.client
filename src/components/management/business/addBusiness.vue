<template>
  <div
    v-if="$q.screen.xs"
    class="row q-gutter-x-sm q-py-md items-center justify-between"
  >
    <back-button />

    <div class="col ellipsis-2-lines text-body1 text-weight-700">
      {{ $t("pages.add-new-business") }}
    </div>
  </div>
  <q-card
    :class="{
      'card-desktop bordered q-my-xl': $q.screen.gt.xs,
      'no-border no-shadow bg-transparent': $q.screen.lt.sm,
    }"
  >
    <q-card-section v-if="$q.screen.gt.xs">
      <q-item>
        <q-item-section>
          <q-item-label class="text-h6 text-weight-700">
            {{ $t("pages.add-new-business") }}
          </q-item-label>
          <q-item-label class="text-body2 caption-on-dark">
            {{ $t("page.add-business.caption") }}
          </q-item-label>
        </q-item-section>
        <q-card-actions class="no-padding">
          <div class="flex items-center">
            <back-button />
          </div>
        </q-card-actions>
      </q-item>
    </q-card-section>
    <q-separator v-if="$q.screen.gt.xs" />

    <q-card-section
      :class="{
        'q-mx-md': $q.screen.gt.xs,
        'no-padding': $q.screen.lt.sm,
      }"
    >
      شما می‌توانید با یک نام کاربری، چندین کسب و کار ایجاد کنید. هر
      کسب و کار داده‌های ویژه خود را دارد و اشتراک جداگانه‌ای برای آن
      محاسبه می‌شود.
    </q-card-section>

    <q-card-section
      :class="{
        'q-mx-md': $q.screen.gt.xs,
        'no-padding': $q.screen.lt.sm,
      }"
    >
      <q-form
        ref="form"
        autofocus
        :class="$q.screen.xs ? 'q-mb-md' : 'q-my-md'"
      >
        <div>
          <custom-input
            v-model="model.businessTitle"
            :label="$t('page.add-business.business-name-label')"
            required
          />
        </div>

        <div class="q-mt-lg">
          <select-plan :model="model" />
        </div>
      </q-form>
    </q-card-section>

    <q-card-actions
      :class="{
        'q-px-none q-pt-none q-pb-lg': $q.screen.xs,
        'bg-on-dark q-pa-lg': $q.screen.gt.xs,
      }"
    >
      <div class="row q-gutter-md items-center">
        <q-btn
          type="submit"
          @click="submitForm"
          unelevated
          class="green-shadow green-gradient"
          rounded
          text-color="white"
          no-caps
          padding="8px 16px"
        >
          <q-icon
            name="o_monetization_on"
            class="q-pr-xs"
            size="xs"
          />
          {{ $t("page.add-business.payment") }}
        </q-btn>
        <span class="text-caption">
          {{ $t("page.add-business.pay-caption") }}
        </span>
      </div>
    </q-card-actions>
  </q-card>
</template>

<script setup>
  import { ref } from "vue";
  import { useQuasar } from "quasar";

  import SelectPlan from "src/components/management/shared/SelectPlan.vue";
  import BackButton from "src/components/shared/buttons/GoBackLink.vue";
  import CustomInput from "src/components/shared/forms/CustomInput.vue";

  const $q = useQuasar();
  const model = ref({});
  const form = ref(null);

  const submitForm = () => {
    $q.notify({
      type: "positive",
      message: "عملیات با موفقیت انجام شد",
      timeout: 1500,
    });
  };
</script>

<style lang="scss" scoped>
  .card-desktop {
    width: 700px !important;
  }
</style>
