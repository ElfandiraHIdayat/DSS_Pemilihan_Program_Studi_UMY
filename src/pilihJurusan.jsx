// pilihJurusan.jsx
// Menghitung MAUT (Multi Attribute Utility Theory)
function operateMatrix(A, B) {
    var temp = [];
    for (var i = 0; i < A.length; i++) {
        var row = [];
        for (var j = 0; j < A[i].length; j++) {
            var subtractionResult = B[j] - A[i][j] ;
            var value = subtractionResult >= 0 ? 100 - subtractionResult : subtractionResult;
            row.push(value);
        }
        temp.push(row);
    }
    var result = temp ;
    temp  = [];
    return result;
}
// Menentukan nilai Minimum
function minValuesPerColumn(A) {
    var minValues = [];
    for (var j = 0; j < A[0].length; j++) {
        var min = A[0][j];
        for (var i = 1; i < A.length; i++) {
            if (A[i][j] < min) {
                min = A[i][j];
            }
        }
        minValues.push(min);
    }
    return minValues;
}
//Menentukan Nilai Max
function maxValuesPerColumn(A) {
    var maxValues = [];
    for (var j = 0; j < A[0].length; j++) {
        var max = A[0][j];
        for (var i = 1; i < A.length; i++) {
            if (A[i][j] > max) {
                max = A[i][j];
            }
        }
        maxValues.push(max);
    }
    return maxValues;
}
// Menentukan Normalisasi Matrix
function normalizeColumns(A, minValues, maxValues) {
    var normalizedMatrix = [];
    for (var i = 0; i < A.length; i++) {
        var row = [];
        for (var j = 0; j < A[i].length; j++) {
            var normalizedValue = (A[i][j] - minValues[j]) / (maxValues[j] - minValues[j]);
            row.push(normalizedValue);
        }
        normalizedMatrix.push(row);
    }
    return normalizedMatrix;
}
// Menentukan Nilai Utility
function calculateUtility(A, weights) {
    //var normalizedMatrix = normalizeColumns(A);
    var utilityMatrix = [];
    for (var i = 0; i < A.length; i++) {
        var row = [];
        for (var j = 0; j < A[i].length; j++) {
            var utilityValue = A[i][j] * weights[j];
            row.push(utilityValue);
        }
        utilityMatrix.push(row);
    }
    return utilityMatrix;
}
// Menentukan Hasil Total
function sumRowTotal(utilityMatrix) {
    var rowTotal = [];
    for (var i = 0; i < utilityMatrix.length; i++) {
        var sum = utilityMatrix[i].reduce(function(acc, val) {
            return acc + val;
        }, 0);
        rowTotal.push(sum);
    }
    return rowTotal;
}
// Menentukan Rank
function rankProdi(nilai, prodi, topN) {
    // Membuat array objek yang berisi nilai dan nama program studi
    var prodiRank = [];
    for (var i = 0; i < nilai.length; i++) {
        prodiRank.push({ nilai: nilai[i], prodi: prodi[i] });
    }

    // Mengurutkan array prodiRank berdasarkan nilai secara menurun
    prodiRank = prodiRank.sort(function(a, b) {
        return b.nilai - a.nilai;
    });

    // Mengambil N rank teratas
    const topNRanks = prodiRank.slice(0, topN);

    const topNProdi = topNRanks.map(entry => entry.prodi);

    // Mengembalikan objek JSON dengan pasangan key prodi dan nilai
    return topNProdi;
}

