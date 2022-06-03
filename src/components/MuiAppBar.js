import * as React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { reduxReset } from "../redux/reducerSlice";
import { Tasks } from "../router/routerConstants";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

const MuiAppBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let location = useLocation();

  const RouterNewRoute = (path) => {
    if (location.pathname !== path) {
      dispatch(reduxReset());
      navigate(path, { replace: true });
    }
  };

  return (
    <AppBar position="static" style={{ backgroundColor: "#F1F2F3" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "flex" } }}>
            {Tasks.map((task) => (
              <Button
                key={task.label}
                onClick={() => {
                  RouterNewRoute(task.path);
                }}
                sx={{ my: 2, color: "black", display: "block" }}
              >
                {task.label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default MuiAppBar;
