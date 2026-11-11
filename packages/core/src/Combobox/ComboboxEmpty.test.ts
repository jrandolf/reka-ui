import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { axe } from 'vitest-axe'
import { defineComponent } from 'vue'
import { ComboboxAnchor, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxRoot, ComboboxViewport } from '.'

describe('given a Combobox with an empty part', () => {
  const Fixture = defineComponent({
    components: { ComboboxAnchor, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxRoot, ComboboxViewport },
    template: `<ComboboxRoot>
  <ComboboxAnchor><ComboboxInput /></ComboboxAnchor>
  <ComboboxContent>
    <ComboboxViewport>
      <ComboboxEmpty>No options</ComboboxEmpty>
      <ComboboxItem value="Apple">Apple</ComboboxItem>
      <ComboboxItem value="Banana">Banana</ComboboxItem>
    </ComboboxViewport>
  </ComboboxContent>
</ComboboxRoot>`,
  })

  it('should keep the required children of the listbox when no option matches the term', async () => {
    const wrapper = mount(Fixture, { attachTo: document.body })
    const input = wrapper.find('input')
    await input.trigger('keydown', { key: 'ArrowDown' })
    await input.setValue('zzz')
    await vi.waitFor(() => expect(wrapper.text()).toContain('No options'))

    expect(await axe(document.body, { runOnly: { type: 'rule', values: ['aria-required-children'] } })).toHaveNoViolations()
    wrapper.unmount()
  })
})
