<template>
  <q-drawer
    bordered
    side="right"
    v-model="notifDrawerStore.state.value"
    overlay
    :width="$q.screen.gt.xs ? 400 : deviceWidth"
    :breakpoint="500"
    class="no-scroll"
    :class="$q.dark.isActive ? 'bg-dark' : 'bg-light'"
  >
    <div class="row items-center justify-between q-pa-md">
      <div class="col-4 text-bold text-h6 no-letter-spacing">
        اعلانات
      </div>
      <q-select
        class="col text-body2 no-letter-spacing"
        popup-content-class="text-body2 no-letter-spacing"
        dropdown-icon="o_expand_more"
        v-model="notifFilter"
        :options="notifFilterOptions"
        dense
        outlined
      />
      <div v-if="$q.screen.lt.md" class="q-ml-md col-1">
        <q-btn
          round
          icon="o_close"
          dense
          unelevated
          @click="notifDrawerStore.toggle"
        />
      </div>
    </div>

    <q-separator size="1px" />

    <div class="flex items-center justify-between q-pa-md">
      <q-checkbox
        dense
        size="46px"
        v-model="notifDrawerStore.allChecked.value"
        @update:model-value="notifDrawerStore.toggleAll"
      />
      <div
        class="text-body2 no-letter-spacing q-pa-xs text-on-caption"
      >
        {{ notifDrawerStore.readCount.value }} اعلان از
        {{ notifDrawerStore.totalCount.value }} مورد خوانده شده
      </div>
    </div>

    <q-separator size="0.5px" class="q-mb-sm" />

    <q-scroll-area
      :style="scrollAreaStyle"
      :thumb-style="helper.thumbStyle"
      :bar-style="helper.barStyle"
    >
      <template v-if="notifDrawerStore.notifications.value.length">
        <q-item
          v-for="notification in notifDrawerStore.notifications.value"
          :key="notification.id"
          clickable
          v-ripple
          @click="notifDrawerStore.markAsRead(notification)"
        >
          <q-item-section avatar>
            <q-checkbox
              dense
              size="46px"
              v-model="notification.read"
              @update:model-value="notifDrawerStore.updateReadCount"
            />
          </q-item-section>
          <q-item-section>
            <div
              class="text-body2 no-letter-spacing"
              :class="{
                'text-regular': notification.read,
                'text-bold': !notification.read,
              }"
            >
              {{ notification.title }}
            </div>
            <div class="text-body3 q-mt-xs no-letter-spacing">
              {{ notification.date }} - {{ notification.subject }}
            </div>
          </q-item-section>
        </q-item>
      </template>
      <template v-else>
        <NoDataFound />
      </template>
    </q-scroll-area>
  </q-drawer>
</template>

<script setup>
  import { ref, computed } from "vue";
  import { useQuasar } from "quasar";
  import { helper } from "src/helpers";
  import { useRouter } from "vue-router";
  import { useNotifDrawer } from "src/composables/useNotifDrawer";

  import NoDataFound from "src/components/shared/dataTables/NoDataFound.vue";

  const $q = useQuasar();
  const router = useRouter();
  const notifDrawerStore = useNotifDrawer();

  const notifFilter = ref("همه");
  const notifFilterOptions = [
    {
      label: "همه",
      value: "همه",
    },
    {
      label: "امروز",
      value: "امروز",
    },
    {
      label: "دیروز",
      value: "دیروز",
    },
    {
      label: "هفته پیش",
      value: "هفته پیش",
    },
    {
      label: "ماه پیش",
      value: "ماه پیش",
    },
  ];

  const deviceWidth =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;

  const scrollAreaStyle = computed(() =>
    $q.screen.gt.xs
      ? "height: calc(100vh - 220px);"
      : "height: calc(100vh - 120px);"
  );
</script>
