-- CreateTable
CREATE TABLE "Factory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Factory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inspection" (
    "id" SERIAL NOT NULL,
    "factoryId" INTEGER NOT NULL,
    "inspectedAt" TIMESTAMP(3) NOT NULL,
    "barcodeNumber" TEXT NOT NULL,
    "respectivePerson" TEXT NOT NULL,
    "styleNumber" TEXT NOT NULL,
    "selectedQuantity" INTEGER NOT NULL,
    "failQuantity" INTEGER NOT NULL,

    CONSTRAINT "Inspection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InspectionType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "InspectionType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InspectionFinding" (
    "id" SERIAL NOT NULL,
    "inspectionId" INTEGER NOT NULL,
    "inspectionTypeId" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,

    CONSTRAINT "InspectionFinding_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "InspectionType_name_key" ON "InspectionType"("name");

-- AddForeignKey
ALTER TABLE "Inspection" ADD CONSTRAINT "Inspection_factoryId_fkey" FOREIGN KEY ("factoryId") REFERENCES "Factory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InspectionFinding" ADD CONSTRAINT "InspectionFinding_inspectionId_fkey" FOREIGN KEY ("inspectionId") REFERENCES "Inspection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InspectionFinding" ADD CONSTRAINT "InspectionFinding_inspectionTypeId_fkey" FOREIGN KEY ("inspectionTypeId") REFERENCES "InspectionType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
