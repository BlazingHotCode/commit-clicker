import { Box, Container, Stack, Typography } from "@mui/material";

type GameLayoutProps = {
  children: React.ReactNode;
};

export function GameLayout({ children }: GameLayoutProps) {
  return (
    <Container
      maxWidth="lg"
      sx={{
        px: { xs: 1.5, sm: 3 },
        pt: { xs: 2, sm: 4 },
        pb: { xs: 10, md: 4 },
      }}
    >
      <Box component="header" sx={{ mb: 4 }}>
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontWeight: 800,
            fontSize: { xs: "2rem", sm: "3rem" },
          }}
        >
          Commit Clicker
        </Typography>

        <Typography color="text.secondary" sx={{ mt: 1 }}>
          Write code. Create bugs. Gain reputation. Ship projects.
        </Typography>
      </Box>

      <Stack component="main" spacing={{ xs: 2, sm: 3 }}>
        {children}
      </Stack>
    </Container>
  );
}
