import React, { useState, useEffect } from "react";
import "./HomePage.scss";

const axios = require('axios');

const HomePage = () => {
    const [userData, setUserData] = useState([]);
    const [error, setError] = useState('');
    const [searchedTerm, setSearchedTerm] = useState('');
    
    const handleSearchTermValue = () => {
        axios.get("http://localhost:9000/users/" + searchedTerm)
        .then((res) => {
            if(res.status === 200) {
                if(res.data.length > 0) {
                    setUserData(res.data);
                    setError('');
                }
                else {
                    setUserData([]);
                    setError('No data found based on your searched term.');
                }
            }
        })
        .catch(err => {
            setError('Something went wrong');
        })
    };

    useEffect(() => {
        axios.get("http://localhost:9000/users")
            .then((res) => {
                if (res.status === 200) {
                    if(res.data.data.length > 0) {
                        setUserData(res.data.data);
                    }
                    else {
                        setUserData([]);
                        setError('No users found.');
                    }
                }
            })
            .catch(err => {
                setError('Something went wrong');
            })
    }, [searchedTerm])

    let userDataToRender = userData.length > 0 &&
        <table className='table_style'>
            <tbody>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>EMail</th>
                    <th>Phone</th>
                    <th>Username</th>
                    <th>Website</th>
                    <th>Company</th>
                    <th>Address</th>
                </tr>
                {
                    userData.map((user) => {
                        const { _id, id, name, email, phone, username, website, company, address } = user;
                        return (
                            <tr key={_id}>
                                <td>{id}</td>
                                <td>{name}</td>
                                <td>{email}</td>
                                <td>{phone}</td>
                                <td>{username}</td>
                                <td>{website}</td>
                                <td>{company.name}</td>
                                <td>{address.street + ", " + address.suite + ", " + address.city + ", " + address.zipCode}</td>
                            </tr>

                        )
                    })
                }
            </tbody>
        </table>

    if (error !== "") {
        userDataToRender = (<p>{error}</p>);
    }

    return (
        <div className="home_page">
            <input
                className="input_field"
                type="text"
                placeholder="Type something to search"
                value={searchedTerm}
                onChange={async(event) => {
                    await setSearchedTerm(event.target.value);
                    await handleSearchTermValue()
                }}
            />
            {userDataToRender}
        </div>
    )
}

export default HomePage;