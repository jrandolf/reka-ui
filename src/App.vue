<script setup>
import { ComboboxAnchor, ComboboxContent, ComboboxInput, ComboboxItem, ComboboxRoot, ComboboxViewport } from 'reka-ui'
import { onBeforeUnmount, onMounted, ref } from 'vue'

const fruits = ['Apple', 'Banana', 'Cherry']
const report = ref('')

function update() {
  const id = document.querySelector('[role="combobox"]')?.getAttribute('aria-activedescendant')
  report.value = id
    ? `aria-activedescendant: ${id}\nelement with this id in the document: ${Boolean(document.getElementById(id))}`
    : 'aria-activedescendant: (none)'
}

const observer = new MutationObserver(update)
onMounted(() => {
  observer.observe(document.body, { attributes: true, childList: true, subtree: true })
  update()
})
onBeforeUnmount(() => observer.disconnect())
</script>

<template>
  <p>Click the input. Type <code>zzz</code>. No option matches.</p>
  <ComboboxRoot open-on-click>
    <ComboboxAnchor>
      <ComboboxInput aria-label="Fruit" placeholder="Fruit" />
    </ComboboxAnchor>
    <ComboboxContent class="content">
      <ComboboxViewport>
        <ComboboxItem v-for="fruit in fruits" :key="fruit" :value="fruit" class="item">
          {{ fruit }}
        </ComboboxItem>
      </ComboboxViewport>
    </ComboboxContent>
  </ComboboxRoot>
  <pre>{{ report }}</pre>
</template>

<style>
.content {
  width: 200px;
  background: white;
  border: 1px solid #ccc;
}

.item {
  padding: 4px 8px;
}

.item[data-highlighted] {
  background: #cde;
}
</style>
