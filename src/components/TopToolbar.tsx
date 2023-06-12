import {
  AppBar,
  Button,
  ButtonGroup,
  IconButton,
  Toolbar,
  Typography,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { InfoOutlined, Print } from "@mui/icons-material";

import { CurrentTab } from "../App";
import { useState } from "react";

export default function TopToolbar({
  currentTab,
  setCurrentTab,
}: {
  currentTab: CurrentTab;
  setCurrentTab: React.Dispatch<React.SetStateAction<CurrentTab>>;
}) {
  const [showingDialog, setShowingDialog] = useState(false);

  const printDocument = () => {
    setCurrentTab(CurrentTab.Preview);
    setTimeout(print, 500);
  };

  return (
    <>
      <Box className="hide-when-printing">
        <AppBar position="static">
          <Toolbar
            variant="regular"
            sx={{
              width: "100%",
              boxSizing: "border-box",
              position: "fixed",
              top: "0",
              left: "auto",
              right: "0",
              zIndex: "1100",
              transition: "width 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
              backdropFilter: "blur(8px)",
              borderStyle: "solid",
              borderColor: "#E7EBF0",
              borderWidth: "0",
              borderBottomWidth: "thin",
              backgroundColor: "rgba(255,255,255,0.8)",
              color: "#2D3843",
              boxShadow: "0 0 2px #ccc",
            }}
          >
            <Typography
              variant="h6"
              fontWeight={700}
              component="div"
              sx={{ flexGrow: 1, lineHeight: 0.5 }}
            >
              <img src="/CV.svg" alt="CV" height="20px" />
            </Typography>
            <IconButton
              size="large"
              edge="start"
              aria-label="menu"
              sx={{ mr: 1 }}
              onClick={() => setShowingDialog(!showingDialog)}
            >
              <InfoOutlined />
            </IconButton>
            <IconButton
              size="large"
              edge="start"
              color="primary"
              aria-label="menu"
              sx={{ mr: 1 }}
              onClick={printDocument}
            >
              <Print />
            </IconButton>
            <ButtonGroup
              disableElevation
              variant="outlined"
              aria-label="switch between edit and preview tabs"
              size="small"
            >
              <Button
                variant={
                  currentTab === CurrentTab.Edit ? "contained" : undefined
                }
                onClick={() => setCurrentTab(CurrentTab.Edit)}
              >
                Edit
              </Button>
              <Button
                variant={
                  currentTab === CurrentTab.Preview ? "contained" : undefined
                }
                onClick={() => setCurrentTab(CurrentTab.Preview)}
              >
                Preview
              </Button>
            </ButtonGroup>
          </Toolbar>
        </AppBar>
      </Box>
      <Dialog
        open={showingDialog}
        onClose={() => setShowingDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Data Usage Disclaimer</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Your personal and professional details are stored securely in your
            browser's local storage and are never transmitted to any back-end
            server. As the website owner, we do not have access to any of your
            data. We prioritize the security of your browsing experience and
            maintain a safe environment for your data.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowingDialog(false)} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
