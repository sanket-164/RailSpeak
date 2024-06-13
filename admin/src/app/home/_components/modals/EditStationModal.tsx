"use client";

import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import getAvailableStations from "@/actions/getAvailableStations";
import { trpc } from "@/utils/trpc";

type Props = {
  open: boolean;
  handleClose: () => void;
  station: Awaited<ReturnType<typeof getAvailableStations>>[0];
};

type FormSchema = {
  stationName: string;
};

const EditStationModal = ({ handleClose, open, station }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchema>({
    defaultValues: {
      stationName: station.stationName,
    },
  });
  const editTRPC = trpc.station.editStation.useMutation();
  const router = useRouter();
  function onSubmit(data: FormSchema) {
    editTRPC.mutate(
      {
        stationId: station.id,
        stationName: data.stationName,
      },
      {
        onSuccess(data) {
          if (data) {
            toast.success("Station updated successfully");
            router.refresh();
            handleClose();
          } else {
            toast.error("Failed to update station");
          }
        },
        onError(error) {
          toast.error(error.message);
        },
      }
    );
  }
  return (
    <Modal isOpen={open} onOpenChange={handleClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Edit {station.stationName}
            </ModalHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalBody>
                <Input
                  label="Edit station Name"
                  variant="bordered"
                  isInvalid={!!errors.stationName}
                  {...register("stationName", {
                    required: true,
                    value: station.stationName,
                  })}
                  isDisabled={editTRPC.isPending}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={onClose}
                  isDisabled={editTRPC.isPending}
                >
                  Close
                </Button>
                <Button
                  color="primary"
                  type="submit"
                  isDisabled={editTRPC.isPending}
                >
                  Edit
                </Button>
              </ModalFooter>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default EditStationModal;
