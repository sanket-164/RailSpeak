"use client";

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { trpc } from "@/utils/trpc";
import getAvailableStations from "@/actions/getAvailableStations";

type Props = {
  open: boolean;
  handleClose: () => void;
  station: Awaited<ReturnType<typeof getAvailableStations>>[0];
};

const DeleteStationModal = ({ handleClose, open, station }: Props) => {
  const deleteTrpc = trpc.station.deleteStation.useMutation();
  const router = useRouter();
  function handleDelete() {
    deleteTrpc.mutate(station.id, {
      onSuccess(data) {
        if (data) {
          toast.success("Station deleted successfully");
          router.refresh();
          handleClose();
        } else {
          toast.error("Failed to delete station");
        }
      },
      onError(error) {
        toast.error(error.message);
      },
    });
  }
  return (
    <Modal isOpen={open} onOpenChange={handleClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Confirmation
            </ModalHeader>
            <ModalBody>
              <h1 className="text-xl text-gray-700">
                Are you sure you want to delete this station?{" "}
                <b className="font-bold text-black">{station.stationName}</b>
              </h1>
            </ModalBody>
            <ModalFooter>
              <Button
                isDisabled={deleteTrpc.isPending}
                color="success"
                variant="bordered"
                onPress={onClose}
              >
                Close
              </Button>
              <Button
                color="danger"
                onPress={handleDelete}
                isDisabled={deleteTrpc.isPending}
              >
                Confirm
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default DeleteStationModal;
