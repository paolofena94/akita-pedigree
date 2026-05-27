
export type MenuEntry = {
    title: string;
    items: MenuItem[];
}

export type MenuItem = {
  title: string;
  href: string;
  description: string;
};

export const akitasMenuEntries: MenuItem[] = [
  {
    title: "All Akitas",
    href: "/akitas",
    description:
      "Search and explore the complete global database of Akita Inu pedigrees.",
  },
  {
    title: "Recently Added",
    href: "/akitas",
    description:
      "Discover the newest akitas, latest updates, and recent registrations in the system",
  },
  {
    title: "Register an Akita",
    href: "/akitas",
    description:
      "Add a new akita to the database to help expand the worldwide lineage.",
  },
]

export const communityMenuEntries: { title: string; href: string; description: string }[] = [
  {
    title: "Owners",
    href: "/community",
    description:
      "Find and connect with owners and enthusiasts in the global network.",
  },
  {
    title: "Kennel & Breeders",
    href: "/community",
    description:
      "Discover registered Akita breeders and explore their historical litters.",
  },
  {
    title: "Add a Person",
    href: "/community",
    description:
      "Create a new record for an owner or breeder not yet listed in the database.",
  },
  {
    title: "Claim your Person Profile",
    href: "/community",
    description:
      "Already listed? Claim a Person to manage its profile.",
  },
]

export const toolsMenuEntries: { title: string; href: string; description: string }[] = [
  {
    title: "Virtual Testmating",
    href: "/testmating",
    description:
      "Simulate a breeding between two Akitas to preview their potential offspring's pedigree.",
  },
  {
    title: "Breed Statistics",
    href: "/stats",
    description:
      "Explore data insights, population trends, and analytics about the Akita breed.",
  }
]

export const menuEntries: MenuEntry[] = [
  {
    title: "Akitas",
    items: akitasMenuEntries,
  },
  {
    title: "Community",
    items: communityMenuEntries
  },
  {
    title: "Tools",
    items: toolsMenuEntries
  },
];