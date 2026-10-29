/**
 * Specialities collection (brief sections 3 and 5).
 *
 * Structured fields drive the "at a glance" sections of each page. The
 * full body copy, images and FAQs are migrated verbatim from the current
 * site by `npm run import` into content/imported/pages/{slug}.json and
 * merged in lib/content.ts.
 */
import type { IconName } from "@/components/ui/Icon";

export type SpecialityGroup = "surgery" | "medicine" | "care";

export type Speciality = {
  slug: string;
  name: string;
  /** Short label for menus and form dropdowns. */
  label?: string;
  group: SpecialityGroup;
  icon: IconName;
  oneLiner: string;
  seoTitle: string;
  description: string;
  h1: string;
  intro: string;
  /** Original WordPress image URLs; resolved with img(). */
  image?: string;
  gallery?: string[];
  conditionsTitle?: string;
  conditions: string[];
  proceduresTitle?: string;
  procedures: { title: string; text?: string }[];
  whyUs: string[];
  doctors: string[];
  blogCategories: string[];
  /** Extra FAQs (HTML answers) on top of those migrated from the page. */
  extraFaqs?: { q: string; a: string }[];
  /**
   * "new" pages have no copy on the current site yet. They are built only
   * from facts already published elsewhere on the site, carry a [CONFIRM]
   * notice and stay noindex until the hospital approves the copy.
   */
  status: "live" | "new";
  emergency?: boolean;
};

const U = "https://www.silvertouchhospitals.com/wp-content/uploads";

export const GROUP_LABELS: Record<SpecialityGroup, string> = {
  surgery: "Surgery & Ortho",
  medicine: "Medicine & Super-specialities",
  care: "Care & Diagnostics",
};

export const FILTER_LABELS: Record<SpecialityGroup, string> = {
  surgery: "Surgery",
  medicine: "Medicine",
  care: "Diagnostics & Care",
};

