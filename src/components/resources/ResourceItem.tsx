import { Card, CardContent, Typography } from "@mui/material";

type ResourceItemProps = {
  label: string;
  value: string | number;
};

export function ResourceItem({ label, value }: ResourceItemProps) {
  return (
    <Card variant="outlined">
      <CardContent sx={{ p: { xs: 1, sm: 2 }, "&:last-child": { pb: { xs: 1, sm: 2 } } }}>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontSize: { xs: "0.72rem", sm: "0.875rem" } }}
        >
          {label}
        </Typography>

        <Typography
          variant="h6"
          component="div"
          sx={{
            fontSize: { xs: "1rem", sm: "1.25rem" },
            fontWeight: 700,
            lineHeight: 1.2,
            wordBreak: "break-word",
          }}
        >
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}