// pilihJurusan.jsx
export function pilihJurusan(matematika, bahasaIndonesia, bahasaInggris, fisika, biologi, kimia, sosiologi, geografi, ekonomi, pendidikanAgamaIslam, ppkn, Sejarah, sejarahKebudayaanIslam, sastraIndonesia, antropologi, bahasaArab, bahasaJepang, bahasaJerman, keterampilanKomputer, keterampilanLabolatorium, tik, plingkunganhidup, checklistbobot, prodi) {
    // Tentukan aturan untuk setiap jurusan
    console.log('checklistbobot', checklistbobot)
    console.log('program studi', prodi);
    const data = [
        [ 80, 65, 70, 55, 0, 0, 0, 0, 0, 50, 0, 0, 0, 0, 0, 0, 0, 0, 85, 0, 85, 0], // S1 Teknologi Informasi
        [ 70, 70, 60, 70, 70, 70, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 60, 60, 60, 0], // S1 Teknik Elektro
        [ 85, 70, 70, 75, 65, 70, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 65, 50, 65, 0], // S1 Teknik Sipil
        [ 65, 65, 60, 60, 50, 50, 0, 0, 0, 50, 50, 0, 0, 0, 0, 0, 0, 0, 60, 60, 50, 0], // S1 Teknik Mesin
        [ 75, 75, 80, 60, 85, 80, 50, 0, 40, 50, 30, 0, 0, 0, 50, 0, 0, 0, 50, 50, 50, 0], // S1 Kedokteran
        [ 70, 70, 70, 60, 80, 75, 50, 0, 40, 50, 25, 0, 0, 0, 0, 0, 0, 0, 50, 50, 50, 0], // S1 Kedokteran Gigi
        [ 64, 70, 75, 60, 77, 75, 65, 0, 0, 55, 0, 0, 0, 55, 0, 0, 0, 0, 55, 55, 50, 50], // S1 Ilmu keperawatan
        [ 70, 70, 75, 60, 75, 80, 40, 0, 55, 45, 0, 0, 0, 0, 0, 0, 0, 0, 55, 70, 55, 45], // S1 Farmasi
        [ 70, 70, 80, 50, 50, 50, 79, 70, 70, 70, 70, 70, 70, 60, 70, 60, 40, 40, 70, 40, 60, 40], // S1 Hubungan Internasional
        [ 65, 75, 75, 40, 50, 0, 65, 65, 60, 60, 60, 60, 0, 60, 60, 40, 30, 35, 71, 45, 65, 54], // Ilmu Komunikasi
        [ 70, 80, 75, 45, 0, 0, 70, 70, 60, 70, 76, 70, 0, 60, 55, 0, 0, 0, 69, 40, 60, 55], // S1 Ilmu Pemerintahan
        [ 65, 70, 85, 0, 0, 0, 0, 0, 0, 60, 50, 0, 0, 50, 0, 0, 0, 0, 65, 0, 65, 0], // S1 Pendidikan Bahasa Inggris
        [ 60, 70, 70, 0, 0, 0, 0, 0, 0, 70, 50, 50, 65, 55, 0, 80, 0, 0, 65, 0, 65, 0], // S1 Pendidikan Bahasa Arab
        [ 65, 70, 75, 20, 0, 0, 0, 20, 0, 55, 0, 0, 0, 50, 0, 0, 85, 0, 60, 0, 65, 60], // S1 Pendidikan Bahasa Jepang
        [ 70, 60, 70, 60, 75, 70, 50, 70, 70, 50, 50, 50, 0, 50, 50, 0, 0, 0, 65, 60, 60, 60], // S1 Agribisnis
        [ 70, 70, 75, 65, 60, 60, 50, 60, 67, 55, 54, 62, 0, 0, 0, 0, 0, 0, 67, 61, 60, 62], // S1 Argoteknologi
        [ 72, 71, 72, 54, 54, 54, 72, 71, 72, 72, 75, 65, 40, 20, 50, 0, 0, 0, 63, 0, 65, 61], // S1 Ilmu Hukum
        [ 60, 66, 66, 0, 0, 0, 70, 69, 69, 74, 71, 60, 65, 55, 0, 55, 0, 0, 65, 55, 59, 0], // S1 Komunikasi dan Penyiaran Islam
        [ 65, 72, 70, 0, 0, 0, 0, 0, 0, 87, 70, 63, 70, 50, 0, 60, 0, 0, 50, 0, 54, 0], // S1 Pendidikan Agama Islam
        [ 70, 65, 62, 0, 0, 0, 0, 0, 70, 65, 35, 0, 70, 60, 0, 50, 0, 0, 50, 0, 55, 50], // S1 Ekonomi Syariah
        [ 73, 73, 65, 0, 0, 0, 0, 0, 65, 60, 60, 0, 0, 0, 0, 0, 0, 0, 50, 0, 56, 50], // S1 Manajemen
        [ 70, 71, 67, 0, 0, 0, 50, 50, 50, 65, 60, 54, 0, 20, 0, 0, 0, 0, 50, 0, 54, 40], // S1 Akuntansi
        [ 70, 60, 60, 0, 0, 0, 0, 0, 70, 60, 30, 0, 0, 60, 0, 0, 0, 0, 50, 0, 50, 50], // S1 Ilmu Ekonomi
        [ 77, 77, 75, 75, 50, 50, 40, 40, 80, 80, 80, 40, 70, 40, 40, 35, 35, 35, 78, 75, 78, 20], // D3 Teknik Elektromedik
        [ 75, 60, 70, 70, 70, 70, 0, 0, 0, 20, 0, 0, 0, 0, 0, 0, 0, 0, 45, 55, 50, 0], // D4 Teknologi Rekayasa Otomotif
        [ 70, 75, 75, 0, 0, 0, 70, 0, 75, 80, 80, 0, 0, 0, 0, 0, 0, 0, 75, 0, 78, 78] // D4 Akuntansi Keuangan Lembaga Syariah
    ]
    const dataUser=[matematika, bahasaIndonesia, bahasaInggris, fisika, biologi, kimia, sosiologi, geografi, ekonomi, pendidikanAgamaIslam, ppkn, Sejarah, sejarahKebudayaanIslam, sastraIndonesia, antropologi, bahasaArab, bahasaJepang, bahasaJerman, keterampilanKomputer, keterampilanLabolatorium, tik, plingkunganhidup]
    const HasilOperasi1=operateMatrix(data, dataUser);
    const HasilMin=minValuesPerColumn(HasilOperasi1);
    const HasilMax=maxValuesPerColumn(HasilOperasi1);
    const NormalisasiMatrix=normalizeColumns(HasilOperasi1, HasilMin, HasilMax);
    const NilaiUtility=calculateUtility(NormalisasiMatrix, checklistbobot);
    const HasilTotal=sumRowTotal(NilaiUtility);
    const HasilRank=rankProdi(HasilTotal, prodi);
    const top3Prodi = rankProdi(HasilTotal, prodi, 3);

    console.log('datauser : ', dataUser)
    console.log(data[0][0])  //# Output: S1 Teknologi Informasi
    console.log(data[0][1])  //# Output: 80
    console.log(HasilOperasi1)
    console.log('HasilMinimal : ', HasilMin)
    console.log('HasilMaximal : ', HasilMax)
    console.log('NormalisasiMatrix', NormalisasiMatrix)
    console.log('NilaiUtility', NilaiUtility)
    console.log('Total', HasilTotal)
    console.log('Rank', HasilRank)
    console.log('Top 3 Program Studi:', top3Prodi);

    return top3Prodi;
}

