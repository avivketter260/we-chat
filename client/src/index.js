$(document).ready(function () {
    $(".dropdown").hide();
    $("#message-icon").hide();
    $("#title").hide()
    $('#div-private-id').hide()
    $("#head-line").hide()
    $("#private-message-info").hide()
    $('#div-id').hide();
    $('#content').hide();
    $('#move-page-buttom').click(function () {
        let username = $("#inbox #username").val();
        if(username=='') return;
        $("#pic").hide()
        $("#inbox").hide()
        $("#title").show()
        $('#div-id #username').val($("#inbox #username").val());
        $("#welcome-user").add($(username)).html("Welcome " + username);
        $('#content').show();
        $('#div-id').show();
    })
});
