$(() => {
    const errorInputText = 'Поле обязательно для заполнения'
    const mainJsClass = $(`[data-for-free-answer=free-answer]`)
    const checkboxListLeft = $(`[data-checkboxes-1=checkboxes]`).children() // левая колонка чекбоксов
    const checkboxListRight = $(`[data-checkboxes-2=checkboxes]`).children() // правая колонка чекбоксов
    const checkboxList = $.merge(checkboxListLeft,checkboxListRight)
    const dataRequired = $('.js-checkbox-required').attr('data-required-free') // необходимое количество чекбоксов для обязательного свободного ответа
    const input = mainJsClass.find('input') // инпут свободный ответ
    const inputWrapper = mainJsClass.find('.input-text')
    let countChecked = 0; // cчетчик чекнутых инпутов
    checkboxList.each(function () {
      // inputWrapper.attr('data-error',errorInputText)
      // inputWrapper.addClass('input-text--error')
      const checkbox = $(this);
      const checkInput= checkbox.find('input')
      checkInput.on('click',function () {
        let isChecked = checkInput.prop('checked');
        isChecked ? countChecked = countChecked + 1 : countChecked = countChecked - 1 // подсчет выбранных чекбоксов
        if (countChecked > dataRequired)
        {
          input.removeAttr('required')
          inputWrapper.attr('data-error','')
          inputWrapper.removeClass('input-text--error')
        }
        else {
          inputWrapper.attr('data-error',errorInputText)
          input.attr('required','required')
          inputWrapper.addClass('input-text--error')
          input.on('change',function () {
            let len = (input.val())
            if (len.length > 0 ) {
              input.removeAttr('required')
              inputWrapper.attr('data-error','')
              inputWrapper.removeClass('input-text--error')
            }
          })
        } // Удалить require если значение больше допустимого
      })
    })
})
