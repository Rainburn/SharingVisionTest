import { useState, useEffect } from 'react';
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import "../static/css/base.css"
import "../static/css/dashboard.css"

function Dashboard(props) {

    const [posts, setPosts] = useState([]);
    const [tab, setTab] = useState("Publish")

    useEffect(() => {
        getPosts()
    }, [])

    const getPosts = async () => {
        const response = await fetch("http://localhost:9000/article/")

        // store the data into State
        setPosts(await response.json())
    }

    return (
        <div>
            <div className='page-title'>Dashboard</div>
            <a href="/preview/1" className='navigation-link'>See Blog</a>
            <span className='navigation-split'>|</span>
            <a href="/write" className='navigation-link'>Write a post</a>

            <div className="button-placer">
            <button className="tablink" id="publish" onClick={() => setTab("Publish")}>Published</button>
            <button className="tablink" id="draft" onClick={() => setTab("Draft")}>Drafts</button>
            <button className="tablink" id="trash" onClick={() => setTab("Trash")}>Trashed</button>
            </div>
            <div>
                {posts.map((post) => {if (post.Status == tab) {return <Tile title={post.Title} category={post.Category} key={post.Id} postId={post.Id}/>}})}
            </div>
        </div>
    )
}


function Tile(props) {
    const title = props.title
    const category = props.category

    const navigate = useNavigate()
    const goToEditPage = (id) => {
        const path = "edit/" + id
        navigate(path)
    }

    const deletePage = (id) => {
        const deleteEndpoint = "http://localhost:9000/article/" + id
        const data = {"Status": "Trash"}
        const headers = {
            "Content-Type": "multipart/form-data"
        }

        axios.patch(deleteEndpoint, data, { headers })
        .then(res => {
            window.location.reload()
        })
    }

    return (
        <div>
            <table className="post-holder">
                <tbody>
                <tr>
                    <td className="post-info">
                        <div className="post-title">{title}</div>
                    </td>
                    <td className="post-action">
                        <button onClick={() => goToEditPage(props.postId)} className='action-button'>
                            <AiFillEdit/>
                        </button>
                        
                    </td>
                    <td className="post-action">
                        <button onClick={() => deletePage(props.postId)} className='action-button'>
                            <AiFillDelete/>
                        </button>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div className="post-category">{category}</div>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    )

}

export default Dashboard;