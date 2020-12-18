
$(document).ready(function(){

        let ambcode = getUrlParameter('ref');

        if (typeof(ambcode) != "undefined") {
            ambcode = ambcode.toString().toUpperCase();
        }
        /* NOTE ambassadors.js must be loaded directly on page */

        let amblist = getAmbassadorList();

        //alert('list: ' +amblist + '  code: ' + ambcode);
        let pathname = window.location.pathname;

        if (amblist.includes(ambcode)==false && pathname.includes("/landing/")){
            //alert("there seems to be a problem with your link. ");
            //window.location.href = "http://www.ouidosoftware.com";
            ambcode = 'none';
        }

        $('.subscribewithdiscount').show();
        $('.subscribenone').hide();

        if (ambcode==='none'){
            $('.subscribewithdiscount').hide();
            $('.subscribenone').show();
        }

        $('.discountcode').each(function() {
            $(this).html(ambcode);
            $(this).val(ambcode);
        });


        let url= 'http://www.ouidosoftware.com/landing/subscribenow.html?ref=' + ambcode;
        /* $('#shareurl').val(url); */
        $('.shareurl').html('<a href="' + url + '">' + url + '</a>');


        $('.buybtn').click(function(e){
            e.preventDefault();

            let codeval = $('.discountcode').val();
            let prod =0;
            prod = this.id;
            if (!prod){
                prod = 4;
            }
            if (!codeval){
                codeval = 'none';
            }

            let url = 'http://app.ouidosoftware.com/register?plan=' + prod + "&code="+ codeval;
            window.open(url);

            //alert(url);
            //alert("Please bear with us during our startup! We really appreciate your interest in subscribing. We'll be "
            // + "accepting subscriptions soon, so please check back in a few days!" + "  code: " + codeval);
        });

    $('.btnmailto').click(function(e){
        e.preventDefault();

        let dcode = $('.discountcode').val();
        let prod = this.id;
        let url = '';
        if (prod.includes("Success")){
            url = 'mailto:sales@ouidosoftware.com?subject=' + prod
                + "&body=Please tell us your success story using Ouido Software!<br>";
        }else {
            if (dcode){
                url = 'mailto:sales@ouidosoftware.com?subject=' + prod + " Inquiry - code="+ dcode
                + "&body=To ensure that you receive your discount please do not remove or change the following line!<br>" +
                "Discount Code: " + dcode + "<br>" +
                "<--------------------------------------------------------------------------------------------------------------------------------------->" +
                "<br><br>Please type your question/message here!<br>";
            } else {
                url = 'mailto:sales@ouidosoftware.com?subject=' + prod + " Inquiry"
                    + "&body=Please type your question/message here!<br>";
            }
        }

        window.location.href = url;
    });


/*
    $('.landinglink').click(function(e){
        e.preventDefault();
        let loc = $(this).data('loc');
        let dcode = $('.discountcode').val();
        let url = 'index.html?ref=' + dcode + '#' + loc;
        //alert(url);
        window.location.href = url;

    });
*/
    $(document).on('click', '.refbtn, .footerlink', function(e){

        e.preventDefault();
        let loc = $(this).attr('href');
            if (typeof(loc) === 'undefined'){
                loc = $(this).data('path');
                if (typeof(loc) === 'undefined'){
                    loc='index.html';
                }
            }

        let url = '';
        let dcode = $('.discountcode').val();
        let refline = '';
        if (dcode.length > 0 ) {
            refline = '?ref='+dcode;
        }

        if (loc.includes('#')){
                url = loc.replace('#', refline + '#') ;

        } else {
            if (loc.includes('?')){
                if (dcode.length > 0){
                    url = loc.replace('?', refline + '&') ;
                } else {
                    url = loc
                }
            } else {
                url = loc + refline;
            }

        }
        //alert('loc: ' + loc + '  url:' + url + '  refline: ' + refline);
        if ($(this).hasClass("newtab")){
            window.open(url, "_blank");
        } else {
            window.location.href = url;
        }

    });

    $(document).on('click', '.subscribebtn', function(){
        let host = window.location.hostname;

        let url ='';
        if (host.includes('localhost')){
            url = '/ouidosw/subscribenow.html?ref=' + $('#discountcode').val();
        } else {
            url = '/subscribenow.html?ref=' + $('#discountcode').val();
        }
        location.href = url;
    });



});

let getUrlParameter = function getUrlParameter(sParam) {
    let sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};