function pilihJurusanbanyak(matematika, bahasaIndonesia, bahasaInggris, fisika, biologi, kimia, sosiologi, geografi, ekonomi, pendidikanAgamaIslam, ppkn, Sejarah, sejarahKebudayaanIslam, sastraIndonesia, antropologi, bahasaArab, bahasaJepang, bahasaJerman, keterampilanKomputer, keterampilanLabolatorium, tik, plingkunganhidup) {
    // Tentukan aturan untuk setiap jurusan
    //console.log('checklistbobot', checklistbobot)
    //console.log('program studi', prodi);
    const data = [
        [ 80, 65, 70, 55, 0, 0, 0, 0, 0, 50, 0, 0, 0, 0, 0, 0, 0, 0, 85, 0, 85, 0], // S1 Teknologi Informasi
        [ 70, 70, 60, 70, 70, 70, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 60, 60, 60, 0], // S1 Teknik Elektro
        [ 85, 70, 70, 75, 65, 70, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 65, 50, 65, 0], // S1 Teknik Sipil
        [ 65, 65, 60, 60, 50, 50, 0, 0, 0, 50, 50, 0, 0, 0, 0, 0, 0, 0, 60, 60, 50, 0], // S1 Teknik Mesin
        [ 75, 75, 80, 60, 85, 80, 50, 0, 40, 50, 30, 0, 0, 0, 50, 0, 0, 0, 50, 50, 50, 0], // S1 Kedokteran
        [ 70, 70, 70, 60, 80, 75, 50, 0, 40, 50, 25, 0, 0, 0, 0, 0, 0, 0, 50, 50, 50, 0], // S1 Kedokteran Gigi
        [ 64, 70, 75, 60, 77, 75, 65, 0, 0, 55, 0, 0, 0, 55, 0, 0, 0, 0, 55, 55, 50, 50], // S1 Ilmu keperawatan
        [ 70, 70, 75, 60, 75, 80, 40, 0, 55, 45, 0, 0, 0, 0, 0, 0, 0, 0, 55, 70, 55, 45], // S1 Farmasi
        [ 70, 70, 80, 50, 50, 50, 79, 70, 70, 70, 70, 70, 70, 60, 70, 60, 40, 40, 70, 40, 60, 40], // S1 Hubungan Internasional
        [ 65, 75, 75, 40, 50, 0, 65, 65, 60, 60, 60, 60, 0, 60, 60, 40, 30, 35, 71, 45, 65, 54], // Ilmu Komunikasi
        [ 70, 80, 75, 45, 0, 0, 70, 70, 60, 70, 76, 70, 0, 60, 55, 0, 0, 0, 69, 40, 60, 55], // S1 Ilmu Pemerintahan
        [ 65, 70, 85, 0, 0, 0, 0, 0, 0, 60, 50, 0, 0, 50, 0, 0, 0, 0, 65, 0, 65, 0], // S1 Pendidikan Bahasa Inggris
        [ 60, 70, 70, 0, 0, 0, 0, 0, 0, 70, 50, 50, 65, 55, 0, 80, 0, 0, 65, 0, 65, 0], // S1 Pendidikan Bahasa Arab
        [ 65, 70, 75, 20, 0, 0, 0, 20, 0, 55, 0, 0, 0, 50, 0, 0, 85, 0, 60, 0, 65, 60], // S1 Pendidikan Bahasa Jepang
        [ 70, 60, 70, 60, 75, 70, 50, 70, 70, 50, 50, 50, 0, 50, 50, 0, 0, 0, 65, 60, 60, 60], // S1 Agribisnis
        [ 70, 70, 75, 65, 60, 60, 50, 60, 67, 55, 54, 62, 0, 0, 0, 0, 0, 0, 67, 61, 60, 62], // S1 Argoteknologi
        [ 72, 71, 72, 54, 54, 54, 72, 71, 72, 72, 75, 65, 40, 20, 50, 0, 0, 0, 63, 0, 65, 61], // S1 Ilmu Hukum
        [ 60, 66, 66, 0, 0, 0, 70, 69, 69, 74, 71, 60, 65, 55, 0, 55, 0, 0, 65, 55, 59, 0], // S1 Komunikasi dan Penyiaran Islam
        [ 65, 72, 70, 0, 0, 0, 0, 0, 0, 87, 70, 63, 70, 50, 0, 60, 0, 0, 50, 0, 54, 0], // S1 Pendidikan Agama Islam
        [ 70, 65, 62, 0, 0, 0, 0, 0, 70, 65, 35, 0, 70, 60, 0, 50, 0, 0, 50, 0, 55, 50], // S1 Ekonomi Syariah
        [ 73, 73, 65, 0, 0, 0, 0, 0, 65, 60, 60, 0, 0, 0, 0, 0, 0, 0, 50, 0, 56, 50], // S1 Manajemen
        [ 70, 71, 67, 0, 0, 0, 50, 50, 50, 65, 60, 54, 0, 20, 0, 0, 0, 0, 50, 0, 54, 40], // S1 Akuntansi
        [ 70, 60, 60, 0, 0, 0, 0, 0, 70, 60, 30, 0, 0, 60, 0, 0, 0, 0, 50, 0, 50, 50], // S1 Ilmu Ekonomi
        [ 77, 77, 75, 75, 50, 50, 40, 40, 80, 80, 80, 40, 70, 40, 40, 35, 35, 35, 78, 75, 78, 20], // D3 Teknik Elektromedik
        [ 75, 60, 70, 70, 70, 70, 0, 0, 0, 20, 0, 0, 0, 0, 0, 0, 0, 0, 45, 55, 50, 0], // D4 Teknologi Rekayasa Otomotif
        [ 70, 75, 75, 0, 0, 0, 70, 0, 75, 80, 80, 0, 0, 0, 0, 0, 0, 0, 75, 0, 78, 78] // D4 Akuntansi Keuangan Lembaga Syariah
    ]
    const dataUser1=[matematika, bahasaIndonesia, bahasaInggris, fisika, biologi, kimia, sosiologi, geografi, ekonomi, pendidikanAgamaIslam, ppkn, Sejarah, sejarahKebudayaanIslam, sastraIndonesia, antropologi, bahasaArab, bahasaJepang, bahasaJerman, keterampilanKomputer, keterampilanLabolatorium, tik, plingkunganhidup]
    const HasilOperasi1=operateMatrix(data, dataUser1);
    const HasilMin=minValuesPerColumn(HasilOperasi1);
    const HasilMax=maxValuesPerColumn(HasilOperasi1);
    const NormalisasiMatrix=normalizeColumns(HasilOperasi1, HasilMin, HasilMax);
    const bobot1 = [ 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1];
    const prodi = ["S1 Teknologi Informasi", "S1 Teknik Elektro", "S1 Teknik Sipil", "S1 Teknik Mesin", "S1 Kedokteran", "S1 Kedokteran Gigi", "S1 Ilmu Keperawatan", "S1 Farmasi", "S1 Hubungan Internasional", "S1 Ilmu Komunikasi", "S1 Ilmu Pemerintahan", "S1 Pendidikan Bahasa Inggris", "S1 Pendidikan Bahasa Arab", "S1 Pendidikan Bahasa Jepang", "S1 Agribisnis", "S1 Argoteknologi", "S1 Ilmu Hukum", "S1 Komunikasi dan Penyiaran Islam", "S1 Pendidikan Agama Islam", "S1 Ekonomi Syariah", "S1 Manajemen", "S1 Akuntansi", "S1 Ilmu Ekonomi", "D3 Teknik Elektromedik", "D4 Teknologi Rekayasa Otomotif", "D4 Akuntansi Keuangan Lembaga Syariah" ]
    const NilaiUtility=calculateUtility(NormalisasiMatrix, bobot1);
    const HasilTotal=sumRowTotal(NilaiUtility);
    //const HasilRank=rankProdi(HasilTotal, prodi);
    const top3Prodi = rankProdi(HasilTotal, prodi, 3);

    console.log('datauser : ', dataUser1)
    console.log(data[0][0])  //# Output: S1 Teknologi Informasi
    console.log(data[0][1])  //# Output: 80
    console.log(HasilOperasi1)
    console.log('HasilMinimal : ', HasilMin)
    console.log('HasilMaximal : ', HasilMax)
    console.log('NormalisasiMatrix', NormalisasiMatrix)
    console.log('NilaiUtility', NilaiUtility)
    console.log('Total', HasilTotal)
    //console.log('Rank', HasilRank)
    console.log('Top 3 Program Studi:', top3Prodi);

    return top3Prodi;
    //return true
}

