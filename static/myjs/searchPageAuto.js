$(document).ready(function () {
    var datasearch = [
        "books",
        "audio books",
        "vedio",
        "music",
        "Harpret Collins",
        "Penguins",
        "St Pauls Publication",
        "Franciscan Media",
        "Orbis"
    ];
    $("#search").autocomplete({
        source: datasearch
    });
});