<script setup lang="ts">
import { ComboboxAnchor, ComboboxContent, ComboboxInput, ComboboxItem, ComboboxRoot, ComboboxViewport, ComboboxVirtualizer } from 'reka-ui'
import { ref } from 'vue'

const options = Array.from({ length: 420 }, (_, index) => `Option ${index}`)
const value = ref('Option 300')
</script>

<template>
  <ComboboxRoot v-model="value" open-on-click>
    <ComboboxAnchor>
      <ComboboxInput />
    </ComboboxAnchor>
    <ComboboxContent position="popper" :side-offset="4" class="content">
      <ComboboxViewport class="viewport">
        <ComboboxVirtualizer v-slot="{ option }" :options="options" :estimate-size="28">
          <ComboboxItem :value="option" class="item">
            {{ option }}
          </ComboboxItem>
        </ComboboxVirtualizer>
      </ComboboxViewport>
    </ComboboxContent>
  </ComboboxRoot>
</template>

<style>
.content {
  width: var(--reka-combobox-trigger-width);
  background: white;
  border: 1px solid #ccc;
}

.viewport {
  max-height: min(280px, var(--reka-combobox-content-available-height));
}

.item {
  display: flex;
  align-items: center;
  height: 28px;
  padding: 0 8px;
}

.item[data-highlighted] {
  background: #cde;
}
</style>
