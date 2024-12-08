import "dotenv/config";
import pkg from "pg";
const { Pool } = pkg;
import { nanoid } from "nanoid";
import bcrypt from "bcrypt";

export default class Seeder {
  constructor() {
    this._pool = new Pool({
      user: process.env.PGUSER,
      host: process.env.PGHOST,
      database: process.env.PGDATABASE,
      password: process.env.PGPASSWORD,
      port: process.env.PGPORT,
    });
  }

  async seedUser() {
    const id = `user-${nanoid(16)}`;
    const hashedPassword = await bcrypt.hash("secret", 10);
    await this._pool.query(
      `INSERT INTO users (id, username, password) VALUES ($1, 'developer', $2)`,
      [id, hashedPassword]
    );
    console.log("User seeded successfully.");
  }

  async seedHero() {
    const id = `hero-${nanoid(16)}`;
    await this._pool.query(
      `INSERT INTO hero (id, title, city, image_url) VALUES ($1, 'The 7th International Conference on Data Science and Its Applications', 'Bandung', 'http://localhost:8000/hero/images/ancient-pura.jpg')`,
      [id]
    );
    console.log("Hero seeded successfully.");
  }

  async seedConference() {
    const conferenceGroupId = "conferencegroup-DS10OoCNCzHdeFUG";
    const conferences = [
      {
        title: "1st ICoDIS | IoP Science",
        conference_url: "https://iopscience.iop.org/article/...",
      },
      {
        title: "2nd ICoDIS | IoP Science",
        conference_url: "https://iopscience.iop.org/article/...",
      },
      {
        title: "3rd ICoDIS (ICoDSA) | IEEE Xplore",
        conference_url: "https://ieeexplore.ieee.org/document/...",
      },
      {
        title: "4th ICoDIS (ICoDSA) | IEEE Xplore",
        conference_url: "https://ieeexplore.ieee.org/document/...",
      },
      {
        title: "5th ICoDIS (ICoDSA) | IEEE Xplore",
        conference_url: "https://ieeexplore.ieee.org/document/...",
      },
      {
        title: "6th ICoDIS (ICoDSA) | IEEE Xplore",
        conference_url: "https://ieeexplore.ieee.org/document/...",
      },
    ];

    for (const conf of conferences) {
      const id = `conference-${nanoid(16)}`;
      await this._pool.query(
        `INSERT INTO conference (id, title, conference_url, conference_group_id) VALUES ($1, $2, $3, $4)`,
        [id, conf.title, conf.conference_url, conferenceGroupId]
      );
    }

    console.log("Conferences seeded successfully.");
  }

  async seedAbout() {
    const id = `about-${nanoid(16)}`;
    const aboutDescription = `The rapid evolution of contemporary computing technology has propelled individuals to generate an unprecedented volume of data, characterized by both its size and diversity—a phenomenon unparalleled in the annals of computing history. This surge in data has sparked a compelling need for effective processing and analysis, captivating the attention of researchers who endeavor to propose innovative solutions. In response to this burgeoning interest, the 7th International Conference on Data Science and Its Applications (ICoDSA) 2024, themed \"Data for Good: Leveraging Data Science for Social Impact,\" has been meticulously organized.\n\nThe conference serves as a focal point for researchers to share and disseminate their noteworthy contributions in the realms of data science, computational linguistics, and information science. Encompassing a broad spectrum of relevant topics, 7th ICoDSA 2024 extends a warm invitation to researchers to explore and present their latest insights in these dynamic fields.`;
    const conference_id = "conferencegroup-DS10OoCNCzHdeFUG";
    const where = "Telkom University";
    const who =
      "Assoc. Prof. Dr. Hoshang Kolivand\nAssoc Prof. Dr. Satria Mandala\nProf. Hui-Min David Wang\nProf. Dimitrios Georgakopoulos\nDr. Ahsan Morsed (Tutorial)";

    await this._pool.query(`INSERT INTO about VALUES ($1, $2, $3, $4, $5)`, [
      id,
      aboutDescription,
      conference_id,
      where,
      who,
    ]);

    console.log("About seeded successfully.");
  }

