import React, { useState, useEffect } from "react";
import { pilihJurusan } from "./pilihJurusan.Jsx";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function App() {

  const [recommendations, setRecommendations] = useState ({
    recommendation: '',
    recommendation2: '',
    recommendation3: ''
  })

  const [noResults, setNoResults] = useState(false);
  const [showModal, setShowModal] = useState(false);
  
  const [nationalSubjects, setNationalSubjects] = useState([
    { id: 'Matematika', name: 'Matematika', value: 0, checked: false },
    { id: 'BahasaIndonesia', name: 'Bahasa Indonesia', value: 0, checked: false },
    { id: 'BahasaInggris', name: 'Bahasa Inggris', value: 0, checked: false },
    { id: 'Fisika', name: 'Fisika', value: 0, checked: false },
    { id: 'Biologi', name: 'Biologi', value: 0, checked: false },
    { id: 'Kimia', name: 'Kimia', value: 0, checked: false },
    { id: 'Sosiologi', name: 'Sosiologi', value: 0, checked: false },
    { id: 'Geografi', name: 'Geografi', value: 0, checked: false },
    { id: 'Ekonomi', name: 'Ekonomi', value: 0, checked: false },
    // ... (add other national subjects as needed)
  ]);

  const [additionalSubjects, setAdditionalSubjects] = useState([
    { id: 'AgamaIslam', name: 'Agama Islam', value: 0, checked: false },
    { id: 'PPKN', name: 'PPKN', value: 0, checked: false },
    { id: 'Sejarah', name: 'Sejarah', value: 0, checked: false },
    { id: 'SejarahKebudayaanIslam', name: 'Sejarah Kebudayaan Islam', value: 0, checked: false },
    { id: 'SastraIndonesia', name: 'Sastra Indonesia', value: 0, checked: false },
    { id: 'Antropologi', name: 'Antropologi', value: 0, checked: false },
    { id: 'BahasaArab', name: 'Bahasa Arab', value: 0, checked: false },
    { id: 'BahasaJepang', name: 'Bahasa Jepang', value: 0, checked: false },
    { id: 'BahasaJerman', name: 'Bahasa Jerman', value: 0, checked: false },
    { id: 'KeterampilanKomputer', name: 'Keterampilan Komputer', value: 0, checked: false },
    { id: 'KeterampilanLabolatorium', name: 'Keterampilan Labolatorium', value: 0, checked: false },
    { id: 'TIK', name: 'TIK', value: 0, checked: false },
    { id: 'PendidikanLingkunganHidup', name: 'Pen. Lingkungan Hidup', value: 0, checked: false },
    // ... (add other additional subjects as needed)
  ]);


  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css';
    document.head.appendChild(link);

    // Cleanup
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const calculateResultAndSelectMajor = () => {
    // Extract scores from the subjectData array
    const nationalSubjectScores = nationalSubjects.map((subject) => subject.value);
    console.log('isi nationalSubjectScores', nationalSubjectScores);

    const additionalSubjectsScores = additionalSubjects.map((subject) => subject.value);
    console.log('isi additionalSubjectsScores', additionalSubjectsScores);
    const allScoresZero = nationalSubjectScores.every(score => score === 0) && additionalSubjectsScores.every(score => score === 0);
    const allScoresBelow50 = nationalSubjectScores.every(score => score < 50) && additionalSubjectsScores.every(score => score < 50);
    const nonZeroScoresCount = nationalSubjectScores.filter(score => score > 0).length + additionalSubjectsScores.filter(score => score > 0).length;
    if (allScoresZero || allScoresBelow50 || nonZeroScoresCount < 6) {
      setNoResults(true);
      setShowModal(true);
      console.log('Tidak Ada Hasil')
      setRecommendations({ recommendation: 'Nilai yang dimasukkan belum memenuhi syarat prediksi' });
      return;
    }
    // Call pilihJurusan with the extracted scores
    // Bobot & Prodi
    // const bobot = [ 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1];
    // Menggunakan Checklist sebagai bobot
    const checklistbobot = nationalSubjects.map(subject => subject.checked ? 5 : 0.5) .concat(additionalSubjects.map(subject => subject.checked ? 5 : 0.1));
    const prodi = ["S1 Teknologi Informasi", "S1 Teknik Elektro", "S1 Teknik Sipil", "S1 Teknik Mesin", "S1 Kedokteran", "S1 Kedokteran Gigi", "S1 Ilmu Keperawatan", "S1 Farmasi", "S1 Hubungan Internasional", "S1 Ilmu Komunikasi", "S1 Ilmu Pemerintahan", "S1 Pendidikan Bahasa Inggris", "S1 Pendidikan Bahasa Arab", "S1 Pendidikan Bahasa Jepang", "S1 Agribisnis", "S1 Argoteknologi", "S1 Ilmu Hukum", "S1 Komunikasi dan Penyiaran Islam", "S1 Pendidikan Agama Islam", "S1 Ekonomi Syariah", "S1 Manajemen", "S1 Akuntansi", "S1 Ilmu Ekonomi", "D3 Teknik Elektromedik", "D4 Teknologi Rekayasa Otomotif", "D4 Akuntansi Keuangan Lembaga Syariah" ]
    const top3Prodi = pilihJurusan(...nationalSubjectScores, ...additionalSubjectsScores, checklistbobot, prodi);
    // Log the national subject scores and eligible majors
    //console.log('National Subject Scores:', nationalSubjectScores);

    if (top3Prodi.length === 0) {
      console.log('Tidak Ada Hasil.');
      setRecommendations({ recommendation: 'Tidak Ada Hasil' });
    } else {
      console.log('3 Rekomendasi Program Studi:', top3Prodi);
      // Provide a recommendation based on the first eligible major (you can customize this logic)
      const recommendation = `1. Jurusan ${top3Prodi[0]}`;
      const recommendation2 =`2. Jurusan ${top3Prodi[1]}`;
      const recommendation3 =`3. Jurusan ${top3Prodi[2]}`;
      setRecommendations({recommendation, recommendation2, recommendation3});
      console.log(recommendation);
      console.log(recommendation2);
      console.log(recommendation3);
    }
  };
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const sliders = document.querySelectorAll('input[type="range"]');
      sliders.forEach(function (slider) {
        slider.oninput = function () {
          const valueDiv = this.parentNode.parentNode.querySelector('.value');
          valueDiv.textContent = this.value;
        };

        slider.addEventListener('mousemove', function () {
          const x = slider.value;
          const color = `linear-gradient(90deg, rgb(54, 206, 4) ${x}%, rgb(214, 214, 214) ${x}%)`;
          slider.style.background = color;
        });
      });
    }
  }, []); // Empty dependency array to run once on component mount

  const handleInputChange = (subjects, setSubjects, id, value) => {
    setSubjects((prevSubjects) =>
      prevSubjects.map((subject) => (subject.id === id ? { ...subject, value: Number(value) } : subject))
    );
  };

  const handleCheckboxChange = (subjects, setSubjects, id) => {
    setSubjects((prevSubjects) =>
      prevSubjects.map((subject) => (subject.id === id ? { ...subject, checked: !subject.checked } : subject))
    );
  };

  return (
    <div>
      <header>
        <div className="logo-container">
          <img className="logo" src="Image/Logo UMY.png" alt="logo" />
        </div>
        <div className="square1" alt="square1"></div>
        <div>
          <img className="biro" src="Image/Unggul_2022.png" alt="biro" />
          <img className="KampusMerdeka" src="Image/Kampusmerdeka2.png" alt="KampusMerdeka" />
        </div>
        <div className="square" alt="square"></div>
        <div>
          <img className="akreditasi" src="Image/Akreditas A.png" alt="akreditasi" />
          <img className="akreditasiA" src="Image/Akreditasi A2.png" alt="AkreditasA" />
        </div>
        <h1>Pemilihan Program Studi Universitas Muhammadiyah Yogyakarta</h1>
        <p>Selamat datang disistem prediksi</p>
        <p>Sistem ini akan merekomendasikan prodi berdasarkan nilai akademis calon mahasiswa</p>

        {/* Social Media Icons */}
        <div className="container">
          <p>Tentang Kami :</p>
          <a href="https://www.facebook.com/UMYogya/?locale=id_ID">
            <div className="sec facebook" data-tip="Facebook">
              <div className="icon">
                <i className="fab fa-facebook fa-lg"></i>
              </div>
              <text>Facebook</text>
            </div>
          </a>
          <a href="https://www.instagram.com/umyogya/">
            <div className="sec instagram" data-tip="Instagram">
              <div className="icon">
                <i className="fab fa-instagram fa-lg"></i>
              </div>
              <text>Instagram</text>
            </div>
          </a>
          <a href="https://www.youtube.com/user/umyogya">
            <div className="sec youtube" data-tip="Youtube">
              <div className="icon">
                <i className="fab fa-youtube fa-lg"></i>
              </div>
              <text>Youtube</text>
            </div>
          </a>
          <a href="https://twitter.com/UMYogya">
            <div className="sec twitter" data-tip="Twitter">
              <div className="icon">
                <i className="fab fa-twitter fa-lg"></i>
              </div>
              <text>Twitter</text>
            </div>
          </a>
          <a href="https://www.umy.ac.id/">
            <div className="sec browser" data-tip="umy.ac.id">
              <div className="icon">
                <i className="fas fa-globe fa-lg"></i>
              </div>
              <text>UMY</text>
            </div>
          </a>
        </div>
      </header>

      <main>
        <p>Berikan tanda ✓ pada mata pelajaran yang anda sukai</p>
        <div>
          <h1>Mata Pelajaran Nasional</h1>
        </div>
        <div>
        </div>
        <div className="subject-list">
          {nationalSubjects.map((subject) => (
            <div key={subject.id} className="card">
              <div className="range-card">
              <input
                type="checkbox"
                className="checkbox-custom"
                checked={subject.checked}
                onChange={() => handleCheckboxChange(nationalSubjects, setNationalSubjects, subject.id)}
              />
                <label htmlFor={subject.id}>{subject.name}</label> 
                <input
                  id={subject.id}
                  type="range"
                  min="0"
                  max="100"
                  defaultValue="0"
                  onChange={(e) =>
                    handleInputChange(nationalSubjects, setNationalSubjects, subject.id, e.target.value)
                  }
                />
              </div>
              <div className="value">{subject.value}</div>
            </div>
          ))}
        </div>

        <div>
          <h1>Mata Pelajaran Tambahan</h1>
        </div>
        <div className="subject-list">
          {additionalSubjects.map((subject) => (
            <div key={subject.id} className="card">
              <div className="range-card">
              <input
                type="checkbox"
                className="checkbox-custom"
                checked={subject.checked}
                onChange={() => handleCheckboxChange(additionalSubjects, setAdditionalSubjects, subject.id)}
              />
                <label htmlFor={subject.id}>{subject.name}</label> 
                <input
                  id={subject.id}
                  type="range"
                  min="0"
                  max="100"
                  defaultValue="0"
                  onChange={(e) =>
                    handleInputChange(additionalSubjects, setAdditionalSubjects, subject.id, e.target.value)
                  }
                />
              </div>
              <div className="value">{subject.value}</div>
            </div>
          ))}
        </div>
      </main>
      <ModalCreate recommendations={recommendations} noResults={noResults} show={showModal} calculate={calculateResultAndSelectMajor}/>
    </div>
  );
}

