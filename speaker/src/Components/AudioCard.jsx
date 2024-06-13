/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import LocalModal from "./Model";
import {
  Box,
  Button,
  IconButton,
  Modal,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Delete } from "@mui/icons-material";

import EditIcon from "@mui/icons-material/Edit";
import { useMutation } from "@tanstack/react-query";
import { deletePreset, editPreset } from "../utils/dataPoster";
import toast from "react-hot-toast";
import { modalStyle } from "../utils/constants";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
const AudioCard = ({
  preset_id,
  title,
  tag,
  languages,
  text,
  audio_url,
  refetch,
  searchQuery,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setisEditModalOpen] = useState(false);
  const { mutate, isPending } = useMutation({
    mutationFn: (val) => deletePreset(val.id),
  });
  const updateMutation = useMutation({
    mutationFn: ({ val }) => editPreset({ id: preset_id, newTitle: val }),
  });

  let navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { title },
  });
  let array = [];

  languages.map((lang) => array.push(lang.translated));

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Function to get the full name of the language
  const getLanguageName = (abbr) => {
    switch (abbr) {
      case "gu":
        return "Gujarati";
      case "en":
        return "English";
      case "hi":
        return "Hindi";
      case "ur":
        return "Urdu";
      case "ma":
        return "Marathi";
      default:
        return abbr; // Return the abbreviation itself if not found
    }
  };

  function handlePresetDelete() {
    const flg = confirm(
      `Are you sure you want to delete the preset '${title}'`
    );
    if (flg) {
      mutate(
        { id: preset_id },
        {
          onSuccess(res) {
            if (res) {
              toast.success("Preset deleted successfully");
              refetch();
            }
          },
          onError(err) {
            toast.error(err.message);
            navigate("/login");
          },
        }
      );
    }
  }

  function onSubmit(data) {
    updateMutation.mutate(
      { val: data.title },
      {
        onSuccess(data) {
          if (data) {
            toast.success("Preset Edited successfully");
            refetch();
            setisEditModalOpen(false);
          }
        },
        onError(err) {
          toast.error(err.message);
          navigate("/login");
        },
      }
    );
  }
  const filtered = title
    .toLowerCase()
    .includes(searchQuery.trim().toLowerCase());

  return (
    filtered && (
      <div className="w-[600px] bg-white shadow-lg rounded-lg overflow-hidden mx-4 my-4">
        <div className="p-4">
          <div className="flex justify-between items-center">
            <div className="font-bold text-lg">{title}</div>
            <div className="badge badge-neutral">{tag}</div>
          </div>
          <div className="mt-2">
            <p className="text-gray-700">Original Text : {text}</p>
            <p className="text-gray-700">
              Languages :{" "}
              {languages
                .map((lang) => getLanguageName(lang.language))
                .join(", ")}
            </p>
          </div>
          <div className="mt-4 flex gap-5 justify-end">
            <Tooltip title={`Edit ${title}`}>
              <IconButton
                color="error"
                onClick={() => {
                  setisEditModalOpen(true);
                }}
                disabled={isPending}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title={`Delete ${title}`}>
              <IconButton
                color="error"
                onClick={handlePresetDelete}
                disabled={isPending}
              >
                <Delete />
              </IconButton>
            </Tooltip>
            <Button
              variant="outlined"
              className="mr-2"
              onClick={handleOpenModal}
              disabled={isPending}
            >
              Play Audio
            </Button>

            <LocalModal
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              audio_url={import.meta.env.VITE_BACKEND_URL + audio_url}
              translated_text={array}
            />

            <Modal
              open={isEditModalOpen}
              onClose={() => setisEditModalOpen(false)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={modalStyle}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Edit {title}
                </Typography>
                <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
                  <TextField
                    {...register("title", { required: true })}
                    error={errors.title}
                    label={`Edit ${title}`}
                    fullWidth
                    disabled={updateMutation.isPending}
                  />
                  <div className="mt-4 flex gap-4 justify-end">
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => setisEditModalOpen(false)}
                      disabled={updateMutation.isPending}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      color="success"
                      type="submit"
                      disabled={updateMutation.isPending}
                    >
                      Save
                    </Button>
                  </div>
                </form>
              </Box>
            </Modal>
          </div>
        </div>
      </div>
    )
  );
};

export default AudioCard;