export const SPECIALITIES: Speciality[] = [
  /* ----------------------------- Surgery & Ortho ----------------------------- */
  {
    slug: "orthopedics-joint-replacement-surgery",
    name: "Orthopedics / Joint Replacement",
    label: "Orthopedics / Joint Replacement Surgery",
    group: "surgery",
    icon: "bone",
    oneLiner: "Knee and hip replacement, including CT-free robotic knee surgery, with in-house physiotherapy.",
    seoTitle: "Knee & Hip Replacement in Ahmedabad | Orthopedic Hospital | Joint Replacement",
    description:
      "Best orthopedic & joint replacement hospital in Ahmedabad. Expert knee & hip replacement, robotic knee surgery, and affordable orthopedic care in Satellite, Prahladnagar & Nirnaynagar-Ranip.",
    h1: "Orthopedic Surgeon & Joint Replacement Hospital in Ahmedabad",
    intro:
      "Total, partial, revision and robotic knee replacement, hip replacement and paediatric orthopaedic care at Nirnay Nagar and Satellite, with transparent pricing and cashless insurance.",
    image: `${U}/2026/03/orthopedics-joint-replacement-surgery-ahmedabad.jpeg`,
    gallery: [`${U}/2025/07/joint-replacement-surgeon.jpg`, `${U}/2025/07/orthopedic-hospital-1.jpg`],
    conditionsTitle: "When knee replacement is recommended",
    conditions: [
      "Pain that limits walking or bending",
      "Pain at rest or at night",
      "Chronic swelling",
      "Visible joint deformity",
      "Hip and knee arthritis",
      "Paediatric orthopaedic problems",
    ],
    proceduresTitle: "Types of knee replacement",
    procedures: [
      { title: "Total Knee Replacement", text: "The whole worn joint surface is replaced." },
      { title: "Partial Knee Replacement", text: "Only the damaged compartment of the knee is replaced." },
      { title: "Complex or Revision Surgery", text: "Redo surgery for a previous replacement or complex deformity." },
      { title: "Robotic Knee Replacement", text: "VELYS Robotic-Assisted Solution, CT-free planning." },
    ],
    whyUs: [
      "Procedure takes about 1–2 hours",
      "Most patients take steps within 24 hours",
      "Light activity in 3–6 weeks",
      "In-house physiotherapy",
      "Transparent pricing, insurance and cashless",
      "Surgery available at both branches",
    ],
    doctors: ["dr-jil-p-patel", "dr-chirag-patel", "dr-nisarg-patel"],
    blogCategories: ["knee-replacement", "joint-replacement"],
    status: "live",
  },
  {
    slug: "hip-replacement-ahmedabad",
    name: "Hip Replacement",
    label: "Hip Replacement Surgery",
    group: "surgery",
    icon: "person-standing",
    oneLiner: "Total, partial and revision hip replacement, walking with support within 24–48 hours.",
    seoTitle: "Hip Joint Replacement in Ahmedabad | Surgery Specialists",
    description:
      "Silver Touch Hospitals offer advanced hip replacement surgery in Ahmedabad, with expert care available in Satellite-Prahladnagar and Nirnaynagar.",
    h1: "Hip Replacement Surgery in Ahmedabad",
    intro:
      "Imaging-based planning, modular operation theatres and in-house physiotherapy for hip pain caused by arthritis, avascular necrosis or injury.",
    image: `${U}/2025/07/Hospitals-Ahmedabad.jpg`,
    gallery: [`${U}/2023/09/banner04.jpg`],
    conditionsTitle: "Common causes",
    conditions: [
      "Osteoarthritis",
      "Rheumatoid arthritis",
      "Avascular necrosis",
      "Post-traumatic injury",
      "Persistent hip or groin pain",
      "Stiffness and trouble with walking or stairs",
    ],
    proceduresTitle: "Types of hip replacement",
    procedures: [
      { title: "Total Hip Replacement", text: "Both the ball and the socket are replaced." },
      { title: "Partial (Hemi) Hip Replacement", text: "Only the ball of the joint is replaced." },
      { title: "Revision Hip Replacement", text: "Replaces or corrects an earlier hip implant." },
    ],
    whyUs: [
      "Senior joint replacement specialists",
      "Imaging-based surgical planning",
      "Modular operation theatres",
      "In-house physiotherapy",
      "24x7 monitoring after surgery",
      "Walking with support in 24–48 hours",
    ],
    doctors: ["dr-jil-p-patel", "dr-chirag-patel"],
    blogCategories: ["hip-replacement"],
    extraFaqs: [
      {
        q: "Is there an age limit for hip replacement?",
        a: '<p>There is no age constraint on hip replacement surgery. It entirely depends on your overall health, activity level, and intensity of your pain. Patients from the age of 70, 80, even 90, have successfully completed hip replacement at Silver Touch Hospitals. Read more: <a href="/is-there-an-age-limit-for-hip-replacement-surgery-in-ahmedabad/">Is there an age limit for hip replacement surgery in Ahmedabad?</a></p>',
      },
    ],
    status: "live",
  },
  {
    slug: "spine-surgery",
    name: "Spine Surgery",
    group: "surgery",
    icon: "spine",
    oneLiner: "Conservative care first; minimally invasive, image-guided spine surgery when it is needed.",
    seoTitle: "Spine Specialist Doctor in Ahmedabad | Spine Care Hospital",
    description:
      "Silver Touch Hospitals offer expert spine care in Ahmedabad with specialist doctors available in Satellite-Prahladnagar and Nirnaynagar.",
    h1: "Spine Surgery & Spine Care in Ahmedabad",
    intro:
      "Back and neck pain, sciatica and spinal injuries assessed by spine specialists, with surgery reserved for patients who truly need it.",
    image: `${U}/2025/08/spine-specialist.jpg`,
    gallery: [`${U}/2025/08/spine-injury.jpg`],
    conditions: [
      "Disc herniation and sciatica",
      "Spinal stenosis",
      "Spondylosis",
      "Spinal fractures",
      "Degenerative spine conditions",
      "Accident and fall injuries",
    ],
    procedures: [
      { title: "Conservative treatment", text: "Medicines, physiotherapy and posture correction first." },
      { title: "Decompression surgery", text: "Relieves pressure on the spinal cord and nerves." },
      { title: "Stabilisation surgery", text: "Restores stability to an injured or worn spine." },
      { title: "Corrective surgery", text: "Minimally invasive and image-guided where possible." },
    ],
    whyUs: [
      "Spine surgeon and neurosurgeon on the team",
      "Non-surgical options tried first",
      "Minimally invasive, image-guided techniques",
      "Satellite centre serves Prahladnagar",
    ],
    doctors: ["dr-harshil", "dr-manthan-patel"],
    blogCategories: ["spine-specialist"],
    status: "live",
  },
  {
    slug: "general-surgery",
    name: "General Surgery",
    group: "surgery",
    icon: "scissors",
    oneLiner: "Hernia, gallbladder, appendix, piles and fistula surgery, open and laparoscopic.",
    seoTitle: "General Physician & Surgeon Ahmedabad | Satellite, Nirnaynagar, Prahladnagar",
    description:
      "Looking for a general physician, surgeon, or infectious disease specialist in Ahmedabad? Silver Touch Hospitals provide trusted care near Satellite-Prahladnagar and Nirnaynagar.",
    h1: "General Surgery in Ahmedabad",
    intro:
      "Common surgical procedures as day-care or short-stay treatment, open or laparoscopic, at both Silver Touch branches.",
    image: `${U}/2025/08/general-surgery.jpg`,
    gallery: [`${U}/2025/08/general-surgery-hospital.jpg`],
    conditionsTitle: "Procedures we perform",
    conditions: [
      "Appendicitis",
      "Hernia",
      "Gallbladder stones",
      "Piles and fistula",
      "Breast lumps",
      "Cysts, abscesses and skin lesions",
    ],
    procedures: [
      { title: "Appendicectomy" },
      { title: "Hernia repair", text: "Open and laparoscopic." },
      { title: "Gallbladder removal" },
      { title: "Piles & fistula surgery" },
      { title: "Breast lump excision" },
      { title: "Drainage of cysts, abscesses and skin lesions" },
    ],
    whyUs: ["Day-care or short stay", "Laparoscopic options", "No referral needed", "Surgical oncology on the team"],
    doctors: ["dr-vikram-patel", "dr-ronak-vyas", "dr-gopal-singh-rajpurohit-2"],
    blogCategories: ["general-surgeon"],
    status: "live",
  },
  {
    slug: "bariatric-surgery-ahmedabad",
    name: "Bariatric Surgery",
    group: "surgery",
    icon: "weight",
    oneLiner: "Laparoscopic weight loss surgery with endocrinologists, dieticians and physiotherapists.",
    seoTitle: "Best Bariatric Surgery in Ahmedabad | Weight Loss Surgery Hospital & Surgeon",
    description:
      "Looking for the best bariatric surgery in Ahmedabad? Silver Touch Hospitals offers advanced weight loss surgery with expert bariatric surgeons, modern facilities, and personalized care. Book a consultation today.",
    h1: "Bariatric Surgery in Ahmedabad",
    intro:
      "Minimally invasive weight loss surgery for obesity and related conditions, with a full assessment before surgery and help with PMJAY paperwork.",
    image: `${U}/2026/03/bariatric-surgery-in-ahmedabad.jpg`,
    gallery: [`${U}/2025/12/Bariatric-Surgery-Copy.jpg`, `${U}/2025/12/Bariatric-Surgery-Ahmedabad.jpg`],
    conditionsTitle: "Who it can help",
    conditions: [
      "Obesity not controlled by diet and exercise",
      "Type 2 diabetes",
      "High blood pressure",
      "Heart problems linked to obesity",
    ],
    procedures: [
      { title: "Laparoscopic sleeve gastrectomy" },
      { title: "Laparoscopic gastric bypass" },
      { title: "Pre-surgery assessment", text: "Medical, dietary and fitness evaluation." },
      { title: "Long-term follow-up", text: "Diet and physiotherapy support after surgery." },
    ],
    whyUs: [
      "Laparoscopic, minimally invasive surgery",
      "Modern operation theatres",
      "Endocrinologists, dieticians and physiotherapists",
      "PMJAY paperwork support",
    ],
    doctors: [],
    blogCategories: ["bariatric-surgery"],
    status: "live",
  },
  {
    slug: "gi-surgery",
    name: "GI Surgery",
    group: "surgery",
    icon: "stethoscope",
    oneLiner: "Surgery for digestive-tract conditions, alongside our gastroenterology team.",
    seoTitle: "GI Surgery in Ahmedabad | Silver Touch Hospitals",
    description:
      "Gastrointestinal surgery at Silver Touch Hospitals, Ahmedabad, working alongside our gastroenterology department at Nirnay Nagar and Satellite.",
    h1: "GI Surgery",
    intro:
      "Surgical care for conditions of the stomach, intestines, gallbladder and liver, planned together with our gastroenterologists.",
    conditions: ["Gallbladder stones", "Hernia", "Appendicitis", "Piles and fistula", "Liver and bile duct problems"],
    procedures: [
      { title: "Gallbladder removal" },
      { title: "Hernia repair", text: "Open and laparoscopic." },
      { title: "Appendicectomy" },
      { title: "Piles & fistula surgery" },
    ],
    whyUs: ["Works with the Gastroenterology team", "Sterile endoscopy suites", "3 high-end operation theatres"],
    doctors: ["dr-vikram-patel", "dr-ronak-vyas"],
    blogCategories: ["gastrologist"],
    status: "new",
  },

  /* ----------------------- Medicine & Super-specialities ----------------------- */
  {
    slug: "gastroenterology",
    name: "Gastroenterology",
    group: "medicine",
    icon: "stomach",
    oneLiner: "Liver, stomach and bowel care with in-house endoscopy, colonoscopy and ERCP.",
    seoTitle: "Gastroenterology Hospital Ahmedabad | Liver Hospital Ahmedabad | Endoscopy Care | Liver Transplant",
    description:
      "Silver Touch Hospitals – Expert gastro physician, Endoscopy Care & gastroenterologist in Ahmedabad, Prahladnagar, Ranip Satellite & Nirnay nagar.",
    h1: "Gastroenterology in Ahmedabad",
    intro:
      "Care for the oesophagus, stomach, intestines, liver, pancreas and gallbladder, with sterile endoscopy suites and rapid reporting.",
    image: `${U}/2025/07/Gastrointestinal-health-issues.jpg`,
    gallery: [`${U}/2025/07/gastrologist-doctor-1.jpg`],
    conditions: [
      "Liver disease, hepatitis and cirrhosis",
      "Pancreatitis",
      "Gallstones and bile duct problems",
      "Crohn's disease and ulcerative colitis",
      "GI cancer screening",
      "Infections and motility disorders",
    ],
    proceduresTitle: "Endoscopy services",
    procedures: [
      { title: "Upper GI endoscopy (OGD)" },
      { title: "Colonoscopy & biopsy" },
      { title: "Sigmoidoscopy" },
      { title: "Endoscopic polyp removal" },
      { title: "ERCP", text: "Treats bile duct problems without large incisions." },
      { title: "Pre-transplant care", text: "Referral centre for liver transplant work-up." },
    ],
    whyUs: [
      "Multispecialty team",
      "A clear treatment plan",
      "Rapid reporting",
      "Sterile endoscopy suites",
      "Diet and recovery support",
    ],
    doctors: ["dr-mayur-patel"],
    blogCategories: ["gastrologist"],
    status: "live",
  },
  {
    slug: "nephrology",
    name: "Nephrology",
    group: "medicine",
    icon: "kidney",
    oneLiner: "Kidney care, haemodialysis and peritoneal dialysis, available 24/7.",
    seoTitle: "Kidney Hospitals in Ahmedabad | Kidney Stone Treatment, Kidney Transplant & Care",
    description:
      "Silver Touch Hospitals is a leading Kidney Failure Treatment Hospital in Ahmedabad, offering Kidney Stone Treatment, Kidney Transplant, Nephrologist & affordable kidney care.",
    h1: "Nephrology Hospital Ahmedabad",
    intro:
      "Senior nephrologists and urologists, renal imaging, dialysis and ICU support for chronic and acute kidney conditions.",
    image: `${U}/2025/07/kidney-specialist.jpg`,
    gallery: [`${U}/2025/07/kidney-hospital.jpg`],
    conditions: [
      "Chronic kidney disease (CKD)",
      "Uncontrolled hypertension",
      "Acute renal failure",
      "Complex urological issues",
      "Kidney stones",
    ],
    procedures: [
      { title: "Haemodialysis" },
      { title: "Peritoneal dialysis" },
      { title: "Renal imaging & lab diagnostics" },
      { title: "ICU care", text: "For multi-organ complications." },
      { title: "Dietary counselling" },
    ],
    whyUs: ["Senior nephrologists and urologists", "Services available 24/7", "ICU backup", "PMJAY and insurance support"],
    doctors: [],
    blogCategories: ["kidney-transplant"],
    status: "live",
  },
  {
    slug: "urology",
    name: "Urology",
    group: "medicine",
    icon: "droplet",
    oneLiner: "Laser and laparoscopic treatment for kidney stones, prostate and bladder conditions.",
    seoTitle: "Urology Specialist in Ahmedabad | Laser & Surgical Care",
    description:
      "Silver Touch Hospitals offer expert urology treatment in Ahmedabad, including laser & laparoscopic urology surgery by top male urology specialists.",
    h1: "Urology in Ahmedabad",
    intro:
      "Diagnosis and treatment for kidney stones, prostate, bladder and men's health, with laser and laparoscopic surgery.",
    image: `${U}/2025/07/Urology-treatment.jpg`,
    gallery: [`${U}/2025/07/Urology-doctor.jpg`],
    conditions: [
      "Kidney and ureteric stones",
      "Enlarged prostate (BPH)",
      "Urinary tract infections",
      "Blood in urine (haematuria)",
      "Male infertility and ED",
      "Incontinence and voiding problems",
      "Bladder tumours and obstructions",
    ],
    procedures: [
      { title: "Diagnostics", text: "Ultrasound, CT urography, uroflowmetry, cystoscopy." },
      { title: "Laparoscopic surgery", text: "Kidney stone removal, prostate surgery, ureter reconstruction, pelvic organ prolapse." },
      { title: "HoLEP", text: "Laser treatment for an enlarged prostate." },
      { title: "Laser lithotripsy", text: "Breaks kidney and ureteric stones." },
      { title: "Bladder tumour ablation" },
    ],
    whyUs: ["Gold-medalist urologist", "Laser and laparoscopic options", "Women's urology", "Insurance coverage"],
    doctors: ["dr-ishan-shah", "dr-priyank-shah"],
    blogCategories: [],
    status: "live",
  },
  {
    slug: "neurology",
    name: "Neurology",
    group: "medicine",
    icon: "brain",
    oneLiner: "Stroke care, movement disorders and neurodiagnostics, with an in-house neurosurgeon.",
    seoTitle: "Pediatric Neurologist, Neurosurgeon & Neuro Hospitals Ahmedabad",
    description:
      "Silver Touch Hospitals in Ahmedabad offer expert neuro care with experienced neurosurgeons and pediatric neurologists for children and adults.",
    h1: "Neurology in Ahmedabad",
    intro:
      "Timely stroke treatment and rehabilitation, care for Parkinson's and other movement disorders, and EEG and nerve studies.",
    conditions: [
      "Ischaemic and haemorrhagic stroke",
      "Parkinson's disease",
      "Tremors and gait problems",
      "Spasms",
      "Brain tumour, aneurysm and haemorrhage",
      "Trigeminal neuralgia",
    ],
    procedures: [
      { title: "Stroke care with rehabilitation" },
      { title: "Movement disorder clinic" },
      { title: "Neuroimaging" },
      { title: "Nerve conduction studies" },
      { title: "EEG" },
      { title: "Neurosurgery", text: "Coordinated with our in-house neurosurgeon." },
    ],
    whyUs: ["Timely stroke intervention", "In-house neurosurgeon", "Critical care backup"],
    doctors: ["dr-manthan-patel"],
    blogCategories: [],
    status: "live",
  },
  {
    slug: "pulmonology",
    name: "Pulmonology",
    group: "medicine",
    icon: "lungs",
    oneLiner: "Asthma, COPD, infections, sleep apnoea and post-COVID lung care.",
    seoTitle: "Pulmonology Hospitals Ahmedabad | Lungs Specialist Ahmedabad",
    description:
      "Silver Touch Hospitals in Ahmedabad offer expert pulmonology care with top pulmonologists and advanced treatment for all lung and respiratory issues.",
    h1: "Pulmonology in Ahmedabad",
    intro:
      "Diagnosis and treatment for breathing and lung disorders, from a persistent cough to chronic lung disease.",
    conditions: [
      "Asthma",
      "COPD",
      "Pneumonia and tuberculosis",
      "Allergic bronchitis",
      "Interstitial lung disease",
      "Sleep apnoea",
      "Pleural effusion",
      "Post-COVID complications",
    ],
    conditionsTitle: "Conditions we treat",
    procedures: [
      { title: "Chest X-ray" },
      { title: "Lung function tests" },
      { title: "Specialised scans", text: "Some scans are arranged through external diagnostic partners." },
      { title: "Combined care", text: "With general medicine and critical care when needed." },
    ],
    whyUs: [
      "See us for a cough lasting more than 2 weeks",
      "Breathlessness or wheezing",
      "Coughing blood",
      "Frequent chest infections",
    ],
    doctors: [],
    blogCategories: ["lung-specialist"],
    status: "live",
  },
  {
    slug: "endocrinologist-diabetes-hospital-ahmedabad",
    name: "Endocrinology & Diabetes",
    group: "medicine",
    icon: "syringe",
    oneLiner: "Type 1, Type 2 and gestational diabetes, thyroid, PCOS and hormone disorders.",
    seoTitle: "Diabetes Specialist in Ahmedabad | Endocrinologist Care Ahmedabad",
    description:
      "Silver Touch Hospitals in Ahmedabad offer expert diabetes care with top specialists and endocrinologists. Hospital near Satellite-Prahladnagar and Nirnaynagar.",
    h1: "Diabetes & Endocrinology in Ahmedabad",
    intro:
      "Diabetes control, insulin planning and hormone care, with nutritionists and regular follow-ups.",
    image: `${U}/2025/07/Health-CheckUp.jpg`,
    conditions: [
      "Type 1 diabetes",
      "Type 2 diabetes",
      "Gestational diabetes",
      "Thyroid disorders",
      "PCOS",
      "Adrenal and pituitary disorders",
    ],
    procedures: [
      { title: "Glucose monitoring & HbA1c" },
      { title: "Insulin planning" },
      { title: "CGM support", text: "Continuous glucose monitoring." },
      { title: "Type 1 diabetes care" },
      { title: "Education & nutrition counselling" },
      { title: "Thyroid treatment & hormonal screening" },
    ],
    whyUs: ["No referral needed", "Nutritionists on the team", "Regular follow-ups"],
    doctors: [],
    blogCategories: ["diabetes"],
    status: "live",
  },
  {
    slug: "fever-physician-ahmedabad",
    name: "Fever Treatment / Physician",
    label: "Fever / General Physician",
    group: "medicine",
    icon: "thermometer",
    oneLiner: "Viral, bacterial and recurring fevers, including dengue, typhoid and malaria. Walk-ins welcome.",
    seoTitle: "Physician / Doctor for High Fever Treatment in Ahmedabad | Nirnaynagar, Prahladnagar, Satellite",
    description:
      "Silver Touch Hospitals offers expert doctor & physician care for fever and high fever treatment in Ahmedabad near Nirnaynagar Ranip, Prahladnagar, and Satellite.",
    h1: "Fever Treatment & General Physician in Ahmedabad",
    intro: "Physicians who find the cause of a fever and treat it, from a short viral illness to a fever that will not settle.",
    conditions: [
      "Viral and bacterial fevers",
      "Dengue",
      "Typhoid",
      "Malaria",
      "Low-grade recurring fevers",
      "Fever of unknown origin",
      "Fever in immunocompromised patients",
    ],
    procedures: [
      { title: "Physician consultation" },
      { title: "In-house lab tests" },
      { title: "Admission and IV care when needed" },
    ],
    whyUs: ["Walk-ins accepted", "In-house laboratory", "24x7 emergency backup"],
    doctors: ["dr-manish-hathila"],
    blogCategories: ["emergency-care"],
    status: "live",
  },
  {
    slug: "general-medicine",
    name: "General Medicine",
    group: "medicine",
    icon: "stethoscope",
    oneLiner: "Hypertension, diabetes, heart and breathing problems treated under one roof.",
    seoTitle: "General Medicine in Ahmedabad | Silver Touch Hospitals",
    description:
      "General medicine at Silver Touch Hospitals, Ahmedabad: hypertension, diabetes, cardiac and respiratory care at Nirnay Nagar and Satellite.",
    h1: "General Medicine",
    intro:
      "All types of medical treatment, including hypertension, diabetes, cardiac and respiratory care, are available under one roof. Complex and multi-organ cases are managed in critical care.",
    conditions: [
      "Hypertension",
      "Diabetes",
      "Heart conditions",
      "Respiratory illness",
      "Fevers and infections",
      "Multi-organ conditions",
    ],
    procedures: [
      { title: "Physician consultation" },
      { title: "In-house lab and imaging" },
      { title: "Referral to super-specialities", text: "Nephrology, Neurology and Gastroenterology." },
      { title: "Critical care backup" },
    ],
    whyUs: ["Walk-ins accepted", "Super-specialists under one roof", "24x7 emergency and ICU"],
    doctors: ["dr-manish-hathila"],
    blogCategories: ["multispeciality-hospital", "heart-health", "diabetes"],
    status: "new",
  },

  /* ----------------------------- Care & Diagnostics ----------------------------- */
  {
    slug: "critical-care",
    name: "Critical Care",
    label: "Critical Care / 24x7 Emergency",
    group: "care",
    icon: "siren",
    emergency: true,
    oneLiner: "24/7 ICU and emergency care with ventilators, BiPAP, defibrillators and dialysis.",
    seoTitle: "24/7 Emergency Care in Ahmedabad | Silver Touch Hospitals",
    description:
      "Silver Touch Hospitals offer 24/7 emergency and critical care in Ahmedabad. Private & public emergency hospital in Satellite-Prahladnagar and Nirnaynagar.",
    h1: "Critical Care",
    intro:
      "Emergency admissions at any hour, senior intensivists on duty day and night, and fully equipped ICUs at both branches.",
    image: `${U}/2025/07/private-emergency-hospital-1.jpg`,
    gallery: [`${U}/2025/07/24-hours-hospital.jpg`],
    conditionsTitle: "Emergencies we manage",
    conditions: ["Cardiac arrest", "Respiratory failure", "Sepsis", "Stroke", "Trauma and accidents", "Multi-organ complications"],
    procedures: [
      { title: "Dedicated ICU units", text: "Monitored beds with life support systems." },
      { title: "Senior intensivists on duty", text: "Day and night." },
      { title: "Specialist support", text: "Cardiology, nephrology, pulmonology and more." },
      { title: "Infection control protocols" },
      { title: "Bedside diagnostics", text: "Immediate imaging and lab testing." },
      { title: "Ventilator and dialysis support" },
    ],
    whyUs: [
      "Emergency admissions any time",
      "Equipped ambulances",
      "In-house pharmacy and diagnostics",
      "ICU backup for patients who deteriorate",
      "Daily updates for families",
      "Private settings",
    ],
    doctors: [],
    blogCategories: ["emergency-care", "heart-health"],
    status: "live",
  },
  {
    slug: "full-body-health-checkup",
    name: "Full Body Health Checkup",
    label: "Full Body Checkup",
    group: "care",
    icon: "clipboard",
    oneLiner: "Age-based health checkups with a one-to-one doctor review and reports in 24–48 hours.",
    seoTitle: "Full Body Checkup Ahmedabad | Nirnaynagar Ranip & Satellite",
    description:
      "Silver Touch Hospitals offer full body health checkups in Ahmedabad, with health screening packages available at our Satellite-Prahladnagar and Nirnaynagar.",
    h1: "Full Body Health Checkup in Ahmedabad",
    intro:
      "Blood tests, heart checks and imaging in one visit of 2–3 hours, followed by a one-to-one review with a doctor.",
    image: `${U}/2025/12/Full-Body-Health-Checkups.jpg`,
    gallery: [`${U}/2025/07/Health-CheckUp.jpg`],
    conditionsTitle: "What's included",
    conditions: [
      "CBC and metabolic profile",
      "Liver (LFT) and kidney (KFT) function",
      "Lipid profile and diabetes screening",
      "Thyroid",
      "ECG, 2D Echo and TMT",
      "Chest X-ray and abdominal ultrasound",
      "Urine and stool analysis",
    ],
    procedures: [
      { title: "One-to-one doctor review" },
      { title: "Same or next-day reports" },
      { title: "Personalised add-ons", text: "Based on your age and family history." },
    ],
    whyUs: ["Takes 2–3 hours", "Reports in 24–48 hours", "10–12 hours fasting", "Both branches"],
    doctors: [],
    blogCategories: ["full-body-checkup"],
    status: "live",
  },
  {
    slug: "dentistry",
    name: "Dentistry",
    group: "care",
    icon: "tooth",
    oneLiner: "Implants, crowns, root canals, aligners and oral surgery by a full dental team.",
    seoTitle: "Dental Implants, Crowns & Surgery in Ahmedabad | Ranip - Silver Touch",
    description:
      "Silver Touch Hospitals – Best dental hospital in Ahmedabad. Implants, crowns, Invisalign, braces, RCT, dental aligner treatment, dental hygienist & perfect smile treatment in Prahladnagar & Nirnaynagar Ranip.",
    h1: "Dentistry in Ahmedabad",
    intro:
      "Preventive, restorative, cosmetic and surgical dentistry by dental surgeons, prosthodontists, endodontists and orthodontists.",
    image: `${U}/2025/07/dental-surgery.jpg`,
    gallery: [`${U}/2025/07/dentist-ahmedabad.jpg`],
    conditionsTitle: "Dental services",
    conditions: [
      "Check-ups and preventive care",
      "Gum disease",
      "Smile makeovers",
      "Emergency dental care",
      "Teeth cleaning (ultrasonic scaling)",
      "Tooth and wisdom tooth extraction",
      "Gum flap surgery",
      "Cyst excision and oral biopsies",
      "Minor oral trauma",
    ],
    procedures: [
      { title: "Dental Crown" },
      { title: "Dental Implant" },
      { title: "Root Canal Treatment" },
      { title: "Dental Aligner Treatment" },
    ],
    whyUs: ["Dental surgeons", "Prosthodontists", "Endodontists", "Orthodontists"],
    doctors: [],
    blogCategories: ["dental"],
    status: "live",
  },
  {
    slug: "ear-nose-throat",
    name: "Ear, Nose & Throat",
    label: "ENT",
    group: "care",
    icon: "ear",
    oneLiner: "Hearing tests, sinus and tonsil surgery, sleep apnoea and children's ENT care.",
    seoTitle: "Best ENT Hospitals Ahmedabad (Ear, Nose & Throat) | ENT Doctor",
    description:
      "Silver Touch Hospitals are the best ENT hospital in Ahmedabad, offering expert (Ear, Nose & Throat) care with top ENT doctors and advanced treatments.",
    h1: "Ear, Nose & Throat (ENT) in Ahmedabad",
    intro: "Ear, nose and throat care for adults and children, with in-house audiometry and endoscopic surgery.",
    image: `${U}/2025/07/ENT.jpg`,
    gallery: [`${U}/2025/07/ENT-specialists.jpg`],
    conditions: [
      "Hearing loss and tinnitus",
      "Recurrent ear infections",
      "Balance problems and vertigo",
      "Eardrum perforation",
      "Deviated septum",
      "Sinusitis and nasal polyps",
      "Tonsillitis and adenoids",
      "Vocal cord disorders",
      "Sleep apnoea and snoring",
      "Head and neck infections",
    ],
    procedures: [
      { title: "Audiometry", text: "Hearing tests in-house." },
      { title: "Ear tube insertion" },
      { title: "Tonsillectomy & adenoidectomy" },
      { title: "Septum correction" },
      { title: "Endoscopic sinus surgery" },
      { title: "Micro laryngeal surgery" },
    ],
    whyUs: ["Children's ENT care", "Hearing tests on site", "No referral needed", "Skull base surgery expertise"],
    doctors: ["dr-vaidik-chauhan", "dr-simple-bhadania"],
    blogCategories: ["ent"],
    status: "live",
  },
  {
    slug: "gynecology-obstetrics",
    name: "Gynecology & Obstetrics",
    group: "care",
    icon: "baby",
    oneLiner: "Pregnancy care, high-risk pregnancy, sonography and laparoscopic gynaecological surgery.",
    seoTitle: "Gynecology & Obstetrics in Ahmedabad | Silver Touch Hospitals",
    description:
      "Gynecology and obstetrics at Silver Touch Hospitals, Ahmedabad: pregnancy care, high-risk pregnancy, sonography and gynaecological laparoscopic surgery.",
    h1: "Gynecology & Obstetrics",
    intro:
      "Care for women through pregnancy and beyond, led by a consultant obstetrician and gynaecologist who is also a sonologist and laparoscopic surgeon.",
    conditions: ["Pregnancy care", "High-risk pregnancy", "Infertility and IVF", "Gynaecological conditions needing surgery"],
    procedures: [
      { title: "Obstetric care" },
      { title: "Sonography" },
      { title: "IVF" },
      { title: "Gynaecological laparoscopic surgery" },
    ],
    whyUs: ["High-risk pregnancy expertise", "In-house sonography", "Laparoscopic surgery", "24x7 emergency and ICU backup"],
    doctors: ["dr-jitendra-shah"],
    blogCategories: [],
    status: "new",
  },
];