  async seedSchedule() {
    const scheduleData = [
      {
        id: "schedule-lP1QegAkXnD5IHqb",
        eventday: "2025-01-01",
        timestart: "08:00:00",
        timeend: "08:45:00",
        sessiontitle: "Open Registration Onsite Day 1",
        performer_speaker: "-",
        parallelsession: "-",
      },
      {
        id: "schedule-bhdSmPIdMexuWUxh",
        eventday: "2025-01-01",
        timestart: "08:45:00",
        timeend: "08:55:00",
        sessiontitle: "Opening Day 1: Live Dance",
        performer_speaker: "-",
        parallelsession: "-",
      },
      {
        id: "schedule-TDuvOFLq0p2GA0dt",
        eventday: "2025-01-01",
        timestart: "08:55:00",
        timeend: "09:00:00",
        sessiontitle: "Speech by General Chair Representation 2024",
        performer_speaker: "Assoc. Prof. Dr. Putu Harry Gunawan",
        parallelsession: "-",
      },
      {
        id: "schedule-f8ePuDvjMb_ptRUr",
        eventday: "2025-01-01",
        timestart: "09:00:00",
        timeend: "09:05:00",
        sessiontitle: "Speech by IEEE IS Representative 2024",
        performer_speaker: "Prof. Ir. Gamantyo Hendrantoro",
        parallelsession: "-",
      },
      {
        id: "schedule-byxBUYFebb48VXhL",
        eventday: "2025-01-01",
        timestart: "09:05:00",
        timeend: "09:10:00",
        sessiontitle: "Opening Speech by Rector of Telkom University",
        performer_speaker: "Prof. Dr. Adiwijaya",
        parallelsession: "-",
      },
      {
        id: "schedule-6VrAE25gOhBrl5v9",
        eventday: "2025-01-01",
        timestart: "09:10:00",
        timeend: "10:40:00",
        sessiontitle:
          "Keynote Speech #1 : Developing the next generation IoT via foundational research and industry projects",
        performer_speaker: "Emily Turner, James Green",
        parallelsession: "1A, 1B",
      },
      {
        id: "schedule-V31G4LxMTP1Y_pC7",
        eventday: "2025-01-01",
        timestart: "10:40:00",
        timeend: "11:00:00",
        sessiontitle: "Coffee Break",
        performer_speaker: "-",
        parallelsession: "-",
      },
      {
        id: "schedule-Rm0ZiQwdYYCZ1MhD",
        eventday: "2025-01-01",
        timestart: "11:00:00",
        timeend: "12:30:00",
        sessiontitle:
          "Keynote Speech #2: Prof. Hui-Min David Wang, Department of Chemical Engineering, Institute of Biomedical Engineering, National Chung Hsing University, Taiwan",
        performer_speaker: "Prof. Hui-Min David Wang",
        parallelsession: "2A, 2B",
      },
      {
        id: "schedule-OdxYiEWWo8nG_MV5",
        eventday: "2025-01-01",
        timestart: "12:30:00",
        timeend: "13:30:00",
        sessiontitle: "Lunch Break + ISOMA",
        performer_speaker: "-",
        parallelsession: "-",
      },
      {
        id: "schedule-OZXyQbwfIyFD2Xqn",
        eventday: "2025-01-01",
        timestart: "13:30:00",
        timeend: "15:00:00",
        sessiontitle:
          "Keynote Speech #3: Assoc. Prof. Dr. Satria Mandala, Research Center Human Centric Engineering, Telkom University, Bandung, Indonesia",
        performer_speaker: "Assoc. Prof. Dr. Satria Mandala",
        parallelsession: "3A, 3B",
      },
      {
        id: "schedule-1AWjritpRpMmiBZO",
        eventday: "2025-01-01",
        timestart: "15:00:00",
        timeend: "16:30:00",
        sessiontitle: "Ice Breaking (Transition)",
        performer_speaker: "-",
        parallelsession: "4A, 4B",
      },
      {
        id: "schedule-WMLY6alMBlzZn7Jb",
        eventday: "2025-01-01",
        timestart: "16:30:00",
        timeend: "16:35:00",
        sessiontitle: "Coffee Break",
        performer_speaker: "-",
        parallelsession: "-",
      },
      {
        id: "schedule-wkAKajLRKd9qnlTN",
        eventday: "2025-01-01",
        timestart: "16:35:00",
        timeend: "18:05:00",
        sessiontitle:
          "Keynote Speech #4: Assoc. Prof. Dr. Hoshang Kolivand, School of Computer Science and Mathematics, Liverpool John Moores University, England",
        performer_speaker: "Assoc. Prof. Dr. Hoshang Kolivand",
        parallelsession: "5A, 5B",
      },
      {
        id: "schedule-SS4_gRKYRX-7ro1N",
        eventday: "2025-01-01",
        timestart: "18:05:00",
        timeend: "18:10:00",
        sessiontitle: "Closing Day 1",
        performer_speaker: "-",
        parallelsession: "-",
      },
      {
        id: "schedule--mmhVS8zDNWFyh91",
        eventday: "2025-01-02",
        timestart: "08:00:00",
        timeend: "09:00:00",
        sessiontitle: "Open Registration Onsite Day 2",
        performer_speaker: "-",
        parallelsession: "-",
      },
      {
        id: "schedule-IHnDh4q621D6o_RK",
        eventday: "2025-01-02",
        timestart: "09:00:00",
        timeend: "09:05:00",
        sessiontitle: "Opening Day 2",
        performer_speaker: "-",
        parallelsession: "-",
      },
      {
        id: "schedule-ggAzpssuMccQipvH",
        eventday: "2025-01-02",
        timestart: "09:05:00",
        timeend: "10:35:00",
        sessiontitle:
          "Tutorial Session: Dr. Ahsan Morshed, School of Engineering and Technology, Central Queensland University, Australia",
        performer_speaker: "Dr. Ahsan Morshed",
        parallelsession: "6A, 6B, 6C",
      },
      {
        id: "schedule-gFB1tT5ZjVgLRYi4",
        eventday: "2025-01-02",
        timestart: "10:35:00",
        timeend: "10:45:00",
        sessiontitle: "Coffee Break",
        performer_speaker: "-",
        parallelsession: "-",
      },
      {
        id: "schedule-g2FEns1TouZSccQs",
        eventday: "2025-01-02",
        timestart: "10:45:00",
        timeend: "12:15:00",
        sessiontitle: "Parallel Session",
        performer_speaker: "-",
        parallelsession: "7A, 7B, 7C",
      },
      {
        id: "schedule-5z2M3ODofcWlGSdg",
        eventday: "2025-01-02",
        timestart: "12:15:00",
        timeend: "13:15:00",
        sessiontitle: "Lunch Break + ISOMA",
        performer_speaker: "-",
        parallelsession: "-",
      },
      {
        id: "schedule-JfB2Zr4RWw24gRNq",
        eventday: "2025-01-02",
        timestart: "13:15:00",
        timeend: "14:45:00",
        sessiontitle: "Parallel Session",
        performer_speaker: "-",
        parallelsession: "8A, 8B, 8C",
      },
      {
        id: "schedule-YnCkMdXy_r_Em6yJ",
        eventday: "2025-01-02",
        timestart: "14:45:00",
        timeend: "14:50:00",
        sessiontitle: "Closing Speech by Dean FIF Telkom University",
        performer_speaker:
          "Assoc. Prof. Dr. Z K Abdurahman Baizal, S.Si., M.Kom.",
        parallelsession: "-",
      },
      {
        id: "schedule-X1L_yiBrCURYleAo",
        eventday: "2025-01-02",
        timestart: "14:50:00",
        timeend: "15:00:00",
        sessiontitle: "Closing Day 2",
        performer_speaker: "-",
        parallelsession: "-",
      },
    ];

    try {
      for (const schedule of scheduleData) {
        await this._pool.query(
          `INSERT INTO schedule VALUES ($1, $2, $3, $4, $5, $6, $7)`,
          [
            schedule.id,
            schedule.eventday,
            schedule.timestart,
            schedule.timeend,
            schedule.sessiontitle,
            schedule.performer_speaker,
            schedule.parallelsession,
          ]
        );
      }
      console.log("Schedule seeded successfully.");
    } catch (err) {
      console.error("Error seeding schedule:", err);
    }
  }

