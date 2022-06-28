import React, { useEffect, useState, useCallback, useMemo } from 'react';
import './App.css';
import { db } from './firebase-config/firebase-config';
import { collection, doc, getDocs, addDoc, updateDoc, deleteDoc } from 'firebase/firestore'

function App() {
  const [users, setUsers] = useState([]);
  const [value, setValue] = useState(0);
  const [newName, setNewName] = useState('');
  const [newAge, setNewAge] = useState(0);
  const [action, setAction] = useState(false);
  const usersCollectionRef = collection(db, "users");
  console.log(users);

  const updateDb = () => {
    setAction(prevState => !prevState);
  }

  const createUser = async () => {
    console.log(`I'm here`);
    console.log(newName);
    console.log(newAge);
    await addDoc(usersCollectionRef, { name: newName, age: +newAge });
    await updateDb();
  };

  const updateUser = async (id, age) => {
    const userDoc = doc(db, "users", id);
    const newFields = { age: age + 1 };
    await updateDoc(userDoc, newFields);
    await updateDb();
  };

  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc)
    await updateDb();
  };

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setValue(prev => prev + 1)
    };
    getUsers();
  }, [action]);

  return (
    <div className="App">
      <h1>{value}</h1>
      <input
        type='text'
        placeholder='Name...'
        onChange={(e) => setNewName(e.target.value)}
        value={newName}
      />
      <input
        type='number'
        placeholder='Age...'
        onChange={(e) => setNewAge(e.target.value)}
        value={newAge}
      />
      <button onClick={createUser}>Create User</button>
      {users.map(user => {
        return (
          <div>
            <h1>Name: {user.name}</h1>
            <h1>Age: {user.age}</h1>
            <button onClick={() => { updateUser(user.id, user.age) }}>Increment age
            </button>
            <button onClick={() => deleteUser(user.id)}>Delete</button>
          </div>
        );
      })}
    </div>
  );
}

export default App;

