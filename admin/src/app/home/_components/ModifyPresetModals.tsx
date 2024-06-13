"use client";

import { Button, Tooltip, useDisclosure } from "@nextui-org/react";
import { Edit, Trash } from "lucide-react";

import getAvailableStations from "@/actions/getAvailableStations";
import EditStationModal from "./modals/EditStationModal";
import DeleteStationModal from "./modals/DeleteStationModal";

type Props = {
  station: Awaited<ReturnType<typeof getAvailableStations>>[0];
};

const ModifyPresetModals = ({ station }: Props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: deleteFlg,
    onOpen: openDelete,
    onOpenChange: openChangeDelete,
  } = useDisclosure();
  return (
    <>
      <Tooltip content={`Edit ${station.stationName}`}>
        <Button isIconOnly color="primary" onClick={onOpen}>
          <Edit />
        </Button>
      </Tooltip>
      <Tooltip content={`Delete ${station.stationName}`}>
        <Button isIconOnly color="danger" onClick={openDelete}>
          <Trash />
        </Button>
      </Tooltip>
      <EditStationModal
        open={isOpen}
        handleClose={onOpenChange}
        station={station}
      />
      <DeleteStationModal
        open={deleteFlg}
        handleClose={openChangeDelete}
        station={station}
      />
    </>
  );
};

export default ModifyPresetModals;
