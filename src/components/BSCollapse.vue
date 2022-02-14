<script>
  import { Collapse } from 'bootstrap';
  export default Vue.component('bsCollapse', {
    template: `
      <div>
        <slot name="trigger"></slot>
        <slot name="target"></slot>
      </div>
    `,
    props: {
      toggle: {
        required: false,
        default: false
      },
      id: {
        required: true
      }
    },
    mounted() {
      var trigger = this.$slots['trigger'][0].elm
      var target = this.$slots['target'][0].elm
      target.classList.add('collapse')
      target.setAttribute('id', this.id);
      trigger.setAttribute('data-bs-target', '#' + this.id);
      trigger.setAttribute('data-bs-toggle','collapse');
      new Collapse(target, {toggle: this.toggle })
    },
  })
 
</script>

