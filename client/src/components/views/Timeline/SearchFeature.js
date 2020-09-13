import React, { useState } from 'react'
import { Input } from 'antd';
import SearchIcon from "@material-ui/icons/Search";

const { Search } = Input;

function SearchFeature(props) {

    const [SearchTerms, setSearchTerms] = useState("")

    const onChangeSearch = (event) => {
        setSearchTerms(event.currentTarget.value)

        props.refreshFunction(event.currentTarget.value)

    }
    return (
        <div className="header__input">
            <SearchIcon

            />
            <input
                value={SearchTerms}
                onChange={onChangeSearch}
                placeholder="Search Facebook" />
        </div>
    )
}

export default SearchFeature
