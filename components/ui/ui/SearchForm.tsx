
import React from 'react'
import SearchFormReset from './SearchFormReset'
import { Search } from 'lucide-react';

const SearchForm = ({query} : {query?: string}) => {
    
  return (
    <form action="/" method='GET' className='search-form'>
        <input 
        name='query'
        defaultValue={""}
        className='search-input'
        placeholder='search startup' />

        <div className='flex gap-2'>
            {query && <SearchFormReset  />}
            <button type='submit' className='search-btn text-white'>
                <Search className='size-5'/>
            </button>
            
        </div>
    </form>
    
  )
}

export default SearchForm