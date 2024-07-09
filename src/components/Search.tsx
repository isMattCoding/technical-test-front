import { TextInput } from "@mantine/core";
import pages from '../pages.json';
import { useEffect, useRef, useState } from "react";
import './search.css'
import './instructions.css'

function SearchResults({searchTerm}: {searchTerm: string}) {
  if (!searchTerm) return;
  const categoriesResults = pages.categories.filter((category: string) => category.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="search-results">
      {categoriesResults.length > 0 &&
        <>
          <h3>Categories</h3>
          {categoriesResults.map(category => {
            const textArray = category.split(searchTerm)

            return <>
              <div className="search-results__category-result">
                <p>
                  {textArray.map((text, i) => {
                    const length = textArray.length
                    return <>
                      {text}
                      {i < length - 1 && <span className="highlight">{searchTerm}</span>}
                    </>
                  })}
                </p>
              </div>
            </>
          })}
        </>
      }
    </div>
  )
}

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("")
  const inputRef = useRef<HTMLInputElement>(null);
  function onChange(e: any) {
    setSearchTerm(e.target.value)
  }

  useEffect(() => {
    if (inputRef === null || inputRef.current === null) return;
    inputRef.current.focus();
  })

  return(
    <>
      <TextInput
        placeholder=""
        onChange={onChange}
        ref={inputRef}
      />
      <SearchResults searchTerm={searchTerm} />
    </>
  )
}