  async seedPaper() {
    const paperData = [
      {
        id: "paper-hzYTzQSjk3yJngog",
        paperid: "1570986251",
        title:
          "Predicting Stunting in Toddlers Using KNN and Naive Bayes Methods",
        authors:
          "Galih Atha Fayi Khansa and Putu Harry Gunawan (Telkom University, Indonesia)",
        mode: "Online",
        paper_group_id: "paper_group-6D4AVR_icuo68WdT",
      },
      {
        id: "paper-3avmnqkrSFZd5fFo",
        paperid: "1570986282",
        title:
          "Waiting Period Prediction of Telkom University Student Alumni Using K-Nearest Neighbor and Naive Bayes",
        authors:
          "Nadia Khairunissa, Putu Harry Gunawan, Aniq Atiqi and Muhammad Arya Fikriansyah (Telkom University, Indonesia)",
        mode: "Online",
        paper_group_id: "paper_group-6D4AVR_icuo68WdT",
      },
      {
        id: "paper-hr5Ii9K562iHm15Y",
        paperid: "1570986224",
        title:
          "Machine Learning Classification Analysis for Proactive Prevention of Child Stunting in Bojongsoang: A Comparative Study",
        authors:
          "Caesar Fannany and Putu Harry Gunawan (Telkom University, Indonesia); Narita Aquarini (École Doctorale Science Economics Université de Poitiers Intervenant Finance, France)",
        mode: "Online",
        paper_group_id: "paper_group-6D4AVR_icuo68WdT",
      },
      {
        id: "paper-1ps1446pF5doDsF8",
        paperid: "1570986233",
        title:
          "Classifying Stunting Status In Toddlers Using K-Nearest Neighbor And Logistic Regression Analysis",
        authors:
          "Alvin Sibuea (Telkom University & School of Computing, Indonesia); Putu Harry Gunawan and Indwiarti Indwiarti (Telkom University, Indonesia)",
        mode: "Online",
        paper_group_id: "paper_group-6D4AVR_icuo68WdT",
      },
      {
        id: "paper--0Q0XjoAgd33Fhad",
        paperid: "1570986238",
        title:
          "Early Detection of Stunting in Indonesian Toddlers: A Machine Learning Approach",
        authors:
          "Herjanto Janawisuta, Putu Harry Gunawan and Indwiarti Indwiarti (Telkom University, Indonesia)",
        mode: "Online",
        paper_group_id: "paper_group-6D4AVR_icuo68WdT",
      },
      {
        id: "paper-rOYKbPcBQOE08Fht",
        paperid: "1570989041",
        title:
          "Fingerprint-based Side Effect Prediction using Artificial Neural Network optimized by Bat Algorithm: Case Study Metabolism and Nutrition Disorders",
        authors:
          "Sydney Salma Nur Henny, Jondri Jondri and Isman Kurniawan (Telkom University, Indonesia)",
        mode: "Online",
        paper_group_id: "paper_group-DiqKCFrNcLnRQ85b",
      },
      {
        id: "paper-iOsB0T_d43Djb3zk",
        paperid: "1570989049",
        title:
          "Implementation of Simulated Annealing-Ensemble Method in Toxicity Prediction: Case Study of NRAhR Toxicity Type",
        authors:
          "Adinda Rizqi Salsabila, Widi Astuti and Isman Kurniawan (Telkom University, Indonesia)",
        mode: "Online",
        paper_group_id: "paper_group-DiqKCFrNcLnRQ85b",
      },
      {
        id: "paper-JGeEZhmKlqGMP920",
        paperid: "1571024253",
        title:
          "Insurance Fraud Detection: A Perspective with S-LIME Explanability",
        authors:
          "Gian Reinfred Athevan, Thomas Amarta Gunawisesa, Imanuel Tio, Anderies Anderies and Felix Indra Kurniadi (Bina Nusantara University, Indonesia)",
        mode: "Online",
        paper_group_id: "paper_group-DiqKCFrNcLnRQ85b",
      },
      {
        id: "paper-HwWZs9V_gsC2MQ7z",
        paperid: "1570988828",
        title:
          "Real-time Guitar Chord Recognition Using Keypoint Detection and Neural Network-Based Inter-Keypoint Distance Classifier",
        authors:
          "Muhammad Ryan Rasyid Rasyid (Telkom University, Indonesia); Mahmud Dwi Sulistiyo (Telkom University, Indonesia & Nagoya University, Japan); Febryanti Sthevanie (Telkom University, Indonesia)",
        mode: "Online",
        paper_group_id: "paper_group-_hV6Okxx2mTi3jDo",
      },
      {
        id: "paper-qAVMZelJs6DYGCTQ",
        paperid: "1570988976",
        title:
          "Leader Selection Method of Leader Oriented Matchmaking Algorithm",
        authors:
          "Bagus Seno Pamungkas, Dawam Dwi Jatmiko Suwawi and Dana Sulistyo Kusumo (Telkom University, Indonesia)",
        mode: "Online",
        paper_group_id: "paper_group-_hV6Okxx2mTi3jDo",
      },
      {
        id: "paper-K07K64yMNQFE_WSs",
        paperid: "1570989486",
        title:
          "Exploring ReLU Activation Functions in CNN for Handwritten Sundanese Script Recognition",
        authors:
          "Randy Rizky Akram (Indonesia); Mahmud Dwi Sulistiyo (Telkom University, Indonesia & Nagoya University, Japan); Aditya Firman Ihsan and Prasti Eko Yunanto (Telkom University, Indonesia); Donni Richasdy (Telkom University & Bandung Techno Park, Indonesia); Muhammad Arzaki (Telkom University & Computing Lab - ICM Research Group, Indonesia)",
        mode: "Online",
        paper_group_id: "paper_group-g4FCjbXxs-3T3ceA",
      },
      {
        id: "paper-q6sToP7LB2Xf-XhI",
        paperid: "1570989505",
        title:
          "Inflation Forecast in Developing Countries Post Pandemic Using NN, SVM, RNN LSTM Approaches",
        authors:
          "Anisa Adelya Ayuputri (Telkom University & School of Computing, Indonesia); Siti Sa'adah (Telkom University d/h Telkom Institute of Technology, Indonesia); Prasti Eko Yunanto (Telkom University, Indonesia)",
        mode: "Online",
        paper_group_id: "paper_group-g4FCjbXxs-3T3ceA",
      },
      {
        id: "paper-dTfxgRUKbx8iWogP",
        paperid: "1570989469",
        title:
          "Defense in Depth Strategy from Phishing Attacks in Using Instagram",
        authors:
          "Mutiara Rizka Nasution, Muharman Lubis, Rd. Rohmat Saedudin and Adityas Widjajarto (Telkom University, Indonesia)",
        mode: "Online",
        paper_group_id: "paper_group-KZfnzIxZdgyQr07p",
      },
      {
        id: "paper-eG8YXQOLdqtmXuOj",
        paperid: "1570989526",
        title:
          "Analysis of Trojan Remote Access Malware Detection on Android Operating System using Ensemble Learning Method",
        authors:
          "Intan Fauzia Anwar (University of Telkom, Indonesia); Vera Suryani (Universitas Telkom, Indonesia)",
        mode: "Online",
        paper_group_id: "paper_group-KZfnzIxZdgyQr07p",
      },
      {
        id: "paper-a7RRP68brdYfq_AW",
        paperid: "1570989709",
        title:
          "Hybrid Deep Learning for Botnet Attack Detection on IoT Networks using CNN-GRU",
        authors:
          "Edward Billy Hadipuspito (Telkom University, Indonesia); Vera Suryani (Universitas Telkom, Indonesia)",
        mode: "Online",
        paper_group_id: "paper_group-KZfnzIxZdgyQr07p",
      },
      {
        id: "paper-23SCZTsKd9NdeEuQ",
        paperid: "1570989385",
        title:
          "Android API Malware Detection based on Permission Using Machine Learning and Deep Learning Methods",
        authors:
          "Muhammad Zhillan Amri (Telkom University, Indonesia); Vera Suryani (Universitas Telkom, Indonesia)",
        mode: "Online",
        paper_group_id: "paper_group-KZfnzIxZdgyQr07p",
      },
    ];

    for (const paper of paperData) {
      const query = {
        text: "INSERT INTO paper (id, paperid, title, authors, mode, paper_group_id) VALUES($1, $2, $3, $4, $5, $6) RETURNING id",
        values: [
          paper.id,
          paper.paperid,
          paper.title,
          paper.authors,
          paper.mode,
          paper.paper_group_id,
        ],
      };
      await this._pool.query(query);
    }

    console.log("Papers seeded successfully.");
  }

