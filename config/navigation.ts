
export type MenuEntry = {
    title: string;
    items: MenuItem[];
}

export type MenuItem = {
  title: string;
  href: string;
  description: string;
};

export const menuEntries: MenuEntry[] = [
  {
    title: "Akitas",
    items: [
        {
            title: "All Akitas",
            href: "/akitas",
            description: "Search and explore the complete global database of Akita Inu pedigrees.",
        },
        {
            title: "Recently Added",
            href: "/akitas",
            description: "Discover the newest dogs, latest updates, and recent registrations in the system",
        },
        {
            title: "Register an Akita",
            href: "/akitas",
            description:
            "Add a new dog to the database to help expand the worldwide lineage.",
        },
    ],
  },
  {
    title: "Community",
    items: [
        {
            title: "People & Owners",
            href: "/community",
            description:
            "Find and connect with owners, handlers, and enthusiasts in the global network.",
        },
        {
            title: "Kennel & Breeders",
            href: "/community",
            description:
            "Discover registered Akita breeders and explore their historical litters.",
        },
        {
            title: "Add a Profile",
            href: "/community",
            description:
            "Create a new record for an owner or breeder not yet listed in the database.",
        },
        {
            title: "Claim your Profile",
            href: "/community",
            description:
            "Already listed? Verify your identity to manage your profile and your dogs.",
        },
    ],
  },
  {
    title: "Tools",
    items: [
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
    ],
  },
];

export const akitasMenuEntries: { title: string; href: string; description: string }[] = [
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
      "Discover the newest dogs, latest updates, and recent registrations in the system",
  },
  {
    title: "Register an Akita",
    href: "/akitas",
    description:
      "Add a new dog to the database to help expand the worldwide lineage.",
  },
]

export const communityMenuEntries: { title: string; href: string; description: string }[] = [
  {
    title: "People & Owners",
    href: "/community",
    description:
      "Find and connect with owners, handlers, and enthusiasts in the global network.",
  },
  {
    title: "Kennel & Breeders",
    href: "/community",
    description:
      "Discover registered Akita breeders and explore their historical litters.",
  },
  {
    title: "Add a Profile",
    href: "/community",
    description:
      "Create a new record for an owner or breeder not yet listed in the database.",
  },
  {
    title: "Claim your Profile",
    href: "/community",
    description:
      "Already listed? Verify your identity to manage your profile and your dogs.",
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