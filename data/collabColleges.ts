// To add a logo, drop the file in public/images/collab-colleges/ and set `logo: '/images/collab-colleges/<file>'` — nothing else needs to change.

export type CollabCollege = {
  name: string;
  fullName?: string;
  logo?: string;
};

export type CollabCity = {
  city: string;
  state: string;
  colleges: CollabCollege[];
};

export const collabCities: CollabCity[] = [
  {
    city: "Hyderabad",
    state: "Telangana",
    colleges: [
      {
        name: "MRU",
        fullName: "Malla Reddy University",
        logo: "/images/collab-colleges/mru.png",
      },
      {
        name: "MRDU",
        fullName: "Malla Reddy Deemed to be University",
        logo: "/images/collab-colleges/mrdu.jpg",
      },
      {
        name: "MVV",
        fullName: "Malla Reddy Vishwavidyapeeth",
        logo: "/images/collab-colleges/mvv.jpg",
      },
      {
        name: "CMR Group",
        fullName: "CMR Group of Institutions",
        logo: "/images/collab-colleges/cmr-group.svg",
      },
      {
        name: "MRCE",
        fullName: "Malla Reddy College of Engineering",
        logo: "/images/colleges/image 104.jpg",
      },
      {
        name: "MRCET",
        fullName: "Malla Reddy College of Engineering & Technology",
        logo: "/images/colleges/image 101.jpg",
      },
      {
        name: "MRCW",
        logo: "/images/collab-colleges/mrecw.jpg",
      },
      {
        name: "MRECW",
        fullName: "Malla Reddy Engineering College for Women",
        logo: "/images/collab-colleges/mrecw.jpg",
      },
      {
        name: "Sreyas",
        fullName: "Sreyas Institute of Engineering & Technology",
        logo: "/images/collab-colleges/sreyas.png",
      },
      {
        name: "Sree Dattha",
        fullName: "Sree Dattha Institutions",
        logo: "/images/collab-colleges/sree-dattha.png",
      },
      {
        name: "KBRIT",
        logo: "/images/collab-colleges/kbrit.png",
      },
      {
        name: "Geethanjali",
        fullName: "Geethanjali College of Engineering and Technology",
        logo: "/images/collab-colleges/geethanjali.png",
      },
      {
        name: "Saint Mary's",
        fullName: "St. Mary's Group of Institutions Hyderabad",
        logo: "/images/collab-colleges/st-marys.jpg",
      },
      {
        name: "NIAT",
        fullName: "NxtWave Institute of Advanced Technologies",
        logo: "/images/collab-colleges/niat.svg",
      },
    ],
  },
  {
    city: "Prayagraj",
    state: "Uttar Pradesh",
    colleges: [
      {
        name: "IERT",
        fullName: "Institute of Engineering and Rural Technology",
        logo: "/images/collab-colleges/iert.png",
      },
      {
        name: "United Group of Institutions",
        logo: "/images/collab-colleges/united-group.png",
      },
      {
        name: "United University",
        logo: "/images/collab-colleges/united-university.png",
      },
    ],
  },
  {
    city: "New Delhi",
    state: "Delhi",
    colleges: [
      {
        name: "IIT Delhi",
        fullName: "Indian Institute of Technology Delhi",
        logo: "/images/collab-colleges/iit-delhi.svg",
      },
    ],
  },
];
