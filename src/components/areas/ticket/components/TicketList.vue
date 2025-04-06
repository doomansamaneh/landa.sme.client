<template>
  <q-scroll-area
    :bar-style="helper.barStyle"
    :thumb-style="helper.thumbStyle"
    style="height: calc(100vh - 200px)"
  >
    <q-list bordered separator>
      <q-item
        v-for="ticket in tickets"
        :key="ticket.id"
        clickable
        v-ripple
        :active="selectedTicket?.id === ticket.id"
        @click="$emit('select-ticket', ticket)"
      >
        <q-item-section>
          <q-item-label>
            {{ ticket.title }}
          </q-item-label>
          <q-item-label caption>
            {{ ticket.category }} -
            {{ getPriorityLabel(ticket.priority) }}
          </q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-chip
            :color="getStatusColor(ticket.status)"
            text-color="white"
            size="sm"
          >
            {{ getStatusLabel(ticket.status) }}
          </q-chip>
        </q-item-section>
      </q-item>
    </q-list>
  </q-scroll-area>
</template>

<script setup>
  import { helper } from "src/helpers";

  defineProps({
    tickets: {
      type: Array,
      required: true,
    },
    selectedTicket: {
      type: Object,
      default: null,
    },
  });

  defineEmits(["select-ticket"]);

  const priorities = [
    { label: "کم", value: "low" },
    { label: "متوسط", value: "medium" },
    { label: "زیاد", value: "high" },
  ];

  const statusLabels = {
    open: "باز",
    "in-progress": "در حال بررسی",
    closed: "بسته",
  };

  const statusColors = {
    open: "orange",
    "in-progress": "blue",
    closed: "green",
  };

  function getPriorityLabel(value) {
    return priorities.find((p) => p.value === value)?.label || value;
  }

  function getStatusLabel(value) {
    return statusLabels[value] || value;
  }

  function getStatusColor(value) {
    return statusColors[value] || "grey";
  }
</script>
