import '../../styles/css/comments/view-all-comments.css';

const Header = ({ comments }) => {
    return (
        <div className="header_view_all_comments">
            <p className="font-bold text-white-primary mt-2 mb-8">{comments.length} comments</p>
        </div>
    )
}

export default Header
