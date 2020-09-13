import SearchIcon from "@material-ui/icons/Search";
import { Input } from 'antd';
import React, { useState } from 'react';

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
                placeholder=" Search" />
        </div>
    )
}

export default SearchFeature
