<template>
  <template v-if="!edit">
    <q-btn
      no-caps
      unelevated
      rounded
      padding="6px 12px"
      class="primary-gradient primary-shadow text-white text-on-dark"
    >
      <q-icon name="o_add" size="xs" class="q-mr-xs text-body2" />
      {{ $t("shared.labels.addContact") }}
      <q-menu class="border-radius-lg" :offset="[0, 20]" fit>
        <q-list dense padding>
          <q-item
            clickable
            v-close-popup
            tabindex="0"
            @click="formStore.addPhone()"
          >
            <div class="q-py-sm">
              <q-item-section avatar>
                <q-avatar class="bg-on-dark" size="sm">
                  <q-icon name="o_call" size="16px" />
                </q-avatar>
              </q-item-section>
            </div>
            <q-item-section>
              <div class="text-body2">
                {{ $t("shared.labels.phone") }}
              </div>
            </q-item-section>
          </q-item>

          <q-item
            clickable
            v-close-popup
            tabindex="0"
            @click="formStore.addMobile()"
          >
            <div class="q-py-sm">
              <q-item-section avatar>
                <q-avatar class="bg-on-dark" size="sm">
                  <q-icon name="o_phone_android" size="16px" />
                </q-avatar>
              </q-item-section>
            </div>
            <q-item-section>
              <div class="text-body2">
                {{ $t("shared.labels.mobile") }}
              </div>
            </q-item-section>
          </q-item>

          <q-item
            clickable
            v-close-popup
            tabindex="0"
            @click="formStore.addEmail()"
          >
            <div class="q-py-sm">
              <q-item-section avatar>
                <q-avatar class="bg-on-dark" size="sm">
                  <q-icon name="o_mail" size="16px" />
                </q-avatar>
              </q-item-section>
            </div>
            <q-item-section>
              <div class="text-body2">
                {{ $t("shared.labels.email") }}
              </div>
            </q-item-section>
          </q-item>

          <q-item
            clickable
            v-close-popup
            tabindex="0"
            @click="formStore.addWebsite()"
          >
            <div class="q-py-sm">
              <q-item-section avatar>
                <q-avatar class="bg-on-dark" size="sm">
                  <q-icon name="o_public" size="16px" />
                </q-avatar>
              </q-item-section>
            </div>
            <q-item-section>
              <div class="text-body2">
                {{ $t("shared.labels.website") }}
              </div>
            </q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>

    <div class="q-pt-md q-col-gutter-md">
      <div
        v-for="(item, index) in formStore.model.value
          .customerContactPhones"
        :key="index"
      >
        <contact-item
          :item="item"
          :index="index"
          :title="$t('shared.labels.phone')"
          @item-deleted="formStore.deletePhone(index)"
          @item-added="formStore.addPhone(index)"
          :type-id="contactType.phone"
        >
          <template #header-title>
            <q-icon name="o_call" size="18px" class="q-mx-sm" />
            <span>{{ $t("shared.labels.phone") }}</span>
          </template>
        </contact-item>
      </div>

      <div
        v-for="(item, index) in formStore.model.value
          .customerContactMobiles"
        :key="index"
      >
        <contact-item
          :item="item"
          :index="index"
          :title="$t('shared.labels.mobile')"
          @item-deleted="formStore.deleteMobile(index)"
          @item-added="formStore.addMobile(index)"
          :type-id="contactType.mobile"
        >
          <template #header-title>
            <q-icon
              name="o_phone_android"
              size="18px"
              class="q-mx-sm"
            />
            <span>{{ $t("shared.labels.mobile") }}</span>
          </template>
        </contact-item>
      </div>

      <div
        v-for="(item, index) in formStore.model.value
          .customerContactEmails"
        :key="index"
      >
        <contact-item
          :item="item"
          :index="index"
          :title="$t('shared.labels.email')"
          @item-deleted="formStore.deleteEmail(index)"
          @item-added="formStore.addEmail(index)"
          :type-id="contactType.email"
        >
          <template #header-title>
            <q-icon name="o_email" size="18px" class="q-mx-sm" />
            <span>{{ $t("shared.labels.email") }}</span>
          </template>
        </contact-item>
      </div>

      <div
        v-for="(item, index) in formStore.model.value
          .customerContactWebsites"
        :key="index"
      >
        <contact-item
          :item="item"
          :index="index"
          :title="$t('shared.labels.website')"
          @item-deleted="formStore.deleteWebsite(index)"
          @item-added="formStore.addWebsite(index)"
          :type-id="contactType.website"
        >
          <template #header-title>
            <q-icon name="o_public" size="18px" class="q-mx-sm" />
            <span>{{ $t("shared.labels.website") }}</span>
          </template>
        </contact-item>
      </div>
    </div>
  </template>
</template>

<script setup>
  import { onMounted } from "vue";
  import { useI18n } from "vue-i18n";
  import { useRoute } from "vue-router";
  import { contactType } from "src/constants";

  import ContactItem from "./_DetailContactItem.vue";

  const { t } = useI18n();

  const props = defineProps({
    formStore: Object,
  });

  const route = useRoute();
  onMounted(() => {
    props.formStore.getContacts(route.params.id);
  });
</script>
