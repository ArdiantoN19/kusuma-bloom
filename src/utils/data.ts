import {
  AboutType,
  FacilityType,
  SponsorType,
  TestimonialType,
} from "@/types/utils-data";

export const sponsors: SponsorType[] = [
  {
    id: 1,
    name: "Logo Kabupaten Karanganyar",
    image: "/images/sponsors/logo-karanganyar.jpg",
    type: "image/jpg",
  },
  {
    id: 2,
    name: "Pesona Karanganyar",
    image: "/images/sponsors/pesona-karanganyar.png",
    type: "image/png",
  },
  {
    id: 3,
    name: "Jadesta",
    image: "/images/sponsors/jadesta.png",
    type: "image/png",
  },
];

export const facilities: FacilityType[] = [
  {
    id: 1,
    name: "Restaurant",
  },
  {
    id: 2,
    name: "Cafetaria",
  },
  {
    id: 3,
    name: "Outbound",
  },
  {
    id: 4,
    name: "Area Parkir",
  },
  {
    id: 5,
    name: "Kamar Mandi Umum",
  },
  {
    id: 6,
    name: "Kolam Renang",
  },
  {
    id: 7,
    name: "Balai pertemuan",
  },
  {
    id: 8,
    name: "Mushola",
  },
];

export const abouts: AboutType[] = [
  {
    id: 1,
    image: "/images/about/1.jpeg",
    type: "image/jpeg",
  },
  {
    id: 2,
    image: "/images/about/2.jpg",
    type: "image/jpg",
  },
  {
    id: 3,
    image: "/images/about/3.jpg",
    type: "image/jpg",
  },
];

export const testimonials: TestimonialType[] = [
  {
    id: 1,
    username: "Hafidz",
    title: "Mudah untuk digunakan",
    image: "/images/avatar/default.jpg",
    testimoni:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam soluta deserunt ipsam quasi earum illum beatae rerum similique eos laborum?",
    role: "ui ux designer",
    rating: 5,
    createdAt: "2024-02-18T14:32:22.447Z",
  },
  {
    id: 2,
    username: "Fitri",
    title: "Mudah untuk digunakan",
    image: "/images/avatar/default.jpg",
    testimoni:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam soluta deserunt ipsam quasi earum illum beatae rerum similique eos laborum?",
    role: "Wiraswasta",
    rating: 5,
    createdAt: "2024-02-18T14:32:22.447Z",
  },
  {
    id: 3,
    username: "Taufik",
    title: "Mudah untuk digunakan",
    image: "/images/avatar/default.jpg",
    testimoni:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam soluta deserunt ipsam quasi earum illum beatae rerum similique eos laborum?",
    role: "Manajer",
    rating: 5,
    createdAt: "2024-02-18T14:32:22.447Z",
  },
];

export const teams: Record<string, any>[] = [
  {
    id: 1,
    name: "Ardianto",
    role: "CEO",
    image: "https://api.dicebear.com/7.x/lorelei/png?seed=Ardianto",
    social: {
      instagram: "https://www.instagram.com/ardi_19n/",
      facebook: "https://www.facebook.com/ardianto",
      email: "https://mail.google.com/mail/?view=cm&fs=1&to=4XqYz@example.com",
    },
  },
  {
    id: 2,
    name: "Farah Salsabila",
    role: "Sekretaris",
    image: "https://api.dicebear.com/7.x/lorelei/png?seed=Farah",
    social: {
      instagram: "https://www.instagram.com/ardi_19n/",
      facebook: "https://www.facebook.com/ardianto",
      email: "https://mail.google.com/mail/?view=cm&fs=1&to=4XqYz@example.com",
    },
  },
  {
    id: 3,
    name: "Keyla Wardani",
    role: "Bendahara",
    image: "https://api.dicebear.com/7.x/lorelei/png?seed=Keyla",
    social: {
      instagram: "https://www.instagram.com/ardi_19n/",
      facebook: "https://www.facebook.com/ardianto",
      email: "https://mail.google.com/mail/?view=cm&fs=1&to=4XqYz@example.com",
    },
  },
  {
    id: 4,
    name: "Yudha Pratama",
    role: "Product Manager",
    image: "https://api.dicebear.com/7.x/lorelei/png?seed=Yudha",
    social: {
      instagram: "https://www.instagram.com/ardi_19n/",
      facebook: "https://www.facebook.com/ardianto",
      email: "https://mail.google.com/mail/?view=cm&fs=1&to=4XqYz@example.com",
    },
  },
];

export const months: { id: number; name: string }[] = [
  {
    id: 0,
    name: "Januari",
  },
  {
    id: 1,
    name: "Februari",
  },
  {
    id: 2,
    name: "Maret",
  },
  {
    id: 3,
    name: "April",
  },
  {
    id: 4,
    name: "Mei",
  },
  {
    id: 5,
    name: "Juni",
  },
  {
    id: 6,
    name: "Juli",
  },
  {
    id: 7,
    name: "Agustus",
  },
  {
    id: 8,
    name: "September",
  },
  {
    id: 9,
    name: "Oktober",
  },
  {
    id: 10,
    name: "November",
  },
  {
    id: 11,
    name: "Desember",
  },
];

export const dataColors: Record<number, string> = {
  1: "#f87171",
  2: "#4ade80",
  3: "#a3e635",
  4: "#2dd4bf",
  5: "#22d3ee",
  6: "#818cf8",
  7: "#e879f9",
  8: "#f472b6",
  9: "#fbbf24",
  10: "#94a3b8",
};
