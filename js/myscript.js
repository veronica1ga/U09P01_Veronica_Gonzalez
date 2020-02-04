$(document).ready(function() {

    // find elements
    const banner = $("#banner-message");
    const button = $("button");
    const out = $("#result");
    const spinner = $("img").first();
    var formData = new FormData();
    spinner.hide();
    banner.addClass("alt");
    let output = "";
    //please use your own Marvel ApiKey
    const myApiKey = "b6729f9617abe97af151ddd9a046e785";
    $.ajax({
        url: "https://gateway.marvel.com:443/v1/public/characters?apikey=" + myApiKey,
        type: "GET",
        data: FormData,
        beforeSend: () => {
            //imagen de carga
            $("#result").html("<p align='center'><img src='../img/Vector_Loading_fallback.gif' /></p>");
        },
        beforeStart: () => {
            spinner.show();
        },
        complete: () => {
            spinner.hide();
        },
        success: response => {

            $.each(response.data.results, (key, value) => {
                output += "<div id='characters' class='characters'>";
                output += "<h4>" + value.name + "</h4>";
                output += "<p>" + value.description + "</p>";
                output += "<img width='350' height='480' src='" + value.thumbnail.path + '.' + value.thumbnail.extension + "'/>";
                output += "</div>";


            });
            output ? out.html(output) : out.hmtl("No results");
        }
    });




    var busqueda = $('#busqueda'),
        titulo = $('.banner .result');
    $(titulo).each(function() {
        var li = $(this);
        //si presionamos la tecla
        $(busqueda).keyup(function() {

            //ocultamos toda la lista
            $(li).parent().hide();
            //valor del h4
            output = $(this).val();
            //si hay coincidencias en la búsqueda cambiando a minusculas
            if ($(li).text().indexOf(output) > -1) {
                //mostramos las listas que coincidan
                $(li).parent().show();
            }
        });
    });
});