let idUSER, prd_type_choosed;

function _(m) {
    console.log(m)
}


document.querySelector(".logo_page").onclick = () => {
    window.location.reload()
}

let alert_sign_in = document.querySelector(".alert_sign_in");
let btn_cancel_ph = document.querySelector(".btn_cancel_ph");
btn_cancel_ph.addEventListener("click", () => {
    alert_sign_in.classList.remove("display");
})
let btn_login2 = document.querySelector(".btn_login2");
let btn_signing2 = document.querySelector(".btn_signing2");
btn_login2.addEventListener("click", () => {
    btn_login.click();
})
btn_signing2.addEventListener("click", () => {
    btn_signing.click();
})

let re_han_this = document.querySelector(".re_han_this");
re_han_this.addEventListener("click", () => {
    backgroundBlack_DV.classList.remove('display2');
    cnt_lisTPRDO.classList.remove('display');
})

let btn_show_menu = document.querySelector(".btn_show_menu");
btn_show_menu.addEventListener("click", () => {
    backgroundBlack_DV.classList.add('display2');
    cnt_lisTPRDO.classList.add('display');
})
let pg_res_serach = document.querySelector(".pg_res_serach");
let searchinpt = document.getElementById("main_search_inpt");
searchinpt.onblur = () => {
    function eveen(e) {
        if (!pg_res_serach.contains(e.target)) {
            pg_res_serach.classList.remove("display");
            removeEventListener("click", eveen);
        }
    }
    window.addEventListener("click", eveen)


}
searchinpt.onkeyup = () => {
    pg_res_serach.classList.add("display");
    if (searchinpt.value != "") {
        $(document).ready(
            function () {
                $(".pg_res_serach").load(
                    'serch_prd.php', {
                    prd_inf: searchinpt.value
                }
                )
            }
        )
        setTimeout(go_to, 200);
    }


}

function go_to() {
    var founded = pg_res_serach.querySelectorAll(".prd_rserched");
    founded.forEach(
        (fond) => {
            fond.onclick = () => {
                if (!is_not_sing) {
                    let id_prod = fond.getAttribute("id");
                    ids = [id_prod, idUSER];
                    ids = JSON.stringify(ids);
                    ids = encodeURIComponent(ids);
                    let host_name = window.location.origin;

                    let uRl = host_name + "/SETWEB_project/mg_mr_ab_prd.html?ids=" + ids;
                    window.location.href = uRl;
                }
                else {
                    alert_sign_in.classList.add("display");
                }
            }
        }
    )
}


let senser = document.querySelector(".senserfil");
let backgroundBlack_DV = document.querySelector(".backgroundBlack_DV");
let senserDIV = document.querySelector(".senserfil div");
let cnt_lisTPRDO = document.querySelector(".cnt_typesoff");
let tist_PRDO_typ = document.querySelectorAll(".cnt_typesoff span");
let arr_tist_PRDO_typ = Array.from(tist_PRDO_typ)

senserDIV.style.height = `${tist_PRDO_typ[0].offsetHeight}px`;

const main1 = document.querySelector('.main1');
// const cnt_container2 = document.querySelector('.cnt_container2');
const bare_menu = document.querySelector('.bare_menu');
const container1 = document.querySelector('.container1');
const container2 = document.querySelector('.container2');
const container3 = document.querySelector('.container3');
const pg_auther = document.querySelectorAll('.pg_auther');
const pg_main = document.querySelector('.pg_main');
const cnt_product = document.querySelector('.cnt_product');
const btn_logout = document.querySelector('.btn_logout');
let cnt_no_more_res= document.querySelector(".cnt_no_more_res")
let lastScrollTop = 0;


