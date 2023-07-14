import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import "../static/css/base.css"
import "../static/css/addpage.css"

function AddPage(props) {

    const [data, setData] = useState({"Status": "Publish"})

    const handleChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        setData(values => ({...values, [name]: value}))
    }

    const navigate = useNavigate()
    const backToDashboard = () => {
        let path = `/`
        navigate(path)
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        // Do the HTTP POST Request and back to dashboard
        const postEndpoint = "http://localhost:9000/article/"

        const headers = {
            "Content-Type": "multipart/form-data"
        }

        axios.post(postEndpoint, data, { headers })
        .then(res => {
            console.log(data)
            backToDashboard()})
    }

    return (
        <div>
            <div className='page-title'>Write Post</div>
            <a href="/" className='navigation-link'>Back to Dashboard</a>
            <hr/>
            <form onSubmit={handleSubmit}>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <label>Title</label>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input 
                                type="text"
                                name="Title"
                                value={data.Title || ""}
                                onChange={handleChange}
                                size="80"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Content</label>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <textarea 
                                name="Content"
                                value={data.Content || ""}
                                onChange={handleChange}
                                rows="10"
                                cols="75"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label>Category</label>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input 
                                type="text"
                                name="Category"
                                value={data.Category || ""}
                                onChange={handleChange}
                                />
                                <select className='status-select' name="Status" value={data.Status} onChange={handleChange}>
                                    <option value="Publish">Publish</option>
                                    <option value="Draft">Draft</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="submit" value="Write Post"/>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>     
    )
}

export default AddPage;