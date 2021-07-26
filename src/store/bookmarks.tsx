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
      console.log("[SET item], curS: ", currentState);
      if (action.data) {
        return [...currentState, ...action.data];
      } else if (action.data === null) return [];
      else return action.data;
    case "ADD":
      console.log("[ADD item], curS: ", currentState);
      action.bookmark!.isInBookmarks = true;
      localStorage.setItem(
        "image-finder",
        JSON.stringify([...currentState, action.bookmark])
      );
      return [...currentState, action.bookmark];
    case "DELETE":
      console.log("[DEL item], curS: ", currentState);
      const updState = currentState.filter(
        bkmark => bkmark.id !== action.bookmark?.id
      );
      localStorage.setItem("image-finder", JSON.stringify(updState));
      action.bookmark!.isInBookmarks = false;
      if (updState.length) return updState;
      else return null;
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
