import RibsCore from 'ribs-core';

class InputAdmin {
  constructor() {
    const inputs = document.querySelectorAll('.block input, .block textarea');

    Array.from(inputs).forEach((element) => {
      element.addEventListener('focus', (event) => this.inputFocus(event));
      element.addEventListener('blur', (event) => this.inputBlur(event));

      if ((element.value != '') || (element.value != 0)) {
        element.parentNode.classList.add('has-label');
      }
    });
  }

  /**
   * @param dtValue
   * @returns {boolean}
   * method that test if a date is correct
   */
  validateDate(dtValue) {
    var dtRegex = new RegExp(/\b\d{1,2}[\/-]\d{1,2}[\/-]\d{4}\b/);
    return dtRegex.test(dtValue);
  }

  /**
   * @param event
   * method that add class on focus an input
   */
  inputFocus(event) {
    const parent = RibsCore.parents(event.currentTarget, '.block');
    parent.classList.add('is-focused', 'has-label');
    parent.classList.remove('invalid');
  }

  /**
   * @param event
   * method that test is value is correct and add or remove classes
   */
  inputBlur(event) {
    const parent = RibsCore.parents(event.currentTarget, '.block');
    const element = event.currentTarget;
    const label = parent.querySelector('label');
    const type = element.dataset.type;
    const min = element.dataset.min;
    const max = element.dataset.max;
    const required = element.required;

    if (type == 'string') {
      if (element.value === '' && required === true) {
        label.dataset.error = label.dataset.empty !== undefined ? label.dataset.empty : '';
        parent.classList.add('invalid');
        parent.classList.remove('has-label');
      } else if (element.value.length < min) {
        label.dataset.error = label.dataset.min !== undefined ? label.dataset.min : '';
        parent.classList.add('invalid');
      } else if (element.value.length > max) {
        label.dataset.error = label.dataset.max !== undefined ? label.dataset.max : '';
        parent.classList.add('invalid');
      }
    } else if (type === 'date' && required === true) {
      if (!this.validateDate(element.value)) {
        parent.classList.add('invalid');
      }
    }

    parent.classList.remove('is-focused');

    if (element.value == '') {
      parent.classList.remove('has-label');
    }
  }
}

export default (InputAdmin);

const input = new InputAdmin();
