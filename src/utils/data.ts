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
