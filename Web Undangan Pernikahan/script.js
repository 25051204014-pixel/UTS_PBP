const elemenMuncul = document.querySelectorAll(".muncul");

function periksaMuncul() {
    elemenMuncul.forEach(elemen => {
        const jarakAtas = elemen.getBoundingClientRect().top;

        if (jarakAtas < window.innerHeight - 60) {
            elemen.classList.add("terlihat");
        }
    });
}

window.addEventListener("scroll", periksaMuncul);

const musik = document.getElementById("musik");
const tombolMusik = document.getElementById("tombol-musik");
const ikonMusikNyala = document.getElementById("ikon-musik-nyala");
const ikonMusikMati = document.getElementById("ikon-musik-mati");

function perbaruiIkonMusik() {
    if (musik.paused) {
        ikonMusikNyala.classList.add("d-none");
        ikonMusikMati.classList.remove("d-none");
    } else {
        ikonMusikNyala.classList.remove("d-none");
        ikonMusikMati.classList.add("d-none");
    }
}

musik.addEventListener("play", perbaruiIkonMusik);
musik.addEventListener("pause", perbaruiIkonMusik);

tombolMusik.addEventListener("click", () => {
    if (musik.paused) {
        musik.play();
    } else {
        musik.pause();
    }
});

const cover = document.getElementById("cover");
const isiUndangan = document.getElementById("isi-undangan");
const tombolBuka = document.getElementById("tombol-buka");

tombolBuka.addEventListener("click", () => {
    document.body.classList.remove("terkunci");
    isiUndangan.classList.remove("d-none");
    tombolMusik.classList.remove("d-none");
    musik.play();
    periksaMuncul();
    cover.classList.add("terbuka");

    setTimeout(() => {
        cover.classList.add("d-none");
    }, 1000);
});

const tanggalAcara = new Date(2026, 11, 20, 11);

const elHari = document.getElementById("hitung-hari");
const elJam = document.getElementById("hitung-jam");
const elMenit = document.getElementById("hitung-menit");
const elDetik = document.getElementById("hitung-detik");

function tambahNol(angka) {
    if (angka < 10) {
        return "0" + angka;
    }
    return angka;
}

function perbaruiCountdown() {
    const sekarang = new Date();
    let selisih = tanggalAcara - sekarang;

    if (selisih < 0) {
        selisih = 0;
    }

    const hari = Math.floor(selisih / (1000 * 60 * 60 * 24));
    const jam = Math.floor(selisih / (1000 * 60 * 60)) % 24;
    const menit = Math.floor(selisih / (1000 * 60)) % 60;
    const detik = Math.floor(selisih / 1000) % 60;

    elHari.textContent = tambahNol(hari);
    elJam.textContent = tambahNol(jam);
    elMenit.textContent = tambahNol(menit);
    elDetik.textContent = tambahNol(detik);
}

perbaruiCountdown();
setInterval(perbaruiCountdown, 1000);

function validasiRsvp() {
    const inputNama = document.getElementById("rsvp-nama");
    const inputHadir = document.getElementById("rsvp-hadir");
    const inputJumlah = document.getElementById("rsvp-jumlah");
    const pesanError = document.getElementById("rsvp-error");

    inputNama.classList.remove("isian-salah");
    inputHadir.classList.remove("isian-salah");
    inputJumlah.classList.remove("isian-salah");
    pesanError.textContent = "";

    const nama = inputNama.value;
    const hadir = inputHadir.value;
    const jumlah = parseInt(inputJumlah.value, 10);

    if (nama === "") {
        inputNama.classList.add("isian-salah");
        pesanError.textContent = "Nama wajib diisi.";
        return false;
    }

    if (hadir === "") {
        inputHadir.classList.add("isian-salah");
        pesanError.textContent = "Silakan pilih konfirmasi kehadiran.";
        return false;
    }

    if (hadir === "Hadir" && (inputJumlah.value === "" || jumlah < 1 || jumlah > 5)) {
        inputJumlah.classList.add("isian-salah");
        pesanError.textContent = "Jumlah tamu harus antara 1 sampai 5 orang.";
        return false;
    }

    let judul;
    let isi;

    if (hadir === "Hadir") {
        judul = "Terima kasih, " + nama + "!";
        isi = "Kehadiran " + jumlah + " orang sudah Anda konfirmasi. Kami menantikan kedatangan Anda.";
    } else {
        judul = "Terima kasih, " + nama + ".";
        isi = "Kami memahami, dan terima kasih atas doa restu Anda.";
    }

    document.getElementById("rsvp-judul").textContent = judul;
    document.getElementById("rsvp-isi").textContent = isi;
    document.getElementById("rsvp-form").classList.add("d-none");
    document.getElementById("rsvp-hasil").classList.remove("d-none");

    return false;
}