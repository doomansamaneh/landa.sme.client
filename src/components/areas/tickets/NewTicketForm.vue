<template>
  <q-form @submit.prevent="onSubmit" ref="form">
    <!-- Ticket Type Selection -->
    <div class="q-mt-sm">
      <div class="row items-center q-mb-md">
        <q-icon
          name="o_category"
          size="20px"
          color="primary"
          class="q-mr-sm"
        />
        <span class="text-h6 text-weight-medium text-grey-8">
          {{ $t("shared.labels.ticketType") }}
        </span>
      </div>
      <div class="row q-col-gutter-md">
        <div
          v-for="option in helper.getEnumOptions(
            feedbackType,
            'feedbackType'
          )"
          :key="option.value"
          class="col-12 col-sm-6"
        >
          <q-card
            v-ripple
            class="cursor-pointer transition-all q-hoverable"
            :class="
              model.typeId === option.value
                ? 'bg-primary active-shine text-white shadow-4'
                : 'bg-white text-grey-8 shadow-2'
            "
            @click="model.typeId = option.value"
          >
            <span class="q-focus-helper" />
            <q-card-section>
              <div class="row items-center q-gutter-md">
                <q-avatar
                  size="48px"
                  :class="
                    model.typeId === option.value
                      ? 'bg-white text-primary'
                      : 'bg-primary text-white'
                  "
                  class="shadow-2"
                >
                  <q-icon
                    :name="
                      option.value === feedbackType.incident
                        ? 'o_error'
                        : 'o_lightbulb'
                    "
                    size="24px"
                  />
                </q-avatar>
                <div class="col">
                  <div class="text-subtitle1 text-weight-medium">
                    {{ option.label }}
                  </div>
                  <div class="text-caption opacity-80">
                    {{
                      option.value === feedbackType.incident
                        ? $t("shared.labels.reportProblemOrError")
                        : $t("shared.labels.newRequestOrSuggestion")
                    }}
                  </div>
                </div>
                <q-icon
                  v-if="model.typeId === option.value"
                  name="check"
                  size="20px"
                  color="white"
                />
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>

    <!-- Ticket Description -->
    <div class="q-mt-lg">
      <div class="row items-center q-mb-md">
        <q-icon
          name="o_description"
          size="20px"
          color="primary"
          class="q-mr-sm"
        />
        <span class="text-h6 text-weight-medium text-grey-8">
          {{ $t("shared.labels.ticketDescription") }}
        </span>
      </div>
      <div>
        <q-editor
          v-model="model.comment"
          :placeholder="$t('shared.labels.describeTicketDetails')"
          required
          class="q-mb-md"
        />
        <tip-banner class="q-mt-md">
          <template #body>
            <div class="row q-gutter-sm">
              <div class="col-12 col-sm-6">
                <div class="row items-center q-gutter-xs no-wrap">
                  <q-icon name="o_info" size="14px" color="info" />
                  <span class="text-body3">
                    {{ $t("shared.labels.technicalProblemSteps") }}
                  </span>
                </div>
              </div>
              <div class="col-12 col-sm-6">
                <div class="row items-center q-gutter-xs no-wrap">
                  <q-icon name="o_info" size="14px" color="info" />
                  <span class="text-body3">
                    {{ $t("shared.labels.requestDetails") }}
                  </span>
                </div>
              </div>
            </div>
          </template>
        </tip-banner>
      </div>
    </div>

    <q-card-actions align="center" class="q-mt-md q-mb-xl">
      <q-btn
        padding="8px 16px"
        rounded
        unelevated
        color="primary"
        class="primary-shadow primary-gradient"
        type="submit"
      >
        <div class="text-body2">
          {{ $t("shared.labels.submitTicket") }}
        </div>
      </q-btn>
    </q-card-actions>
  </q-form>
</template>

<script setup>
  import { ref, computed } from "vue";
  import { helper } from "src/helpers";
  import { feedbackType, guidEmpty } from "src/constants";
  import { useFormActions } from "src/composables/useFormActions";
  import { useTickets } from "src/composables/useTickets";

  import TipBanner from "src/components/shared/TipBanner.vue";

  const model = ref({
    statusId: 1,
    typeId: feedbackType.incident,
    userId: guidEmpty,
    businessId: guidEmpty,
    comment: "",
  });

  const formStore = useFormActions("business", model);
  const ticketStore = useTickets();

  const form = ref(null);
  const isSubmitting = ref(false);
  const emit = defineEmits(["submit"]);

  async function onSubmit() {
    isSubmitting.value = true;
    try {
      const result = await formStore.submitForm(
        form.value,
        "addFeedback"
      );
      if (result) {
        emit("submit");
        ticketStore.closeNewTicketDialog();
      }
    } catch (error) {
      console.error("Error submitting ticket:", error);
    } finally {
      isSubmitting.value = false;
    }
  }
</script>
