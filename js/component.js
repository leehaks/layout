    
$( document ).ready( function() {
    htmlLoad("header", "../html/header.html")
    htmlLoad("#sidebar", "../html/sidebar.html")
    htmlLoad("#content", "../html/button.html")
}); 

function htmlLoad(selector, htmlPath) {
    $(selector).load(htmlPath, () => {
        document.querySelectorAll('pre code').forEach((block) => {
            hljs.highlightBlock(block);
        });
    })
}