import Layout from "@/Components/Layout";
import { BackofficeContext } from "@/Contents/BackofficeContext";
import { config } from "@/config/config";
import { useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { getLocationId } from "@/utils";
import {
  Autocomplete,
  Box,
  Button,
  FormControlLabel,
  Switch,
  TextField,
} from "@mui/material";
import { useRouter } from "next/router";
import { useContext, useState } from "react";

const EditTable = () => {
  const router = useRouter();
  const tableId = router.query.id as string;
  const selectedLocationId = getLocationId() as string;
  const { tables } = useAppSelector(appData);

  const table = tables.find((table) => table.id === Number(tableId));
  const [tableName, setTableName] = useState(table?.table_name);

  const updateTable = async () => {
    await fetch(`${config.apiBaseUrl}/tables`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tableId, tableName }),
    });
    // fetchData();
    router.back();
  };

  return (
    <Layout title="Edit Table">
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <TextField
          defaultValue={tableName}
          sx={{ mb: 2 }}
          onChange={(evt) => setTableName(evt.target.value)}
        />
        <Button
          variant="contained"
          onClick={updateTable}
          sx={{ width: "fit-content", mt: 3 }}
        >
          Update
        </Button>
      </Box>
    </Layout>
  );
};

export default EditTable;