class ModalCreate extends React.Component {
  constructor() {
    super();
    this.state ={
      show : false,
      recommendation: '' // State untuk menyimpan rekomendasi jurusan
    }

    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.calculateResultAndSelectMajor = this.calculateResultAndSelectMajor.bind(this);
  }

  handleClose() {
    this.setState({
      show : false
    })
  }

  handleShow() {
    this.setState({
      show : true
    })
  }

  calculateResultAndSelectMajor() {
    const nationalSubjectScores = this.nationalSubjects.map((subject) => subject.value);
    console.log('isi nationalSubjectScores', nationalSubjectScores);
    const eligibleMajors = pilihJurusan(...nationalSubjectScores);

    console.log('National Subject Scores:', nationalSubjectScores);

    if (eligibleMajors.length === 0) {
      console.log('No eligible majors found.');
    } else {
      console.log('Eligible Majors:', eligibleMajors);
      const recommendation = `Rekomendasi: Masuk jurusan ${eligibleMajors[0]}`;
      console.log(recommendation);

      this.setState({ recommendation }); // Menyimpan rekomendasi di dalam state
    }

    this.handleClose();
  }

  render() {
    return (
    <>
      <Button variant="primary" onClick={() => {
        this.props.calculate();
        this.handleShow();
      }}>
        Submit
      </Button>
  
      <Modal show={this.state.show} onHide={this.handleClose} animation={false}>
        <Modal.Header>
          <Modal.Title>Rekomendasi Program Studi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3>{this.props.recommendations.recommendation}</h3>
          <h3>{this.props.recommendations.recommendation2}</h3>
          <h3>{this.props.recommendations.recommendation3}</h3>
        </Modal.Body> {/* Menggunakan state untuk menampilkan rekomendasi */}
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
    )
  }
}

export default App;