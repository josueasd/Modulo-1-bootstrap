$(function () {
    $("[data-toggle = 'tooltip']").tooltip();
    $("[data-toggle = 'popover']").popover();
    $('.carousel').carousel({
        interval: 2000
    })
    // practica JQuery  
    $('#contacto').on('show.bs.modal', function (e) {
        console.log('elmodal comienza a abrirse');
        $('#contactoBtn').removeClass('btn-outline-success');
        $('#contactoBtn').addClass('btn-primary');
        console.log('elmodal se terminó de abrir');
        $('#contactoBtn').prop('disable', true);
    })
    $('#contacto').on('hidden.bs.modal', function (e) {
        console.log('el modal comienza a ocultarse');
        $('#contactoBtn').prop('disabled,false');
        console.log('el modal se terminó de ocultar');
    })
})