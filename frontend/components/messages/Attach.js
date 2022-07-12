import { useState, useRef } from "react";
import { useAppContext } from "../../context/AppContext";
import AttachCameraSvg from "../svg/AttachCamera";
import AttachContactSvg from "../svg/AttachContact";
import AttachDocumentSvg from "../svg/AttachDocument";
import AttachImageSvg from "../svg/AttachImage";
import styles from "../../styles/messages/index.module.css";

export const Attach = () => {
  const { state, dispatch } = useAppContext();
  const { chatActive } = state;
  const [visible, setVisible] = useState(null);
  const inputFile = useRef(null);

  const showName = (e) => {
    setVisible(e.target.id);
  };

  const handleAttachImage = (e) => {
    inputFile.current.click();
  };

  const handleChangeAttachImage = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }

    // I've kept this example simple by using the first image instead of multiple
    dispatch({
      type: "Attach_images",
      value: { chat_id: chatActive.chat.chat_id, images: Array.from(e.target.files) },
    });
    dispatch({ type: "show_attach" });
    dispatch({ type: "change_option_active", value: null });
  };

  return (
    <div className={styles.attach}>
      <ul className={styles.attach_list}>
        <li onMouseEnter={showName} id="contact">
          <span id="contact">
            <AttachContactSvg />
          </span>
        </li>
        <li onMouseEnter={showName} id="document">
          <span>
            <AttachDocumentSvg />
          </span>
        </li>
        <li>
          <span>
            <AttachCameraSvg />
          </span>
        </li>
        <li>
          <span onClick={handleAttachImage}>
            <AttachImageSvg />
          </span>
          <input
            type="file"
            accept="image/*,video/mp4,video/3gpp,video/quicktime"
            multiple
            onChange={handleChangeAttachImage}
            style={{ display: "none" }}
            ref={inputFile}
          />
        </li>
      </ul>
    </div>
  );
};
