
$(document).ready(makeKittens);
$(document).on("spfdone", makeKittens);
setInterval(makeKittens, 100);

function makeKittens() {
    var elementCount = $("img[src]:not([done])").length;
    if (elementCount > 0) {

        var loaded = Math.min(500, elementCount * 2);
        var options = {
            "api_key": "33b8776e616e9c3c0e6194ca1654947e",
            "method": "flickr.photos.search",
            "format": "json",
            "nojsoncallback": "1",
            "text": "kittens",
            "per_page": loaded
        }

        flickerSearch(options, function (data) {
            $("img[src]:not([done])").each(function (i) {
                var index = Math.floor(Math.random() * loaded);
                var url = getKittenUrl(data.photos.photo[index]);
                if (!url) {
                    url = getKittenUrl(data.photos.photo[0]);
                }
                if (url) {
                    $(this).attr("src", url);
                    $(this).attr("done", "xD");
                }
            });
        });
    }
}

function flickerSearch(options, cb) {
    var url, item, first;

    url = "https://api.flickr.com/services/rest/";
    first = true;
    $.each(options, function (key, value) {
        url += (first ? "?" : "&") + key + "=" + value;
        first = false;
    });

    $.get(url, function (data) { cb(data); });
};

function getKittenUrl(p) {
    if (p) {
        return "https://farm" + p.farm + ".staticflickr.com/" + p.server + "/" + p.id + "_" + p.secret + ".jpg";
    } else return undefined;
}