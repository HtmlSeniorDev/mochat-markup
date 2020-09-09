const button = $('.Button[type=submit]');
const input = $('.input-text').find('input')
button.on('click',function () {
   input.each(function () {
      inputMain = $(this);
      if (inputMain.attr('required') === 'required') {
          button.attr('error-submit','Заполните обязательные поля')
      }
      // else {
      //   button.attr('error-submit','')
      // }
   })
})

