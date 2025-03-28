// screens/HomeScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery } from '../redux/searchSlice';

const HomeScreen = () => {
  const [matches, setMatches] = useState([]);
  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.search);

  useEffect(() => {
    fetch('https://www.thesportsdb.com/api/v1/json/1/eventsnextleague.php?id=4346')
      .then((response) => response.json())
      .then((data) => setMatches(data.events || []));
  }, []);

  const filteredMatches = matches.filter((match) =>
    match.strEvent.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View>
      <TextInput
        placeholder="Search Matches..."
        onChangeText={(text) => dispatch(setSearchQuery(text))}
      />
      <FlatList
        data={filteredMatches}
        keyExtractor={(item) => item.idEvent}
        renderItem={({ item }) => <Text>{item.strEvent} - {item.dateEvent}</Text>}
      />
    </View>
  );
};

export default HomeScreen;