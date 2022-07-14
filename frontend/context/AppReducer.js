export const initialState = {
  user: null,
  dataOk: false,
  contacts: [],
  chats: [],
  chatActive: null,
  attachImages: null,
  system_message: {
    type: null,
    location: null,
    message: null,
  },
  showOptions: false,
  showNewChat: false,
  showAttach: false,
  optionActive: null,
  showProfile: false,
  modal: "",
  socket: null,
};

export const AppReducer = (state, action) => {
  switch (action.type) {
    case "dataOk": {
      return {
        ...state,
        dataOk: action.value,
      };
    }

    case "fetch_user":
    case "update_user": {
      return {
        ...state,
        user: action.value,
      };
    }

    case "fetch_chats": {
      return {
        ...state,
        chats: action.value,
      };
    }

    case "fetch_contacts": {
      return {
        ...state,
        contacts: action.value,
      };
    }

    case "contact_online":
    case "contact_offline": {
      return {
        ...state,
        contacts: state.contacts.map((c) => {
          if (c.cont_user_id == action.value.cont_user_id) {
            return {
              ...c,
              user_lastConnection: action.value.user_lastConnection,
            };
          }
          return c;
        }),
        chatActive: {
          ...state.chatActive,
          contact: {
            ...state.chatActive.contact,
            user_lastConnection: action.value.user_lastConnection,
          },
        },
      };
    }

    case "set_chatActive": {
      return {
        ...state,
        chatActive: action.value,
        chats: state.chats.map((chat) => {
          if (chat.chat.chat_id === action.value.chat.chat_id) {
            return {
              ...chat,
              notRead: 0,
            };
          } else {
            return chat;
          }
        }),
      };
    }

    case "chat_new": {
      return {
        ...state,
        chats: [action.value, ...state.chats],
      };
    }

    case "sent_message": {
      return {
        ...state,
        chats: state.chats.map((chat) => {
          if (chat.chat.chat_id === action.value.mess_chat_id) {
            return {
              ...chat,
              messages: [...chat.messages, action.value],
            };
          }
          return chat;
        }),
        chatActive: {
          ...state.chatActive,
          messages: [...state.chatActive.messages, action.value],
        },
      };
    }

    case "message_receive": {
      return {
        ...state,
        chats: state.chats.map((chat) => {
          if (
            chat.chat.chat_id == action.value.mess_chat_id &&
            chat.chat.chat_id !== state.chatActive?.chat.chat_id
          ) {
            return {
              ...chat,
              messages: [...chat.messages, action.value],
              notRead: chat.notRead + 1,
            };
          } else if (chat.chat.chat_id == state.chatActive?.chat.chat_id) {
            return {
              ...chat,
              messages: [...chat.messages, action.value],
            }
          }
          return chat;
        }),
        chatActive:
          state.chatActive !== null
            ? state.chatActive.chat.chat_id == action.value.mess_chat_id && {
                ...state.chatActive,
                messages: [...state.chatActive.messages, action.value],
              }
            : null,
      };
    }

    case "viewed_message": {
      return {
        ...state,
        chats: state.chats.map((chat) => {
          if (chat.chat.chat_id === action.value.mess_chat_id) {
            return {
              ...chat,
              messages: chat.messages.map((message) => {
                if (message.mess_id === action.value.mess_id) {
                  return {
                    ...message,
                    mess_viewed: true,
                    mess_hourViewed: action.value.mess_hourViewed,
                  };
                }
                return message;
              }),
            };
          }
          return chat;
        }),
        chatActive:
          state.chatActive !== null
            ? state.chatActive.chat.chat_id == action.value.mess_chat_id && {
                ...state.chatActive,
                messages: state.chatActive.messages.map((message) => {
                  if (message.mess_id == action.value.mess_id) {
                    return {
                      ...message,
                      mess_viewed: true,
                      mess_hourViewed: action.value.mess_hourViewed,
                    };
                  }
                  return message;
                }),
              }
            : null,
      };
    }

    case "close_allOptions": {
      return {
        ...state,
        showOptions: false,
        showNewChat: false,
        optionActive: null,
      };
    }

    case "show_options": {
      return {
        ...state,
        showOptions: !state.showOptions,
      };
    }

    case "show_newChat": {
      return {
        ...state,
        showNewChat: !state.showNewChat,
      };
    }

    case "show_attach": {
      return {
        ...state,
        showAttach: !state.showAttach,
      };
    }

    case "Attach_images": {
      return {
        ...state,
        attachImages: action.value,
      };
    }

    case "Attach_add_images": {
      return {
        ...state,
        attachImages: {
          ...state.attachImages,
          images: [...state.attachImages.images, ...action.value],
        },
      };
    }

    case "Attach_delete_images": {
      return {
        ...state,
        attachImages: {
          ...state.attachImages,
          images: state.attachImages.images.filter(
            (image, index) => index !== action.value
          ),
        },
      };
    }

    case "Dittach_images": {
      return {
        ...state,
        attachImages: null,
      };
    }

    case "change_option_active": {
      return {
        ...state,
        optionActive: action.value,
      };
    }

    case "show_profile": {
      return {
        ...state,
        showProfile: !state.showProfile,
      };
    }

    case "system_message": {
      return {
        ...state,
        system_message: action.value,
      };
    }

    case "modal": {
      return {
        ...state,
        modal: action.value,
      };
    }

    case "socket": {
      return {
        ...state,
        socket: action.value,
      };
    }
  }
};
