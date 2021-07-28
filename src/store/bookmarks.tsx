import React, { useContext, useReducer, createContext } from "react";

let initialState: IBookmark[];

if (localStorage.getItem("image-finder")) {
  initialState = JSON.parse(localStorage.getItem("image-finder")!);
} else initialState = [];

export function bookmarksReducer(
  currentState: IBookmark[],
  action: BookmarksAction
) {
  switch (action.type) {
    case "SET":
      if (action.data) {
        return [...currentState, ...action.data];
      } else if (action.data === null) return [];
      else return action.data;

    case "ADD":
      if (action.bookmark) {
        action.bookmark!.isInBookmarks = true;
        localStorage.setItem(
          "image-finder",
          JSON.stringify([...currentState, action.bookmark])
        );
        return [...currentState, action.bookmark];
      } else return currentState;

    case "DELETE":
      if (action.bookmark) {
        const updState = currentState.filter(
          bmk => bmk.id !== action.bookmark?.id
        );
        localStorage.setItem("image-finder", JSON.stringify(updState));
        action.bookmark!.isInBookmarks = false;
        return updState;
      } else return currentState;

    case "EDIT_TAGS":
      if (action.id) {
        let i = currentState.findIndex(b => b.id === action.id);
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
