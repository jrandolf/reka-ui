<script setup>
import axe from 'axe-core'
import { ComboboxAnchor, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxRoot, ComboboxViewport } from 'reka-ui'
import { ref } from 'vue'

const fruits = ['Apple', 'Banana', 'Cherry']
const report = ref('axe-core has not run.')

let timer
function runAxe() {
  // Run once the list shows the term, and not again while a run is going.
  clearTimeout(timer)
  timer = setTimeout(async () => {
    const { violations } = await axe.run(document.querySelector('[role="listbox"]'), {
      runOnly: { type: 'rule', values: ['aria-required-children'] },
    })
    report.value = violations.length
      ? violations.map(violation => `${violation.id} (${violation.impact}): ${violation.nodes[0].failureSummary.replace(/\s+/g, ' ')}`).join('\n')
      : 'axe-core: no violations'
  }, 300)
}
</script>

<template>
  <p>Type <code>zzz</code> in the input. No option matches. axe-core runs after each input.</p>
  <ComboboxRoot open>
    <ComboboxAnchor>
      <ComboboxInput aria-label="Fruit" placeholder="Fruit" @input="runAxe" />
    </ComboboxAnchor>
    <ComboboxContent class="content" aria-label="Fruits">
      <ComboboxViewport>
        <ComboboxEmpty class="item">
          No options
        </ComboboxEmpty>
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
