// table sort, func adapt by one provided on the internet
function sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("myTable");
    switching = true;
    dir = "asc";
    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 0; i < rows.length - 1; i++) {
            shouldSwitch = false;
            //current value
            x = rows[i].getElementsByTagName("TD")[n];
            // verify data type of the row
            var type = verifyRowType(x.innerHTML);
            //next
            y = rows[i + 1].getElementsByTagName("TD")[n];
            if (dir == "asc") {
                if (type == 's') {
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                }
                if (type == 'f') {
                    if (parseFloat(x.innerHTML) > parseFloat(y.innerHTML)) {
                        shouldSwitch = true;
                        break;
                    }
                }
                if (type == 't') {
                    if (Date.parse('01-01-0001 ' + x.innerHTML) > Date.parse('01-01-0001 ' + y.innerHTML)) {
                        shouldSwitch = true;
                        break;
                    }
                }
                if (type == 'd') {
                    if (Date.parse(x.innerHTML) > Date.parse(y.innerHTML)) {
                        shouldSwitch = true;
                        break;
                    }
                }
                if (type == 'i') {
                    if (parseInt(x.innerHTML) > parseInt(y.innerHTML)) {
                        shouldSwitch = true;
                        break;
                    }
                }
            } else if (dir == "desc") {
                if (type == 's') {
                    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                }
                if (type == 'f') {
                    if (parseFloat(x.innerHTML) < parseFloat(y.innerHTML)) {
                        shouldSwitch = true;
                        break;
                    }
                }
                if (type == 't') {
                    if (Date.parse('01-01-0001 ' + x.innerHTML) < Date.parse('01-01-0001 ' + y.innerHTML)) {
                        shouldSwitch = true;
                        break;
                    }
                }
                if (type == 'd') {
                    if (Date.parse(x.innerHTML) < Date.parse(y.innerHTML)) {
                        shouldSwitch = true;
                        break;
                    }
                }
                if (type == 'i') {
                    if (parseInt(x.innerHTML) < parseInt(y.innerHTML)) {
                        shouldSwitch = true;
                        break;
                    }
                }
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount++;
        } else {
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}

/* verifies the type of sorting needed (double, int, time, date, double, int, string)
we only need time, double and string, but i will also verify date and int*/
function verifyRowType(rowType) {
    if (parseFloat(rowType) && !Date.parse('01-01-0001 ' + rowType)) { return 'f'; }
    else if (parseInt(rowType) && !Date.parse('01-01-0001 ' + rowType)) { return 'i'; }
    else if (Date.parse('01-01-0001 ' + rowType)) { return 't'; }
    else if (Date.parse(rowType)) { return 'd'; }
    else { return 's'; }
}