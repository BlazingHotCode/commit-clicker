import { Card, CardContent, Typography } from "@mui/material";

type ResourceItemProps = {
  label: string;
  value: string | number;
};

export function ResourceItem({ label, value }: ResourceItemProps) {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {label}
        </Typography>

        <Typography variant="h6" component="div">
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}