export const SPECIALITY_BY_SLUG = Object.fromEntries(SPECIALITIES.map((s) => [s.slug, s])) as Record<string, Speciality>;

export const specialityHref = (slug: string) => `/specialities-services/${slug}/`;

/** Department options for the appointment form (brief 4.5). */
export const DEPARTMENT_OPTIONS = [
  "Critical Care",
  "Dentistry",
  "Gastroenterology",
  "General Surgery",
  "GI Surgery",
  "Gynecology & Obstetrics",
  "Hip Replacement Surgery",
  "Nephrology",
  "Orthopedics / Joint Replacement Surgery",
  "Pulmonology",
  "Spine Surgery",
  "Urology",
  "Neurology",
  "Bariatric Surgery",
  "ENT",
  "Endocrinology & Diabetes",
  "Full Body Checkup",
  "General Medicine",
  "Not sure / Other",
] as const;

/** Maps a speciality to its appointment-form department. */
export const DEPARTMENT_FOR: Record<string, string> = {
  "critical-care": "Critical Care",
  dentistry: "Dentistry",
  gastroenterology: "Gastroenterology",
  "general-surgery": "General Surgery",
  "gi-surgery": "GI Surgery",
  "gynecology-obstetrics": "Gynecology & Obstetrics",
  "hip-replacement-ahmedabad": "Hip Replacement Surgery",
  nephrology: "Nephrology",
  "orthopedics-joint-replacement-surgery": "Orthopedics / Joint Replacement Surgery",
  pulmonology: "Pulmonology",
  "spine-surgery": "Spine Surgery",
  urology: "Urology",
  neurology: "Neurology",
  "bariatric-surgery-ahmedabad": "Bariatric Surgery",
  "ear-nose-throat": "ENT",
  "endocrinologist-diabetes-hospital-ahmedabad": "Endocrinology & Diabetes",
  "full-body-health-checkup": "Full Body Checkup",
  "general-medicine": "General Medicine",
  "fever-physician-ahmedabad": "General Medicine",
};
