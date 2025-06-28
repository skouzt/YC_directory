"use client"
const SearchFromReset = () => {
   
    const reset = () => {
    const form = document.querySelector(".search-form") as HTMLFormElement;
    if (form) form.reset();
};
  return (
      <button type='reset' onClick={reset} className="search-btn text-white">
        x
      </button>
  )
}

export default SearchFromReset