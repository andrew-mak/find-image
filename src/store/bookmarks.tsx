import React, { useContext, useReducer, createContext } from "react";

let initialState: IBookmark[];

if (localStorage.getItem("image-finder")) {
  initialState = JSON.parse(localStorage.getItem("image-finder")!);
  console.log("INITIAL state: ", initialState);
} else initialState = [];

export function bookmarksReducer(
  currentState: IBookmark[],
  action: BookmarksAction
) {
  console.log("Bookmarks reducer, action: ", action);
  console.log("Bookmarks reducer, currentState: ", currentState);
  switch (action.type) {
    case "SET":
      console.log("[SET item], curState: ", currentState);
      console.log("[SET item], action: ", action);
      if (action.data) {
        return [...currentState, ...action.data];
      } else if (action.data === null) return [];
      else return action.data;

    case "ADD":
      console.log("[ADD item], curState: ", currentState);
      console.log("[ADD item], action: ", action);

      if (action.bookmark) {
        action.bookmark!.isInBookmarks = true;
        localStorage.setItem(
          "image-finder",
          JSON.stringify([...currentState, action.bookmark])
        );
        return [...currentState, action.bookmark];
      } else return currentState;

    case "DELETE":
      console.log("[DEL item], curState: ", currentState);
      console.log("[DEL item], action: ", action);

      if (action.bookmark) {
        const updState = currentState.filter(
          bmk => bmk.id !== action.bookmark?.id
        );
        localStorage.setItem("image-finder", JSON.stringify(updState));
        action.bookmark!.isInBookmarks = false;
        console.log("upd_state: ", updState);
        return updState;
      } else return currentState;

    case "EDIT_TAGS":
      console.log("[TAG], curState: ", currentState);
      console.log("[TAG], action: ", action);

      if (action.id) {
        let i = currentState.findIndex(b => b.id === action.id);
        console.log("Index: ", i);

        if (i !== -1 && action.tags) {
          let updState = [...currentState];
          updState[i].tags = [...action.tags];
          localStorage.setItem("image-finder", JSON.stringify(updState));
          return updState;
        }
      }
      return currentState;

    default:
      throw new Error("Should not be there");
  }
}

export const Bookmarks = createContext<{
  bookmarks: IBookmark[];
  dispatch: DispatchBookmarks;
}>({
  bookmarks: initialState,
  dispatch: () => {},
});

const BookmarksProvider: React.FC = ({ children }) => {
  const [bookmarks, dispatch] = useReducer(bookmarksReducer, initialState);
  return (
    <Bookmarks.Provider value={{ bookmarks, dispatch }}>
      {children}
    </Bookmarks.Provider>
  );
};

function useBookmarks() {
  const context = useContext(Bookmarks);
  if (context === undefined) {
    throw new Error("useCount must be used within a CountProvider");
  }
  return context;
}
export { BookmarksProvider, useBookmarks };
