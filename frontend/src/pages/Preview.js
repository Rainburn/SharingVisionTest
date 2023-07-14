import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import "../static/css/base.css"
import "../static/css/preview.css"

function Preview(props) {
    let { page } = useParams()

    // Define LIMIT for each page
    const limit = 3
    const offset = 3 * (page-1)

    const [totalPage, setTotalPage] = useState(0)
    const [posts, setPosts] = useState([])

    const getTotalPage = async () => {
        const response = await fetch("http://localhost:9000/article/count")
        const result = await response.json()
        
        setTotalPage(Math.ceil(result["count"]/limit))
        
    }

    const getPosts = async () => {
        const response = await fetch("http://localhost:9000/article/publish/"+limit+"/"+offset)
        const result = await response.json()
        
        setPosts(result)
    }

    useEffect(() => {
        getTotalPage()
        getPosts()
    }, [])

    const navigate = useNavigate()

    return (
        <div>
            <div className='page-title'>Blog</div>
            <a href="/" className='navigation-link'>Back to Dashboard</a>
            {/* Posts */}
            {posts.map((post, i) => {
                return (
                    <div key={i}>
                        <hr/>
                        <table>
                            <tbody>
                                <tr>
                                    <td className='post-title'>{post.Title}</td>
                                </tr>
                                <tr>
                                    <td className='post-content'>{post.Content}</td>
                                </tr>
                                <tr>
                                    <td className='post-category'>{post.Category}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )
            })}
            <div className='pagination-holder'>
                <Pagination page={page} totalpage={totalPage} limit={limit}/>
            </div>
        </div>
    )
}


function Pagination(props) {
    const limit = props.limit
    const current_page = props.page

    return (
        <div className="pagination">
            {/* Left Arrow */}
            {(() => {
                if (props.page == 1) {
                    return <a href={current_page}>&laquo;</a>
                }
                else {
                    return <a href={parseInt(current_page)-1}>&laquo;</a>
                }
            })()}

            {/* Numbers */}
            {[...Array(props.totalpage)].map((_, i) => {
                if (i+1 == props.page) {
                    return <a key={i+1} className='active' href={i+1}>{i+1}</a>
                }
                else {
                    return <a key={i+1} href={i+1}>{i+1}</a>
                }
            })}
            
            {/* Right Arrow */}
            {(() => {
                if (props.page == props.totalpage) {
                    return <a href={current_page}>&raquo;</a>
                }
                else {
                    return <a href={parseInt(current_page)+1}>&raquo;</a>
                }
            })()}
        </div>
    )

}

export default Preview;