import React from 'react'
import "./question.css";
import { useEffect, useState } from 'react';
import { dbase } from './firebase';
import {collection, getDocs, addDoc } from "firebase/firestore"


function Question() {
  
  const [date, setdate] = useState("")
  const [newDesc, setNewDesc] = useState("")// empty string
  const [setTitle, setNewTitle] = useState("")
  const [setTag, setNewTag]= useState("")
  const [users, setUsers] = useState([])// empty array
  const usersCollectionRef = collection(dbase, "question")
  const createUser = async () => {
    await addDoc(usersCollectionRef, {desc: newDesc, title:setTitle, tag: setTag })
}

  useEffect(()=>{
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) =>({...doc.data(), id: doc.id}))) // spread operator - t's used to create a new object that includes all the properties of doc.data().
    }
    getUsers()
  }, [])
    return(
        <>
           <div className="data">
        <h3>What do you want to share or ask</h3>
      </div>
      <div>
        <h3>Please elaborate the details in the given box</h3>
      </div>
      
        <div className="title">
        <label for="title">Title  </label>
          <input type="text" placeholder="Start your question which how, what, why, etc." onChange={(event)=>{
            setNewTitle(event.target.value)
          }} ></input>
        </div>
        <br></br>
         
        <div className="problem">
        <label for="problem">Describe your problem  </label>
          <input type="text" onChange={(event)=> {
        setNewDesc(event.target.value); }} />
        </div>

           
        {/* <div className="date">
        <label>DATE </label>
          <input type="date" onChange={(event)=> {
        setdate(event.target.value); }} />
        </div> */}
        <br></br>
        <div className="tags">
        <label for="tags">Tags  </label>
          <input type="text" placeholder="Please add up to 3 tags to describe what your question is about. e.g. Java" onChange={(event)=>{
          setNewTag(event.target.value)
        }}/> 
        </div>
        <br></br>
        <div className= "Post">
        <button type="submit" onClick={createUser}>Post </button>
        </div>
        <br>
        </br>
        </>
       
    )
}
export default Question;