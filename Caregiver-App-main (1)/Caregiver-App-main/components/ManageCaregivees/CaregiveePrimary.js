import * as React from 'react';
import { StyleSheet, Text, View, TextInput, Image, FlatList } from 'react-native';
import { Icon, ListItem } from 'react-native-elements';
import getNotificationStatus from '../CaregiverDashboard/GetNotificationStatus';
import TimeAgo from 'react-native-timeago';


const CaregiveePrimary = ({route}) => {
    const [notesForCaregiver, setNotesForCaregiver] = React.useState("");
    const caregivee = route.params.caregivee;
    const [notifications, setNotification] = React.useState([]);

    const styles = StyleSheet.create({
        notes: {
            borderWidth: 1,
            height: 150,
            padding: 5,
            margin: 15
        },
        text2: {
            textAlign: 'center',
            padding: 5,
            fontSize:15
        },
        text: {
            textAlign: 'center',
            padding: 5,
            fontSize: 25
        }
      });

    return (
    <View style = {{flex: 1}}> 
        <Icon name={caregivee.icon} size={100}></Icon>
        <Text style={styles.text}>{caregivee.name}</Text>
        <Text style={styles.text2}>{caregivee.description}</Text>
        <TextInput
            multiline = {true}
            numberOfLines = {5}
            onChangeText={setNotesForCaregiver}
            value={notesForCaregiver}
            placeholder="Notes for Caregiver"
            style={styles.notes}
        />
        <Text style = {styles.text2}> Recent Notifications </Text>
        <FlatList
        data = {notifications}
        renderItem = {({item}) => (
            <ListItem bottomDivider onPress={() => navigation.navigate('Notification Details', {'notification': item, 'count': getTimesSent(item)})}>
                <Icon name={item.icon} size={75}/>
                <ListItem.Content>
                    <ListItem.Title>{item.name}</ListItem.Title>
                    <ListItem.Subtitle>Sent to {item.sentTo}</ListItem.Subtitle>
                    <ListItem.Subtitle>{getNotificationStatus(item)}</ListItem.Subtitle>
                    <ListItem.Subtitle><TimeAgo style={styles.timeAgo} time={item.dateSent}/></ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem>
        )}
        keyExtractor={item => item.id}
      />
    </View>
    );
}



export default CaregiveePrimary;