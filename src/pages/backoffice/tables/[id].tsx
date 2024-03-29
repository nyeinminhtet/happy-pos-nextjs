import Layout from "@/Components/backoffice/BackofficeLayout";
import Loading from "@/Components/Loading";
import { config } from "@/config/config";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { updateTable } from "@/store/slices/tablesSlice";
import { getLocationId } from "@/utils";
import { Box, Button, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";

const EditTable = () => {
  const router = useRouter();
  const tableId = router.query.id as string;
  const { tables, isLoading } = useAppSelector(appData);
  const dispatch = useAppDispatch();

  const table = tables.find((table) => table.id === Number(tableId));
  const [tableName, setTableName] = useState(table?.table_name);

  const handleUpdateTable = async () => {
    const response = await fetch(`${config.apiBaseUrl}/tables`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tableId, tableName }),
    });
    // fetchData();
    const tableUpdated = await response.json();
    dispatch(updateTable(tableUpdated));
    router.back();
    toast.success("Table has been updated!");
  };

  if (isLoading) return <Loading />;

  return (
    <Box>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <TextField
          defaultValue={tableName}
          label="Table Name"
          sx={{ mb: 2, maxWidth: { xs: 250, md: 350 } }}
          onChange={(evt) => setTableName(evt.target.value)}
        />
        <Button
          variant="contained"
          onClick={handleUpdateTable}
          sx={{ width: "fit-content", mt: 2 }}
        >
          Update
        </Button>
      </Box>
    </Box>
  );
};

export default EditTable;
