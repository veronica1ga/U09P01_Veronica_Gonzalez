/* eslint-disable eol-last */
/* eslint-disable indent */
/* eslint-disable space-before-function-paren */
/* eslint-disable no-redeclare */
/* eslint-disable no-undef */
$(document).ready(function() {
    /* botón de lugares de los eventos */
    $('#botonlugar').on('click', function() {
        $('.lugar').toggle('fast')
    })

    /* botón de fechas de los eventos */
    $('#botonfecha').on('click', function() {
        $('.fecha').toggle('fast')
    })

    /* find elements */
    const out = $('.blog-inner')
    const spinner = $('img').first()
    spinner.hide()
    let output = ''

    /* please use your own TicketMaster ApiKey */
    const myApiKey = 'd0fUNfH7LDgxPjuKf02FFrtjZxW64bGq'
    $.ajax({
        url: 'https://app.ticketmaster.com/discovery/v2/events.json?apikey=' + myApiKey,
        type: 'GET',
        data: FormData,
        beforeSend: () => {
            /* imagen de carga
                  $(".blog-inner").html("<p align='center'><img src='../img/Vector_Loading_fallback.gif' /></p>"); */
        },
        beforeStart: () => {
            spinner.show()
        },
        complete: () => {
            spinner.hide()
        },
        success: response => {
            $.each(response._embedded.events, (key, value) => {
                output += "<div class='characters'>"
                output += '<h2>' + value.name + '</h2>'
                output += "<h4 class='name'>" + value.dates.timezone + '</h4>'
                output += '<p>' + value.dates.start.localDate + '</p>'
                    /* output += "<div><a href='" + value.url + "><i class=\"fa fa-search\"></i></a></div>"; */
                output += "<img width='350' height='480' src='" + value.images[0].url + "'/>"
                output += '</div>'
                    /* output += console.log(value.name); */
            })
            output ? out.html(output) : out.hmtl('No results')

            /* -----filtro de busqueda por lugar de evento----- */
            var busqueda = $('#lugar')
            var titulo = $('h4')
            $(titulo).each(function() {
                var li = $(this)
                $(busqueda).keyup(function() {
                    $(li).parent().hide()
                    var txt = $(this).val()
                    if ($(li).text().toLowerCase().indexOf(txt) > -1) {
                        $(li).parent().show()
                    }
                })
            })

            /* -----filtro de busqueda por fecha de evento----- */
            var busqueda = $('#fecha')
            var titulo = $('p')
            $(titulo).each(function() {
                var li = $(this)
                $(busqueda).keyup(function() {
                    $(li).parent().hide()
                    var txt = $(this).val()
                    if ($(li).text().toLowerCase().indexOf(txt) > -1) {
                        $(li).parent().show()
                    }
                })
            })
        }
    })
})