"use client";

import { trpc } from "@/utils/trpc";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type FormSchema = {
  stationName: string;
  broadcasterUsername: string;
  broadcasterPassword: string;
};

const AddStationBtnClient = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchema>({
    defaultValues: {
      stationName: "",
      broadcasterUsername: "",
      broadcasterPassword: "",
    },
  });
  const createStationClient = trpc.station.addStation.useMutation();
  function onSubmit(val: FormSchema) {
    createStationClient.mutate(
      {
        name: val.stationName,
        password: val.broadcasterPassword,
        username: val.broadcasterUsername,
      },
      {
        onSuccess() {
          toast.success("New station and broadcaster added");
          router.refresh();
          onOpenChange();
        },
        onError(error) {
          toast.error(error.message);
        },
      }
    );
  }
  return (
    <div>
      <Tooltip content="Add new Station">
        <Button isIconOnly onClick={onOpen}>
          <Plus />
        </Button>
      </Tooltip>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add Station
              </ModalHeader>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
              >
                <ModalBody>
                  <Input
                    label="Station Name"
                    variant="bordered"
                    isInvalid={!!errors.stationName}
                    {...register("stationName", { required: true })}
                    isDisabled={createStationClient.isPending}
                  />
                  <Input
                    label="Station Broadcaster Username"
                    variant="bordered"
                    isInvalid={!!errors.broadcasterUsername}
                    {...register("broadcasterUsername", { required: true })}
                    isDisabled={createStationClient.isPending}
                  />
                  <Input
                    label="Station Broadcaster Password"
                    type="password"
                    variant="bordered"
                    isInvalid={!!errors.broadcasterPassword}
                    {...register("broadcasterPassword", { required: true })}
                    isDisabled={createStationClient.isPending}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="danger"
                    variant="light"
                    onPress={onClose}
                    isDisabled={createStationClient.isPending}
                  >
                    Close
                  </Button>
                  <Button
                    color="primary"
                    type="submit"
                    isDisabled={createStationClient.isPending}
                  >
                    Add
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AddStationBtnClient;
