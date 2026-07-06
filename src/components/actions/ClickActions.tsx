import { Button, Paper, Stack, Typography } from "@mui/material";

type ClickActionsProps = {
  bugs: number;
  reputation: number;
  hasActiveBugChallenge: boolean;
  onWriteCode: () => void;
  onStartBugChallenge: () => void;
  onRefactorCode: () => void;
};

export function ClickActions({
  bugs,
  reputation,
  hasActiveBugChallenge,
  onWriteCode,
  onStartBugChallenge,
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
          onClick={onStartBugChallenge}
          disabled={bugs <= 0 || hasActiveBugChallenge}
          sx={{ py: { xs: 1.5, sm: 1 } }}
        >
          Debug Bug
        </Button>

        <Button
          variant="outlined"
          color="secondary"
          size="large"
          fullWidth
          onClick={onRefactorCode}
          disabled={reputation < 5}
          sx={{ py: { xs: 1.5, sm: 1 } }}
        >
          Refactor Code
        </Button>
      </Stack>
      <Typography color="text.secondary" sx={{ mt: 2 }}>
        Refactor Code costs 5 reputation and adds +1 LOC per fixed bug.
      </Typography>
    </Paper>
  );
}
