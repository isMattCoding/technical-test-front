import { TextInput } from "@mantine/core";
import pages from '../pages.json';
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import './search.css'
import './instructions.css'
import React from "react";
import { loadUsers } from "../api";

type CategoryType = string
type SubcategoryType = {name: string, category: CategoryType}

function matchesSearchTerm(string: string, searchTerm: string) {
  return string.toLowerCase().includes(searchTerm.toLowerCase())
}

function HiglightedWord({array, searchTerm}:{array: string[], searchTerm: string}) {
  return array.map((text, i) => {
    const length = array.length
    return <React.Fragment key={i}>
      {text && <span>{text}</span>}
      {(searchTerm !== "" && i < length - 1) && <span className="highlight">{searchTerm}</span>}
    </React.Fragment>
  })
}

function SearchResultItem({category, searchTerm}: {
  category: CategoryType | SubcategoryType,
  searchTerm: string
}) {
  const navigate = useNavigate();
  if (typeof category !== 'string') {
    const nameArray = category.name.toLowerCase().split(searchTerm.toLowerCase())
    const categoryArray = category.category.toLowerCase().split(searchTerm.toLowerCase())

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
        <p className="capitalize">
          <HiglightedWord array={categoryArray} searchTerm={searchTerm}/>
          {' > '}
          <HiglightedWord array={nameArray} searchTerm={searchTerm}/>
        </p>
      </div>
    </>
  }

  if (typeof category === 'string') {
    const textArray = category.toLowerCase().split(searchTerm.toLowerCase())
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
        <p className="capitalize">
          <HiglightedWord array={textArray} searchTerm={searchTerm}/>
        </p>
      </div>
    </>
  }
}

function UserResults({searchTerm}: {searchTerm: string}) {
  const navigate = useNavigate();
  const [users, setUsers] = useState([])

  useEffect(() => {
    if (users.length === 0) {
      loadUsers()
        .then((res) => {
          setUsers([...res as []])
        })
    }
  }, [])

  const userResults =
    users
      .filter((user: {name: string, id: number}) =>
        matchesSearchTerm(user.name, searchTerm))

    return (
      <div className="search-results">
        {userResults.length === 0 && <>Loading...</>}
        {userResults.length > 0 && (
          <>
            {userResults.map((user: {name: string, id: number}) => {
              const usernameArray =
                user.name.toLowerCase()
                  .split(searchTerm.toLowerCase())

              function onClick() {
                navigate(`user/${user.id}`)
              }

              return (
                <>
                  <div
                    className="search-results__category-result"
                    onClick={onClick}
                  >
                    <p className="capitalize">@
                      <HiglightedWord array={usernameArray} searchTerm={searchTerm}/>
                    </p>
                  </div>
                </>
              )
            })}
          </>
        )}
      </div>
    )
}

function SearchResults({searchTerm}: {searchTerm: string}) {
  if (!searchTerm) return;
  // Users Search

  if (searchTerm[0] === "@") {
    return <UserResults searchTerm={searchTerm.replace("@", "")} />
  }
  // Pages Search

  // We remove the categories that have subcategories, since they don't have their own route
  const searchableCategories =
    pages.categories
      .filter((category: CategoryType) => {
        return !pages.subcategories.map(x=>x.category).includes(category)
      })

  const categoriesResults =
    searchableCategories
      .filter((category: CategoryType) =>
        matchesSearchTerm(category, searchTerm))

  const subcategoriesResults =
    pages.subcategories
      .filter((subcategory:SubcategoryType) =>
        matchesSearchTerm(subcategory.name, searchTerm) || matchesSearchTerm(subcategory.category, searchTerm))

  const results: Array<CategoryType | SubcategoryType> =
    [...categoriesResults, ...subcategoriesResults]

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
