<template>
  <div
    v-if="$q.screen.xs"
    class="row q-gutter-x-sm q-py-md items-center justify-between"
  >
    <back-button />
    <div class="col ellipsis-2-lines text-body1 text-weight-700">
      {{ $t("pages.renew-subscription") }}
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
            {{ $t("page.renew-subscription.title") }}
          </q-item-label>
          <q-item-label class="text-body2 caption-on-dark">
            {{ $t("page.renew-subscription.caption") }}
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
      <q-form
        ref="form"
        autofocus
        :class="$q.screen.xs ? 'q-mb-md' : 'q-my-md'"
      >
        <div class="q-mb-lg">
          <div class="col-md col-sm-12 col-xs-12">
            <q-item-label class="text-body2 caption-on-dark q-mb-sm">
              {{ $t("page.renew-subscription.business-name-label") }}
            </q-item-label>
            <q-field dense outlined>
              <template v-slot:control>
                <div>{{ currentPlan?.businessTitle }}</div>
              </template>
            </q-field>
          </div>
        </div>

        <div class="row items-center_ q-mb-lg q-col-gutter-md">
          <div class="col-md col-sm col-xs-12">
            <q-item-label class="text-body2 caption-on-dark q-mb-sm">
              {{ $t("page.renew-subscription.current-plan") }}
            </q-item-label>
            <q-field dense outlined>
              <template v-slot:control>
                <div class="q-py-xs line-height-xs">
                  {{ currentPlan?.planTitle }}
                </div>
              </template>
            </q-field>
          </div>

          <div class="col-md-4 col-sm-4 col-xs-12">
            <q-item-label class="text-body2 caption-on-dark q-mb-sm">
              {{ $t("page.renew-subscription.to-date") }}
            </q-item-label>
            <q-field dense outlined>
              <template v-slot:control>
                <div>{{ currentPlan?.toDate }}</div>
              </template>
            </q-field>
          </div>
        </div>

        <select-plan :model="model" />
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
  import { ref, onMounted } from "vue";
  import { useRoute } from "vue-router";
  import { fetchWrapper } from "src/helpers";

  import SelectPlan from "src/components/management/shared/SelectPlan.vue";
  import BackButton from "src/components/shared/buttons/GoBackLink.vue";

  const route = useRoute();

  const form = ref(null);
  const currentPlan = ref({});
  const model = ref({});

  async function loadData() {
    const businessId = route.params.businessId;
    await fetchWrapper
      .get(`business/getBusiness/${businessId}`)
      .then((response) => {
        handleBusinessData(response.data.data, businessId);
      });
  }

  function handleBusinessData(data, businessId) {
    currentPlan.value.businessTitle = data.title;
    if (data.lastPayment) {
      currentPlan.value.planTitle = data.lastPayment.planTitle;
      currentPlan.value.fromDate = data.lastPayment.fromDateString;
      currentPlan.value.toDate = data.lastPayment.toDateString;
    }
    model.value.businessId = businessId;
  }

  onMounted(() => {
    loadData();
  });

  async function submitForm() {
    const success = await form.value.validate();
    if (!success) return;

    const response = await fetchWrapper.post(
      "business/addPayment",
      model.value
    );

    if (response?.data?.data?.url) {
      window.location.href = response.data.data.url;
    } else {
      console.warn("No URL returned from server");
    }
  }
</script>

<style lang="scss" scoped>
  .card-desktop {
    width: 700px !important;
  }
</style>
