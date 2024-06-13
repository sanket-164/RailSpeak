import AudioPlayer from "./AudioPlayer";

/* eslint-disable react/prop-types */
const Model = ({ isOpen, onClose, audio_url,translated_text }) => {
  const handleModalClose = () => {
    onClose && onClose();
  };

  return (
    <>
      {isOpen && (
        <div>
          <dialog id="my_modal_2" className="modal" open>
            <div className="modal-box">
              <AudioPlayer src={audio_url} />
            <div className="mt-4">
              {translated_text.map((text, index)=>(<p key={index}>{text}</p>))}
            </div>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button onClick={handleModalClose}>close</button>
            </form>
          </dialog>
        </div>
      )}
    </>
  );
};

export default Model;
