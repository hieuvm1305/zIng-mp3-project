import React from 'react'
import { useSearchParams } from 'react-router-dom'

function SearchPage() {
  let [searchParams] = useSearchParams();
  console.log(searchParams.get("query"))
  return (
    <div>SearchPage</div>
  )
}

export default SearchPage