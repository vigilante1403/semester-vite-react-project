import { useSearchParams } from "react-router-dom"
import Select from "./Select"
import { useQueryClient } from "@tanstack/react-query"

function SortBy({options}) {
  
    const [searchParams,setSearchparams]=useSearchParams()
    const currentSelectValue = searchParams.get('sortBy')||''
    function handleChange(e){
        searchParams.set('sortBy',e.target.value)
        searchParams.set('page',1)
        setSearchparams(searchParams)
        
    }
    return (
        <Select options={options} type="white" value={currentSelectValue} onChange={handleChange} />
    )
}

export default SortBy