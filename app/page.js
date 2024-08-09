"use client";
import { useState, useEffect } from "react";
// import Image from "next/image";
import {
  Box,
  Button,
  Stack,
  Typography,
  TextField,
  Fab,
  Modal,
  MenuList,
  MenuItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import { firestore } from "@/firebase";
import {
  collection,
  getDocs,
  query,
  getDoc,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import FloatingActionButtons from "./components/ButtonIcons";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/RemoveCircle";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export default function Home() {
  const [pantry, setPantry] = useState([]);
  const [itemName, setItemName] = useState("");
  const [modalItemName, setModalItemName] = useState(""); // Modal input state
  const [searchResults, setSearchResults] = useState([]);
  const [open, setOpen] = useState(false);

  //Update List
  const updatePantry = async () => {
    const snapshot = query(collection(firestore, "pantry"));
    const docs = await getDocs(snapshot);
    const pantryList = [];
    docs.forEach((doc) => {
      pantryList.push({
        name: doc.id,
        ...doc.data(),
      });
    });
    setPantry(pantryList);
  };
  // Add Item
  const addItem = async (item) => {
    const docRef = doc(collection(firestore, "pantry"), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      await setDoc(docRef, { quantity: quantity + 1 });
    } else {
      await setDoc(docRef, { quantity: 1 });
    }

    await updatePantry();
  };

  // Remove Item
  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, "pantry"), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      if (quantity === 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { quantity: quantity - 1 });
      }
    }

    await updatePantry();
  };
  // Full Delete
  const deleteItem = async (item) => {
    const docRef = doc(collection(firestore, "pantry"), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { quantity } = docSnap.data();

      if (quantity >= 1) {
        await deleteDoc(docRef);
      }
    }

    await updatePantry();
  };

  // Search Item Function
  const handleSearch = () => {
    if (itemName.trim() === "") {
      setSearchResults([]);
    } else {
      const results = pantry.filter((item) =>
        item.name.toLowerCase().includes(itemName.toLowerCase())
      );
      setSearchResults(results);
    }
  };
  //Handles modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setModalItemName("");
  };

  useEffect(() => {
    updatePantry();
  }, []);

  //Updates Search on key press
  useEffect(() => {
    handleSearch();
  }, [itemName, pantry]);

  return (
    <Box
      width="100vw"
      height="100vh"
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      bgcolor="#373854"
    >
      {/* Add Item Modal */}

      <Modal open={open} onClose={handleClose}>
        <Box
          position="absolute"
          top="50%"
          left="50%"
          width={400}
          bgcolor="white"
          boxShadow={24}
          p={4}
          display="flex"
          flexDirection="column"
          gap={3}
          sx={{
            borderRadius: "25px",
            transform: "translate(-50%, -50%)",
            outline: "none",
          }}
        >
          <Stack width="100%" direction="row" spacing={2}>
            <TextField
              label="Add Item"
              id="outline-basic"
              fullWidth
              value={modalItemName}
              // value={itemName}
              onChange={(e) => {
                setModalItemName(e.target.value);
                // setItemName(e.target.value);
              }}
            />
            <Button
              variant="outlined"
              onClick={() => {
                // addItem(itemName);
                // setItemName("");
                addItem(modalItemName);
                setModalItemName("");
                handleClose();
              }}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>

      <Stack
        spacing={3}
        margin={"10px"}
        bgcolor="white"
        boxShadow={20}
        sx={{ borderRadius: "25px", padding: "5px" }}
      >
        <Typography variant="h2" align="center" color="#493267">
          Pantry Manager
        </Typography>

        <TextField
          id="outlined-basic"
          label="Search Item"
          variant="outlined"
          color="secondary"
          sx={{ input: { color: "black" } }}
          value={itemName}
          onChange={(e) => {
            setItemName(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && itemName.trim()) {
              addItem(itemName.trim());
              setItemName("");
            }
          }}
        />
        <Stack direction={"row"} spacing={3} sx={{ paddingLeft: "10px" }}>
          <Fab
            color="primary"
            aria-label="add"
            onClick={() => {
              handleOpen();
            }}
          >
            <AddIcon />
          </Fab>

          {/* Add function for Edit Item button */}
          {/* <Fab
            color="secondary"
            aria-label="edit"
            onClick={() => {
              handleSearch();
            }}
          >
            <SearchIcon />
          </Fab> */}
        </Stack>
        <Box display="flex" sx={{ padding: "5px" }}>
          <Stack
            width="600px"
            height="400px"
            overflow={"auto"}
            display="flex"
            bgcolor="white"
            sx={{
              borderRadius: "25px",
            }}
          >
            {(searchResults.length > 0 ? searchResults : pantry).map(
              ({ name, quantity }) => (
                // {pantry.map(({ name, quantity }) => (

                <MenuList>
                  <MenuItem key={name}>
                    <ListItemIcon
                      onClick={() => {
                        deleteItem(name);
                      }}
                    >
                      <DeleteOutlineIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText sx={{ color: "#493267" }}>
                      {" "}
                      {String(name).charAt(0).toUpperCase() +
                        String(name).slice(1)}
                    </ListItemText>
                    <Fab
                      color="primary"
                      aria-label="add"
                      size="small"
                      sx={{ marginRight: "10px" }}
                      onClick={() => {
                        addItem(name);
                        setItemName("");

                        console.log(name);
                      }}
                    >
                      <AddIcon />
                    </Fab>
                    <Typography variant="body1" color="text.secondary">
                      {quantity}
                    </Typography>
                    <Fab
                      color="primary"
                      aria-label="delete"
                      size="small"
                      sx={{ marginLeft: "10px" }}
                      onClick={() => {
                        removeItem(name);
                      }}
                    >
                      <RemoveIcon />
                    </Fab>
                  </MenuItem>
                </MenuList>
              )
            )}
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
