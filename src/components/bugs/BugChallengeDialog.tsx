import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import type { BugChallenge } from "../../game/state/types";

type BugChallengeDialogProps = {
  challenge: BugChallenge | null;
  onAnswer: (answer: string) => void;
};

export function BugChallengeDialog({
  challenge,
  onAnswer,
}: BugChallengeDialogProps) {
  return (
    <Dialog open={challenge !== null}>
      <DialogTitle>Debugging Challenge</DialogTitle>

      <DialogContent>
        <DialogContentText sx={{ mb: 2 }}>
          A bug appeared. Pick the best fix.
        </DialogContentText>

        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 700 }}>
          {challenge?.symptom}
        </Typography>

        <Stack spacing={1.5}>
          {challenge?.options.map((option) => (
            <Button
              key={option.label}
              variant="outlined"
              onClick={() => onAnswer(option.label)}
            >
              {option.label}
            </Button>
          ))}
        </Stack>
      </DialogContent>

      <DialogActions>
        <DialogContentText sx={{ px: 2, pb: 1 }}>
          Wrong fixes waste time. Dangerous fixes create another bug.
        </DialogContentText>
      </DialogActions>
    </Dialog>
  );
}
