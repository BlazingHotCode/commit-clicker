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

      <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
        <Button
          variant="contained"
          size="large"
          fullWidth
          onClick={onWriteCode}
          sx={{ py: { xs: 1.5, sm: 1 } }}
        >
          Write Code
        </Button>

        <Button
          variant="outlined"
          size="large"
          fullWidth
          onClick={onFixBug}
          disabled={bugs <= 0}
          sx={{ py: { xs: 1.5, sm: 1 } }}
        >
          Fix Bug
        </Button>

        <Button
          variant="outlined"
          color="secondary"
          size="large"
          fullWidth
          onClick={onRefactorCode}
          disabled={bugs <= 0 || reputation < 5}
          sx={{ py: { xs: 1.5, sm: 1 } }}
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
