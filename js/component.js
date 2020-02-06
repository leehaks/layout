    
$( document ).ready( function() {
<<<<<<< HEAD
    htmlLoad("header", "../html/header.html")
    htmlLoad("#sidebar", "../html/sidebar.html")
    htmlLoad("#content", "../html/button.html")
=======
    $("header").load("../html/header.html")
    $("#sidebar").load("../html/sidebar.html")


    $("#content").load("../html/button.html")
    $("#anchor").load("../html/anchor.html")
    
>>>>>>> a0a93b4f28a05fd32c16bdd518c79899575ba1ae
}); 

function htmlLoad(selector, htmlPath) {
    $(selector).load(htmlPath, () => {
        document.querySelectorAll('pre code').forEach((block) => {
            hljs.highlightBlock(block);
        });
    })
}