import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";
import Model from "./Model";
import { useRef } from "react";
import { Translate } from "../utils/dataPoster";
import { Button, IconButton, Tooltip } from "@mui/material";
import { History, Logout, Loop } from "@mui/icons-material";

const AddText = () => {
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  const recognition = useRef(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      text: "",
      language: "gu",
    },
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [audio, setAudio] = useState(null);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: Translate,
    onSuccess: (res) => {
      if (res) {
        setAudio(res.audio_url);
        setLoading(true);
        toast.success("Translated Text Successfully!");
        navigate("/");
      }
    },
    onError: () => {
      toast.error("Error Credentials");
      navigate("/login");
    },
  });

  const onSubmit = (data) => {
    mutate({
      title: data.title,
      tag: data.tag,
      languages: data.language,
      original_text: data.text,
    });
  };

  const startSpeechRecognition = () => {
    console.log("Function invoked");
    if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
      recognition.current = new (window.SpeechRecognition ||
        window.webkitSpeechRecognition)();
      console.log("Inside function");
      recognition.current.continue = true;
      recognition.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        console.log(event);
        console.log(transcript);
        // if (textOutputRef.current) {
        setValue("text", transcript);
        // }
      };
      recognition.current.start();
    } else {
      console.error("Speech recognition not supported in this browser");
    }
  };
  const languages = ["Gujarati", "Hindi", "Urdu"];

  return (
    <>
      <div className="h-screen w-screen overflow-hidden flex justify-center items-center bg-slate-100">
        {/* history btn */}
        <Tooltip title="Previous Presets" onClick={() => navigate("/")}>
          <IconButton className="fixed right-5 bottom-5">
            <History />
          </IconButton>
        </Tooltip>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="card w-[800px] p-10 border-2 rounded-lg shadow-lg">
            <h1 className="text-4xl font-bold text-center pb-8 font-serif">
              railSpeaks&apos;s Utility
            </h1>
            <label
              className={`form-control ${errors.text ? "input-error" : ""}`}
            >
              <div className="label">
                <span className="label-text">Text To Convert</span>
                <button
                  type="button"
                  className="btn btn-link"
                  onClick={startSpeechRecognition}
                  disabled={isPending}
                >
                  Start Speaking
                </button>
              </div>
              <textarea
                disabled={isPending}
                className="textarea textarea-bordered h-20 resize-none"
                placeholder="Text"
                {...register("text", {
                  required: "Text is required",
                  minLength: {
                    value: 10,
                    message: "Text must be at least 10 characters",
                  },
                  maxLength: {
                    value: 100,
                    message: "Maximum token length is 100 characters",
                  },
                })}
              ></textarea>
            </label>
            {errors.text && (
              <div className="text-red-500 mx-2 my-1">
                {errors.text.message}
              </div>
            )}

            <label
              className={`input input-bordered flex items-center mt-4 ${
                errors.title ? "input-error" : ""
              }`}
            >
              <input
                type="text"
                name="title"
                className="grow"
                placeholder="Title of announcement"
                {...register("title", {
                  required: "title is Required!",
                })}
                disabled={isPending}
              />
            </label>
            {errors.title && (
              <div className="text-red-500 mx-2 my-1">
                {errors.title.message}
              </div>
            )}
            <label className="form-control mt-4">Select Language</label>
            <div className="p-2">
              {languages.map((language, index) => (
                <div className="form-control" key={index}>
                  <label className="label cursor-pointer">
                    <span className="label-text">{language}</span>
                    <input
                      type="checkbox"
                      value={language.slice(0, 2).toLowerCase()}
                      className="checkbox"
                      {...register("language", {
                        required: "Language is required",
                      })}
                      disabled={isPending}
                    />
                  </label>
                </div>
              ))}
            </div>
            {errors.language && (
              <div className="text-red-500 mx-2 my-1">
                {errors.language.message}
              </div>
            )}
            <select
              className="select select-bordered w-full"
              name="tag" // Add name attribute here
              {...register("tag", {
                required: "Tag is required", // You may also add validation rules if needed
              })}
              disabled={isPending}
            >
              <option disabled defaultValue={"Type"} />
              <option value={"Emergency"}>Emergency</option>
              <option value={"Info"}>Info</option>
            </select>
            <div className="mt-5">
              <Button
                variant="contained"
                color="success"
                className="w-full mt-10"
                disabled={isPending}
                onClick={handleOpenModal}
                type="submit"
              >
                {isPending ? (
                  <span className="animate-spin">
                    <Loop />
                  </span>
                ) : (
                  "Convert"
                )}
              </Button>
            </div>
            {loading && (
              <Model
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                audio_url={import.meta.env.VITE_BACKEND_URL + audio}
              />
            )}
          </div>
        </form>
      </div>
      <div className="fixed left-5 bottom-5">
        <Tooltip title="Logout">
          <IconButton
            color="error"
            onClick={() => {
              localStorage.clear();
              navigate("/login");
            }}
          >
            <Logout sx={{ height: 30, width: 30 }} />
          </IconButton>
        </Tooltip>
      </div>
    </>
  );
};

export default AddText;
