/**
 * Doctors collection (brief section 6). Facts are taken from each doctor's
 * profile on the current site (source URL kept per doctor).
 */
import type { BranchId } from "@/lib/site";

export type Doctor = {
  slug: string;
  name: string;
  designation: string;
  /** Speciality slugs; the first is the primary speciality. */
  specialities: string[];
  qualifications: string[];
  expertise: string[];
  bio: string[];
  /** Empty = branch-wise OPD days not yet confirmed. [CONFIRM] */
  branches: BranchId[];
  phone?: { label: string; href: string };
  /** Original WordPress headshot URL, or null when no usable headshot exists. */
  photo: string | null;
  /**
   * Department/OPD poster published on the current site in place of a
   * headshot. Shown on the profile as the published OPD schedule.
   */
  poster?: string;
  source: string | null;
  /** Items the hospital must confirm before launch (shown on staging only). */
  confirm?: string[];
  /** Hidden doctors are kept for redirects and data but not listed. */
  hidden?: boolean;
  featured?: boolean;
};

const U = "https://www.silvertouchhospitals.com/wp-content/uploads";
const SRC = "https://www.silvertouchhospitals.com/doctor-team";

export const DOCTORS: Doctor[] = [
  {
    slug: "dr-jil-p-patel",
    name: "Dr. Jil P. Patel",
    designation: "Consultant Orthopaedic & Joint Replacement Surgeon",
    specialities: ["orthopedics-joint-replacement-surgery", "hip-replacement-ahmedabad"],
    qualifications: [
      "MBBS, M.P. Shah Medical College, Jamnagar (2008–2014)",
      "MS Orthopaedics, M.P. Shah Medical College, Jamnagar (2015–2018), Gold Medalist",
      "Fellowship in Joint Replacement Surgery",
    ],
    expertise: [
      "Knee replacement surgery",
      "Hip replacement surgery",
      "Robotic knee replacement (VELYS Robotic-Assisted Solution)",
      "Advanced joint replacement techniques",
      "Muscle-sparing surgical approaches",
    ],
    bio: [
      "Dr. Jil P. Patel is a Consultant Orthopaedic and Joint Replacement Surgeon specialising in knee and hip replacement surgery. A Gold Medalist in Orthopaedics, he is dedicated to providing advanced joint replacement solutions to help patients improve mobility, reduce joint pain and return to an active lifestyle.",
      "With experience in joint replacement surgery and a focus on modern surgical techniques, Dr. Patel offers treatment options including robotic knee replacement and muscle-sparing joint replacement procedures.",
      "Dr. Patel offers robotic-assisted knee replacement using advanced technology, including the VELYS Robotic-Assisted Solution. His approach focuses on precision, personalised surgical planning and supporting patient recovery. Depending on the patient’s condition and suitability, modern joint replacement techniques may offer benefits such as smaller surgical incisions, reduced tissue disruption and improved rehabilitation.",
    ],
    branches: ["satellite", "nirnay-nagar"],
    phone: { label: "+91 82380 03750", href: "tel:+918238003750" },
    photo: `${U}/2026/10/Professional-Medical-Headshot.png`,
    source: "https://www.silvertouchhospitals.com/dr-jil-p-patel/",
    featured: true,
  },
  {
    slug: "dr-chirag-patel",
    name: "Dr. Chirag Patel",
    designation: "Orthopedic and Joint Replacement Surgeon",
    specialities: ["orthopedics-joint-replacement-surgery", "hip-replacement-ahmedabad"],
    qualifications: ["DNB Orthopaedics (New Delhi)"],
    expertise: ["Joint replacement surgery", "Orthopaedics"],
    bio: [],
    branches: [],
    photo: null,
    poster: `${U}/2022/04/dr-chirag.jpg`,
    source: `${SRC}/dr-chirag-patel/`,
    confirm: ["Full profile (one-line profile on current site)", "Branch-wise OPD days"],
    featured: true,
  },
  {
    slug: "dr-nisarg-patel",
    name: "Dr. Nisarg Patel",
    designation: "Orthopedist & Sports Medicine Specialist",
    specialities: ["orthopedics-joint-replacement-surgery"],
    qualifications: [
      "M.S. Orthopaedics, V.S. Hospital, Gujarat University",
      "Fellowship in Arthroscopy and Sports Medicine (Mumbai, Pune and Bangalore)",
    ],
    expertise: ["Complex trauma", "Keyhole (arthroscopic) surgery", "Minimally invasive surgery", "Sports medicine"],
    bio: [
      "Dr. Nisarg Patel is an orthopedist and sports medicine specialist. He completed his master's in orthopaedic surgery (M.S. Ortho) at V.S. Hospital, Gujarat University, and his fellowship in arthroscopy and sports medicine in Mumbai, Pune and Bangalore. He specialises in complex trauma, keyhole and minimally invasive surgery.",
    ],
    branches: [],
    photo: null,
    poster: `${U}/2022/04/dr-nisarg.jpg`,
    source: `${SRC}/dr-nisarg-patel/`,
  },
  {
    slug: "dr-manthan-patel",
    name: "Dr. Manthan Patel",
    designation: "Neurosurgeon, Brain & Spine Surgeon",
    specialities: ["neurology", "spine-surgery"],
    qualifications: ["M.B.B.S.", "M.S.", "M.Ch. (Neurosurgery)"],
    expertise: [
      "Micro-neurosurgery for brain tumour, aneurysm, brain haemorrhage and trigeminal neuralgia",
      "Complex head injury",
      "Back pain, disc problems, spine tumour and neck pain",
    ],
    bio: [
      "Dr. Manthan Patel has more than 10 years of experience in neurosurgery and previously worked as a Consultant Neurosurgeon at Zydus Hospital.",
    ],
    branches: [],
    photo: `${U}/2022/04/dr-manthan-patel.jpg`,
    source: `${SRC}/dr-manthan-patel/`,
    featured: true,
  },
  {
    slug: "dr-harshil",
    name: "Dr. Harshil",
    designation: "Spine Surgeon",
    specialities: ["spine-surgery"],
    qualifications: [],
    expertise: ["Spine surgery"],
    bio: [],
    branches: [],
    photo: `${U}/2024/05/Harshil-suit-1-600x400.jpg`,
    source: `${SRC}/dr-harshil/`,
    confirm: ["Full name (surname missing)", "Qualifications", "Profile"],
    featured: true,
  },
  {
    slug: "dr-ishan-shah",
    name: "Dr. Ishan Shah",
    designation: "Urologist",
    specialities: ["urology"],
    qualifications: [
      "MS, DNB (Urology, Gold Medalist)",
      "All India First Rank",
      "President Gold Medal in Urology, presented by the Union Health Minister of India",
    ],
    expertise: [
      "Endoscopic kidney, ureter and bladder stone removal (PCNL, URSL, CLT, RIRS)",
      "Stricture urethra (VIU, BMG)",
      "BPH (TURP, BNI), TURBT",
      "Kidney, bladder and prostate cancer",
      "Urinary tract infection",
      "Male infertility",
    ],
    bio: ["Dr. Ishan Shah is an experienced and enthusiastic urologist in Ahmedabad."],
    branches: [],
    photo: null,
    poster: `${U}/2022/04/dr-ishan-600x400.jpg`,
    source: `${SRC}/dr-ishan-shah/`,
    featured: true,
  },
  {
    slug: "dr-priyank-shah",
    name: "Dr. Priyank Shah",
    designation: "Urologist",
    specialities: ["urology"],
    qualifications: ["Urology specialisation, Apollo Main Hospital, Chennai"],
    expertise: ["Reconstructive urology", "Laparoscopic urology", "Endoscopic urology", "Andrology"],
    bio: [
      "Dr. Priyank Shah has been practising as a urologist for 5+ years. He completed his urology specialisation at Apollo Main Hospital, Chennai. His expertise covers reconstructive, laparoscopic and endoscopic urology procedures, with a special interest in andrology. He is committed to working closely with patients, families and other professionals for well-rounded medical care.",
    ],
    branches: [],
    photo: null,
    poster: `${U}/2022/04/dr-priank.jpg`,
    source: `${SRC}/dr-priyank-shah/`,
  },
  {
    slug: "dr-mayur-patel",
    name: "Dr. Mayur Patel",
    designation: "Consultant Gastroenterologist",
    specialities: ["gastroenterology"],
    qualifications: ["MD", "DNB"],
    expertise: ["Gastroenterology"],
    bio: [],
    branches: [],
    photo: null,
    poster: `${U}/2022/04/dr-mayur-patel.jpg`,
    source: `${SRC}/dr-mayur-patel/`,
    confirm: ["Full profile (one-line profile on current site)"],
    featured: true,
  },
  {
    slug: "dr-vikram-patel",
    name: "Dr. Vikram Patel",
    designation: "Consultant General Surgeon",
    specialities: ["general-surgery", "gi-surgery"],
    qualifications: ["M.S. General Surgery"],
    expertise: ["General surgery"],
    bio: [],
    branches: [],
    photo: null,
    poster: `${U}/2022/04/dr-vikram.jpg`,
    source: `${SRC}/dr-vikram-patel/`,
    confirm: ["Full profile (one-line profile on current site)"],
  },
  {
    slug: "dr-ronak-vyas",
    name: "Dr. Ronak Vyas",
    designation: "Consultant Surgical Oncologist",
    specialities: ["general-surgery", "gi-surgery"],
    qualifications: ["MBBS", "MS", "M.Ch (GCRI)", "F.MAS", "FALS"],
    expertise: ["Surgical oncology", "Minimal access surgery"],
    bio: [],
    branches: [],
    photo: null,
    poster: `${U}/2022/04/dr-ronak-600x400.jpg`,
    source: `${SRC}/dr-ronak-vyas/`,
  },
  {
    slug: "dr-gopal-singh-rajpurohit-2",
    name: "Dr. Gopal Singh Rajpurohit",
    designation: "General Surgeon",
    specialities: ["general-surgery"],
    qualifications: [],
    expertise: ["General surgery"],
    bio: [],
    branches: [],
    // The current page shows "Dr Harshil" and a photo named dr-harisl.png,
    // so the photo is withheld until the hospital confirms it.
    photo: null,
    source: `${SRC}/dr-gopal-singh-rajpurohit-2/`,
    confirm: ["Name, role and photo (current page shows “Dr Harshil”)", "Slug without the -2 suffix"],
  },
  {
    slug: "dr-manish-hathila",
    name: "Dr. Manish Hathila",
    designation: "Physician",
    specialities: ["fever-physician-ahmedabad", "general-medicine"],
    qualifications: ["M.D. (Medicine)"],
    expertise: ["Fever and infections", "General medicine"],
    bio: [],
    branches: [],
    // Photo file on the current site is named chirag-patel.png; withheld until confirmed.
    photo: null,
    source: `${SRC}/dr-manish-hathila/`,
    confirm: ["Photo (current file is named chirag-patel.png)"],
  },
  {
    slug: "dr-jitendra-shah",
    name: "Dr. Jitendra Shah",
    designation: "Consultant Obstetrician & Gynecologist",
    specialities: ["gynecology-obstetrics"],
    qualifications: ["Consultant Obstetrician and Gynecologist", "Sonologist"],
    expertise: ["High-risk pregnancy", "IVF", "Gynaecological laparoscopic surgery", "Sonography"],
    bio: [],
    branches: [],
    photo: null,
    poster: `${U}/2022/04/dr-jitendra.jpg`,
    source: `${SRC}/dr-jitendra-shah/`,
    confirm: ["Full profile (one-line profile on current site)"],
  },
  {
    slug: "dr-vaidik-chauhan",
    name: "Dr. Vaidik Chauhan",
    designation: "ENT Surgeon",
    specialities: ["ear-nose-throat"],
    qualifications: [
      "MBBS, Smt. NHL Municipal Medical College",
      "M.S. ENT, B.J. Medical College, Ahmedabad",
      "Certified in Endoscopic Sinus Surgery, CeMAST Mumbai",
      "Cochlear implant training, Civil Hospital Ahmedabad",
    ],
    expertise: [
      "Endoscopic ear surgery for cholesteatoma, eardrum perforation and foreign body removal",
      "Endoscopic nasal surgery for nasal polyps, foreign bodies and sinus disease",
      "Paediatric ENT surgery for tonsillitis and adenoids",
      "Neck and endocrine surgery for thyroid, parathyroid, parotid and submandibular gland disease",
      "Laryngeal surgery for vocal cord polyps, cancer and other voice disorders",
    ],
    bio: [
      "Dr. Vaidik Chauhan was born in Ahmedabad, Gujarat. He attended medical school at Smt. NHL Medical College, Ahmedabad, and completed his Master of Surgery in ENT at B.J. Medical College, Civil Hospital, Ahmedabad.",
      "He has performed more than 2,500 ear, nose and throat surgeries and has 12 publications in state, national and international journals. He has given oral presentations at national conferences, won awards, and taken part in live surgical demonstrations.",
      "Dr. Vaidik runs a YouTube channel that teaches surgery to medical and postgraduate students, and organises free medical health check-up camps for the community.",
    ],
    branches: [],
    photo: null,
    poster: `${U}/2022/04/dr-vadik.jpg`,
    source: `${SRC}/dr-vaidik-chauhan/`,
    featured: true,
  },
  {
    slug: "dr-simple-bhadania",
    name: "Dr. Simple Bhadania",
    designation: "ENT and Skull Base Surgeon",
    specialities: ["ear-nose-throat"],
    qualifications: [
      "MS, B.J. Medical College",
      "Neuro-ENT, SGPGI Lucknow",
      "Fellowship in Skull Base Surgery, Weill Cornell, New York",
    ],
    expertise: ["Skull base surgery", "Scarless ear surgery", "Scarless sinus surgery"],
    bio: [
      "Dr. Simple Bhadania is an ENT and skull base surgeon. She did her MS at BJMC and then pursued Neuro-ENT at SGPGI Lucknow, followed by a fellowship in skull base surgery at Weill Cornell University, New York. She has served as Assistant Professor at Sola Civil Hospital and has extensive experience in scarless ear and sinus surgery.",
    ],
    branches: [],
    photo: `${U}/2022/04/Dr-Simple-Bhadania.jpg`,
    source: `${SRC}/dr-simple-bhadania/`,
    featured: true,
  },
  {
    slug: "dr-yuvraj-lakum",
    name: "Dr. Yuvraj Lakum",
    designation: "Knee Replacement Surgeon",
    specialities: ["orthopedics-joint-replacement-surgery"],
    qualifications: [],
    expertise: [],
    bio: [],
    branches: [],
    photo: null,
    source: null,
    confirm: ["Named in a patient review; no profile exists on the current site"],
    hidden: true,
  },
];

export const VISIBLE_DOCTORS = DOCTORS.filter((d) => !d.hidden);
export const DOCTOR_BY_SLUG = Object.fromEntries(DOCTORS.map((d) => [d.slug, d])) as Record<string, Doctor>;
export const doctorHref = (slug: string) => `/doctor-team/${slug}/`;

/** Stable sort that lists doctors with a headshot first. */
export const withPhotosFirst = (list: Doctor[]) => [...list].sort((a, b) => Number(!!b.photo) - Number(!!a.photo));
