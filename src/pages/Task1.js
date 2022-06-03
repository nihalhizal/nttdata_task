import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCase1Async, resData } from "../redux/reducerSlice";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Paper,
  Popover,
  Typography,
} from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

const Task1 = () => {
  const dispatch = useDispatch();
  const responseData = useSelector(resData);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(getCase1Async());
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {responseData.map((data, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            flexWrap: "wrap",
            "& > :not(style)": {
              m: 1,
              width: 128,
              height: 150,
            },
          }}
        >
          <Paper variant="outlined" style={{ width: "100%", display: "flex" }}>
            <Card
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                padding: 20,
              }}
              variant="outlined"
            >
              <Box style={{ width: "10%", marginRight: 20 }}>
                <CardMedia
                  component="img"
                  height="100%"
                  image={data.ImagePath}
                />
              </Box>
              <Divider orientation="vertical" flexItem />
              <Box
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <CardContent>
                  <Typography variant="h7" style={{ fontWeight: "bold" }}>
                    {data.ProductDesc}
                  </Typography>
                  <Box style={{ display: "flex", gap: "3px" }}>
                    <Typography variant="body2">{data.FirmName}</Typography>
                    {data.popoverContent ? (
                      <>
                        <HelpOutlineIcon
                          fontSize="small"
                          color="primary"
                          onClick={handleClick}
                        />
                        <Popover
                          open={open}
                          anchorEl={anchorEl}
                          onClose={handleClose}
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left",
                          }}
                        >
                          <Typography sx={{ p: 2 }}>
                            {data.popoverContent[0].Description}
                          </Typography>
                        </Popover>
                      </>
                    ) : null}
                  </Box>
                </CardContent>
                <CardActions>
                  <Box style={{ alignItems: "center" }}>
                    {data.QuotaInfo.HasDiscount ? (
                      <Typography
                        variant="body2"
                        align="center"
                        style={{ textDecorationLine: "line-through" }}
                      >
                        Peşin {data.Cash} TL
                      </Typography>
                    ) : null}
                    <Typography
                      variant="h6"
                      align="center"
                      style={{ fontWeight: "bold" }}
                    >
                      {data.QuotaInfo.HasDiscount
                        ? data.QuotaInfo.PremiumWithDiscount
                        : data.Cash}{" "}
                      TL
                    </Typography>
                    {data.SaleClosed ? (
                      <Button variant="outlined" style={{ width: 200 }}>
                        Telefonda Satın Al
                      </Button>
                    ) : (
                      <Button variant="contained" style={{ width: 200 }}>
                        Satın Al
                      </Button>
                    )}
                  </Box>
                </CardActions>
              </Box>
            </Card>
          </Paper>
        </Box>
      ))}
    </>
  );
};

export default Task1;
