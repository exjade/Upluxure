import { firebase, FieldValue } from '../lib/firebase';

export async function doesUsernameExist(username) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username.toLowerCase())
    .get();

  // console.log(result)

  return result.docs.map((user) => user.data().length > 0);
}
export async function getUserByUsername(username) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username.toLowerCase())
    .get();

    return result.docs.map((item) => ({
      ...item.data(),
      docId: item.id,
    }))
  }

// get user from firestore where userId is equals to userId (obtained from the auth)
export async function getUserByUserId(userId) {
  const result = await firebase.firestore().collection('users').where('userId', '==', userId).get();

  const user = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id
  }))

  return user;
}

export async function getSuggestedProfiles(userId, following) {
  const result = await firebase
    .firestore()
    .collection('users')
    // .limit(8)
    .get();

  return result.docs
    .map((user) => ({ ...user.data(), docId: user.id })) // we want to get all users
    .filter((profile) => profile.userId !== userId && !following.includes(profile.userId)) // we want to filter out the current user and dont show profiles we are already following
}


export async function updateLoggedInUserFollowing(
  LoggedInUserDocId, // current user doc id
  profileId, // the user id of the profile we want to follow
  isFollowingProfile // true if we are following the profile, false if we want to unfollow
) {
  return firebase
    .firestore()
    .collection('users')
    .doc(LoggedInUserDocId)
    .update({
      following: isFollowingProfile ? FieldValue.arrayRemove(profileId) : FieldValue.arrayUnion(profileId)
    })
}

export async function updateFollowedUserFollowers(
  profileDocId,
  LoggedInUserDocId,
  isFollowingProfile
) {
  return firebase
    .firestore()
    .collection('users')
    .doc(profileDocId)
    .update({
      followers: isFollowingProfile ? FieldValue.arrayRemove(LoggedInUserDocId) : FieldValue.arrayUnion(LoggedInUserDocId)

    })
}


// Get photos for user
export async function getPhotos(userId, following) {
  const result = await firebase
    .firestore()
    .collection('photos')
    .orderBy('dateCreated', 'desc')
    .where('userId', 'in', following)
    .get();

  const userFollowedPhotos = result.docs.map((photo) => ({
    ...photo.data(),
    docId: photo.id
  }));

  // console.log('userFollowedPhotos', userFollowedPhotos)

  const photosWithUserDetails = await Promise.all(
    userFollowedPhotos.map(async (photo) => {
      let userLikedPhoto = false;
      if (photo.likes.includes(userId)) {
        userLikedPhoto = true;
      }
      const user = await getUserByUserId(photo.userId);// get user details
      const { username } = user[0]; // get username
      // console.log('username', user[0])
      return { username, ...photo, userLikedPhoto }
    })
  );

  return photosWithUserDetails;
}

export async function getUserPhotosByUsername(username) {
  const [user] = await getUserByUsername(username);
  const result = await firebase
    .firestore()
    .collection('photos')
    .where('userId', '==', user.userId)
    .get()

  return result.docs.map((item) => ({
    ...item.data(),
    docId: item.id
  }))
}

export async function isUserFollowingProfile(loggedInUserUsername, profileUserId) {
  const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', loggedInUserUsername) // active user
    .where('following', 'array-contains', profileUserId) // user in the following array
    .get()

  const [response = {}] = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id
  }))

  return response.userId
}

export async function toggleFollow(
  isFollowingProfile,
  activeUserDocId,
  profileDocId,
  profileUserId,
  followingUserId
) {
  // Current user doc id
  // Profile view user id
  // is the user following the profile? e.g does the user have following the profile  (true or false)
  await updateLoggedInUserFollowing(activeUserDocId, profileUserId, isFollowingProfile)
  // Current user user id
  // Profile view doc id
  // is the user following the profile? e.g does the user have following the profile  (true or false)
  await updateFollowedUserFollowers(profileDocId, followingUserId, isFollowingProfile)



}