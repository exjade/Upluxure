import '../../styles/css/comments/view-all-comments.css';

const Header = ({ comments }) => {
    return (
        <div className="header_view_all_comments border-b border-black-border">
            <p className="font-bold text-xs text-white-primary">{comments.length} comments</p>
        </div>
    )
}

export default Header