function generateRandomScores(numScores, min, max) {
    let scores = [];
    for (let i = 0; i < numScores; i++) {
        let score = Math.floor(Math.random() * (max - min + 1)) + min;
        scores.push(score);
    }
    return scores;
}
/*
let dataUser = [
    'matematika', 'bahasaIndonesia', 'bahasaInggris', 'fisika', 'biologi', 'kimia', 
    'sosiologi', 'geografi', 'ekonomi', 'pendidikanAgamaIslam', 'ppkn', 'Sejarah', 
    'sejarahKebudayaanIslam', 'sastraIndonesia', 'antropologi', 'bahasaArab', 
    'bahasaJepang', 'bahasaJerman', 'keterampilanKomputer', 'keterampilanLabolatorium', 
    'tik', 'plingkunganhidup'
];
*/
//let userScores = {};
let perulangan = 150;
let transposedScores = [];
for (let i = 0; i < perulangan; i++) {
    let scoreEntry = {};
    scoreEntry[i] = generateRandomScores(22, 0, 100);
    transposedScores.push(scoreEntry);
}
/*
for (let i = 0; i < perulangan; i++) {
    let scoreEntry = {};
    dataUser.forEach(subject => {
        scoreEntry[subject] = userScores[subject][i];
    });
    transposedScores.push(scoreEntry);
}
*/
console.log('data:', transposedScores);
console.log('datadata:', transposedScores[1][1][0]);
let randoms=[];
for (let i = 0; i < perulangan; i++) {
    let data1=[];
    //let valuesArray = Object.values(transposedScores[i]);
    data1= pilihJurusanbanyak(transposedScores[i][i][0],transposedScores[i][i][1],
        transposedScores[i][i][2],transposedScores[i][i][3],transposedScores[i][i][4],
        transposedScores[i][i][5],transposedScores[i][i][6],
        transposedScores[i][i][7],transposedScores[i][i][8],transposedScores[i][i][9],
        transposedScores[i][i][10],transposedScores[i][i][11],transposedScores[i][i][12],
        transposedScores[i][i][13],transposedScores[i][i][14],transposedScores[i][i][15],
        transposedScores[i][i][16],transposedScores[i][i][17],transposedScores[i][i][18],
        transposedScores[i][i][19],transposedScores[i][i][20],transposedScores[i][i][21]
    );
    randoms.push(data1);
    console.log('random:', randoms);
}
/*
let randoms=[];
transposedScores.forEach(scoreEntry => {
    dataUser.forEach(subject => {
        let data1=[];
        console.log(scoreEntry[subject]);
        data1= pilihJurusanbanyak(scoreEntry[subject]);
        randoms.append(data1);
    });
});
console.log('random:', randoms);
*/