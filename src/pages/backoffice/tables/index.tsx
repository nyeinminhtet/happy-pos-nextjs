import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { getLocationId } from "@/utils";
import ItemCart from "@/components/ItemCart";
import TableBarIcon from "@mui/icons-material/TableBar";
import { useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import CreateTable from "./CreateTable";
import Loading from "@/components/Loading";

const Tables = () => {
  const { tables, isLoading } = useAppSelector(appData);
  const [open, setOpen] = useState(false);
  const selectedLocationId = getLocationId();

  const validTables = tables.filter(
    (item) => item.location_id === Number(selectedLocationId)
  );

  if (isLoading) return <Loading />;

  return (
    <Box>
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mr: { xs: 2, md: 0 },
            mt: { xs: -2, md: 0 },
          }}
        >
          <Button
            onClick={() => setOpen(true)}
            variant="contained"
            sx={{
              width: "fit-content",
              mb: 2,
              fontSize: { xs: "13px", sm: "15px" },
            }}
          >
            <AddIcon />
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
      <CreateTable open={open} setOpen={setOpen} />
    </Box>
  );
};

export default Tables;
