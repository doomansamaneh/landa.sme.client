<template>
  <template v-if="!edit">
    <q-btn
      filled
      unelevated
      rounded
      padding="6px 12px"
      class="primary-gradient text-white text-on-dark q-mb-lg"
    >
      <q-icon
        name="o_add"
        size="xs"
        class="q-mr-xs text-body2 no-letter-spacing"
      />
      افزودن تماس
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
              <div class="text-body2 no-letter-spacing">تلفن</div>
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
              <div class="text-body2 no-letter-spacing">موبایل</div>
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
              <div class="text-body2 no-letter-spacing">ایمیل</div>
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
              <div class="text-body2 no-letter-spacing">وبسایت</div>
            </q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>

    <div class="q-col-gutter-lg">
      <div
        v-for="(item, index) in formStore.model.value
          .customerContactPhones"
        :key="index"
      >
        <contact-item
          :item="item"
          :index="index"
          title="تلفن"
          @item-deleted="formStore.deletePhone(index)"
          @item-added="formStore.addPhone(index)"
          :type-id="contactType.phone"
        >
          <template #header-title>
            <q-icon name="o_call" size="18px" class="q-mx-sm" />
            <span>تلفن</span>
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
          title="موبایل"
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
            <span>موبایل</span>
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
          title="ایمیل"
          @item-deleted="formStore.deleteEmail(index)"
          @item-added="formStore.addEmail(index)"
          :type-id="contactType.email"
        >
          <template #header-title>
            <q-icon name="o_email" size="18px" class="q-mx-sm" />
            <span>ایمیل</span>
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
          title="وب سایت"
          @item-deleted="formStore.deleteWebsite(index)"
          @item-added="formStore.addWebsite(index)"
          :type-id="contactType.website"
        >
          <template #header-title>
            <q-icon name="o_public" size="18px" class="q-mx-sm" />
            <span>وب سایت</span>
          </template>
        </contact-item>
      </div>
    </div>
  </template>
</template>

<script setup>
  import { onMounted } from "vue";
  import { useRoute } from "vue-router";
  import { contactType } from "src/constants";

  import ContactItem from "./_DetailContactItem.vue";

  const props = defineProps({
    formStore: Object,
  });

  const route = useRoute();
  onMounted(() => {
    props.formStore.getContacts(route.params.id);
  });
</script>
