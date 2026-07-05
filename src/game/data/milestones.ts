export type Milestone = {
  id: string;
  name: string;
  description: string;
  requiredTotalLoc: number;
};

export const milestones: Milestone[] = [
  {
    id: "githubRepo",
    name: "GitHub Repo",
    description: "You published your first repo.",
    requiredTotalLoc: 100,
  },
  {
    id: "firstApp",
    name: "First App",
    description: "Your project is now usable.",
    requiredTotalLoc: 1_000,
  },
  {
    id: "startup",
    name: "Tiny Startup",
    description: "You accidentally became a founder.",
    requiredTotalLoc: 10_000,
  },
];
