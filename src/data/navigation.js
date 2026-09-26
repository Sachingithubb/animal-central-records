import {
  Home,
  SquarePen,
  Search,
  FileClock,
  PawPrint,
  UserCircle,
  CreditCard,
  ScanSearch,
  CircleHelp,
} from "lucide-react";

export const navigationItems = [
  {
    label: "Home",
    path: "/home",
    icon: Home,
  },

  {
    label: "List A Pet",
    path: "/list-pet",
    icon: SquarePen,
  },

  {
    label: "Search History",
    path: "/search-history",
    icon: Search,
  },

  {
    label: "Follow-ups",
    path: "/follow-ups",
    icon: FileClock,
    badge: 9,
  },

  {
    label: "Pets",
    icon: PawPrint,
    expandable: true,
    children: [
      {
        label: "My Pets",
        path: "/pets",
      },
      {
        label: "Add Pet",
        path: "/pets/add",
      },
    ],
  },

  {
    label: "Profile",
    icon: UserCircle,
    expandable: true,
    children: [
      {
        label: "My Profile",
        path: "/profile",
      },
      {
        label: "Settings",
        path: "/settings",
      },
    ],
  },

  {
    label: "Buy Microchips",
    path: "/buy-microchips",
    icon: CreditCard,
  },

  {
    label: "Lost Pet Hub",
    path: "/lost-pet-hub",
    icon: ScanSearch,
  },
];

export const bottomNavigationItems = [
  {
    label: "FAQ",
    path: "/faq",
    icon: CircleHelp,
  },
];