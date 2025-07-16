<template>
  <q-page>
    <div class="sticky-header flex bg-main q-pb-lg">
      <div
        v-if="$q.screen.gt.md"
        class="flex items-center q-gutter-sm"
      >
        <q-btn
          rounded
          unelevated
          color="primary"
          class="primary-shadow primary-gradient"
          @click="showNewTicketDialog = true"
        >
          <q-icon size="16px" class="q-mr-xs" name="o_add" />
          <div class="text-body2">ثبت تیکت جدید</div>
        </q-btn>

        <q-btn rounded unelevated @click="showContactDialog = true">
          <q-icon size="16px" class="q-mr-xs" name="phone" />
          <div class="text-body2">تماس با واحد فروش</div>
        </q-btn>
      </div>

      <div v-else class="flex items-center q-gutter-sm bg-main">
        <q-btn
          round
          unelevated
          color="primary"
          class="primary-shadow primary-gradient"
          @click="showNewTicketDialog = true"
        >
          <q-icon size="24px" name="o_add" />
        </q-btn>

        <q-btn round unelevated @click="showContactDialog = true">
          <q-icon size="24px" name="phone" />
        </q-btn>
      </div>

      <q-space v-if="$q.screen.gt.md" />

      <q-space v-if="$q.screen.lt.md" />

      <div class="text-h6">پشتیبانی</div>

      <q-separator />
    </div>
    <TicketList />
  </q-page>
</template>

<script setup>
  import TicketList from "src/components/areas/ticket/components/TicketList.vue";
</script>

<style lang="scss" scoped>
  .sticky-header {
    position: sticky;
    top: 0;
    z-index: 1;
  }
</style>
