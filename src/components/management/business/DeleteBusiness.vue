<template>
  <q-card
    flat
    class="border-radius-lg"
    :style="$q.screen.gt.xs ? 'width: 400px' : ''"
  >
    <q-card-section class="flex items-center justify-between">
      <div class="text-body2 text-bold">
        {{ $t("delete-business-page.title") }}
      </div>
      <q-space />
      <slot name="close-icon">
        <back-button />
      </slot>
    </q-card-section>

    <q-card-section>
      {{ $t("shared.labels.deleteBusinessMessage") }}
    </q-card-section>

    <q-card-section>
      <q-form @submit="submitForm" ref="form" autofocus>
        <custom-input
          outlined
          v-model="password"
          :type="isPwd ? 'password' : 'text'"
          :placeholder="$t('login-page.placeholders.password')"
          dense
          required
          lazy-rules
          :rules="[(val) => val !== null && val !== '']"
        >
          <template #append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              size="xs"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </custom-input>
      </q-form>
    </q-card-section>
    <actions @ok-clicked="submitForm">
      <template #ok-label>
        {{ $t("delete-business-page.buttons.delete-business") }}
      </template>
    </actions>
  </q-card>
</template>

<script setup>
  import { ref } from "vue";
  import { fetchWrapper } from "src/helpers";

  import Actions from "src/components/shared/forms/FormCardActions.vue";
  import BackButton from "src/components/shared/buttons/GoBackLink.vue";
  import CustomInput from "src/components/shared/forms/CustomInput.vue";

  const props = defineProps({
    id: String,
  });

  const emit = defineEmits(["submitted"]);
  const form = ref(null);

  const password = ref("");
  const isPwd = ref(true);

  async function submitForm() {
    const success = await form.value.validate();
    if (success) {
      deleteBusiness();
    }
  }

  async function deleteBusiness() {
    await fetchWrapper.post("Business/RemoveBusiness", {
      id: props.id,
      password: password.value,
    });
  }
</script>
