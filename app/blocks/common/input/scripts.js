$(() => {
  const input = $('.input-text');
  const inputList =  input.find('input')
  const textareaList =  input.find('textarea')
  const list = $.merge(inputList,textareaList)
 list.each(function () {
    const input = $(this);
    input.on('change',function () {
      if (input.val().length > 0 ) {
        input.closest('.input-text').removeClass('input-text--error')
        input.closest('.input-text').attr('data-error','')
        input.removeAttr('required')
      }
    })
  })
})