  async seedPararelSessions() {
    const parallelSessions = [
      {
        id: "parallel_session-95Vkh0Y0rkfz6pmk",
        date: "2025-01-01",
        name: "Parallel Session 1A",
        paper_group_id: "paper_group-6D4AVR_icuo68WdT",
      },
      {
        id: "parallel_session-Jvu8epgr1rpl7Wy2",
        date: "2025-01-01",
        name: "Parallel Session 1B",
        paper_group_id: "paper_group-DiqKCFrNcLnRQ85b",
      },
      {
        id: "parallel_session-ZVCC8cYcbCxC9EQU",
        date: "2025-01-02",
        name: "Parallel Session 2A",
        paper_group_id: "paper_group-_hV6Okxx2mTi3jDo",
      },
      {
        id: "parallel_session-QM-HgT0bPl_2UTX-",
        date: "2025-01-02",
        name: "Parallel Session 2B",
        paper_group_id: "paper_group-g4FCjbXxs-3T3ceA",
      },
      {
        id: "parallel_session-aHpUSPpVu4JvUEMy",
        date: "2025-01-02",
        name: "Parallel Session 3A",
        paper_group_id: "paper_group-KZfnzIxZdgyQr07p",
      },
    ];

    for (const parallelSession of parallelSessions) {
      const query = {
        text: "INSERT INTO pararelsession (id, date, name, paper_group_id) VALUES($1, $2, $3, $4) RETURNING id",
        values: [
          parallelSession.id,
          parallelSession.date,
          parallelSession.name,
          parallelSession.paper_group_id,
        ],
      };

      await this._pool.query(query);
    }

    console.log("Parallel Sessions seeded successfully.");
  }

