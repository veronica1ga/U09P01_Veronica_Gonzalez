$(document).ready(function() {
    // find elements
    const out = $(".blog-inner");
    const spinner = $("img").first();
    var formData = new FormData();
    spinner.hide();
    let output = "";

    //please use your own Marvel ApiKey
    const myApiKey = "b6729f9617abe97af151ddd9a046e785";
    $.ajax({
        url: "https://gateway.marvel.com:443/v1/public/characters?apikey=" + myApiKey,
        type: "GET",
        data: FormData,
        beforeSend: () => {
            //imagen de carga
            $(".blog-inner").html("<p align='center'><img src='../img/Vector_Loading_fallback.gif' /></p>");
        },
        beforeStart: () => {
            spinner.show();
        },
        complete: () => {
            spinner.hide();
        },
        success: response => {

            $.each(response.data.results, (key, value) => {
                output += "<div class='characters'>";
                output += "<h4>" + value.name + "</h4>";
                output += "<p>" + value.description + "</p>";
                output += "<img width='350' height='480' src='" + value.thumbnail.path + '.' + value.thumbnail.extension + "'/>";
                output += "</div>";
                //output += console.log(value.name);

                //-----filtro de busqueda-----
                $("#myInput").on("keyup", function() {
                    var value = $(this).val().toLowerCase();
                    $("#myDIV .blog-inner .characters").filter(function() {
                        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
                    });
                });
            });
            output ? out.html(output) : out.hmtl("No results");


        }
    });
});