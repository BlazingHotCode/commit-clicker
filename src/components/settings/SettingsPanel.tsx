import { Button, Card, CardContent, Paper, Typography } from "@mui/material";

type SettingsPanelProps = {
  onResetSave: () => void;
};

export function SettingsPanel({ onResetSave }: SettingsPanelProps) {
  return (
    <Paper component="section" variant="outlined" sx={{ p: 2.5 }}>
      <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 700 }}>
        Settings
      </Typography>

      <Card variant="outlined">
        <CardContent>
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            Commit Clicker v0.1 - Local autosave enabled
          </Typography>

          <Button variant="outlined" color="error" onClick={onResetSave}>
            Reset Save
          </Button>
        </CardContent>
      </Card>
    </Paper>
  );
}
