export function Validator(formSelector, options = {}) {
  function getParent(element, selector) {
    while (element.parentElement) {
      if (element.parentElement.matches(selector)) {
        return element.parentElement
      }
      element = element.parentElement
    }
  }

  const formRules = {}

  const validatorRules = {
    required(value, message) {
      return value ? undefined : message || 'This filed can not blank'
    },
    email(value, message) {
      const regex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return regex.test(value) ? undefined : message || 'It is not a email'
    },
    min(min) {
      return function (value, message) {
        return value.length >= min
          ? undefined
          : message || `Password should more than ${min} words`
      }
    },
    max(max) {
      return function (value, message) {
        return value.length <= max
          ? undefined
          : message || `Password should less than ${max} words`
      }
    },
    confirm(value, message) {
      return value === document.querySelector('#form-1 #password').value
        ? undefined
        : message || 'Password not match'
    },
  }

  const formElement = document.querySelector(formSelector)

  if (formElement) {
    const inputs = formElement.querySelectorAll('[rules]')

    for (let input of inputs) {
      const rules = input.getAttribute('rules').split('|')
      for (let rule of rules) {
        const isRuleHasValue = rule.includes(':')
        let ruleInfo

        if (isRuleHasValue) {
          ruleInfo = rule.split(':')
          rule = ruleInfo[0]
        }

        let ruleFunc = validatorRules[rule]

        if (isRuleHasValue) {
          ruleFunc = validatorRules[rule](ruleInfo[1])
        }

        if (Array.isArray(formRules[input.name])) {
          formRules[input.name].push(ruleFunc)
        } else {
          formRules[input.name] = [ruleFunc]
        }
      }
      // add add event listener to input
      input.onblur = handleValidate
      input.oninput = handleClearError
    }
    // func handle Validate
    // func clear message error
    function handleClearError(e) {
      const formGroup = getParent(e.target, '.add__form-group')
      if (formGroup.classList.contains('invalid')) {
        formGroup.classList.remove('invalid')

        const formMessage = formGroup.querySelector('.message')
        if (formMessage) {
          formMessage.innerText = ''
        }
      }
    }
  }
  function handleValidate(e) {
    const rules = formRules[e.target.name]

    let errorMessage

    rules.find((rule) => {
      errorMessage = rule(e.target.value)

      return errorMessage
    })

    if (errorMessage) {
      const formGroup = getParent(e.target, '.add__form-group')
      if (formGroup) {
        const formMessage = formGroup.querySelector('.message')
        if (formMessage) {
          formMessage.innerText = errorMessage
          formGroup.classList.add('invalid')
        }
      }
    }
    return !errorMessage
  }

  formElement.onsubmit = function (e) {
    e.preventDefault()
    const inputs = formElement.querySelectorAll('[rules]')

    let isValid = true
    for (let input of inputs) {
      if (
        !handleValidate({
          target: input,
        })
      ) {
        isValid = false
      }
    }

    if (isValid) {
      if (typeof options.onSubmit === 'function') {
        const formValue = Array.from(inputs).reduce((arr, curr) => {
          arr[curr.name] = curr.value
          return arr
        }, {})
        if (formValue.password_confirmation) {
          delete formValue.password_confirmation
        }
        options.onSubmit(formValue)
      } else {
        formElement.submit()
      }
    }
  }
}
