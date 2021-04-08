let firstNum;
let res = [];
const natija = document.getElementById("natija");
const triada = [
    "000", "001", "010", "011",
    "100", "101", "110", "111"
];
const tetrada = [
    "0000", "0001", "0010", "0011",
    "0100", "0101", "0110", "0111",
    "1000", "1001", "1010", "1011",
    "1100", "1101", "1110", "1111"
];

document.getElementById("click").addEventListener("click", function main() {

    firstNum = document.getElementById("first").value;
    // =================== bir xil sanoq sistemasi yozilsa, o'girilmaydi ===========================
    if (document.getElementById("toSystem").value === document.getElementById("system").value) {
        natija.innerText ="Natija: "+ firstNum;
        // return 0; //
    }
    // =================== sanoq tizimlari talablari uchun tekshirish algoritmi:====================
    if (document.getElementById("system").value === "2") {
        for (let i = 0; i < firstNum.length; i++) {
            if (firstNum.charCodeAt(i) >= 50) {// 50 = > 2 .... z
                natija.innerText = "XATOLIK !!! 2 lik sanoq sistemasidagi (0 va 1 qatnashgan) sonlarni kiriting !";
                return -1;
            }
        }
    } else if (document.getElementById("system").value === "8") {
        for (let i = 0; i < firstNum.length; i++) {
            if (firstNum.charCodeAt(i) >= 56) {// 56 = > 8 .... z
                natija.innerText = "XATOLIK !!! 8 lik sanoq sistemasidagi (0 - 7 qatnashgan) sonlarni kiriting !";
                return -1;
            }
        }
    } else if (document.getElementById("system").value === "10") {
        for (let i = 0; i < firstNum.length; i++) {
            if (firstNum.charCodeAt(i) >= 58) {
                natija.innerText = "XATOLIK !!! 10 lik sanoq sistemasidagi (0 - 9 qatnashgan) sonlarni kiriting !";
                return -1;
            }
        }
    } else if (document.getElementById("system").value === "16") {
        for (let i = 0; i < firstNum.length; i++) {
            if (firstNum.charCodeAt(i) >= 103 || (firstNum.charCodeAt(i) >= 71 && firstNum.charCodeAt(i) <= 96)) {
                natija.innerText = "XATOLIK !!! 16 lik sanoq sistemasidagi (0 - 1, a-f, A-F qatnashgan) sonlarni kiriting !";
                return -1;
            }
        }
    }
    // ==========================================all=>10===============================================
    // 10likka o'tkazish to'liq:
    if (document.getElementById("toSystem").value === "10") {
        // ikkilik dan :
        if (document.getElementById("system").value === "2") {

            for (let i = 0; i < firstNum.length; i++) {
                // if (firstNum[i] < 2) {
                natija.innerText ="Natija: "+ parseInt(firstNum, 2);
                // } else {
                //     natija.innerText ="Natija: "+ "XATOLIK !!! 2 lik sanoq sistemasidagi (0 va 1 qatnashgan) sonlarni kiriting !";
                // }

            }
        }
        // sakkizlik dan :
        else if (document.getElementById("system").value === "8") {

            for (let i = 0; i < firstNum.length; i++) {
                natija.innerText ="Natija: "+ parseInt(firstNum, 8);
            }
        }
        // 16 lik dan
        else if (document.getElementById("system").value === "16") {

            for (let i = 0; i < firstNum.length; i++) {
                // bu yerda faqat 16 lik sanoq sistemasi bo'lishi uchun shart tekshirilmoqda. Ya'ni: [0-9] va [A-F] yoki [a-f]
                // if (firstNum[i] <= 9 || (firstNum.charCodeAt(i) >= 65 && firstNum.charCodeAt(i) <= 70) || (firstNum.charCodeAt(i) >= 97 && firstNum.charCodeAt(i) <= 102)) {
                natija.innerText ="Natija: "+ parseInt(firstNum, 16);
                // } else {
                //     natija.innerText ="Natija: "+ "XATOLIK !!! 16 lik sanoq sistemasidagi [0 - F] qatnashgan sonlarni kiriting !"
                // }

            }
        }
    }
    // ==========================================10=>all===============================================
    // 10 likdan otkazadi to'liq:
    if (document.getElementById("system").value === "10") {

        if (document.getElementById("toSystem").value === "2" || document.getElementById("toSystem").value === "8") {
            parse(firstNum);
            res = [];
        }
        else if (document.getElementById("toSystem").value === "16") {
            parse16(firstNum);
            res = [];
        }
    }
    // 10likdan 2 likka va 8 likka o'giradi
    function parse(son) {

        let base = document.getElementById("toSystem").value;
        res.unshift(son % base);
        if (son / base < base) {
            res.unshift(parseInt(son / base));
            natija.innerText ="Natija: "+ res.join("");
            return res;
        }
        parse(parseInt(son / base));
    }
    // 10likdan 16 likka o'giradi
    function parse16(son) {

        let base = document.getElementById("toSystem").value;
        switch (son % base) {
            case 10: res.unshift("A"); break;
            case 11: res.unshift("B"); break;
            case 12: res.unshift("C"); break;
            case 13: res.unshift("D"); break;
            case 14: res.unshift("E"); break;
            case 15: res.unshift("F"); break;
            default: res.unshift(son % base);
        }
        if (son / base < base) {
            // 234 soni kelsa 234/16 = 14 va 10 qoldiq. Shu 14 ni E qilib yozishi uchun switch ish-di.
            switch (parseInt(son / base)) {                
                case 10: res.unshift("A"); break;
                case 11: res.unshift("B"); break;
                case 12: res.unshift("C"); break;
                case 13: res.unshift("D"); break;
                case 14: res.unshift("E"); break;
                case 15: res.unshift("F"); break;
                default: res.unshift(parseInt(son / base)); 
            }
            // 30 soni borsa, if gacha 30 keladi va return da tugaydi   
            // res.unshift(parseInt(son / base));
            natija.innerText ="Natija: "+ res.join("");
            return res;
        }
        parse16(parseInt(son / base));
    }
    // ==========================================2=>all================================================
    // 2 => 8
    if (document.getElementById("system").value === "2" && document.getElementById("toSystem").value === "8") {
        binToOct(firstNum);
        res = [];//bu natija yozilgan massivni tozalash uchun
    }
    function binToOct(son) {
        let digit = son.slice(-3); //ohirigi 3 ta raqamni yulib oldi :)

        // to'lmay qolgan ohirigi songa 0 lar qo'shish uchun shart amali
        if (digit.length < 3) {
            if (digit.length < 2) {
                if (digit.length === 0) {//agar pustoy string kelsa hisoblash toxtaydi
                    natija.innerText ="Natija: "+ res.join("");
                    return 0;
                } else {
                    digit = "0" + digit;
                }
            } digit = "0" + digit; // alert("digit if - " + digit);

            for (let i = 0; i < triada.length; i++) {
                if (triada[i] === digit) {
                    // agar natija boshiga 0 qoshmoqchi bolsa, bu kerak emas :()
                    if (i === 0) {
                        natija.innerText ="Natija: "+ res.join("");
                    } else {
                        res.unshift(i);
                        // alert("res is finally: " + res);
                        natija.innerText ="Natija: "+ res.join("");
                    }
                }
            }
            return 0;
        }

        for (let i = 0; i < triada.length; i++) {
            if (triada[i] === digit) {
                res.unshift(i);
                // alert("res has become so far: " + res);
            }
        }

        binToOct(son.slice(0, -3)); //rekursiv funksiyani kichikroq argument bn chahqirish
    }
    // 2 => 16
    if (document.getElementById("system").value === "2" && document.getElementById("toSystem").value === "16") {
        binToHex(firstNum);
        res = [];//bu natija yozilgan massivni tozalash uchun
    }
    function binToHex(son) {
        let digit = son.slice(-4);
        // alert("p.. ishladi"+ "va digit: "+ digit);
        // to'lmay qolgan ohirigi songa 0 lar qo'shish uchun shart amali
        if (digit.length < 4) {
            if (digit.length < 3) {
                if (digit.length < 2) {
                    if (digit.length === 0) {// bo'sh string kelsa, hisoblash tugatiladi
                        natija.innerText ="Natija: "+ res.join("");
                        return 0;
                    } else {
                        digit = "0" + digit;
                    }
                }
                digit = "0" + digit;
            }
            digit = "0" + digit;
            // alert("digit: " + digit);
            for (let i = 0; i < tetrada.length; i++) {
                if (tetrada[i] === digit) {
                    // agar 0 qo'shgan  bolsa, bu 0 dan 7 gacha son bolishi mumkin. so, switch kk emas
                    if (i == 0) { //agar son o'zi 0 bo'lsa, uni qo'shish shart emas
                        // alert("i==0 :)");
                        natija.innerText ="Natija: "+ res.join("");
                    } else {
                        res.unshift(i);
                        // alert("res is finally: " + res);
                        natija.innerText ="Natija: "+ res.join("");
                    }
                }
            }
            return 0;
            //bu qiymat boshqa funksiyalar bn ishlatish uchun kk edi lekin ishlamadi
        }

        for (let i = 0; i < tetrada.length; i++) {
            if (tetrada[i] === digit) {
                switch (i) {
                    case 10: res.unshift("A"); break;
                    case 11: res.unshift("B"); break;
                    case 12: res.unshift("C"); break;
                    case 13: res.unshift("D"); break;
                    case 14: res.unshift("E"); break;
                    case 15: res.unshift("F"); break;
                    default: res.unshift(i);
                }
                // alert("res has become so far: " + res);
            }
        }

        binToHex(son.slice(0, -4));//rekursiv funksiyani ohirigi 4 raqamni o'chirib chaqirish chaqirish
    }
    // ==========================================8=>all===============================================
    // 8 => 2
    if (document.getElementById("system").value === "8" && document.getElementById("toSystem").value === "2") {
        octToBin(firstNum);
        res = [];
    }
    function octToBin(son) {
        for (let i = 0; i < son.length; i++) {
            for (let j = 0; j < triada.length; j++) {
                if (son[i] == j) {
                    res.push(triada[j]);
                }
            }
        }
        let temp = res.join("");
        natija.innerText ="Natija: "+ Number(temp);
        return temp;
    }
    // 8 => 16
    if (document.getElementById("system").value === "8" && document.getElementById("toSystem").value === "16") {
        octToHex(firstNum);
        res = [];
    }
    function octToHex(son) {
        let num = octToBin(son);
        res = [];
        binToHex(num);
    }
    // =========================================16=>all===============================================
    // 16 => 2
    if (document.getElementById("system").value === "16" && document.getElementById("toSystem").value === "2") {
        hexToBin(firstNum);
        res = [];
    }
    function hexToBin(son) {
        // res = [];
        for (let i = 0; i < son.length; i++) {
            for (let j = 0; j < tetrada.length; j++) {
// console.log(typeof(son[i]));
                if (son[i] == j) {
                    res.push(tetrada[j]);
                    // alert(res);
                } 
                else if(son[i]==="A" || son[i]==="a"){
                    res.push("1010"); break;
                }
                else if(son[i]==="B" || son[i]==="b"){
                    res.push("1011"); break;
                }
                else if(son[i]==="C" || son[i]==="c"){
                    res.push("1100"); break;
                }
                else if(son[i]==="D" || son[i]==="d"){
                    res.push("1101"); break;
                }
                else if(son[i]==="E" || son[i]==="e"){
                    res.push("1110"); break;
                }
                else if(son[i]==="F" || son[i]==="f"){
                    res.push("1111"); break;
                }
                
            }
        }
        let temp = res.join("");
        natija.innerText ="Natija: "+ Number(temp);
        return temp;
    }
    // 16 => 8
    if (document.getElementById("system").value === "16" && document.getElementById("toSystem").value === "8") {
        hexToOct(firstNum);
        res = [];
    }
    function hexToOct(son){
        let temp = hexToBin(son);
        res = [];
        binToOct(temp);
    }



    //bu yerga tegma !!!!
});