  async seedSpeaker() {
    const speakers = [
      {
        id: "speaker-mPgkaYkWGPUaGUke",
        name: "Assoc Prof. Dr. Satria Mandala",
        bio: "Director CoE Humic Engineering, Telkom University, Bandung Indonesia",
        image_url: "http://localhost:8000/speakers/images/Satrianew.png",
      },
      {
        id: "speaker-LhsaVhX9qSrfl68b",
        name: "Assoc. Prof. Dr. Hoshang Kolivand",
        bio: "School of Computer Science and Mathematics, Liverpool John Moores University, England",
        image_url: "http://localhost:8000/speakers/images/HoshangKolivand.png",
      },
      {
        id: "speaker-6rKKv9EkFQhmfIZw",
        name: "Prof. Hui-Min David Wang",
        bio: "Department of Chemical Engineering, Institute of Biomedical Engineering, National Chung Hsing University, Taiwan",
        image_url: "http://localhost:8000/speakers/images/HuiMinnew.png",
      },
      {
        id: "speaker-6rKKv9EkFQhmfIZx",
        name: "Prof. Dimitrios Georgakopoulos",
        bio: "Director, ARC Industrial Transformation Research Hub for Future Digital Manufacturing, Swinburne University Swinburne University of Technology, Australia",
        image_url: "http://localhost:8000/speakers/images/Dimitriosneww.png",
      },
    ];

    for (const speaker of speakers) {
      await this._pool.query(
        `INSERT INTO speakers (id, name, bio, image_url) VALUES ($1, $2, $3, $4)`,
        [speaker.id, speaker.name, speaker.bio, speaker.image_url]
      );
    }

    console.log("Speakers seeded successfully.");
  }

  async seedLocation() {
    const id = `location-${nanoid(16)}`;
    const map_url =
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d990.2252319166251!2d107.61773768205485!3d-6.9024503614456725!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e64c5e8866e5%3A0x37be7ac9d575f7ed!2sGedung%20Sate!5e0!3m2!1sen!2sid!4v1730481358583!5m2!1sen!2sid";

    await this._pool.query(
      `INSERT INTO location (id, map_url) VALUES ($1, $2)`,
      [id, map_url]
    );

    console.log("Location seeded successfully.");
  }

  async destroy() {
    await this._pool.end();
  }
}

// Automatically execute the seeder when running the script
(async () => {
  const seeder = new Seeder();
  try {
    await seeder.seedUser();
    await seeder.seedHero();
    await seeder.seedConference();
    await seeder.seedAbout();
    await seeder.seedSchedule();
    await seeder.seedPaper();
    await seeder.seedPararelSessions();
    await seeder.seedSpeaker();
    await seeder.seedLocation();
  } catch (error) {
    console.error("Error seeding:", error);
  } finally {
    await seeder.destroy();
  }
})();
