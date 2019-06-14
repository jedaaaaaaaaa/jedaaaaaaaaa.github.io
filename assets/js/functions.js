jQuery(document).ready(function () {

  $(window).scroll(function () {
    $('.topnav').toggleClass('bg-white navbar-light shadow-sm scrollednav py-0', $(this).scrollTop() > 50);
  });

  $('#modal_newsletter').on('show.bs.modal', function () {
    $('.downloadzip')[0].click();
  });
  //-----(锚链接下面为效果js)-
  $('#three').click(function () {
    $('html, body').animate({
      scrollTop: $($.attr(this, 'href')).offset().top
    }, 500);
    return false;
  });

});
