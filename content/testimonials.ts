/** Patient testimonials (brief section 7). Text kept exactly as published. */
export type Testimonial = {
  slug: string;
  name: string;
  quote: string;
  /** Related speciality slug, when the review names a treatment. */
  speciality?: string;
  source: string;
};

const SRC = "https://www.silvertouchhospitals.com/testimonails";

export const TESTIMONIALS: Testimonial[] = [
  {
    slug: "pooja-chowdhary",
    name: "Pooja Chowdhary",
    quote:
      "Extremely well managed Hospital. Got my Mother in law's Knee Replacement from Dr Yuvraj Lakum. Everything from Doctors, nursing staff, housekeeping staff and care takers were very cooperative !",
    speciality: "orthopedics-joint-replacement-surgery",
    source: `${SRC}/pooja-chowdhary/`,
  },
  {
    slug: "panchal-nikita",
    name: "Panchal Nikita",
    quote:
      "My grandfather admitted to this hospital... I'm satisfied with the facilities provided by the hospital and staffs are very cooperative and supportive too.. Doctors are also very talented and kind.. I highly recommend whomsoever need can take consultation in this hospital.",
    source: `${SRC}/panchal-nikita/`,
  },
  {
    slug: "parth-dey",
    name: "Parth Dey",
    quote:
      "My grandmother was admitted in this hospital and her knee operation was done well, also all the medical staff very helpful to us, all the facilities were totally good. I recommend this hospital to those who want to get any kind of operation specially for knee related. Thank you!",
    speciality: "orthopedics-joint-replacement-surgery",
    source: `${SRC}/parth-dey/`,
  },
  {
    slug: "adarsh-soni",
    name: "Adarsh Soni",
    quote:
      "Hospital staff were great, helped throughout the whole procedure for taking care of patient day and night. Along with Doctors. Also well equipped with all the necessary requirements for patient comfort. Very few hospitals provide government approved surgeries through Ayushmann card which is very great approach by government, specially for the people who get sudden medical expense due to any emergencies. This has helped millions of people and will help millions in future.",
    source: `${SRC}/adarsh-soni/`,
  },
  {
    slug: "suraj-joshi",
    name: "Suraj Joshi",
    quote:
      "We had a great experience at Silver Touch Hospital during my mother's gynecological surgery. The doctor was exceptionally skilled, compassionate, and made sure we felt confident and informed throughout the process. Her professionalism and personal attention truly stood out. The supporting staff was also polite and caring, and the hospital maintained a clean and comfortable environment. Highly satisfied and grateful!",
    speciality: "gynecology-obstetrics",
    source: `${SRC}/suraj-joshi/`,
  },
  {
    slug: "prashanth-kumar",
    name: "Prashanth kumar",
    quote:
      "Had a very good experience at this hospital. We truly appreciate service provided here. The doctors, staff nurse and support staff were very caring and supportive throughout the treatment. Thank you for making me feel comfortable and being well looked after.",
    source: `${SRC}/prashanth-kumar/`,
  },
];

export const initials = (name: string) =>
  name
    .split(/\s+/)
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
