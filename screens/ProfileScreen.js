// screens/ProfileScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { auth, db } from '../firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';

const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [team, setTeam] = useState('');

  const saveProfile = async () => {
    if (auth.currentUser) {
      await setDoc(doc(db, 'users', auth.currentUser.uid), { name, team });
    }
  };

  return (
    <View>
      <Text>Profile</Text>
      <TextInput placeholder="Name" value={name} onChangeText={setName} />
      <TextInput placeholder="Favorite Team" value={team} onChangeText={setTeam} />
      <Button title="Save Profile" onPress={saveProfile} />
    </View>
  );
};

export default ProfileScreen;