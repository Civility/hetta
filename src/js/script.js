$(document).ready(function(){
  // add class active for menu click
  setTimeout ("$('#textheader').show('slow');",1100);
  $('#menu a').on('click', function () {
    $('a').removeClass('active');
    $(this).addClass('active'); 
  })
  // if del atr [data-toggle="dropdown"], then enable this
  // $("#dropdownMenu").on('click', function () {
  //   $(".dropdown-menu").slideToggle('show').fast;
  // });

  // slow paging blocks
  $('#menu a[href*="#"]').click(function() {
    $('html, body').animate({
          scrollTop: $($.attr(this, 'href')).offset().top
      }, 1000);
      return false;
  });

  // fix browsers for ie
  $('.custom-checkbox').prop('indeterminate', true);
  // enable tooltip for bootstrap
  $('[data-toggle="tooltip"]').tooltip();

  // modal window
  $('#formModal').on('shown.bs.modal', function () { 
    $('#name').trigger('focus');
  });

 // по нажатию на кнопку с модальной формой , меняем имя формы
  $('.btn-modal').click(function() { 
     let bntVal =  $(this).attr("title");
     $('.submit').attr('title', bntVal);
  });

  $.validator.addMethod("phones", function (phone_number, element) {
  phone_number = phone_number.replace(/\s+/g, "");
  return this.optional(element) || phone_number.match(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/);
  }, "Неправильный номер телефона");

$('.form').click(function () {
  let $formID = $(this).attr('id');
  let $nameForm = $('#'+ $formID + 'Submit').attr("title");
  $('#'+ $formID + 'Checkbox').change(function() {
    if ($('#'+ $formID + 'Checkbox').prop('checked') == true) {
      $('#'+ $formID + 'Submit').prop('disabled', false);
    } else {
      $('#'+ $formID + 'Submit').prop('disabled', true);
    }
  });
  var formAJAX =  $('#'+$formID).validate({
    rules: {
      name: {
        required: true,
        minlength: 2,
        maxlength: 25
      },
      email: {
        required: true,
        email: true
      },
      phone: {
        required: true,
        minlength: 4,
        maxlength: 26,
        phones: true
      },
      message: {
        rangelength: [12, 500]
      }, 
      agreement: 'required',
    },
    messages: {
      name: {
        required: 'Поле "Имя" обязательно для заполнения',
        minlength: jQuery.validator.format('Минимум {0} символа'),
        maxlength: jQuery.validator.format('Максимум {0} символов')
      },
      email: 'Поле "email" обязательно для заполнения',
      phone: {
        required: 'Поле "Телефон" обязательно для заполнения',
        minlength: jQuery.validator.format('Минимум {0} цифр'),
        maxlength: jQuery.validator.format('Максимум {0} цифр')
      },
      message: {
        rangelength: 'Минимум от 12 до 500 символов'
      },
      agreement: 'Вы должны согласиться'
    },
    // debug: true,
    // errorLabelContainer: "#result",
    errorClass: 'is-invalid', 
    validClass: 'is-valid',
    // errorElement: "div",
    errorPlacement: function ( error, element ) {
      error.addClass('invalid-tooltip').removeClass('valid-tooltip');
        if ( element.prop( "type" ) === "checkbox") {
          error.insertAfter( element.parent('label') );
        } else {
          error.insertAfter( element );
        }
      },
    highlight: function(element, errorClass, validClass) {
      $(element).addClass(errorClass).removeClass(validClass);
      $(element).find("label[for=" + element.id + "]")
      .addClass(errorClass);
    },

    unhighlight: function(element, errorClass, validClass) {
      $(element).removeClass(errorClass).addClass(validClass);
      $(element).find("label[for=" + element.id + "]")
      .removeClass(errorClass);
    },
    /*Отправка формы в случае успеха валидации*/
    submitHandler: function(){
      sendAjaxForm($formID, $nameForm, './assets/send.php', './assets/mail.php');
      $("#"+$formID)[0].reset();
      formAJAX.resetForm();
      return false;
    }
  });
});
    function sendAjaxForm(formID, $nameForm, url, phpfile) {
      var data = $("#"+formID).serializeArray();
      data.push({name: "nameForm", value: $nameForm});
      $.ajax({
        type: "POST",
        url: url, 
        dataType: "html",
        data: $.param(data), // Сеарилизуем объекты формы
        success: function(response) { 
          $("#"+formID)[0].reset();
          $('.result').fadeIn(3000 ,function() {
            $(this).addClass('visible alert alert-success').removeClass('invisible').text('Сообщение отправлено!');
          });
          $('.result').fadeOut(6000 ,function() {});
        },
        error: function(response) {
          $('.result').fadeIn(3000 ,function() {
            $('.result').addClass('visible alert alert-warning').removeClass('invisible').text('Ошибка отправления');
          });
          $('.result').fadeOut(6000 ,function() {});
        }
      });
      // запись в файл

      $.ajax({
          type: "POST",
          url: phpfile,
          // dataType: 'text',
          dataType: 'json',
          data: $.param(data)
        });
    };
});