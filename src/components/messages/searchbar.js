import '../../styles/css/messenger/searchbar.css'

const SearchBar = ({ userSearch }) => {


    return (
        <div className="notfound_searchbox_inbox">
            <div className="notfound_searchbox_card_inbox ">
                <input
                    type="text"
                    placeholder="Type something..."
                    className="searchbar_input_inbox text-white-primary"
                />
            </div>
        </div>
    )
}

export default SearchBar
