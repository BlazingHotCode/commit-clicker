import { Button, Paper, Stack, Typography } from "@mui/material";

type ClickActionsProps = {
  bugs: number;
  reputation: number;
  onWriteCode: () => void;
  onFixBug: () => void;
  onRefactorCode: () => void;
};

export function ClickActions({
  bugs,
  reputation,
  onWriteCode,
  onFixBug,
  onRefactorCode,
}: ClickActionsProps) {
  return (
    <Paper component="section" variant="outlined" sx={{ p: 2.5 }}>
      <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 700 }}>
        Actions
      </Typography>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <Button variant="contained" onClick={onWriteCode}>
          Write Code
        </Button>

        <Button variant="outlined" onClick={onFixBug} disabled={bugs <= 0}>
          Fix Bug
        </Button>

        <Button
          variant="outlined"
          color="secondary"
          onClick={onRefactorCode}
          disabled={bugs <= 0 || reputation < 5}
        >
          Refactor Code
        </Button>
      </Stack>
      <Typography color="text.secondary" sx={{ mt: 2 }}>
        Refactor Code costs 5 reputation and removes up to 3 bugs.
      </Typography>
    </Paper>
  );
}
