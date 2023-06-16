-- CreateTable
CREATE TABLE "tables" (
    "id" SERIAL NOT NULL,
    "table_name" TEXT NOT NULL,
    "location_id" INTEGER NOT NULL,

    CONSTRAINT "tables_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tables" ADD CONSTRAINT "tables_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
