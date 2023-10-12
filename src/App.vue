<template>
  <router-view />
</template>

<script setup>
console.log(
  "%cSUPPORT: %cLANDA-SME.COM",
  "color: white; font-family: sans-serif; font-size: 2.5em; font-weight: bolder; text-shadow: #000 1px 1px;",
  "color: #0088ff; font-family: sans-serif; font-size: 2.5em; font-weight: bolder; text-shadow: #000 1px 1px;"
)
</script>

<style lang="scss">
::-webkit-scrollbar {
  height: 12px;
  width: 14px;
  background: transparent;
  z-index: 12;
  overflow: visible;
}

::-webkit-scrollbar-thumb {
  width: 10px;
  background-color: var(--q-primary);
  border-radius: 10px;
  z-index: 12;
  border: 4px solid rgba(0, 0, 0, 0);
  background-clip: padding-box;
  transition: background-color .32s ease-in-out;
  margin: 4px;
  min-height: 32px;
  min-width: 32px;

  &:hover {
    background: var(--q-primary);
  }
}
</style>
