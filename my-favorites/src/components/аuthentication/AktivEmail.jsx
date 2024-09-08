import React, { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as userSerivce from '../../services/userService'
import Path from '../../paths';
import AuthContext from '../../context/authContext';

export default function AktivEmail (){
    const {userId} = useParams();
    const navigate = useNavigate();
    const {setAuth} = useContext(AuthContext)


    useEffect(() => {
        userSerivce.aktivUser(userId)
          .then(() => { 
            setAuth((prevAuth) => ({
                ...prevAuth,
                aktiv: true,
            }));
          })
          .catch((error) => {
            console.error('Error activating user:', error);
            navigate(Path.Home);
          }); 
    
      }, [userId]);

    return (<>
        
        </>)

};