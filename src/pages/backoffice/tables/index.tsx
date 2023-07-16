import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useContext, useState } from "react";
import { getLocationId } from "@/utils";
import { BackofficeContext } from "@/Contents/BackofficeContext";
import { config } from "@/config/config";
import Layout from "@/Components/Layout";
import ItemCart from "@/Components/ItemCart";
import TableBarIcon from "@mui/icons-material/TableBar";
import { useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const Tables = () => {
  const { tables } = useAppSelector(appData);
  const [open, setOpen] = useState(false);
  const selectedLocationId = getLocationId();
  const [newTable, setNewTable] = useState({
    name: "",
    locationId: selectedLocationId,
  });
  const validTables = tables.filter(
    (item) => item.location_id === Number(selectedLocationId)
  );

  const createNewTable = async () => {
    const isValid = newTable.name;
    if (!isValid) return alert("Please enter table name");
    await fetch(`${config.apiBaseUrl}/tables`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTable),
    });
    // fetchData();
    setNewTable({ name: "", locationId: selectedLocationId });
    setOpen(false);
  };

  return (
    <Layout title="Tables">
      <Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            onClick={() => setOpen(true)}
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              backgroundColor: "#4C4C6D",
              width: "fit-content",
              color: "#E8F6EF",
              mb: 2,
              ":hover": {
                bgcolor: "#1B9C85",
                color: "white",
              },
            }}
          >
            New table
          </Button>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          {validTables.map((table) => (
            <ItemCart
              key={table.id}
              href={`/backoffice/tables/${table.id}`}
              icon={<TableBarIcon sx={{ fontSize: 40 }} />}
              title={table.table_name}
            />
          ))}
        </Box>
      </Box>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Create new table</DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            minWidth: 300,
          }}
        >
          <TextField
            label="Name"
            variant="outlined"
            sx={{ mt: 1 }}
            onChange={(evt) =>
              setNewTable({
                ...newTable,
                name: evt.target.value,
              })
            }
          />
          <Button
            variant="contained"
            onClick={createNewTable}
            sx={{
              width: "fit-content",
              alignSelf: "flex-end",
              mt: 2,
              bgcolor: "#820000",
              ":hover": { bgcolor: "#820000" },
            }}
          >
            Create
          </Button>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Tables;
