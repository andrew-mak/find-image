import React, { ReactNode, useCallback, useEffect, useRef } from "react";
import { useState } from "react";
import "../../styles/SearchImages.css";

interface SearchImagesProps {}

const SearchImages: React.FC<SearchImagesProps> = () => {
  const [enteredQuery, setEnteredQuery] = useState("");
  const [readyImages, setReadyImages] = useState<null | ReactNode[]>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const makeImgs = (srcArr: any[]) => {
    const images = srcArr.map(img => (
      <div className="card" key={img.id}>
        <img
          src={`https://live.staticflickr.com/${img.server}/${img.id}_${
            img.secret
          }_${"m"}.jpg`}
          alt={img.title}
        />
        <div className="imgTitle">{img.title}</div>
        <div className="actionsBar">
          <button>Bookmark it V</button>
        </div>
      </div>
    ));
    setReadyImages(images);
  };

  const sendRequest = useCallback(
    url => {
      fetch(url, {})
        .then(response => response.json())
        .then(
          responseData => {
            console.log(responseData);
            makeImgs(responseData.photos.photo);
          }
        )
        .catch(error => {
          console.log(error);
        });
    },
    []
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      if (
        inputRef.current &&
        inputRef.current.value.length !== 0 &&
        enteredQuery === inputRef.current.value
      ) {
        const query = enteredQuery;
        sendRequest(
          `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=189f9704c734c2efe2932a78628553c7&text=${query}&per_page=10&format=json&nojsoncallback=1`
        );
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [enteredQuery, inputRef, setEnteredQuery]);

  return (
    <div className="searchBox">
      <input
        type="text"
        ref={inputRef}
        placeholder="Find Images"
        value={enteredQuery}
        onChange={event => setEnteredQuery(event.target.value)}
      />
      <div className="resultsBox">
        {readyImages ? (
          readyImages
        ) : (
          <h3>No images here. Would you try to search for anything else?</h3>
        )}
      </div>
    </div>
  );
};

export default SearchImages;
