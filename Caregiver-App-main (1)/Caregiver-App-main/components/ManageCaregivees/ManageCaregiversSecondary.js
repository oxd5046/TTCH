import * as React from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { ListItem, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import TimeAgo from 'react-native-timeago';
import { Button } from 'react-native-elements';
import { createCaregiverCaregiverConnection } from '../Server/BackendCaregiver';

const ManageCaregiversSecondary = (props) => {
    const {parentCaregivers} = props;
    const {caregiverRequestsReceived} = props;
    const { user } = props;
    const { accessToken } = props;
    const [ requests, setRequests ] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
      setRequests(caregiverRequestsReceived);
    }, []);

    const styles = StyleSheet.create({
        email: {
          fontSize: 20,
          marginLeft: 10,
          marginTop: 20,
          marginBottom: 5,
          height: 40,
          margin: 12,
          borderWidth: 1,
          padding: 10,
          width: "75%"
        },
        text: {
          fontSize: 20,
          marginLeft: 15,
          marginTop: 5,
          marginBottom: 5
        },
        list: {
            alignSelf: 'center',
            flex: 3
        },
        listItem: {
          height: 30
        },
        item: {
          marginTop: 5
        },
        row: {
          width: "100%",
          flexDirection: 'row'
        },
        button: {
          width: "100%",
          marginTop: 20
        },
        timeAgo: {
          fontSize:12
        },
      });

      const acceptRequest = (requestAccepted) => {
        let caregiver = {
          name: requestAccepted.sentToCaregiver,
          parentCaregiver: requestAccepted.sentFromCaregiver,
          userName: user,
          canEdit: false
        }
        createCaregiverCaregiverConnection(caregiver, accessToken);
        console.log("Request Accepted!");
      };

      const deleteElement = (id) => {
        var localRequests = requests.filter((item) => item.id != id);
        setRequests(localRequests);
      };

    return (
        <View style = {{flex: 1}}>
          <Text style = {styles.text}>Requests Received</Text>
          <FlatList
            data={requests}
            renderItem={({item}) => (
              <ListItem bottomDivider>
                <ListItem.Content>
                  <ListItem.Title>{item.sentFromCaregiver}</ListItem.Title>
                  <ListItem.Subtitle>{item.sentFromCaregiver} has requested to add you to their caregiver network</ListItem.Subtitle>
                  <ListItem.Subtitle><TimeAgo style={styles.timeAgo} time={item.dateSent}/></ListItem.Subtitle>
                  <Button
                    title="Accept"
                    onPress={() => {
                      acceptRequest(item);
                      deleteElement(item.id);
                    }}
                    style={styles.button}
                    icon={{
                      name: 'checkcircle',
                      type: 'antdesign',
                      size: 20,
                      color: 'white',
                    }}
                    buttonStyle={{
                      backgroundColor: 'rgba(33, 136, 218, 1)',
                      borderRadius: 15,
                      height: 50,
                      width: 320,
                      marginTop: 10
                    }}
                  />
                  </ListItem.Content>
                  <ListItem.Chevron />
                </ListItem>
            )}
            keyExtractor={item => item.id}
          />
          <Text style = {styles.text}>Parent Caregivers</Text>
          <FlatList
            data = {parentCaregivers}
            renderItem = {({item}) => (
              <ListItem style={styles.item} bottomDivider onPress={() => navigation.navigate('Caregiver Primary', {'caregiver':item})}>
                <Icon name={item.icon} />
                <ListItem.Content style={styles.listItem}>
                  <ListItem.Title>{item.name}</ListItem.Title>
                </ListItem.Content>
              </ListItem>
            )}
            keyExtractor={item => item.id}
          />
        </View>
    );
  }

  export default ManageCaregiversSecondary;