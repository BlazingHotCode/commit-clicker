import { Button, Stack } from "@mui/material";

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
    <section>
      <h2>Actions</h2>

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
      <p className="action-help">
        Refactor Code costs 5 reputation and removes up to 3 bugs.
      </p>
    </section>
  );
}
