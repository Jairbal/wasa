import { useEffect, useRef, useState } from "react";
import { DateTime } from "luxon";
import { useAppContext } from "../../context/AppContext";
import { InputMessage } from "./InputMessage";
import X2Svg from "../svg/X2";
import XSvg from "../svg/X";
import SendSvg from "../svg/Send";
import MoreSvg from "../svg/More";
import styles from "../../styles/messages/index.module.css";

export const PreviewSendImage = () => {
  const { dispatch, state } = useAppContext();
  const {
    socket,
    user,
    chats,
    chatActive,
    attachImages: { images },
  } = state;
  const inputFile = useRef(null);

  const [previews, setPreviews] = useState([]);
  const [messagesContent, setMessagesContent] = useState([]);
  const [selectedMessageContent, setSelectedMessageContent] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleClose = () => {
    dispatch({ type: "Attach_images", value: null });
  };

  const handleSetMessageContent = (value) => {
    setSelectedMessageContent(value);
    const aux = messagesContent;
    aux[selectedIndex] = selectedMessageContent;
    setMessagesContent(aux);
  };

  // inicializacion de valores de los inputs de cada imagen
  useEffect(() => {
    let initial = [];
    images.forEach(() => {
      initial.push("");
    });
    setMessagesContent(initial);
  }, []);

  const handleSelected = (index) => {
    const aux = messagesContent;
    aux[selectedIndex] = selectedMessageContent;
    setMessagesContent(aux);
    setSelectedMessageContent(messagesContent[index]);
    setSelectedIndex(index);
  };

  const handleDeleteImage = (index) => {
    URL.revokeObjectURL(previews[index].preview);
    dispatch({
      type: "Attach_delete_images",
      value: index,
    });
    setSelectedIndex(0);
    const aux = messagesContent;
    console.log("aux antes", aux);
    aux.splice(index, 1);
    console.log("aux despues", aux);
    setMessagesContent(aux);
  };

  const handleAddImages = () => {
    inputFile.current.click();
  };

  const handleChangeAddImage = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    const aux = messagesContent;
    aux.push("");
    setMessagesContent(aux);
    dispatch({
      type: "Attach_add_images",
      value: Array.from(e.target.files),
    });
  };

  const sendMessage = () => {
    const aux = messagesContent;
    aux[selectedIndex] = selectedMessageContent;
    setMessagesContent(aux);
    for (let i = 0; i < images.length; i++) {
      const message = {
        image: { buff: images[i], type: images[i].type },
        mess_message: messagesContent[i],
        mess_hourSend: DateTime.now().toString(),
        mess_isMedia: true,
        mess_chat_id: chatActive.chat.chat_id,
        mess_user_id_sent: user.user_id,
      };

      socket.emit("message:send", message, async (response) => {
        const existedChat = chats.find(
          (chat) => chat.chat.chat_id == response.message.mess_chat_id
        );
        if (existedChat) {
          dispatch({ type: "set_chatActive", value: existedChat });
          dispatch({ type: "sent_message", value: response.message });
        } else {
          const chat = await axios({
            url: `api/chats/${response.message.mess_chat_id}`,
            method: "GET",
          });
          dispatch({ type: "chat_new", value: chat.data.chat });
          dispatch({ type: "set_chatActive", value: chat.data.chat });
        }
        dispatch({ type: "Dittach_images" });
      });
    }
  };

  const handleOnPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  useEffect(() => {
    const mappedImages = images.map((image) => ({
      ...image,
      preview: URL.createObjectURL(image),
    }));

    setPreviews(mappedImages);
    return () => {
      mappedImages.forEach((image) => URL.revokeObjectURL(image.preview));
    };
  }, [images]);

  return (
    <div className={styles.PSI}>
      <div className={styles.PSI_options}>
        <span className={styles.PSI_options_close} onClick={handleClose}>
          <X2Svg />
        </span>
      </div>
      <div className={styles.PSI_body}>
        <img
          src={previews[selectedIndex]?.preview}
          className={styles.PSI_body_image}
        />
      </div>
      <div className={styles.PSI_message}>
        <InputMessage
          placeholder="Escribe un mensaje aquí"
          messageContent={selectedMessageContent}
          setMessageContent={handleSetMessageContent}
          handleOnPress={handleOnPress}
        />
      </div>

      <div className={styles.PSI_footer}>
        <div className={styles.PSI_footer_images}>
          {previews.map((prev, index) => (
            <div
              className={styles.PSI_footer_preview}
              key={index}
              onClick={() => handleSelected(index)}
            >
              <div className={styles.PSI_footer_preview_close}>
                <span onClick={() => handleDeleteImage(index)}>
                  <XSvg />
                </span>
              </div>
              <img
                src={prev.preview}
                className={`${styles.PSI_footer_preview_image} ${
                  index === selectedIndex &&
                  styles.PSI_footer_preview_image_selected
                }`}
              />
            </div>
          ))}
          <div className={styles.PSI_footer_preview} onClick={handleAddImages}>
            <span
              className={`${styles.PSI_footer_preview_image} ${styles.PSI_footer_add_image}`}
            >
              <MoreSvg />
            </span>
            <input
              type="file"
              accept="image/*,video/mp4,video/3gpp,video/quicktime"
              multiple
              onChange={handleChangeAddImage}
              style={{ display: "none" }}
              ref={inputFile}
            />
          </div>
        </div>
        <div className={styles.PSI_footer_send} onClick={sendMessage}>
          <span>
            <SendSvg />
          </span>
        </div>
      </div>
    </div>
  );
};
