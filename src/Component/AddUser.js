import React, { useState ,useEffect } from 'react'
import { addUser } from '../Service/userService'



const AddUser = () => {

    const [user, setUser] = useState({})

    useEffect(
        () =>{
            addUser().then((response) =>{ setUser(response.data); })
                    .catch(error =>{ console.error(error); });
        }
    );


  return (
    <div>AddUser</div>
  )
}

export default AddUser;