// DANGER ZONE !!! KEEP OUT !!!
function ishlamaganKodlar(){

// document.getElementById("click").addEventListener("keyup", event =>{
//     if(event.keyCode === 13){
//         main();
//     }
// });






    // for (let i = 0; i < firstNum.length; i++) {

        //     if (firstNum[i] >= 2) {
        //         // console.log(firstNum[i]);
        //         natija.innerText ="Natija: "+ "XATOLIK !!! 2 lik sanoq sistemasidagi (0 va 1 qatnashgan) sonlarni kiriting !";
        //     }
        // }

             // for (let i = 0; i < firstNum.length; i++) {
        //     if (firstNum[i] >= 2) {
        //         console.log(firstNum[i]);
        //         natija.innerText ="Natija: "+ "XATOLIK !!! 2 lik sanoq sistemasidagi (0 va 1 qatnashgan) sonlarni kiriting !";
        //     }
        // }

                 // else {      //bu ishlamadi :((              
                //     switch (son[i]) {
                //         case "A":
                //         case "a": res.push("1010"); break;
                //         case "B":
                //         case "b": res.push("1011"); break;
                //         case "C":
                //         case "c": res.push("1100"); break;
                //         case "D":
                //         case "d": res.push("1101"); break;
                //         case "E":
                //         case "e": res.push("1110"); break;
                //         case "F":
                //         case "f": res.push("1111"); break;
                //         default: alert("switch ishladi");
                //     }break;//birorta harfni o'girib bolib "j" sikldan chiqib ketadi. Va keyingi harfga "i" sikl orqali o'tadi
                // }      
}

