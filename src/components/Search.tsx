import { TextInput } from "@mantine/core";
import pages from '../pages.json';
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import './search.css'
import './instructions.css'
import React from "react";

type CategoryType = string
type SubcategoryType = {name: string, category: CategoryType}

function matchesSearchTerm(string: string, searchTerm: string) {
  return string.toLowerCase().includes(searchTerm.toLowerCase())
}

function SearchResultItem({category, searchTerm}: {
  category: CategoryType | SubcategoryType,
  searchTerm: string
}) {
  const navigate = useNavigate();
  if (typeof category !== 'string') {
    const nameArray = category.name.split(searchTerm)
    const categoryArray = category.category.split(searchTerm)

    function onClick() {
      if (typeof category !== 'string') {
        navigate(`${category.category}/${category.name.split(" ").join("-")}`)
      }
    }

    return <>
      <div
        className="search-results__category-result"
        onClick={onClick}
      >
        <p>
          {categoryArray.map((text, i) => {
            const length = categoryArray.length
            return <React.Fragment key={i}>
              {`${text}`}
              {i < length - 1 && <span className="highlight">{searchTerm}</span>}
            </React.Fragment>
          })}
          {' > '}
          {nameArray.map((text, i) => {
            const length = nameArray.length
            return <React.Fragment key={i}>
              {text}
              {i < length - 1 && <span className="highlight">{searchTerm}</span>}
            </React.Fragment>
          })}
        </p>
      </div>
    </>
  }

  if (typeof category === 'string') {
    const textArray = category.split(searchTerm)
    function onClick() {
      if (typeof category === 'string') {
        navigate(`${category}`)
      }
    }

    return <>
      <div
        className="search-results__category-result"
        onClick={onClick}
      >
        <p>
          {textArray.map((text, i) => {
            const length = textArray.length
            return (
              <React.Fragment key={i}>
                {text}
                {i < length - 1 && <span className="highlight">{searchTerm}</span>}
              </React.Fragment>
            )
          })}
        </p>
      </div>
    </>
  }
}

function SearchResults({searchTerm}: {searchTerm: string}) {
  if (!searchTerm) return;
  const searchableCategories =
    pages.categories
      .filter((category: CategoryType) => {
        return !pages.subcategories.map(x=>x.category).includes(category)
      })
  const categoriesResults = searchableCategories.filter((category: CategoryType) => matchesSearchTerm(category, searchTerm))

  const subcategoriesResults = pages.subcategories.filter((subcategory:SubcategoryType) =>  matchesSearchTerm(subcategory.name, searchTerm) || matchesSearchTerm(subcategory.category, searchTerm))

  const results: Array<CategoryType | SubcategoryType> = [...categoriesResults, ...subcategoriesResults]

  return (
    <div className="search-results">
      {results.length > 0 &&
        <>
          {results.map((category, i) => (
            <SearchResultItem
              key={i}
              category={category}
              searchTerm={searchTerm}
            />
          ))}
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
