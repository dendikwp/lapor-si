export function tanggalIndonesia(val) {
    var tanggal = new Date(val);

    var day = tanggal.getDate();
    var month = tanggal.getMonth() + 1;
    var year = tanggal.getFullYear();

    if (day < 10) {
        day = '0' + day;
    }
    if (month < 10) {
        month = '0' + month;
    }

    var tanggalString = day + '/' + month + '/' + year;
    return tanggalString;
}
