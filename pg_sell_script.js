document.querySelector(".logo_page").onclick = () => {
    window.location.href = window.origin + "/SETWEB_project/page.html"
}


const btn_share = document.querySelector('.btn_share');
const btn_scrol_bottom = document.querySelector('.btn_scrol_bottom');
btn_scrol_bottom.onclick = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
}

let prod_name = document.querySelector("#prod_name");
let product_tp_select = document.querySelector("#product_tp_select");
let select_statu = document.querySelector("#select_statu");

let btn_our_delvry = document.querySelector("#btn_our_delvry");
let btn_client_oen_delvry = document.querySelector("#btn_client_oen_delvry");
let inp_inventory = document.getElementById("inp_inventory");
let btn_none_delvry = document.querySelector("#btn_none_delvry");
let dv_cost_dlvr = document.querySelector(".dv_cost_dlvr");
let inp_cost_delvry = dv_cost_dlvr.querySelector("input");
let prod_price = document.getElementById("prod_price");
let inp_location = document.getElementById("inp_location");
let input_desc = document.querySelector(".input-box");
let aletr_succss = document.querySelector(".aletr_succss");
let btn_home = document.querySelector("#btn_home");
let btn_done = document.querySelector("#btn_done");
btn_done.addEventListener("click", () => {
    aletr_succss.classList.remove("display");
})
btn_home.onclick = () => {
    window.location.href = document.referrer;
}

var delivry_type = '';
btn_our_delvry.addEventListener("click", () => {
    dv_cost_dlvr.classList.remove("display");
    delivry_type = 'company_delvr';

    if (btn_none_delvry.querySelector('img')) {
        btn_none_delvry.querySelector('img').remove();
        btn_none_delvry.classList.remove('delvry_nat');
    }

    else if (btn_client_oen_delvry.querySelector('img')) {
        btn_client_oen_delvry.querySelector('img').remove();
        btn_client_oen_delvry.classList.remove('delvry_nat');
    }
    if (!btn_our_delvry.querySelector('img')) {
        let img = document.createElement("img");
        img.src = "img3/done.png";
        btn_our_delvry.insertBefore(img, btn_our_delvry.children[0])
        btn_our_delvry.classList.add('delvry_nat');
    }

})

btn_our_delvry.click();
btn_client_oen_delvry.addEventListener("click", () => {
    delivry_type = 'seller_delvr';
    dv_cost_dlvr.classList.add("display");
    inp_cost_delvry.onchange = () => {
        delivry_type = `seller_delvr:{inpt_delvr_cost.value}`;

    }
    inp_cost_delvry.focus();
    if (btn_our_delvry.querySelector('img')) {
        btn_our_delvry.querySelector('img').remove();
        btn_our_delvry.classList.remove('delvry_nat');
    }

    else if (btn_none_delvry.querySelector('img')) {
        btn_none_delvry.querySelector('img').remove();
        btn_none_delvry.classList.remove('delvry_nat');
    }
    if (!btn_client_oen_delvry.querySelector('img')) {
        let img = document.createElement("img");
        img.src = "img3/done.png";
        btn_client_oen_delvry.insertBefore(img, btn_client_oen_delvry.children[0])
        btn_client_oen_delvry.classList.add('delvry_nat');
    }

})

btn_none_delvry.addEventListener("click", () => {
    dv_cost_dlvr.classList.remove("display");
    delivry_type = 'without_delvr';
    if (btn_our_delvry.querySelector('img')) {
        btn_our_delvry.querySelector('img').remove();
        btn_our_delvry.classList.remove('delvry_nat');
    }
    else if (btn_client_oen_delvry.querySelector('img')) {
        btn_client_oen_delvry.querySelector('img').remove();
        btn_client_oen_delvry.classList.remove('delvry_nat');
    }
    if (!btn_none_delvry.querySelector('img')) {
        let img = document.createElement("img");
        img.src = "img3/done.png";
        btn_none_delvry.insertBefore(img, btn_none_delvry.children[0])
        btn_none_delvry.classList.add('delvry_nat');
    }

})


