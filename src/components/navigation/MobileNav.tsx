import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";

export type MobilePanel = "actions" | "goal" | "projects" | "shop" | "more";

type MobileNavProps = {
  value: MobilePanel;
  onChange: (value: MobilePanel) => void;
};

export function MobileNav({ value, onChange }: MobileNavProps) {
  return (
    <Paper
      elevation={8}
      sx={{
        display: { xs: "block", md: "none" },
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 20,
      }}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(_, nextValue: MobilePanel) => onChange(nextValue)}
      >
        <BottomNavigationAction label="Actions" value="actions" />
        <BottomNavigationAction label="Goal" value="goal" />
        <BottomNavigationAction label="Projects" value="projects" />
        <BottomNavigationAction label="Shop" value="shop" />
        <BottomNavigationAction label="More" value="more" />
      </BottomNavigation>
    </Paper>
  );
}
