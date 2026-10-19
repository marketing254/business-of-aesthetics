/**
 * Speaker archive carried over from businessofaesthetics.org/speakers/.
 * Merged after the live sheet-driven speakers (which stay the source of
 * truth for new additions); duplicates by name are dropped in fetchSpeakers.
 */

import type { SheetSpeaker } from "@/lib/sheet";

const WP = "/wp-content/uploads";

function archive(
  name: string,
  title: string,
  image: string
): SheetSpeaker {
  return {
    name,
    title,
    company: "",
    bio: "",
    event: "BOA Podcast Guest",
    imageUrl: `${WP}/${image}`,
    linkedin: "",
    website: "",
    initials: name
      .split(/\s+/)
      .filter((w) => !w.includes("."))
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase() ?? "")
      .join(""),
  };
}

export const archiveSpeakers: SheetSpeaker[] = [
  archive("Dr. Richard M. Goldfarb", "Cosmetic Surgeon", "2020/08/Richard-Goldfarb.jpg"),
  archive("Dr. Carolyn Jacob", "Dermatologist & Aesthetics Expert", "2020/10/Dr-Carolyn-Jacob-1.jpg"),
  archive("Dr. Judah Garfinkle", "Aesthetic Professional", "2020/11/Dr-Judah-Garfinkle-1.jpg"),
  archive("David Carraway", "Ethics Consultant", "2020/11/David-Carraway-1.jpg"),
  archive("Dr. Philip Werschler", "Dermatologist", "2020/12/Dr-Philip-Werschler.jpg"),
  archive("Dr. Lawrence Green", "Dermatologist", "2020/12/Dr-Lawrence-Green-1.jpg"),
  archive("Marcel Besse", "Aesthetic Industry Veteran", "2020/12/Marcel-Besse-1.jpg"),
  archive("Dr. William Delgado", "Plastic Surgeon", "2021/01/Dr-William-Delgado-1.jpg"),
  archive("Dr. Bruce Katz", "Dermatology & Technology Expert", "2021/01/Dr.-Bruce-Katz.jpg"),
  archive("Tony Tydlacka", "Technology Financing Specialist", "2021/03/Tony-Tydlacka.jpg"),
  archive("Dr. Martin Braun", "Pain Management Specialist", "2021/02/Dr-Martin-Braun.jpg"),
  archive("Dr. Doris Day", "Dermatologist", "2021/02/Dr-Doris-Day.jpg"),
  archive("Dr. Lisa Jenks", "MedSpa Management Expert", "2021/03/Dr-Lisa-Jenks-1.jpg"),
  archive("Dr. Jason Pozner", "Plastic Surgeon", "2021/03/Dr-Jason-Pozner.jpg"),
  archive("Dr. Suneel Chilukuri", "Dermatologic Surgeon", "2021/03/Dr-Suneel-Chilukuri.jpg"),
  archive("Dr. Kian Karimi", "Aesthetic Surgeon", "2021/04/Kian-Karimi.jpg"),
  archive("Dr. Payman Danielpour", "Plastic Surgeon", "2021/04/Dr-Payman-Danielpour.jpg"),
  archive("Dr. Peter Jenkin", "Dermatologist", "2021/04/Dr-Peter-Jenkin.jpg"),
  archive("Dr. Troy J. Woodman", "Aesthetic Physician", "2021/04/Dr-Troy-J-Woodman.jpg"),
  archive("Dr. Erik H. Suh", "Aesthetic Physician", "2021/04/Dr-Erik-H-Suh.jpg"),
];
