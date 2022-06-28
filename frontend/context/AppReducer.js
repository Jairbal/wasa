export const initialState = {
  user: null,
  dataOk: false,
  contacts: [],
  chats: [],
  chatActive: null,
  system_message: {
    type: null,
    location: null,
    message: null,
  },
  showOptions: false,
  showNewChat: false,
  optionActive: null,
  showProfile: false,
  modal: "",
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

    case "fetch_contacts": {
      return {
        ...state,
        contacts: action.value,
      };
    }

    case "set_chatActive": {
      return {
        ...state,
        chatActive: action.value
      }
    }

    case "close_allOptions": {
      return {
        ...state,
        showOptions: false,
        showNewChat: false,
        optionActive: null
      }
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

    case "change_option_active": {
      return {
        ...state,
        optionActive: action.value,
      };
    }

    case "show_profile": {
      return {
        ...state,
        showProfile: !state.showProfile
      }
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
  }
};
