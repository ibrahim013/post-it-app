import database from '../../server/database'
import firebase from 'firebase';
import groups from '../modeles/group';
import members from'../modeles/members';

// retrieve from firebase
export const getGroupsDB = () => {
	return database.ref('/group').once('value')
}

//get specified group
export const getMembers = (memberdisplayName)=> {
	return database.ref('/${memberdisplayName}').once('value')
}

//add new group
export const addGroup = (name) => {
	let key = database.ref('/').push().key
	let model = groupModel(key, name,
		firebase.database.ServerValue.TIMESTAMP)
	return database.ref('/' + key).set(model)
}
// add new member into spesific group
export const addNewMember =(id, displayName) => {
	return new Promise ((resolve, reject)=> {
		database.ref('/${id}').once('value').then ((members)=>{
			let member = members.val().members || []
			let key = database.ref('/${id}').push().key
			member.push(memberModel (key, displayName, 
				firbase.database.ServerValue.TIMESTAMP))
			database.ref('/${id}/members').set(member)
			.then(res => {resolve (res)})
			.catch(error => {reject(error)})
			})
	})
}  