let pg_sell = document.querySelector(".pg_sell");
let gallery_imgs = document.querySelector(".cnt_IMAGES_product");
let cnt_imgs_desc = document.querySelector(".cnt_imgs_desc");
var inp_imges_1 = gallery_imgs.querySelector('#inp_images')
var spaneld = gallery_imgs.querySelector('span');

[prod_name, inp_cost_delvry, product_tp_select, select_statu, prod_price, inp_location, inp_inventory].forEach(
    function (inp) {
        inp.onkeyup = () => {
            inp.classList.remove("ater_err");
            document.querySelector(".cnt_form3").classList.remove("ater_err");
        }
    }
)

window.onload = () => {
    get_userId();
}

function get_userId() {
    user_id = window.location.search;
    user_id = user_id.substring(user_id.indexOf('=') + 1);
    user_id = decodeURIComponent(user_id);
    user_id = JSON.parse(user_id);
    return user_id;
}



btn_share.addEventListener("click", () => {
    var err = 0;
    [prod_name, product_tp_select, select_statu, inp_inventory, prod_price, inp_location].forEach(
        function (inp) {
            if (inp.value == "") {
                err++;
                inp.classList.add("ater_err");
            }
        }
    )
    if (delivry_type == 'seller_delvr') {
        err++;
        inp_cost_delvry.focus();
        inp_cost_delvry.classList.add("ater_err");

    }

    if (err == 0) {
        var my_f1 = new FormData();
        const my_form = [];
        my_f1.append('id_user', get_userId());
        my_f1.append('name_product', prod_name.value);
        my_f1.append('type_product', product_tp_select.value);
        my_f1.append('statu_prd', select_statu.value);
        my_f1.append('delivry_type', delivry_type);
        my_f1.append('stock', inp_inventory.value);
        my_f1.append('price', prod_price.value);
        my_f1.append('local_product', inp_location.value);
        my_f1.append('description', input_desc.innerHTML);

        // var my_f1 = new FormData();

        if (arr_path_imgs.length > 0) {
            for (var u = 0; u <= arr_path_imgs.length; u++) {
                nu = arr_path_imgs[u].fileIMG;
                my_f1.append("file[]", nu);
            }

        }

        let my_form2 = JSON.stringify(my_form)
        // my_f1.append("data2", my_form2)
        // console.log(my_f1);
        $.ajax(
            {
                type: "post",
                url: 'send_prd.php',
                data: my_f1,
                processData: false,
                contentType: false
            }
        ).done(
            function (res) {
                console.log(res)
                if (res == true) {
                    aletr_succss.classList.add("display");
                }
                else {
                    console.log('Ther are an error');
                }
            }
        )
    }
})






let arr_path_imgs = {

};
let indes = 0;
inp_imges_1.onchange = () => {
    if (inp_imges_1.value == "") {
        err++
        document.querySelector(".cnt_form3").classList.add("ater_err");
    } else {

        // arr_path_imgs.push(inp_imges_1.files);

        document.querySelector(".cnt_form3").classList.remove("ater_err");
        gallery_imgs.querySelector('span').classList.add('dis_transf')
        for (var f of inp_imges_1.files) {
            var inde = indes;
            arr_path_imgs[inde] = {
                fileIMG: f
            }

            let cloned_cnt = cnt_imgs_desc.cloneNode(true);
            cloned_cnt.querySelector('.img_desc').src = URL.createObjectURL(f);
            cloned_cnt.classList.add('display');
            cloned_cnt.setAttribute("id", indes);
            gallery_imgs.append(cloned_cnt);
            indes += 1;
        }
        console.log(arr_path_imgs);
        let btn_removethis_img = document.querySelectorAll('.btn_removethis_img')
        btn_removethis_img.forEach(byn => {
            byn.onclick = () => {
                byn.parentElement.remove();
                console.log(byn.parentElement);
                let cout_chldren = gallery_imgs.childElementCount
                if (cout_chldren == 2) {
                    gallery_imgs.querySelector('span').classList.remove('dis_transf')
                }
            }
        })
    }

}
spaneld.addEventListener("click", () => {
    inp_imges_1.click();
})

