import 'cleave.js'
import tingle from '../../static/libs/tingle/tingle.min'
import '../../static/libs/jquery-validation/jquery.validate.min.js';
import '../../static/libs/jquery-autocomplete/jquery.autocomplete.js';

$(()=>{
  function getScrollbarWidth() {
    return window.innerWidth - document.documentElement.clientWidth
  }

  /* objects */
  var Modal = function(content, options) {

    this.content = content;
    this.options = $.extend(
      {
        classList: ['tingle-modal--default'],
        onOpenCallback: function() {
          console.log('open')
        }
      },
      options
    );
    this.modal = new tingle.modal({
      footer: false,
      stickyFooter: false,
      closeMethods: ['overlay', 'button', 'escape'],
      closeLabel: 'Закрыть',
      cssClass: this.options.classList,
      beforeOpen() {
        $('body').css({'padding-right': getScrollbarWidth()});
        /* если тема default крестик закрытия расположить внутри */
        if (this.cssClass.includes('tingle-modal--default')) {
          var $modal = $('.tingle-modal--default');
          var $closeButton = $modal.find('> .tingle-modal__close');
          var $modalBox = $modal.find('.tingle-modal-box');
          if ($modalBox.find('.tingle-modal__close').length === 0) {
            $closeButton.clone().appendTo($modalBox).on('click', function() {
              $closeButton.trigger('click');
            });
          }
        }
      },
      onOpen: () => {
        this.options.onOpenCallback();
      },
      beforeClose() {
        $('body').css({'padding-right': getScrollbarWidth()});
        $(this.modalBoxContent).html('');
        return true;
      },
    });
  };

  Modal.prototype = {
    open: function() {
      this.modal.setContent(this.content);
      this.modal.open();
    },
    close: function() {
      this.modal.close();
    }
  };


  var FormAgreement = function(el) {
    this.$el = $(el);
    this.$radioInputs = this.$el.find('.input-toggler__control');
    this.$fieldComment = this.$el.find('.form-declaration__comment');
    this.$btnSubmit = this.$el.find('.form-declaration__btn-submit');
  };

  FormAgreement.prototype = {
    init: function() {
      this.bindDomEvents();
      this.moveFieldComment(this.$el.find('.input-toggler__control:checked'));
    },
    bindDomEvents: function() {
      var _this = this;
      this.$radioInputs.on('change', function(event){
        _this.moveFieldComment($(this));
      });
      this.$el.on('submit', function(event){
        event.preventDefault();
        if (_this.$el.valid()) {
          _this.$btnSubmit.addClass('ui-btn-disabled');
          var formData = new FormData(_this.$el[0]);
          _this.sendForm(formData, function(isSuccess){
            if (isSuccess) {
              popupSuccess.open();
              _this.$fieldComment.remove();
              _this.$el.find('.input-toggler').addClass('input-toggler--disabled');
            } else {
              popupError.open();
              _this.$btnSubmit.removeClass('ui-btn-disabled');
            }
          });
        }
      });
    },
    moveFieldComment: function($inputChecked) {
      $inputChecked.closest('.form-declaration__choice').after(this.$fieldComment);
    },
    sendForm: function(formData, callback) {
      for (var key of formData.keys()) {
        console.log(key + ': ' + formData.get(key));
      }
      var isSuccess = true;
      //var isSuccess = false;
      window.setTimeout(function() {
        callback(isSuccess);
      }, 2000);
    }
  };

  var FormReturnDeclaration = function(el) {
    this.$el = $(el);
    this.$btnSubmit = this.$el.find('.form-declaration__btn-submit');
  };

  FormReturnDeclaration.prototype = {
    init: function() {
      this.bindDomEvents();
    },
    bindDomEvents: function() {
      var _this = this;
      this.$el.on('submit', function(event){
        event.preventDefault();
        if (_this.$el.valid()) {
          _this.$btnSubmit.addClass('ui-btn-disabled');
          var formData = new FormData(_this.$el[0]);
          _this.sendForm(formData, function(isSuccess){
            if (isSuccess) {
              popupSuccess.open();
              _this.$el.find('.input-text__control').prop('disabled', true);
            } else {
              popupError.open();
              _this.$btnSubmit.removeClass('ui-btn-disabled');
            }
          });
        }
      });
    },
    sendForm: function(formData, callback) {
      for (var key of formData.keys()) {
        console.log(key + ': ' + formData.get(key));
      }
      //var isSuccess = true;
      var isSuccess = false;
      window.setTimeout(function() {
        callback(isSuccess);
      }, 2000);
    }
  };

  var FormDeclarationEdit = function(el) {
    this.$el = $(el);
    this.elNode = el;
    this.$btnSubmit = this.$el.find('.declaration__btn-submit');
    this.$btnSave = this.$el.find('.declaration__btn-save');
  };

  FormDeclarationEdit.prototype = {
    init: function() {
      this.bindDomEvents();
    },
    bindDomEvents: function() {
      var _this = this;
      this.$el.on('submit', function(event){
        event.preventDefault();
        if (_this.$el.valid()) {
          _this.$btnSubmit.addClass('ui-btn-disabled');
          var formData = new FormData(_this.$el[0]);
          _this.sendForm(formData,function(isSuccess){
            if (isSuccess) {
              popupSuccess.open();
            } else {
              popupError.open();
              _this.$btnSubmit.removeClass('ui-btn-disabled');
            }
          });
        }
      });
    },
    sendForm: function(formData, callback) {
      for (var key of formData.keys()) {
        console.log(key + ': ' + formData.get(key));
      }
      //var isSuccess = true;
      var isSuccess = false;
      window.setTimeout(function() {

        callback(isSuccess);
      }, 2000);
    }
  };



  /* run */

  $.validator.setDefaults({
    highlight: function(element) {
      $(element).closest('.field').addClass('field--error');
    },
    unhighlight: function(element) {
      $(element).closest('.field').removeClass('field--error');
    },
    errorPlacement: function($error, $element) {
      $element.closest('.field').append($error);
    },
    errorElement: 'div',
    errorClass: 'field__error',
    focusCleanup: true,
    onsubmit: false
  });

  var popupSuccess = new Modal($('.declaration-ajax-success').clone().html());
  var popupError = new Modal($('.declaration-ajax-fail').clone().html());

  $('.form-agreement').each(function() {
    new FormAgreement(this).init();
  });
  $('.form-return-declaration').each(function() {
    new FormReturnDeclaration(this).init();
  });
  new FormDeclarationEdit($('.form-declaration-edit')[0]).init();


  $("input[name='USER_FROM']").attr('readonly','readonly');
  $("input[name='POSITION']").attr('readonly','readonly');
  $("input[name='DATE']").attr('readonly','readonly');

  Modal.prototype = {
    open: function() {
      this.modal.setContent(this.content);
      this.modal.open();
    },
    close: function() {
      this.modal.close();
    }
  };

  var Declaration = function(el) {
    this.$el = $(el);
    this.$form = this.$el.find('.declaration__steps');
    this.$steps = this.$el.find('.declaration__step');
    this.$currentStep = null;
    this.$progressItems = this.$el.find('.declaration__progress-item');
    this.$btnNext = this.$el.find('.declaration__btn-next');
    this.$btnPrev = this.$el.find('.declaration__btn-prev');
    this.$relatives = this.$el.find('.relatives');
    this.$descriptionLink = this.$el.find('.declaration__open-popup-description');
    this.$inputAddresseeName = this.$el.find('[name="addressee_name"]');
    this.$inputAddresseeID = this.$el.find('[name="addressee_id"]');
    this.$addresseeOccupation = this.$el.find('.declaration__addressee-occupation');
    this.initialStep = this.$el.data('initialStep') || 1;
    this.step = null;
    this.modifiers = {
      progressItemActive: 'progress-item-active'
    }
  }

  Declaration.prototype = {
    init: function() {
      this.setStep(this.initialStep);
      this.setupValidationPlugin();
      this.initPlugins();
      this.bindDomEvents();
      this.bindChildrenEvents();
    },
    initPlugins: function() {
      var _this = this;
      /* mockup данные */
      let employees =  [
        {
          value: 'ФИО 1',
          id : 1,
          occupation: 'бухгалтер',
          department: 'отдел 1',

        },
        {
          value: 'ФИО 2',
          id : 2,
          occupation: 'дизайнер',
          department: 'отдел 2'
        },
        {
          value: 'ФИО 3',
          id : 3,
          occupation: 'старший управляющий',
          department: 'отдел 3'
        },
      ];
      /* mockup данные */
      /* документация к плагину devbridgeAutocomplete https://www.devbridge.com/sourcery/components/jquery-autocomplete/ */
      this.$inputAddresseeName.devbridgeAutocomplete({
        lookup: employees,
        onSelect: function (suggestion) {
          _this.$inputAddresseeID.val(suggestion.id).closest('.field').find('.field__error').remove();
          _this.$addresseeOccupation.html(suggestion.occupation.charAt(0).toUpperCase() + suggestion.occupation.slice(1));
        },
        showNoSuggestionNotice: true,
        noSuggestionNotice: 'По запросу ничего не найдено',
        formatResult: function (suggestion, currentValue) {
          var re = new RegExp('(' + currentValue + ')', "gi");
          return suggestion.value.replace(re, '<strong>$1</strong>') + ', ' + suggestion.department + ', ' + suggestion.occupation;
        },
        onInvalidateSelection: function(event) {
          _this.$addresseeOccupation.html('');
          _this.$inputAddresseeID.val('');
        }
      });


    },
    setStep: function(step) {
      var _this = this;
      this.step = step;
      this.$currentStep = this.$steps.eq(step - 1);
      this.$steps.hide();
      this.$currentStep.show();
      this.$progressItems.each(function(index){
        $(this).toggleClass(_this.modifiers.progressItemActive, index < _this.step);
      });
    },
    bindDomEvents: function() {
      var _this = this;
      this.$steps.on('submit', function(event){
        event.preventDefault();
      });

      this.$btnNext.on('click', function(){
        var $fieldToValidate = _this.$currentStep.find('.field__control input, .field__control select');
        if ($fieldToValidate.length > 0 && !$fieldToValidate.valid()) {
          return;
        }
        var $allFields = _this.$currentStep.find('input, select');
        _this.sendData($allFields);
        _this.step++;
        _this.setStep(_this.step);
      });

      this.$btnPrev.on('click', function(){
        _this.step--;
        _this.setStep(_this.step);
      });

      this.$descriptionLink.on('click', function(event){
        event.stopPropagation();
        popupDescription.open();
      });
    },
    bindChildrenEvents: function() {
      this.$relatives.on('update_relatives_amount', function(event, params) {
        console.log(params.amount);
      });

    },
    setupValidationPlugin: function() {
      this.$form.validate({
        highlight: function(element) {
          $(element).closest('.field').addClass('field--error');
        },
        unhighlight: function(element) {
          $(element).closest('.field').removeClass('field--error');
        },
        errorPlacement: function($error, $element) {
          $element.closest('.field').append($error);
        },
        errorElement: 'div',
        errorClass: 'field__error',
        focusCleanup: true,
        onsubmit: false,
        ignore: '[name*="hash"]'
      })
    },
    sendData: function($fields) {
      console.log($fields)
    }
  };

  var Relatives = function(el) {
    this.$el = $(el);
    this.$list = this.$el.find('.relatives__list');
    this.$itemTemplate = this.$el.find('.relatives__template .relatives__item');
    this.$btnAdd = this.$el.find('.relatives__btn-add button');
    this.relativesAmount = 0;
  };

  Relatives.prototype = {
    init: function() {
      this.bindDomEvents();
      this.appendItem();
    },
    bindDomEvents: function() {
      var _this = this;
      this.$btnAdd.on('click', function() {
        _this.appendItem();
      });
      this.$el.on('click', '.relatives__btn-delete .link-delete', function(event) {
        event.preventDefault();
        _this.removeItem($(this).closest('.relatives__item'));
      });
    },
    appendItem: function() {
      var hash = new Date().getTime();
      var $newItem = this.$itemTemplate.clone();
      var $fields = $newItem.find('.field__control input, .field__control select');
      /* добавляю хэши, чтобы имена полей были уникальными, иначе валидация работает некорректно */
      $fields.each(function(){
        var $this = $(this);
        var fieldName = $this.attr('name');
        $this.attr('name', fieldName.replace(/hash/i, hash));
      });
      this.$list.append($newItem);
      this.relativesAmount++;
      this.$el.trigger('update_relatives_amount', {amount: this.relativesAmount});
    },
    removeItem: function($item) {
      $item.remove();
      this.relativesAmount--;
      this.$el.trigger('update_relatives_amount', {amount: this.relativesAmount});
    }
  };

  var Incomes = function(el) {
    this.$el = $(el);
    this.$list = this.$el.find('.incomes__list');
    this.$itemTemplate = this.$el.find('.incomes__template .incomes__item');
    this.$btnAdd = this.$el.find('.incomes__btn-add button');
  };

  Incomes.prototype = {
    init: function() {
      this.bindDomEvents();
      this.appendItem();
    },
    bindDomEvents: function() {
      var _this = this;
      this.$btnAdd.on('click', function() {
        _this.appendItem();
      });
      this.$el.on('click', '.incomes__btn-delete .link-delete', function(event) {
        event.preventDefault();
        _this.removeItem($(this).closest('.incomes__item'));
      });
    },
    appendItem: function() {
      var hash = new Date().getTime();
      var $newItem = this.$itemTemplate.clone();
      var $fields = $newItem.find('.field__control input, .field__control select');
      $fields.each(function(){
        var $this = $(this);
        var fieldName = $this.attr('name');
        $this.attr('name', fieldName.replace(/hash/i, hash));
      });
      this.$list.append($newItem);
    },
    removeItem: function($item) {
      $item.remove();
    }
  };

  /* run */
  var popupDescription = new Modal($('.declaration-description').clone().html());

  // popupError.open();

  new Declaration($('.declaration')[0]).init();
  new Relatives($('.relatives')[0]).init();
  $('.incomes').each(function() {
    new Incomes(this).init();
  });
  function dateValidator() {
    $('.input-date__control').toArray().forEach(function(field) {
      new Cleave(field, {
        date: true,
        delimiter: '.',
        datePattern: ['d', 'm', 'Y']
      });
    });
  }
  dateValidator();
});

/* declaration script -- end */
