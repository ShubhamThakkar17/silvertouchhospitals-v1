/**
 * Images referenced directly by the rebuild brief (logos, icons, hero and
 * speciality photography, doctor headshots). The importer downloads these
 * alongside the images it finds inside page and post bodies, so components
 * can refer to the original WordPress URL and resolve it with `media()`.
 */
const U = "https://www.silvertouchhospitals.com/wp-content/uploads";

export const EXTRA_ASSETS: string[] = [
  "https://www.silvertouchhospitals.com/wp-content/themes/silver-touch-hospital/assets/images/logo.jpg",

  // Accreditation and insurers
  `${U}/2022/08/PMJAY.jpg`,
  `${U}/2025/09/cghs.jpg`,
  `${U}/2025/07/newlogop.png`,
  `${U}/2022/08/MA-Yojna.jpg`,
  `${U}/2026/05/silvertouch.jpg`,
  `${U}/2025/07/bajaj.png`,
  `${U}/2025/07/cholams.png`,
  `${U}/2025/07/hdfc.png`,
  `${U}/2025/07/icic.png`,
  `${U}/2025/07/relacinc.png`,
  `${U}/2025/07/sbi-general.png`,
  `${U}/2025/07/acko.png`,

  // Home
  `${U}/2025/07/Medical-Treatment.png`,
  `${U}/2025/07/Emergency-Help.png`,
  `${U}/2025/07/Medical-professionals.png`,
  `${U}/2025/07/Surgical-Department.png`,
  `${U}/2025/12/Silver-Touch-Gujrat-hospital.jpg`,

  // About gallery
  ...[1, 2, 3, 4, 5, 6, 7].map((n) => `${U}/2024/05/about-0${n}.jpg`),

  // Specialities
  `${U}/2025/07/24-hours-hospital.jpg`,
  `${U}/2025/07/private-emergency-hospital-1.jpg`,
  `${U}/2025/07/dental-surgery.jpg`,
  `${U}/2025/07/dentist-ahmedabad.jpg`,
  `${U}/2025/07/Gastrointestinal-health-issues.jpg`,
  `${U}/2025/07/gastrologist-doctor-1.jpg`,
  `${U}/2025/07/ENT.jpg`,
  `${U}/2025/07/ENT-specialists.jpg`,
  `${U}/2025/07/kidney-specialist.jpg`,
  `${U}/2025/07/kidney-hospital.jpg`,
  `${U}/2026/03/orthopedics-joint-replacement-surgery-ahmedabad.jpeg`,
  `${U}/2025/07/joint-replacement-surgeon.jpg`,
  `${U}/2025/07/orthopedic-hospital-1.jpg`,
  `${U}/2025/07/Hospitals-Ahmedabad.jpg`,
  `${U}/2023/09/banner04.jpg`,
  `${U}/2025/08/spine-specialist.jpg`,
  `${U}/2025/08/spine-injury.jpg`,
  `${U}/2025/08/general-surgery.jpg`,
  `${U}/2025/08/general-surgery-hospital.jpg`,
  `${U}/2026/03/bariatric-surgery-in-ahmedabad.jpg`,
  `${U}/2025/12/Bariatric-Surgery-Copy.jpg`,
  `${U}/2025/12/Bariatric-Surgery-Ahmedabad.jpg`,
  `${U}/2025/07/Urology-treatment.jpg`,
  `${U}/2025/07/Urology-doctor.jpg`,
  `${U}/2025/07/Health-CheckUp.jpg`,
  `${U}/2025/12/Full-Body-Health-Checkups.jpg`,

  // Doctors
  `${U}/2026/10/Professional-Medical-Headshot.png`,
  `${U}/2022/04/dr-chirag.jpg`,
  `${U}/2022/04/dr-nisarg.jpg`,
  `${U}/2022/04/dr-manthan-patel.jpg`,
  `${U}/2024/05/Harshil-suit-1-600x400.jpg`,
  `${U}/2022/04/dr-ishan-600x400.jpg`,
  `${U}/2022/04/dr-priank.jpg`,
  `${U}/2022/04/dr-mayur-patel.jpg`,
  `${U}/2022/04/dr-vikram.jpg`,
  `${U}/2022/04/dr-ronak-600x400.jpg`,
  `${U}/2024/05/dr-harisl.png`,
  `${U}/2024/05/chirag-patel.png`,
  `${U}/2022/04/dr-jitendra.jpg`,
  `${U}/2022/04/dr-vadik.jpg`,
  `${U}/2022/04/Dr-Simple-Bhadania.jpg`,
];
