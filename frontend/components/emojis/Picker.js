import React, { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import { Picker } from "emoji-mart";
import data from "@emoji-mart/data";
import styles from "../../styles/emojis/index.module.css";

Modal.setAppElement("#modal");

const ModalStyles = {
  overlay: {
    backgroundColor: "transparent",
    opacity: 1,
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    background: "transparent",
    color: "transparent",
    opacity: 1,
    border: "none",
  },
};

export const EmojiPicker = (props) => {
  const ref = useRef();
  const [isOpen, setIsOpen] = useState(true);

  const closeModal = () => {
    setIsOpen(false);
  };

    new Picker({
      data,
      ref,
      set: "messenger",
      ...props,
    });

  return (
    <Modal isOpen={isOpen} onRequestClose={closeModal} style={ModalStyles}>
      <div ref={ref}></div>
    </Modal>
  );
};
