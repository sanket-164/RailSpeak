/* eslint-disable @next/next/no-img-element */
import Image from "next/image";

import getAvailableStations from "@/actions/getAvailableStations";
import { acme } from "@/utils/fonts";
import AddStationBtnClient from "./_components/AddStationBtnClient";
import ModifyPresetModals from "./_components/ModifyPresetModals";

const HomePage = async () => {
  const stations = await getAvailableStations();
  return (
    <div className="mr-6 my-10 select-none">
      <img
        src="/asset.jpeg"
        alt="train"
        className="w-full h-[300px] object-cover mb-10 rounded-lg pointer-events-none shadow-md"
      />
      <div className="flex w-full justify-between">
        <h1 className={`text-4xl ${acme.className}`}>Stations</h1>
        <AddStationBtnClient />
      </div>
      {stations.length === 0 ? (
        <div className="flex w-full h-full items-center justify-center flex-col">
          <Image
            src="/unavailable_train.png"
            alt="Unavailable train"
            height={500}
            width={500}
          />
          <h1>Currently No station added!</h1>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
            {stations.map((station) => (
              <div
                key={station.id}
                className="bg-gray-100 p-5 rounded-lg shadow-lg flex justify-between items-center gap-5"
              >
                <div>
                  <h2 className="text-2xl">{station.stationName}</h2>
                  <p className="text-gray-700 text-xl mt-2">
                    {station.BroadCaster[0]?.username}
                  </p>
                </div>
                <div className="flex gap-3">
                  <ModifyPresetModals station={station} />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;
