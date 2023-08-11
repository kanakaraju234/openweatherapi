import React, { useRef } from "react";
export const SearchInput = ({ setSearchCity }) => {
  const inputRef = useRef();
  const onChangeHandler = () => {
    setSearchCity(inputRef.current.value);
    // inputRef.current.value = "";
  };
  return (
    <div className="search-input">
      <input
        type="text"
        ref={inputRef}
        placeholder="Search here"
        id="search-input-focus"
      />
      <button onClick={onChangeHandler}>Search </button>
    </div>
  );
};
