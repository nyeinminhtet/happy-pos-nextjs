import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Image from "next/image";
import order from "@/assets/pizza 2.png";

export default function MediaCover() {
  return (
    <Box
      component="ul"
      color="primary"
      sx={{ display: "flex", gap: 2, flexWrap: "wrap", p: 0, m: 0, mb: 1 }}
    >
      <Card
        component="li"
        sx={{
          minWidth: { xs: 200, sm: 300 },
          flexGrow: 1,
          minHeight: { xs: 0, sm: 400 },
        }}
      >
        <CardCover>
          <Image
            src={order}
            loading="lazy"
            alt="ss"
            width={1200}
            height={800}
          />
        </CardCover>
        <CardContent>
          <Typography
            level="body-lg"
            fontWeight="bold"
            textColor="#E21818"
            mt={{ xs: 14, sm: 20, md: 30 }}
            fontSize={{ xs: 30 }}
          />
        </CardContent>
      </Card>
    </Box>
  );
}
