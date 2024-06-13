import AudioCard from "./AudioCard";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getPresets } from "../utils/dataGetter";
import { useNavigate } from "react-router-dom";
import { IconButton, Tooltip } from "@mui/material";
import { AddCircle } from "@mui/icons-material";

const AudioHome = () => {
  const [searchQuery, setSearchQuery] = useState(" ");
  const { data, isLoading, refetch, isError } = useQuery({
    queryFn: getPresets,
    queryKey: ["presets", "get"],
  });
  let navigate = useNavigate();
  if (isLoading) {
    return <div className="animate-pulse">Loading...</div>;
  }
  if (isError) {
    navigate("/login");
  }

  return (
    <>
      <div className="mx-6 select-none">
        <div
          className="fixed bottom-5 right-5 cursor-pointer"
          onClick={() => {
            navigate("/addText");
          }}
        >
          <Tooltip title="Add new preset">
            <IconButton>
              <AddCircle sx={{ height: 50, width: 50 }} />
            </IconButton>
          </Tooltip>
        </div>
      </div>
      <img
        src="/train.jpeg"
        alt="Train"
        className="w-[90%] mx-auto mt-10 h-96 object-cover rounded-lg"
      />
      <div className="mx-20 my-10">
        <label className="input input-bordered flex items-center">
          <input
            type="text"
            className="grow"
            placeholder="Search"
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
      </div>
      <div className="grid grid-cols-2 gap-5 w-[90%] mx-auto mt-10 gap-y-10">
        {data.length == 0 ? (
          <h1 className="text-2xl text-center">No Audio Presets Found!</h1>
        ) : (
          (data ?? []).map((audioPreset, index) => (
            <AudioCard
              preset_id={audioPreset._id}
              title={audioPreset.title}
              tag={audioPreset.tag}
              languages={audioPreset.languages}
              text={audioPreset.original_text}
              audio_url={audioPreset.audio_url}
              searchQuery={searchQuery}
              key={index + audioPreset._id}
              refetch={refetch}
            />
          ))
        )}
      </div>
    </>
  );
};

export default AudioHome;
