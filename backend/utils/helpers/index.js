const getDestinataryId = ({ chat, owner_user_id }) => {
  let destinataryId;
  if (chat.chat_user_id_1 != owner_user_id) {
    destinataryId = chat.chat_user_id_1;
  } else {
    destinataryId = chat.chat_user_id_2;
  }
  return destinataryId;
};

module.exports = { getDestinataryId };
