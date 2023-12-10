import axios from 'axios';
import React, { useRef } from 'react'
import './Crad.css';
import { useState, useEffect } from 'react'
import Swal from 'sweetalert2';
import { Delete, Add } from '@mui/icons-material';
import styled from '@emotion/styled';
function Crad() {

    const [data, setdata] = useState([]);
    const [update, setupdate] = useState({});

    const title = useRef();
    const author = useRef()

    const get = () => {
        axios.get('http://localhost:3001/posts').then((res) => {
            console.log(res);
            setdata(res.data);
        })
    }

    // data post 
    const postData = () => {
        let curdata = {
            title: title.current.value,
            author: author.current.value
        }
        axios.post('http://localhost:3001/posts', curdata).then((res) => {
            console.log(res);
            setdata([...data, res.data]);

            Swal.fire({
                title: "Good job!",
                text: "Data will be Added Successfully!",
                icon: "success"
            });
        })
    }

    // delete data
    const deleteid = (id) => {
        console.log(id);
        axios.delete(`http://localhost:3001/posts/${id}`).then(() => {
            setdata(data.filter((e) => e.id !== id));
        })

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
        });
    }

    const updateid = (id,ind) => {
        console.log(id);    
        const updata=data[ind];
        setupdate(updata);
        console.log(updata);
    }

    const updatedata = (e) => {
        setupdate({ ...update, [e.target.name]: e.target.value })
        console.log(update);
    }

    const updateval = () => {
        axios.put(`http://localhost:3001/posts/${update.id}`, update).then((res) =>{
            setdata([...data,res.data]);

        });
    }

    useEffect(() => {
        get();
    }, [])

    const DeleteIcon = styled(Delete)`
    margin-left:180px;
    cursor:pointer;
`;

    const AddIcon = styled(Add)`
    cursor:pointer;
    `

    return (
        <>
            <input type='text' name='title' placeholder='Enter a title' ref={title} />
            <input type='text' name='author' placeholder='Enter a author' ref={author} />
            <button onClick={postData} className='btn-hover color-7' >Submit</button>
            <br></br>

            <input type='text' name='title' placeholder='Enter a title' value={update.title} onChange={updatedata} />
            <input type='text' name='author' placeholder='Enter a author' value={update.author}  onChange={updatedata} />
            <button onClick={updateval} className='btn-hover color-7'>update</button>

            <div className='display'>
                {
                    data.map((val, ind) => {
                        return (
                            <div class="Card">
                                <div class="car">
                                    <h1 class="card-titl">{val.id}</h1>
                                    <DeleteIcon onClick={() => deleteid(val.id)} />
                                    <AddIcon onClick={() => updateid(val.id, ind)} />
                                    <h2 class="card-tex">{val.title}</h2>
                                    <h4>{val.author}</h4>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default Crad
