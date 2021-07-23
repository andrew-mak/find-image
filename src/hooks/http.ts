import { useReducer, useCallback } from 'react';

const initialState = {
  loading: false,
  error: null,
  data: null,
};

const httpReducer = (curHttpState: httpState, action: httpActions): httpState => {
  switch (action.type) {
    case 'SEND':
      return {
        loading: true,
        error: null,
        data: null,
      };
    case 'RESPONSE':
      return {
        ...curHttpState,
        loading: false,
        data: action.responseData,
      };
    case 'ERROR':
      return {
        loading: false,
        error: action.errorMessage
      };
    case 'CLEAR':
      return initialState;
    default:
      throw new Error('Should not be there');
  }
}

const useHttp = () => {
  const [httpState, dispatchHttp] = useReducer(httpReducer, initialState);

  const clear = useCallback(() => dispatchHttp({ type: "CLEAR" }), []);

  const sendRequest = useCallback((url: string, method, body?, itemId?, reqIdentifier?) => {
    dispatchHttp({ type: "SEND" });
    fetch(url, {
      method: method,
      body: body,
    }).then(response => response.json())
      .then(responseData => {
        console.log(responseData);
        dispatchHttp({ type: "RESPONSE", responseData: responseData });
      })
      .catch(error => {
        dispatchHttp({ type: "ERROR", errorMessage: 'Something went wrong :(\n' + error.message });
      });
  }, []);

  return {
    isLoading: httpState.loading,
    data: httpState.data,
    error: httpState.error,
    sendRequest: sendRequest,
    clear: clear
  };
};

export default useHttp;