$(document).ready(function () {
  function ValidateDate(dtValue) {
    var dtRegex = new RegExp(/\b\d{1,2}[\/-]\d{1,2}[\/-]\d{4}\b/);
    return dtRegex.test(dtValue);
  }

  //---------------------------- EFFECT MATERIAL ON INPUT INPUT -----------------------------//
  $('.block input').focus(function () {
    let $parent = $(this).parent();
    $parent.addClass('is-focused has-label');
    $parent.removeClass('invalid');
  });

  $('.block input').blur(function () {
    let $parent = $(this).parent();
    let $this = $(this);

    const type = $this.attr("type-val");
    const min = $this.attr("min");
    const max = $this.attr("max");

    if (type == "string") {
      if ($this.val() == "") {
        $parent.addClass('invalid');
        $parent.removeClass('has-label');
      }
      else if (($this.val().length < min) || ($this.val().length > max)) {
        $parent.addClass('invalid');
      }
    }
    else if (type == "date") {
      if (($this.attr('name') == "date") && (!ValidateDate($this.val()))) {
        $parent.addClass('invalid');
      }
    }

    $parent.removeClass('is-focused');

    if ($this.val() == "") {
      $parent.removeClass('has-label');
    }
  });

  $('.block input').each(function () {
    if (($(this).val() != '') || ($(this).val() != 0)) {
      $(this).parent().addClass('has-label');
    }
  });


  $('.block textarea').focus(function () {
    let $parent = $(this).parent();
    $parent.addClass('is-focused has-label');
    $parent.removeClass('invalid');
  });

  $('.block textarea').blur(function () {
    let $parent = $(this).parent();
    let $this = $(this);

    const type = $this.attr("type-val");
    const min = $this.attr("min");
    const max = $this.attr("max");

    if (type == "string") {
      if ($this.val() == "") {
        $parent.addClass('invalid');
        $parent.removeClass('has-label');
      }
      else if (($this.val().length < min) || ($this.val().length > max)) {
        $parent.addClass('invalid');
      }
    }

    $parent.removeClass('is-focused');

    if ($this.val() == "") {
      $parent.removeClass('has-label');
    }
  });

  $('.block textarea').each(function () {
    if (($(this).val() != '') || ($(this).val() != 0)) {
      $(this).parent().addClass('has-label');
    }
  });
  //---------------------------- END EFFECT MATERIAL ON INPUT INPUT -----------------------------//
});