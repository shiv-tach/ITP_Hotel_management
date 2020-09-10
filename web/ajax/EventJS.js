selectedRowToInput();
function selectedRowToInput() {
    var table = document.getElementById('table'), rIndex;
    for (var i = 1; i < table.rows.length; i++) {
        table.rows[i].onclick = function () {
            rIndex = this.rowIndex;
            document.getElementById("event_id").value = this.cells[1].textContent;
            document.getElementById("category").value = this.cells[2].textContent;
            document.getElementById("date").value = this.cells[3].textContent;
            document.getElementById("time").value = this.cells[4].textContent;
            document.getElementById("no_of_members").value = this.cells[5].textContent;
            document.getElementById("price").value = this.cells[6].textContent;
            document.getElementById("status").value = this.cells[7].textContent;
            document.getElementById("date_time").value = this.cells[8].textContent;
        };
    }
}

function save() {
    var event_id = $('#event_id').val();
    var category = $('#category').val();
    var date = $('#date').val();
    var time = $('#time').val();
    var no_of_members = $('#no_of_members').val();
    var price = $('#price').val();
    var status = $('#status').val();
    var date_time = $('#date_time').val();
    var action = "insert";
    if (event_id === "" || category === "" || date === "" || time === "" || no_of_members === "" || price === "" || status === "" || date_time === "") {
        alert("Please Enter All Details")
    } else {
        $.ajax({
            url: 'EventServlet',
            method: 'POST',
            data: {action: action, event_id: event_id, category: category, date: date, time: time, no_of_members: no_of_members, price: price, status: status, date_time: date_time},
            success: function (resultText) {
                alert(resultText);
                $("#table").find("tr:gt(0)").remove();
                load();
            },
            error: function (jqXHR, exception) {
                alert("Fail Ajax");
            }
        });
    }
}

function update() {
    var event_id = $('#event_id').val();
    var category = $('#category').val();
    var date = $('#date').val();
    var time = $('#time').val();
    var no_of_members = $('#no_of_members').val();
    var price = $('#price').val();
    var status = $('#status').val();
    var date_time = $('#date_time').val();
    var action = "update";
    event_id = parseInt(event_id);
    if (event_id === 0) {
        alert("Please Select to Update")
    } else if (event_id === "" || category === "" || date === "" || time === "" || no_of_members === "" || price === "" || status === "" || date_time === "") {
        alert("Please Enter All Details")
    } else {
        $.ajax({
            url: 'EventServlet',
            method: 'POST',
            data: {action: action, event_id: event_id, category: category, date: date, time: time, no_of_members: no_of_members, price: price, status: status, date_time: date_time},
            success: function (resultText) {
                alert(resultText);
                $("#table").find("tr:gt(0)").remove();
                load();
            },
            error: function (jqXHR, exception) {
                alert("Fail Ajax");
            }
        });
    }
}

function delet() {
    var event_id = $('#event_id').val();
    var action = "delete";
    event_id = parseInt(event_id);
    if (event_id === 0) {
        alert("Please Select to Update")
    } else {
        var r = confirm("Are you Sure?");
        if (r == true) {
            $.ajax({
                url: 'EventServlet',
                method: 'POST',
                data: {action: action, event_id: event_id},
                success: function (resultText) {
                    $("#table").find("tr:gt(0)").remove();
                    load();
                    alert("Deleted")
                },
                error: function (jqXHR, exception) {
                    alert("Fail Ajax");
                }
            });
        } else {
            alert("Not Deleted")
        }
    }
}

function load() {
    var table = document.getElementById('table');
    var action = "serch";
    $.ajax({
        url: 'EventServlet',
        method: 'POST',
        data: {action: action},
        success: function (resultText) {
            resultText = resultText.replace("[", "");
            resultText = resultText.replace("]", "");
            var c = [];
            c = resultText;
            if (c.length > 5) {
                var step1 = [];
                var step2 = [];
                step1 = resultText.split("~");
                for (i = 0; i < step1.length; ++i) {
                    step2 = step1[i].split("_");
                    var newRow = table.insertRow(table.length),
                            cell0 = newRow.insertCell(0),
                            cell1 = newRow.insertCell(1),
                            cell2 = newRow.insertCell(2),
                            cell3 = newRow.insertCell(3),
                            cell4 = newRow.insertCell(4),
                            cell5 = newRow.insertCell(5),
                            cell6 = newRow.insertCell(6),
                            cell7 = newRow.insertCell(7),
                            cell8 = newRow.insertCell(8),
                            cell9 = newRow.insertCell(9),
                            k = i + 1;
                    cell0.innerHTML = k;
                    cell1.innerHTML = step2[0];
                    cell2.innerHTML = step2[1];
                    cell3.innerHTML = step2[2];
                    cell4.innerHTML = step2[3];
                    cell5.innerHTML = step2[4];
                    cell6.innerHTML = step2[5];
                    cell7.innerHTML = step2[6];
                    cell8.innerHTML = step2[7];
                    cell9.innerHTML = step2[8];
                }
            }
            selectedRowToInput();
        },
        error: function (jqXHR, exception) {
            alert("Fail Ajax")
        }
    });
    document.getElementById("form").reset();
}