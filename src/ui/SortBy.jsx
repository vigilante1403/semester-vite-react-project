import { useSearchParams } from "react-router-dom"
import Select from "./Select"

function SortBy({options}) {
    const [searchParams,setSearchparams]=useSearchParams()
    const currentSelectValue = searchParams.get('sortBy')||''
    function handleChange(e){
        searchParams.set('sortBy',e.target.value)
        setSearchparams(searchParams)
    }
    return (
        <Select options={options} type="white" value={currentSelectValue} onChange={handleChange} />
    )
}

export default SortBy