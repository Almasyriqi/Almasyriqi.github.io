// M. Syifa'ul Ikrom Almasyriqi
// TI-2G

$(document).ready(function(){
    var dataFood = [];
    var quantityFood = [];
    var priceFood = [];
    $("#table-food").hide();
    $("#bill").hide();

    //menambahkan makananan pada array dan tabel
    $(".add-food").click(function(){
        $("#table-food").show();
        var food_name = $("#food-name").val();
        var price;
        var quantity = $("#horizontal-spinner").val();
        // menentukan harga makanan
        switch(food_name) {
            case "Burger":
                price = 20000;
                break;
            case "Pizza":
                price = 100000;
                break;
            case "Sushi":
                price = 50000;
                break;
            case "Udon":
                price = 80000;
                break;
            case "Beef Steak":
                price = 200000;
                break;
            case "Noodle":
                price = 30000;
                break;
            case "Chicken Katsu":
                price = 40000;
                break;
            default: price = 0;
        }
        
        // rule memasukkan data makanan
        var haveAdd = false;
        for (let index = 0; index < dataFood.length; index++) {
            if (food_name == dataFood[index]) {
                haveAdd = true;
            }
        }

        if (haveAdd == false) {
            // memasukkan data makanan pada array
            dataFood.push(food_name);
            priceFood.push(price);
            quantityFood.push(quantity);
            // menampilkan data makanan yang telah ditambahkan dalam bentuk tabel
            var markup = "<tr><<td>"
            + food_name + "</td><td>" + price + "</td><td>" + quantity + "</td></tr>";
            $("#table-food tbody").append(markup); 
        }
    });

    //menghapus data makanan
    $(".delete-food").click(function(){
        //menghapus data terakhir pada array
        dataFood.pop();
        priceFood.pop();
        quantityFood.pop();
        //menghapus baris terakhir pada tabel makanan
        var table = document.getElementById("table-food");
        var rowCount = table.rows.length;
        if (rowCount != 1) {
            table.deleteRow(rowCount -1);
        }
    });

    // menampilkan nota pesanan
    $(".order-food").click(function(){
        var id;
        var name;
        var status;
        var amount = 0;
        $("#bill").fadeIn("slow");
        id = $("#Customer-ID").val();
        name = $("#Customer-name").val();

        // mendapatkan status customer
        if ($("#radio-1").is(":checked")) {
            status = $("#radio-1").val();
        }
        else {
            status = $("#radio-2").val();
        }
        
        // menghitung jumlah pesanan
        for (let index = 0; index < quantityFood.length; index++) {
            amount += parseInt(quantityFood[index]);
        }

        // membuat rule pembelian
        var diskon = [];
        var totalDiskon = 0;
        var totalPrice = 0;
        var totalUnit = [];
        if (status == "member") {
            if (amount > 3) {
                for (let index = 0; index < priceFood.length; index++) {
                    diskon[index] = priceFood[index] * 0.1;
                    priceFood[index] = priceFood[index] - diskon[index];
                    totalUnit[index] = priceFood[index] * quantityFood[index]; 
                }
                for (let index = 0; index < priceFood.length; index++) {
                    totalPrice += parseInt(totalUnit[index]);
                    diskon[index] *= quantityFood[index];
                    totalDiskon += parseInt(diskon[index]);
                }
            }
            else if (amount >= 2 && amount <= 3) {
                for (let index = 0; index < priceFood.length; index++) {
                    diskon[index] = priceFood[index] * 0.07;
                    priceFood[index] = priceFood[index] - diskon[index];
                    totalUnit[index] = priceFood[index] * quantityFood[index];  
                }
                for (let index = 0; index < priceFood.length; index++) {
                    totalPrice += parseInt(totalUnit[index]);
                    diskon[index] *= quantityFood[index];
                    totalDiskon += parseInt(diskon[index]);
                }
            }
            else {
                diskon[0] = priceFood[0] * 0.05;
                priceFood[0] = priceFood[0] - diskon[0];
                totalPrice += parseInt(priceFood[0]);
                totalDiskon = diskon[0];
            }
        }
        else {
            if (amount > 5) {
                for (let index = 0; index < priceFood.length; index++) {
                    diskon[index] = priceFood[index] * 0.05;
                    priceFood[index] = priceFood[index] - diskon[index];
                    totalUnit[index] = priceFood[index] * quantityFood[index]; 
                }
                for (let index = 0; index < priceFood.length; index++) {
                    totalPrice += parseInt(totalUnit[index]);
                    diskon[index] *= quantityFood[index];
                    totalDiskon += parseInt(diskon[index]);
                }
            }
            else if (amount >= 3 && amount <= 5) {
                for (let index = 0; index < priceFood.length; index++) {
                    totalUnit[index] = priceFood[index] * quantityFood[index];
                    totalPrice += parseInt(totalUnit[index]);
                }
                diskon[0] = totalPrice * 0.05;
                totalPrice = totalPrice - diskon[0];
                totalDiskon = diskon[0];
            }
            else {
                for (let index = 0; index < priceFood.length; index++) {
                    totalUnit[index] = priceFood[index] * quantityFood[index];
                    totalPrice += parseInt(totalUnit[index]);
                }
            }
        }

        // menampilkan nota pembayaran
        document.getElementById("id").innerHTML = id;
        document.getElementById("name").innerHTML = name;
        document.getElementById("status").innerHTML = status;

        for (let index = 0; index < dataFood.length; index++) {
            document.getElementById("food-order").innerHTML = dataFood;
        }
        document.getElementById("order-quantity").innerHTML = amount;
        document.getElementById("total-diskon").innerHTML = "Rp " + totalDiskon;
        document.getElementById("total-price").innerHTML = "Rp " + totalPrice;
    });
});