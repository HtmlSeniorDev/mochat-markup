$(() => {
    const checkboxListLeft = $(`[data-checkboxes-1=checkboxes]`).children() // левая колонка чекбоксов
    const checkboxListRight = $(`[data-checkboxes-2=checkboxes]`).children() // правая колонка чекбоксов
    const checkboxList = $.merge(checkboxListLeft,checkboxListRight)
    const dataRequired = $('.js-checkbox-required').attr('data-required-free') // необходимое количество чекбоксов для обязательного свободного ответа
    const input = $(`[data-for-free-answer=free-answer]`).find('input') // инпут свободный ответ
    let countChecked = 0; // cчетчик чекнутых инпутов
    checkboxList.each(function () {
      const checkbox = $(this);
      const checkInput= checkbox.find('input')
      checkInput.on('click',function () {
        let isChecked = checkInput.prop('checked');
        isChecked ? countChecked = countChecked + 1 : countChecked = countChecked - 1 // подсчет выбранных чекбоксов
        countChecked > dataRequired  ?  input.removeAttr('required') : input.attr('required','required') // Удалить require если значение больше допустимого
      })
    })
})
