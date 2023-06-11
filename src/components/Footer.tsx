import { Box, Container, Grid, Link, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      className="hide-when-printing"
      sx={{
        width: "100%",
        height: "auto",
        backgroundColor: "#eee",
        paddingTop: "2rem",
        paddingBottom: "2rem",
        textAlign: "center",
      }}
    >
      <Container maxWidth="lg">
        <Grid container direction="column" alignItems="center">
          <Grid item xs={12}>
            <Typography color="black" variant="h5">
              Online CV/Resume Builder
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography color="textSecondary" variant="subtitle1">
              <Link
                sx={{ color: "inherit", textDecorationColor: "currentcolor" }}
                underline="always"
                href="https://yewomhango.github.io"
                target="_blank"
              >
                Yewo Mhango
              </Link>{" "}
              |{" "}
              <Link
                sx={{ color: "inherit", textDecorationColor: "currentcolor" }}
                underline="always"
                href="https://github.com/YewoMhango/resume-builder"
                target="_blank"
              >
                GitHub Repository
              </Link>{" "}
              |{" "}
              <Link
                sx={{ color: "inherit", textDecorationColor: "currentcolor" }}
                underline="always"
                href="mailto:mhangoyewoh@gmail.com?subject=Feedback on CV/Resume Builder"
                target="_blank"
              >
                Feedback
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
