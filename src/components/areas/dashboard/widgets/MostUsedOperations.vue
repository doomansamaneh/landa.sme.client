<template>
  <q-btn-dropdown
    transition-show="slide-down"
    transition-hide="slide-up"
    transition-duration="600"
    class="desktop-toolbar-gradient bordered text-body3 text-weight-500 text-on-dark q-py-xs q-px-sm"
    rounded
    no-caps
    unelevated
    dropdown-icon="expand_more"
    content-class="bordered border-radius-lg"
    :menu-offset="[0, 10]"
    menu-anchor="bottom middle"
    menu-self="top middle"
    style="white-space: nowrap"
  >
    <template #label>
      <span class="text-body3">دسترسی سریع</span>
    </template>

    <template #default>
      <div class="container q-pa-lg text-on-dark">
        <div v-for="item in items" :key="item.id">
          <router-link class="no-decoration" :to="item.to">
            <q-item
              @mouseover="handleMouseOver(item.id)"
              @mouseleave="handleMouseLeave(item.id)"
              clickable
              class="text-center column text-on-dark border-radius-sm"
            >
              <div>
                <q-avatar class="bg-on-dark">
                  <q-icon :name="`o_${item.icon}`" />
                </q-avatar>
              </div>
              <div class="q-pt-md">
                {{ $t(`main-menu-items.${item.name}`) }}
              </div>
            </q-item>
          </router-link>
        </div>
      </div>
    </template>
  </q-btn-dropdown>
</template>

<script setup>
  import { ref } from "vue";

  const hoveredItem = ref(null);
  const isHovered = ref(false);
  const items = [
    {
      id: 1,
      name: "Sls_Invoice_View",
      icon: "receipt",
      to: "/sls/invoice/createV2",
    },
    {
      id: 2,
      name: "Trs_Receipt_View",
      icon: "arrow_downward",
      to: "/trs/receipt/create",
    },
    {
      id: 3,
      name: "Trs_Payment_View",
      icon: "arrow_upward",
      to: "/trs/payment/create",
    },
    {
      id: 4,
      name: "Sls_Quote_View",
      icon: "assignment",
      to: "/sls/quote/createV2",
    },
  ];

  const handleMouseOver = (id) => {
    hoveredItem.value = id;
    isHovered.value = true;
  };

  const handleMouseLeave = (id) => {
    if (hoveredItem.value === id) {
      hoveredItem.value = null;
      isHovered.value = false;
    }
  };
</script>

<style lang="scss" scoped>
  .container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    justify-content: end;
    align-items: center;
    row-gap: 16px;
    column-gap: 16px;
  }
</style>