container2.onscroll = (s) => {
    let scrollTop = container2.scrollTop;
    prf_menu.classList.remove("display");

    if (scrollTop > lastScrollTop) {
        btn_share_prod.classList.add("dis_none")
        // btn_share_prod.classList.add("bare_menu_hd")
        main1.classList.add("full_screen")
        bare_menu.classList.add("bare_menu_hd")
        container1.classList.add("container1_hd")
        container2.classList.add("full_screen")
        container3.classList.add("container3_hd")

    } else {
        container1.classList.remove("container1_hd")
        container2.classList.remove("full_screen")
        main1.classList.remove("full_screen")
        bare_menu.classList.remove("bare_menu_hd")
        container3.classList.remove("container3_hd")

        setTimeout(() => {
            btn_share_prod.classList.remove("dis_none")

        }, 300)
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling

    var pg_active = container2.querySelector('.display_pg');
    let ids_prd = [];

    if ((container2.offsetHeight + container2.scrollTop) >= pg_active.offsetHeight - 500) {
        if (pg_active == pg_main) {
            let products_id = pg_active.querySelectorAll(".cnt_product ");
            products_id.forEach(cnt_prd => ids_prd.push(cnt_prd.getAttribute("id")));
            setTimeout(
                load_more_likr(pg_active, ids_prd), 1000
            );
        }
        else {
            let products_id = pg_active.querySelectorAll(".cnt_product ");
            products_id.forEach(cnt_prd => ids_prd.push(cnt_prd.getAttribute("id")));
            // let one_id = pg_active.querySelector(".cnt_product").getAttribute("id");
            load_more_likr(pg_active, ids_prd)
        }
    }
}

function load_more_likr(pg_active, arr_ids_prd) {
    arr_ids_prd = JSON.stringify(arr_ids_prd);
    $.post(
        "load_more_php.php",
        {
            type_prd: prd_type_choosed,
            ids_prd: arr_ids_prd
        }
    ).done(
        res => {
            res = JSON.parse(res);
            if (typeof(res) == 'object') {
                // cnt_no_more_res.classList.remove("display");
                for (i of res) {
                    var cloned_product = cnt_product.cloneNode(true);
                    cloned_product.querySelector(".descriptionTEXT").innerHTML = i['description'];
                    cloned_product.querySelector(".cntIMGPRODECT img").src = i['des_img'];
                    cloned_product.querySelector(".price").innerHTML = i['price'] + ' $ ';
                    // cloned_product.querySelector(".adress").innerHTML = i['local_product'];
                    if (+i['count_users'] > 0) {
                        cloned_product.querySelector(".num_people").innerHTML = `${i['count_users']}   people expressed their opinion about this produc `;
                        var num_stars = i['avg_stars'].substring(0, i['avg_stars'].indexOf('.') + 2)
                        cloned_product.querySelector(".txt_avg_stats").innerHTML = `${num_stars}`;
                    }
                    else if (+i['count_users'] == 0) {
                        cloned_product.querySelector(".all_reting").classList.add("dis_none");

                    }
                    cloned_product.id = i['id_product'];
                    cloned_product.classList.add('display');
                    pg_active.appendChild(cloned_product);
                }
            }
            else if(res == "no_res"){
                cnt_no_more_res.classList.add("display");
                pg_active.append(cnt_no_more_res);
                cnt_no_more_res.classList.add("display");
            }


        }
    )
}

let msg_mo_res = document.querySelector(".msg_mo_res");

let btn_main = tist_PRDO_typ[0];
tist_PRDO_typ
window.onload = () => {
    btn_main.click();
    loaddata('all', pg_main);
    check_login();
}

function check_login() {
    $.post(
        'virify_cockies.php'
    ).done(
        res => {
            res = JSON.parse(res);
            if (res == "NOT_FOUND") {
                is_not_sing = true;
                btn_login.classList.add('display');
                btn_signing.classList.add('display');
                btn_logout.classList.remove('display');
                btn_notif.classList.remove('display');
                span_basket.classList.remove('display');
                btn_chat.classList.remove('display');
                _('you are not signed in !!');
            } else {
                let follower_following = {
                    followers: res.followers_ids,
                    following: res.following_ids,
                }
                localStorage.removeItem('follower_followingIDS');
                follower_following = JSON.stringify(follower_following);
                follower_following = encodeURIComponent(follower_following);
                localStorage.setItem('follower_followingIDS', follower_following);
                idUSER = res.user_id;
                let user_key =`jkvDip4vQ9NCaz${idUSER}xl6U3eXKvPeDz4phKE`
                user_key = JSON.stringify(user_key);
                user_key = encodeURIComponent(user_key);
                localStorage.setItem('user_id' , user_key);
                load_info();
                is_not_sing = false;

            }
        }
    )
}

function loaddata(type, pg) {
    var loadmain = true;
    $.post(
        "indxe.php", {
        type: type,
        loadmain: loadmain
    }
    ).done(
        function (data) {
            try {
                data = JSON.parse(data);
            } catch (error) {
                _(error)
            }
            otherTYPE.classList.remove("display");
            cnt_lisTPRDO.classList.remove("display");
            backgroundBlack_DV.classList.remove('display2');
            if (data.length == 0) {
                msg_mo_res.classList.add("display");
            } else {
                msg_mo_res.classList.remove("display")
                for (i of data) {
                    var arr_img_prd = i.des_img.substring(0, i.des_img.indexOf(","));
                    arr_img_prd = decodeURI(arr_img_prd)
                    arr_img_prd = decodeURIComponent(arr_img_prd)
                    var cloned_product = cnt_product.cloneNode(true);
                    cloned_product.querySelector(".descriptionTEXT").innerHTML = i['description'];
                    cloned_product.querySelector(".price").innerHTML = i['price'] + ' $ ';
                    if (+i['count_users'] > 0) {
                        cloned_product.querySelector(".num_people").innerHTML = `${i['count_users']}   people expressed their opinion about this produc `;
                        var num_stars = i['avg_stars'].substring(0, i['avg_stars'].indexOf('.') + 2)
                        cloned_product.querySelector(".txt_avg_stats").innerHTML = `${num_stars}`;
                    }
                    else if (+i['count_users'] == 0) {
                        cloned_product.querySelector(".all_reting").classList.add("dis_none");

                    }
                    cloned_product.id = i['id_product'];
                    try {
                        if (arr_img_prd.length > 0) {
                            cloned_product.querySelector(".cntIMGPRODECT img").src = arr_img_prd;
                        } else {
                            cloned_product.querySelector(".cntIMGPRODECT img").src = i.des_img;
                        }
                    } catch (er) {
                        _(er)
                    }

                    cloned_product.classList.add('display')
                    pg.appendChild(cloned_product);
                }
            }


        }
    )
}

btn_main.addEventListener("click", () => {
    prd_type_choosed = 'all';
    pg_main.classList.add('display_pg');
    pg_auther.forEach(pg => pg.classList.remove('display_pg'));
})
tist_PRDO_typ.forEach(s => {
    s.onclick = () => {
        setTimeout(
            more_dtF
            , 1000
        )
        cnt_lisTPRDO.classList.remove("display");
        backgroundBlack_DV.classList.remove('display2');
        senserDIV.style.height = `${s.offsetHeight}px`;
        senserDIV.style.transform = `translateY(${s.offsetTop}px)`;
        tist_PRDO_typ.forEach(s => s.classList.remove('add_color'));
        s.classList.add('add_color');
        var s_index = arr_tist_PRDO_typ.indexOf(s);
        pg_auther.forEach(pg => pg.classList.remove('display_pg'));
        if (s != btn_main) {
            pg_main.classList.remove('display_pg');
        }
        switch (s_index) {
            case 1:
                pg_auther[0].replaceChildren();
                loaddata("phone", pg_auther[0]);
                prd_type_choosed = 'phone';
                pg_auther[0].classList.add('display_pg');
                break;

            case 2:
                pg_auther[1].replaceChildren();
                loaddata('watche', pg_auther[1]);
                prd_type_choosed = 'watche';
                pg_auther[1].classList.add('display_pg');
                break;

            case 3:
                pg_auther[2].replaceChildren();
                loaddata('headphone', pg_auther[2]);
                prd_type_choosed = 'headphone';
                pg_auther[2].classList.add('display_pg');
                break;

            case 4:
                pg_auther[3].replaceChildren();
                loaddata('computer', pg_auther[3]);
                prd_type_choosed = 'computer';
                pg_auther[3].classList.add('display_pg');
                break;

            case 5:
                pg_auther[4].replaceChildren();
                loaddata('c_attachment', pg_auther[4]);
                prd_type_choosed = 'c_attachment';
                pg_auther[4].classList.add('display_pg');
                break;

            case 6:
                pg_auther[5].replaceChildren();
                loaddata('screen', pg_auther[5]);
                prd_type_choosed = 'screen';
                pg_auther[5].classList.add('display_pg');
                break;

            case 7:
                pg_auther[6].replaceChildren();
                loaddata('clothe', pg_auther[6]);
                prd_type_choosed = 'clothe';
                pg_auther[6].classList.add('display_pg');

                break;
            case 8:
                pg_auther[7].replaceChildren();
                loaddata('w_clothing', pg_auther[7]);
                pg_auther[7].classList.add('display_pg');
                prd_type_choosed = 'w_clothing';

                break;

            case 9:
                pg_auther[8].replaceChildren();
                loaddata('pant', pg_auther[8]);
                prd_type_choosed = 'pant';
                pg_auther[8].classList.add('display_pg');
                break;

            case 10:
                pg_auther[9].replaceChildren();
                loaddata('s_pant', pg_auther[9]);
                prd_type_choosed = 's_pant';
                pg_auther[9].classList.add('display_pg');
                break;

            case 11:
                pg_auther[10].replaceChildren();
                loaddata('shoe', pg_auther[10]);
                pg_auther[10].classList.add('display_pg');
                break;

            case 12:
                pg_auther[11].replaceChildren();
                loaddata('slipper', pg_auther[11]);
                prd_type_choosed = 'slipper';
                pg_auther[11].classList.add('display_pg');
                break;

            case 13:
                pg_auther[12].replaceChildren();
                loaddata('w_bag', pg_auther[12]);
                prd_type_choosed = 'w_bag';
                pg_auther[12].classList.add('display_pg');
                break;

            case 14:
                pg_auther[13].replaceChildren();
                loaddata('bag', pg_auther[13]);
                prd_type_choosed = 'bag';
                pg_auther[13].classList.add('display_pg');
                break;

            case 15:
                pg_auther[14].replaceChildren();
                loaddata('glasse', pg_auther[14]);
                prd_type_choosed = 'glasse';
                pg_auther[14].classList.add('display_pg');
                break;

            case 16:
                pg_auther[15].replaceChildren();
                loaddata('Hat', pg_auther[15]);
                prd_type_choosed = 'Hat';
                pg_auther[15].classList.add('display_pg');
                break;
        }

    }
})

let other_ = document.querySelectorAll(".otherTYPE button");
let otherTYPE = document.querySelector(".otherTYPE");
let btn_other = document.querySelector(".btn_other");
let img_reth = document.querySelector(".img_reth");
btn_other.onclick = () => {
    otherTYPE.classList.add("display");
    window.onclick = (e) => {
        if (!btn_other.contains(e.target) && !otherTYPE.contains(e.target)) {
            otherTYPE.classList.remove("display");
        }
    }
}
img_reth.onclick = () => {
    otherTYPE.classList.remove("display");

}
other_.forEach(
    btn => {
        btn.onclick = () => {
            pg_main.classList.remove('display_pg');
            pg_auther.forEach(pg => pg.classList.remove('display_pg'));

            tist_PRDO_typ.forEach(s => s.classList.remove('add_color'));
            pg_auther[16].replaceChildren();
            loaddata(btn.getAttribute("id"), pg_auther[16]);
            pg_auther[16].classList.add('display_pg');
        }
    }
)


let cnt_list_friends = document.querySelector(".list_friends");
let main_pg_chat = document.querySelector(".main_pg_chat");
let pg_chat = document.querySelector(".pg_chat");
let btn_chat = document.querySelector(".btn_chat");
let btn_notif = document.querySelector(".btn_notif");
let span_basket = document.querySelector(".span_basket");
let btn_rm_cht = document.querySelector(".btn_rm_cht");

let btn_login = document.querySelector(".btn_login");
let btn_signing = document.querySelector(".btn_signing");

btn_rm_cht.addEventListener("click", () => {
    pg_chat.classList.remove("display");
})
btn_chat.addEventListener("click", () => {
    p_alert_new1.classList.remove("display")
    main_pg_chat.classList.add("display");
    window.onclick = (e) => {
        if (!cnt_list_friends.contains(e.target) && !btn_chat.contains(e.target) && !pg_chat.contains(e.target)) {
            main_pg_chat.classList.remove("display");
            let list_friend = document.querySelectorAll(".cnt_clientsINFO");
            list_friend.forEach(elem => elem.classList.remove('this_actiev'))
            pg_chat.classList.remove("display");

        }

    }
})

btn_logout.addEventListener("click", () => {
    $.post(
        "rem_cookie.php"
    ).done(
        res => {
            window.location.reload()
        }
    )

})


span_basket.addEventListener("click", () => {
    let str_id = JSON.stringify(idUSER);
    identify1 = encodeURIComponent(str_id);
    window.location.href = window.origin + "/SETWEB_project/basket.html?r$yb&&wi&&&_iwe&&8___nwbBk*8&&____bweb*=" + identify1
})
// ---------------------------------------
// wewerwerrrrrrrr

let cnt_profile = document.querySelector(".cnt_profile");
let ct_imgprf = document.querySelector(".ct_imgprf");
let img_profile = document.querySelector(".cnt_profile img");
let ct_imgprf_img = document.querySelector(".ct_imgprf img");

let btn_share_prod = document.querySelector('.btn_share_product');
btn_share_prod.addEventListener("click", () => {
    if (!is_not_sing) {
        let user_id = idUSER;
        user_id = JSON.stringify(user_id);
        user_id = encodeURIComponent(user_id);
        window.location.href = window.location.origin + '/SETWEB_project/pg_sell.html?user_id=' + user_id;
    } else {
        alert_sign_in.classList.add("display")
    }
})

let is_not_sing = true;
const cope_arrau = [];
function load_info() {
    $.post(
        "get_info.php", {
        user_id: idUSER
    }
    ).done(
        res => {
            res = JSON.parse(res);
            btn_notif.classList.add('display');
            btn_chat.classList.add('display');
            span_basket.classList.add('display');
            btn_logout.classList.add('display');
            img_profile.src = res.link_profil;
            ct_imgprf_img.src = res.link_profil;
            cope_arrau.push(res);
            btn_login.classList.remove('display');
            btn_signing.classList.remove('display');
            inps_prf[0].value = res.first_name;
            inps_prf[1].value = res.last_name;
            inps_prf[2].value = res.user_name;
            inps_prf[3].value = res.user_email;
            inps_prf[4].value = res.phone;
            inps_prf[5].value = res.adress;
            inps_prf[6].value = res.B_D;
        }
    )
}

let inp_f_prf = document.querySelector('#inp_f_prf');
let cnt_change_prfimg = document.querySelector('.cnt_change_prfimg');
let inps_prf = document.querySelectorAll(".cl2 input");
let bnt_edit__prf = document.querySelectorAll(".cl2 .wr_prf");
let prf_menu = document.querySelector(".prf_menu");
let prf_detail3 = document.querySelector(".prf_detail3");

cnt_profile.addEventListener("click", () => {
    if (!is_not_sing) {
        prf_menu.classList.add("display");
        window.onclick = (e) => {
            if (!prf_menu.contains(e.target) && !cnt_profile.contains(e.target)) {
                prf_menu.classList.remove("display");
            }
        }
    } else {
        alert_sign_in.classList.add("display")
    }

})

prf_detail3.addEventListener("click", () => {
    id_user = idUSER;
    id_user = JSON.stringify(id_user);
    id_user = encodeURIComponent(id_user);
    let host_name = window.location.origin;
    url_t = host_name + "/SETWEB_project/user_product.html?id_user=" + id_user;
    window.location.href = url_t;

})
cnt_change_prfimg.onclick = () => {
    inp_f_prf.click();
}

let frm = document.querySelector(".form_ch_prf")
let btn_submit_ch_prf = document.querySelector(".btn_submit_ch_prf")





inp_f_prf.onchange = () => {
    btn_submit_ch_prf.click();
}

frm.addEventListener("submit", e => {
    e.preventDefault();
    const fromdata = new FormData();
    fromdata.append('inp_f_prf', inp_f_prf.files[0]);
    fromdata.append("id_user", idUSER);
    $.ajax(
        {
            url: "change_prf.php",
            method: "post",
            data: fromdata,
            processData: false,
            contentType: false
        }

    ).done(
        function (res) {
            res = JSON.parse(res);
            img_profile.src = res.link_profil;
            ct_imgprf_img.src = res.link_profil;
        })


})

let prf_detail_clas1 = document.querySelector(".prf_detail1")
let cnt_user_info = document.querySelector(".cnt_user_info")

bnt_edit__prf.forEach(
    function (vtn) {
        vtn.onclick = () => {
            vtn.parentElement.querySelector("input").disabled = false;
            vtn.parentElement.querySelector("input").focus();
        }
    }
)

inps_prf.forEach(
    function (inpe) {
        inpe.disabled = true;
        inpe.onblur = () => {
            inpe.disabled = true;
        }
    }
)

prf_detail_clas1.addEventListener("click", () => {
        document.querySelector(".linkToPagePrfDetail").click();
    // cnt_user_info.classList.add('display');
    // window.onclick = (e) => {
    //     if (!prf_detail_clas1.contains(e.target)) {
    //         cnt_user_info.classList.remove('display');
    //         window.onclick = (e2) => {
    //             if (!prf_menu.contains(e2.target) && !cnt_profile.contains(e2.target)) {
    //                 prf_menu.classList.remove("display");
    //             }
    //         }
    //     }
    // }
})




let cnt_saved = document.getElementById("cnt_saved");
cnt_saved.onclick = function go_saved() {
    var url_id_user = JSON.stringify(idUSER)
    url_id_user = encodeURIComponent(url_id_user);
    let host_name = window.location.origin;
    urd_sev_page = host_name + "/SETWEB_project/saved_prd.html?id_user=" + url_id_user;
    window.location.href = urd_sev_page;
};

setTimeout(
    setInterval(more_dtF, 1000)
    , 1000);
function more_dtF() {
    btn_more = document.querySelectorAll(".btn_more");
    btn_more.forEach(
        (btn) => {
            btn.onclick = () => {
                if (!is_not_sing) {
                    let id_prod = btn.parentElement.getAttribute("id");
                    ids = [id_prod, idUSER];
                    ids = JSON.stringify(ids)
                    ids = encodeURIComponent(ids);
                    let host_name = window.location.origin;
                    let uRl = host_name + "/SETWEB_project/mg_mr_ab_prd.html?ids=" + ids;
                    window.location.href = uRl;
                }

                else {
                    alert_sign_in.classList.add("display")
                }


            }

        }
    )
}


let pg_notification = document.querySelector(".pg_notification");
let list_notif = document.querySelector(".list_notif");
let cnt_nofitication = document.querySelector(".cnt_not_user");
let btn_rm_notif = document.querySelector(".btn_rm_notif");
btn_rm_notif.addEventListener("click", () => {
    pg_notification.classList.remove("display");

})
btn_notif.addEventListener("click", () => {
    p_alert_new2.classList.remove("display");
    chek_notifcation()
    pg_notification.classList.add("display");
    window.addEventListener("click", (e) => {
        if (!list_notif.contains(e.target) && !btn_notif.contains(e.target)) {
            pg_notification.classList.remove("display");
        }
    })
})

// setInterval(chek_notifcation , 2000)
setTimeout(
    setInterval(chek_notifcation, 2000)
    // chek_notifcation
    , 100)

let p_alert_new2 = document.querySelector(".p_alert_new2");
function chek_notifcation() {
    if (!is_not_sing) {
        let ids_not = [];
        id_user = idUSER;
        var id_not_element = document.querySelectorAll(".cnt_not_user");
        id_not_element.forEach(
            (id_n) => {
                ids_not.push(id_n.getAttribute("id"));
            }
        )

        ids_not = JSON.stringify(ids_not);
        $(document).ready(
            () => {
                $.post(
                    'chek_notification.php', {
                    id_user: id_user,
                    ids_not: ids_not
                }
                ).then(
                    res => {
                        try {
                            res = JSON.parse(res);
                            for (g of res) {
                                var cloned_nof = cnt_nofitication.cloneNode(true);
                                cloned_nof.querySelector(".cnt_img_notif img").src = g['link_profil']
                                cloned_nof.querySelector(".notif_text").innerHTML = ` ${g['first_name']}  ${g['last_name']}  Send to you an order  about ${g['name_product']}  That you posted to sell `;
                                cloned_nof.classList.add("display")
                                if (g['checked'] == "false") {
                                    cloned_nof.classList.add("new_notif")
                                    p_alert_new2.classList.add("display");
                                }
                                cloned_nof.setAttribute("id", g['id_order']);
                                list_notif.insertBefore(cloned_nof, list_notif.children[3])
                            }
                            click_notif();
                        } catch (error) {

                        }

                    }
                )

            }
        )
    }
}

setTimeout(
    setInterval(load_mesg, 1000), 2000
)
let cnt_img_notif = cnt_nofitication.querySelector(".cnt_img_notif");
let p_alert_new1 = document.querySelector(".p_alert_new1");
let notif_text = document.querySelector(".notif_text");
function load_mesg() {
    if (!is_not_sing) {
        $(document).ready(
            () => {
                $.post(
                    "load_msgs.php", { id_user: idUSER }
                ).done(
                    res => {
                        res = JSON.parse(res);
                        if (res.length > 0) {
                            p_alert_new1.classList.add("display");
                            for (r of res) {
                                if (r.id_res == id_user) {
                                    if (r.type_msg == "text") {
                                        var mes_me = cnt_hy_msg.cloneNode(true);
                                        mes_me.querySelector(".hismsg").innerHTML = r.message;
                                        mes_me.querySelector(".time_send_h").innerHTML = r.date_send.substring(r.date_send.indexOf(" ") + 1);
                                        mainMESSAGES.appendChild(mes_me);
                                    }

                                    else if (r.type_msg == "imgs") {
                                        let arr_imgs = r.message.split(",");
                                        for (ln of arr_imgs) {
                                            var msg = cnt_img_msg_h.cloneNode(true);
                                            msg.querySelector("img").src = ln;
                                            msg.classList.add("display")
                                            mainMESSAGES.append(msg);
                                        }
                                    }


                                }
                                else {
                                    if (r.type_msg == "text") {
                                        var mes_his = cnt_my_msg.cloneNode(true);
                                        mes_his.querySelector(".mymsg").innerHTML = r.message;
                                        mes_his.querySelector(".time_send").innerHTML = r.date_send.substring(r.date_send.indexOf(" ") + 1);
                                        mainMESSAGES.appendChild(mes_his);
                                    } else if (r.type_msg == "imgs") {
                                        let arr_imgs = r.message.split(",");
                                        for (ln of arr_imgs) {
                                            var msg = cnt_img_msg_m.cloneNode(true);
                                            msg.querySelector("img").src = ln;
                                            msg.classList.add("display")
                                            mainMESSAGES.append(msg);
                                        }

                                    }
                                }
                            }
                            mainMESSAGES.scrollTop = mainMESSAGES.scrollHeight;
                        }
                    }
                )
            }
        )
    }

}


function click_notif() {
    if (!is_not_sing) {
        var id_user = idUSER;
        let notification_body = document.querySelectorAll(".cnt_not_user");
        notification_body.forEach(
            b => {
                b.onclick = () => {
                    id_order_b = b.getAttribute("id");
                    b.classList.remove("new_notif")
                    $(document).ready(
                        function () {
                            $.post(
                                "load_freind_menu.php", {
                                id_user: id_user,
                                id_order: id_order_b,
                                concept: "insert"
                            }
                            ).done(
                                res => {
                                    load_friend_menu();
                                    setTimeout(
                                        function () {
                                            pg_notification.classList.remove("display");
                                            setTimeout(() => {
                                                btn_chat.click();
                                            }, 400)
                                            var ar_eelm = main_pg_chat.querySelector(`.list_friends`).querySelectorAll(".cnt_clientsINFO");
                                            ar_eelm.forEach((elem) => {
                                                if (elem.getAttribute("id") == res) {
                                                    elem.click();
                                                }
                                            })


                                        }, 400
                                    )

                                }
                            )
                        }
                    )
                }
            }
        )
    }
}


let cnt_frien = document.querySelector(".cnt_clientsINFO");
function load_friend_menu() {
    if (!is_not_sing) {
        var id_user = idUSER;
        $.post(
            "load_freind_menu.php", {
            id_user: id_user,
            concept: "select"
        }
        ).done(
            res => {
                if (res != '') {
                    res = JSON.parse(res);
                    res.forEach(info_friend => delete info_friend['password']);
                    cnt_list_friends.replaceChildren();
                    for (f of res) {
                        delete f['password'];
                        var cloned_cnt_frien = cnt_frien.cloneNode(true);
                        cloned_cnt_frien.querySelector(".cnt_img").querySelector("img").src = f.link_profil;
                        cloned_cnt_frien.querySelector(".name_client").innerHTML = f.first_name;
                        cloned_cnt_frien.setAttribute("id", f.id_user);
                        cloned_cnt_frien.classList.add("display");
                        cnt_list_friends.insertBefore(cloned_cnt_frien, cnt_list_friends.children[1])
                    }
                    load_chat()
                }
            }
        )
    }
}


setTimeout(
    load_friend_menu, 500
)
let mainMESSAGES = document.querySelector(".mainMESSAGES");
let hismsg = document.querySelector(".hismsg");
let mymsg = document.querySelector(".mymsg");

let cnt_my_msg = document.querySelector(".cnt_my_msg");
let cnt_hy_msg = document.querySelector(".cnt_hy_msg");


let cnt_img_msg_m = document.querySelector(".cnt_img_msg_m");
let cnt_img_msg_h = document.querySelector(".cnt_img_msg_h");

var stsrt_cht_dv = document.querySelector(".stsrt_cht_dv");
var inpy_msg = document.getElementById("inpy_msg");
var btn_send_msg = document.getElementById("btn_send_msg");
let inp_file = document.getElementById("inp_file");
let btn_send_file = document.getElementById("btn_send_file");
let btn_sh_file = document.getElementById("btn_sh_file");
let form_img = document.getElementById("form_img");

btn_sh_file.onclick = () => inp_file.click();

inp_file.onchange = () => {
    if (inp_file.value != "") {
        dv_cnt_sen_file.classList.add("display");
        let arr_imgs = Array.from(inp_file.files)
        arr_imgs.forEach(
            file => {
                let img = document.createElement("img");
                img.src = URL.createObjectURL(file);
                cnt_choosed_imgs.append(img)
            }
        )

        let imgs_to_send = document.querySelectorAll(".cnt_choosed_imgs img");
        imgs_to_send.forEach(
            img => {
                img.onclick = () => {
                    cnt_img_to_send.querySelector("img").src = img.src;
                }
            }
        )
        imgs_to_send[0].click();
    }
    btn_send_file.onclick = send_files;


}
function send_files() {
    var id_friend = mainMESSAGES.getAttribute("id");
    var data = new FormData();
    let files_img = inp_file.files;
    for (var i = 0; i <= files_img.length; i++) {
        data.append('message[]', files_img[i]);
    }
    data.append('id_user', idUSER);
    data.append('now_frien', id_friend);
    data.append('type_msg', "imgs");
    $(document).ready(
        $.ajax(
            {
                url: "send_msg.php",
                type: "POST",
                data: data,
                processData: false,
                contentType: false
            }
        ).done(
            res => {
                dv_cnt_sen_file.classList.remove("display");
                inp_file.value = "";
                cnt_img_to_send.querySelector("img").src = "";
                cnt_choosed_imgs.replaceChildren();
                res = JSON.parse(res)
                if (res.length > 0) {
                    for (r of res) {
                        if (r.id_res == id_user) {
                            if (r.type_msg == "text") {
                                var mes_me = cnt_hy_msg.cloneNode(true);
                                mes_me.querySelector(".hismsg").innerHTML = r.message;
                                mes_me.querySelector(".time_send_h").innerHTML = r.date_send.substring(r.date_send.indexOf(" ") + 1);
                                mainMESSAGES.appendChild(mes_me);
                            }

                            else if (r.type_msg == "imgs") {
                                var msg = cnt_img_msg_h.cloneNode(true);
                                let arr_imgs = r.message.split(",");
                                msg.querySelector("img").src = r.message
                                mainMESSAGES.appendChild(msg);
                            }
                            // else if(r.type_msg =="vedio"){
                            //     var msg = cnt_img_msg_m.cloneNode(true);
                            //     cnt_img_msg_m.querySelector("img").src = r.message
                            //     mainMESSAGES.appendChild(msg);
                            // }

                        }
                        else {
                            if (r.type_msg == "text") {
                                var mes_his = cnt_my_msg.cloneNode(true);
                                mes_his.querySelector(".mymsg").innerHTML = r.message;
                                mes_his.querySelector(".time_send").innerHTML = r.date_send.substring(r.date_send.indexOf(" ") + 1);
                                mainMESSAGES.appendChild(mes_his);
                            } else if (r.type_msg == "imgs") {
                                let arr_imgs = r.message.split(",");
                                for (ln of arr_imgs) {
                                    var msg = cnt_img_msg_m.cloneNode(true);
                                    msg.querySelector("img").src = ln;
                                    msg.classList.add("display")
                                    mainMESSAGES.append(msg);
                                }

                            }
                        }
                    }
                    mainMESSAGES.scrollTop = mainMESSAGES.scrollHeight;
                }
            }
        )
    )

}

let btn_cncl_send_fil = document.querySelector("#btn_cncl_send_fil");
let dv_cnt_sen_file = document.querySelector(".dv_cnt_sen_file");
let cnt_choosed_imgs = document.querySelector(".cnt_choosed_imgs");
let cnt_img_to_send = document.querySelector(".cnt_img_to_send");
btn_cncl_send_fil.addEventListener("click", () => {
    inp_file.value = ""
    dv_cnt_sen_file.classList.remove("display");
})

inpy_msg.onkeyup = (k) => {
    if (k.key == "Enter") {
        btn_send_msg.click();
    }

    if (inpy_msg.value == "") {
        btn_send_msg.classList.remove("transfor_btn")
        btn_sh_file.classList.remove("transfor_btn")
    }
    else {
        btn_send_msg.classList.add("transfor_btn")
        btn_sh_file.classList.add("transfor_btn")
    }

}



let f_choosed_name = document.querySelector('.f_choosed_name');
let cnt_img_f_choosed = document.querySelector('.cnt_img_f_choosed');
function load_chat() {
    if (!is_not_sing) {
        var id_user = idUSER;
        var now_frien;
        let list_friend = document.querySelectorAll(".cnt_clientsINFO");
        list_friend.forEach(l => {
            l.onclick = () => {

                mainMESSAGES.scrollTop = mainMESSAGES.scrollHeight;
                list_friend.forEach(l2 => l2.classList.remove("this_actiev"));
                l.classList.add("this_actiev");
                f_choosed_name.innerHTML = l.querySelector(".name_client").innerHTML;
                cnt_img_f_choosed.querySelector("img").src = l.querySelector(".cnt_img").querySelector("img").src;
                l.querySelector(".cnt_img").classList.remove("new_msg_alert");
                l.querySelector(".lert_n_ms").classList.remove("display");
                inpy_msg.value = '';
                btn_send_msg.classList.remove("transfor_btn");
                btn_sh_file.classList.remove("transfor_btn");
                stsrt_cht_dv.classList.remove('display');
                mainMESSAGES.replaceChildren();
                pg_chat.classList.add("display");
                var id_friend = l.getAttribute("id")
                mainMESSAGES.setAttribute("id", id_friend);
                now_frien = id_friend;
                let file_chat = `messages_of${id_user}/chat${id_user}${id_friend}.json`;
                try {
                    $.post(
                        file_chat
                    ).done(
                        res => {
                            if (res.length > 0) {
                                for (r of res) {
                                    if (r.id_res == id_user) {
                                        if (r.type_msg == "text") {
                                            var mes_me = cnt_hy_msg.cloneNode(true);
                                            mes_me.querySelector(".hismsg").innerHTML = r.message;
                                            mes_me.querySelector(".time_send_h").innerHTML = r.date_send.substring(r.date_send.indexOf(" ") + 1);
                                            mainMESSAGES.appendChild(mes_me);
                                        }

                                        else if (r.type_msg == "imgs") {
                                            let arr_imgs = r.message.split(",");
                                            for (ln of arr_imgs) {
                                                var msg = cnt_img_msg_h.cloneNode(true);
                                                msg.querySelector("img").src = ln;
                                                msg.classList.add("display")
                                                mainMESSAGES.append(msg);
                                            }
                                        }
                                        // else if(r.type_msg =="vedio"){
                                        //     var msg = cnt_img_msg_m.cloneNode(true);
                                        //     cnt_img_msg_m.querySelector("img").src = r.message
                                        //     mainMESSAGES.appendChild(msg);
                                        // }

                                    }
                                    else {
                                        if (r.type_msg == "text") {
                                            var mes_his = cnt_my_msg.cloneNode(true);
                                            mes_his.querySelector(".mymsg").innerHTML = r.message;
                                            mes_his.querySelector(".time_send").innerHTML = r.date_send.substring(r.date_send.indexOf(" ") + 1);
                                            mainMESSAGES.appendChild(mes_his);
                                        } else if (r.type_msg == "imgs") {
                                            let arr_imgs = r.message.split(",");
                                            for (ln of arr_imgs) {
                                                var msg = cnt_img_msg_m.cloneNode(true);
                                                msg.querySelector("img").src = ln;
                                                msg.classList.add("display")
                                                mainMESSAGES.append(msg);
                                            }

                                        }
                                    }
                                }
                                mainMESSAGES.scrollTop = mainMESSAGES.scrollHeight;
                            }
                            else {
                                inpy_msg.value = `hello Mr.${l.querySelector(".name_client").innerHTML}`
                                stsrt_cht_dv.classList.add('display')
                            }


                        }
                    )
                } catch (error) {
                    _(error)
                }

                setTimeout(() => {
                    if (mainMESSAGES.childElementCount == 0) {
                        inpy_msg.value = `hello Mr.${l.querySelector(".name_client").innerHTML}`
                        stsrt_cht_dv.classList.add('display')
                    }
                }, 200)
            }
        })



        btn_send_msg.onclick = () => {
            message = inpy_msg.value;
            if (message != '') {
                $.post(
                    "send_msg.php", {
                    id_user: id_user,
                    now_frien: now_frien,
                    message: message,
                    type_msg: "text"
                }
                ).done(
                    res => {
                        btn_send_msg.classList.remove("transfor_btn")
                        btn_sh_file.classList.remove("transfor_btn")
                        stsrt_cht_dv.classList.remove('display')
                        res = JSON.parse(res);
                        for (r of res) {
                            if (r.id_res == id_user) {
                                var mes_me = cnt_hy_msg.cloneNode(true);
                                mes_me.querySelector(".hismsg").innerHTML = r.message;
                                mes_me.querySelector(".time_send_h").innerHTML = r.date_send.substring(r.date_send.indexOf(" ") + 1);
                                mainMESSAGES.appendChild(mes_me);
                            }
                            else {
                                var mes_his = cnt_my_msg.cloneNode(true);
                                mes_his.querySelector(".mymsg").innerHTML = r.message;
                                mes_his.querySelector(".time_send").innerHTML = r.date_send.substring(r.date_send.indexOf(" ") + 1);
                                mainMESSAGES.appendChild(mes_his);
                            }
                        }
                        inpy_msg.value = '';
                        mainMESSAGES.scrollTop = mainMESSAGES.scrollHeight;

                    }
                )
            }

        }
    }
}



